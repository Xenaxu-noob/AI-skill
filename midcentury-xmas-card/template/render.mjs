// Frame-accurate 1080x1920 render for the MCM e-card.
import puppeteer from 'puppeteer-core';
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const FPS = 30, DUR = 15.0;
const OUT = process.argv.includes('--out') ? process.argv[process.argv.indexOf('--out') + 1] : 'renders/card.mp4';
const ROOT = process.cwd();
const CHROME = process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const CHUNK = 45;
const MIME = { '.html':'text/html', '.js':'text/javascript', '.jpg':'image/jpeg', '.jpeg':'image/jpeg',
  '.png':'image/png', '.webp':'image/webp', '.m4a':'audio/mp4', '.wav':'audio/wav', '.ttf':'font/ttf', '.svg':'image/svg+xml' };
const server = http.createServer((req, res) => {
  const url = decodeURIComponent(req.url.split('?')[0]);
  const file = path.join(ROOT, url === '/' ? 'index.html' : url);
  if (!file.startsWith(ROOT) || !fs.existsSync(file)) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { 'Content-Type': MIME[path.extname(file).toLowerCase()] || 'application/octet-stream' });
  fs.createReadStream(file).pipe(res);
});
await new Promise(r => server.listen(0, '127.0.0.1', r));
const port = server.address().port;
const total = Math.round(FPS * DUR);
const outDir = path.join(ROOT, '.frames');
fs.rmSync(outDir, { recursive: true, force: true }); fs.mkdirSync(outDir, { recursive: true });
async function renderChunk(start, end) {
  const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new',
    args: ['--no-sandbox','--disable-gpu','--disable-dev-shm-usage','--hide-scrollbars','--force-device-scale-factor=1','--js-flags=--max-old-space-size=2048'],
    defaultViewport: { width: 1080, height: 1920, deviceScaleFactor: 1 } });
  const page = await browser.newPage();
  page.on('pageerror', e => console.log('[pageerror]', e.message));
  await page.goto(`http://127.0.0.1:${port}/index.html`, { waitUntil: 'networkidle0' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForFunction(() => !!(window.__timelines && window.__timelines.main), { timeout: 20000 });
  await new Promise(r => setTimeout(r, 450));
  for (let i = start; i < end; i++) {
    await page.evaluate(async (t) => { const tl=window.__timelines.main; tl.pause(); tl.seek(t); await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r))); }, i / FPS);
    await page.screenshot({ path: path.join(outDir, `f${String(i).padStart(4,'0')}.jpg`), type: 'jpeg', quality: 94, captureBeyondViewport: false });
    if (i % 30 === 0) console.log('frame', i, '/', total);
  }
  await browser.close();
}
for (let s = 0; s < total; s += CHUNK) { const e=Math.min(total,s+CHUNK); console.log('chunk',s,e); await renderChunk(s,e); }
server.close();
fs.mkdirSync(path.dirname(OUT), { recursive: true });
execFileSync('ffmpeg', ['-y','-loglevel','error','-framerate',String(FPS),'-i',path.join(outDir,'f%04d.jpg'),'-i','assets/bgm-mix.m4a','-c:v','libx264','-pix_fmt','yuv420p','-crf','18','-preset','medium','-c:a','aac','-b:a','192k','-shortest','-movflags','+faststart',OUT]);
console.log('rendered', OUT);
