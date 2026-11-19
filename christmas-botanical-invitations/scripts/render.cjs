const { chromium } = require('playwright');
const { spawn, execFileSync } = require('node:child_process');
const { once } = require('node:events');
const fs = require('node:fs');
const { pathToFileURL } = require('node:url');
const path = require('node:path');

const root = path.join(__dirname, '..');
const layouts = ['botanical-top', 'evergreen-divider', 'eucalyptus-margin', 'pinecone'];
const limits = { title: 48, hours: 58, venue: 80, entry: 80, intro: 45, kicker: 32 };
const required = ['title', 'hours', 'venue'];
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
  if (!config.artwork && (config.focus || config.placements)) throw Error('Set artwork for custom focus or placements');
  if (config.artwork) {
    const file = path.resolve(path.dirname(filename), config.artwork);
    const extension = path.extname(file).toLowerCase();
    if (!['.png', '.jpg', '.jpeg'].includes(extension)) throw Error('Artwork must be PNG or JPEG');
    config.artwork = 'data:image/' + (extension === '.png' ? 'png' : 'jpeg') + ';base64,' +
      fs.readFileSync(file).toString('base64');
  }
  if (config.focus) {
    if (!Array.isArray(config.focus) || config.focus.length !== 2 ||
        config.focus.some(value => !Number.isFinite(value) || value < 0 || value > 100)) {
      throw Error('focus expects two percentages from 0 to 100');
    }
  }
  for (const [field, box] of Object.entries(config.placements || {})) {
    if (!['title', 'kicker', 'hours', 'venue', 'entry'].includes(field) ||
        !Array.isArray(box) || box.length !== 4 || box.some(value => !Number.isFinite(value))) {
      throw Error('Invalid placement: ' + field);
    }
    const [left, top, width, size] = box;
    if (left < 0 || top < 0 || top >= 100 || width <= 0 || left + width > 100 || size <= 0 || size > 20) {
      throw Error('Placement outside the card: ' + field);
    }
  }
  return config;
}

async function preparePage(page, config) {
  const filename = path.join(root, 'assets', config.layout + '.html');
  await page.goto(pathToFileURL(filename).href);
  await page.evaluate(async data => {
    await document.fonts.ready;
    const image = new Image();
    image.src = data.artwork || data.layout + '.png';
    await image.decode();
    const art = document.querySelector('.art');
    const card = document.querySelector('.card');
    if (data.artwork) {
      if (Math.abs(image.naturalWidth / image.naturalHeight - .8) > .018) throw Error('Artwork must be 4:5');
      Object.assign(art.style, {
        inset: '0', height: 'auto', maskImage: 'none', backgroundPosition: 'center',
        backgroundSize: 'cover', backgroundImage: 'url(' + data.artwork + ')'
      });
    }
    window.setCopy(data);
    for (const [field, box] of Object.entries(data.placements || {})) {
      const node = field === 'kicker' ? document.querySelector('.kicker') : document.getElementById(field);
      if (node.parentElement.className === 'details') card.append(node);
      const [left, top, width, size] = box;
      Object.assign(node.style, { position: 'absolute', left: left + '%', top: top + '%',
        width: width + '%', right: 'auto', fontSize: card.clientWidth * size / 100 + 'px',
        lineHeight: '1.16', textAlign: getComputedStyle(document.querySelector('.details')).textAlign });
    }
    if (data.focus) {
      const [x, y] = data.focus.map((percent, axis) => {
        const dimension = axis === 0 ? card.offsetWidth : card.offsetHeight;
        const halfView = (axis === 0 ? 720 : 900) / 9.4 + 3;
        return Math.min(dimension - halfView, Math.max(halfView, dimension * percent / 100));
      });
      const original = window.frame;
      window.frame = time => {
        original(time);
        const retreat = progress(time, .35, 2.26);
        card.style.transformOrigin = x + 'px ' + y + 'px';
        card.style.transform = 'translate(' + (360-card.offsetLeft-x)*(1-retreat) + 'px,' +
          (450-card.offsetTop-y)*(1-retreat) + 'px) scale(' + (1+3.7*(1-retreat)) + ')';
      };
    }
    window.frame(9);
    const cardBounds = card.getBoundingClientRect();
    const rows = [...card.querySelectorAll('.kicker, h1, p')].filter(node => node.textContent && !node.hidden);
    const textBounds = rows.map(node => {
      const range = document.createRange();
      range.selectNodeContents(node);
      const bounds = range.getBoundingClientRect();
      if (bounds.left < cardBounds.left + 16 || bounds.right > cardBounds.right - 16 ||
          bounds.top < cardBounds.top + 16 || bounds.bottom > cardBounds.bottom - 16) {
        throw Error('Text exceeds paper margin: ' + node.textContent);
      }
      return bounds;
    });
    for (let i = 0; i < textBounds.length; i++) {
      for (const other of textBounds.slice(i + 1)) {
        const box = textBounds[i];
        if (box.left < other.right && box.right > other.left &&
            box.top < other.bottom && box.bottom > other.top) throw Error('Card text overlaps');
      }
    }
  }, config);
}

async function render() {
  const args = process.argv.slice(2);
  const check = args.includes('--check');
  const proof = args.includes('--proof');
  const [filename, targetDir] = args.filter(value => !value.startsWith('--'));
  if (!check && (!filename || !targetDir)) throw Error('Usage: node scripts/render.cjs config.json output [--proof]');
  for (const [cmd, version] of [['ffmpeg','-version'], ['ffprobe','-version'], ['python3','--version']]) {
    execFileSync(cmd, [version], { stdio: 'ignore' });
  }
  const config = check ? null : readConfig(path.resolve(filename));
  const browser = await chromium.launch(channel ? { channel } : {});
  try {
    if (check) {
      console.log('FFmpeg, FFprobe, Python and Chromium are available.');
      return;
    }
    const output = path.resolve(targetDir);
    fs.mkdirSync(output, { recursive: true });
    const page = await browser.newPage({ viewport });
    await preparePage(page, config);
    const poster = path.join(output, 'christmas-market.png');
    await page.screenshot({ path: poster });
    if (proof) return;

    const target = path.join(output, 'christmas-market.mp4');
    const soundtrack = path.join(output, 'music.wav');
    if (config.music) execFileSync('python3', [path.join(__dirname, 'music.py'), soundtrack]);
    const audioArgs = config.music ? ['-i', soundtrack, '-c:a', 'aac', '-b:a', '128k'] : [];
    const encoder = spawn('ffmpeg', ['-y', '-v', 'error', '-f', 'image2pipe', '-framerate', String(fps),
      '-vcodec', 'mjpeg', '-i', 'pipe:0', ...audioArgs, '-c:v', 'libx264', '-preset', 'fast',
      '-crf', '17', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', target],
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
      if (config.music) fs.unlinkSync(soundtrack);
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
