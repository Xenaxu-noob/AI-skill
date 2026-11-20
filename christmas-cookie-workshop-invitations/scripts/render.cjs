const { chromium } = require('playwright');
const { spawn, execFileSync } = require('node:child_process');
const { once } = require('node:events');
const fs = require('node:fs');
const { pathToFileURL } = require('node:url');
const path = require('node:path');

const root = path.join(__dirname, '..');
const designs = require('../assets/designs.json');
const layouts = Object.keys(designs);
const limits = { intro: 48, kicker: 35, title: 65, hours: 60, venue: 80, rsvp: 80 };
const required = ['title','hours','venue'];
const channel = process.env.INVITATION_CHROME_CHANNEL;
const fps = 24;
const length = 10;
const viewport = { width: 720, height: 900 };

function readConfig(filename) {
  const config = JSON.parse(fs.readFileSync(filename, 'utf8'));
  if (!layouts.includes(config.layout)) throw Error('Choose one of: ' + layouts.join(', '));
  for (const [field, max] of Object.entries(limits)) {
    const value = config[field] ?? '';
    if (typeof value !== 'string' || [...value].length > max ||
        (required.includes(field) && !value.trim())) {
      throw Error('Invalid copy in ' + field + ' (max ' + max + ' characters)');
    }
    config[field] = value.trim();
  }
  if (config.music !== undefined && typeof config.music !== 'boolean') throw Error('music must be boolean');
  config.music ??= true;
  const design = structuredClone(designs[config.layout]);
  const fields = ['kicker','title','hours','venue','rsvp'];
  for (const [field, box] of Object.entries(config.placements || {})) {
    const i = fields.indexOf(field);
    if (i < 0 || !Array.isArray(box) || box.length !== 4 || !box.every(Number.isFinite) ||
        box[0]<50 || box[0]>1072 || box[1]<60 || box[1]>1350 ||
        box[2]<120 || box[2]>1020 || box[3]<22 || box[3]>160) {
      throw Error('Invalid placement: '+field);
    }
    design.boxes[i]=box;
  }
  if (config.focus !== undefined) {
    if (!config.artwork || !Array.isArray(config.focus) || config.focus.length !== 2 ||
      config.focus.some(n=>!Number.isFinite(n) || n<0 || n>100)) throw Error('Custom focus expects artwork and [x%, y%]');
    const [x,y]=config.focus;
    const limit=(value,margin,max)=>Math.max(margin,Math.min(value,max-margin));
    design.start=[limit(x*11.22,190,1122),limit(y*14.02,228,1402)];
    design.end=[...design.start];
  }
  const artwork = config.artwork ? path.resolve(path.dirname(filename),config.artwork) :
    path.join(root,'assets',config.layout + '.png');
  const extension=path.extname(artwork).toLowerCase();
  if (!['.png','.jpg','.jpeg'].includes(extension)) throw Error('Artwork must be PNG or JPEG');
  const source='data:image/'+(extension==='.png'?'png':'jpeg')+';base64,'+fs.readFileSync(artwork).toString('base64');
  return {design,source,music:config.music,custom:Boolean(config.artwork),
    intro:config.intro, copy:fields.map(field=>config[field])};
}

async function preparePage(page, config) {
  await page.addInitScript(data => {
    window.cookieArtwork = data.source;
    window.cookieLayout = data.design;
    window.invitation = data;
  }, config);
  await page.goto(pathToFileURL(path.join(root, 'assets', 'motion.html')).href);
  await page.evaluate(async () => {
    await window.ready;
    window.frame(9);
  });
}

async function render() {
  const args = process.argv.slice(2);
  const check = args.includes('--check');
  const proof = args.includes('--proof');
  const [filename, targetDir] = args.filter(value => !value.startsWith('--'));
  if (!check && (!filename || !targetDir)) throw Error('Usage: node scripts/render.cjs config.json output [--proof]');
  for (const [cmd, version] of [['ffmpeg','-version'], ['ffprobe','-version']]) {
    execFileSync(cmd, [version], { stdio: 'ignore' });
  }
  const config = check ? null : readConfig(path.resolve(filename));
  const browser = await chromium.launch(channel ? { channel } : {});
  try {
    if (check) {
      console.log('FFmpeg, FFprobe and Chromium are available.');
      return;
    }
    const output = path.resolve(targetDir);
    fs.mkdirSync(output, { recursive: true });
    const page = await browser.newPage({ viewport });
    await preparePage(page, config);
    const poster = path.join(output, 'cookie-workshop-invitation.png');
    await page.screenshot({ path: poster });
    if (proof) return;

    const target = path.join(output, 'cookie-workshop-invitation.mp4');
    const soundtrack = path.join(root, 'assets', 'waltz.mp3');
    const audioArgs = config.music ? ['-i', soundtrack, '-c:a', 'aac', '-b:a', '128k'] : [];
    const encoder = spawn('ffmpeg', ['-y', '-v', 'error', '-f', 'image2pipe', '-framerate', String(fps),
      '-vcodec', 'mjpeg', '-i', 'pipe:0', ...audioArgs, '-c:v', 'libx264', '-preset', 'fast',
      '-crf', '17', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', '-t', String(length), target],
    { stdio: ['pipe', 'ignore', 'inherit'] });
    encoder.stdin.on('error', () => {});
    const finished = once(encoder, 'close');
    try {
      for (let index = 0; index < length * fps; index++) {
        await page.evaluate(time => window.frame(time), index / fps);
        const pixels = await page.screenshot({ type: 'jpeg', quality: 95 });
        if (!encoder.stdin.write(pixels)) {
          await Promise.race([once(encoder.stdin, 'drain'), finished.then(() => { throw Error('FFmpeg closed early'); })]);
        }
      }
      encoder.stdin.end();
      const [code] = await finished;
      if (code !== 0) throw Error('FFmpeg failed');
    } finally {
      if (encoder.exitCode === null) encoder.kill();
    }
    execFileSync('ffmpeg', ['-v', 'error', '-i', target, '-f', 'null', '-']);
    const report = JSON.parse(execFileSync('ffprobe', ['-v', 'error', '-show_entries',
      'stream=codec_name,width,height,r_frame_rate:format=duration', '-of', 'json', target]));
    const [video, audio] = report.streams;
    if (video.codec_name !== 'h264' || video.width !== viewport.width || video.height !== viewport.height ||
        video.r_frame_rate !== '24/1' || (config.music ? audio?.codec_name !== 'aac' : audio) ||
        Math.abs(Number(report.format.duration) - length) > .08) throw Error(JSON.stringify(report));
    console.log(target);
  } finally {
    await browser.close();
  }
}
render().catch(error => { console.error(error); process.exitCode = 1; });
