import puppeteer from 'puppeteer-core';
import fs from 'node:fs';
const b=await puppeteer.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:'new',args:['--no-sandbox','--disable-gpu','--hide-scrollbars']});
const p=await b.newPage(); await p.setViewport({width:1080,height:1920,deviceScaleFactor:1});
p.on('pageerror',e=>console.log('[pageerror]',e.message));
p.on('console',m=>{ if(m.type()==='error') console.log('[console]',m.text()); });
await p.goto('file://'+process.cwd()+'/index.html',{waitUntil:'networkidle0'});
await p.evaluate(()=>document.fonts.ready);
await p.waitForFunction(()=>!!(window.__timelines&&window.__timelines.main),{timeout:20000});
await new Promise(r=>setTimeout(r,400));
fs.mkdirSync('check',{recursive:true});
const times = (process.argv[2]||'0.9,1.5,1.9,2.3,2.7,3.2,4.2,5.2,6.6,8.0,12.0').split(',').map(Number);
for(const t of times){
 await p.evaluate(async(t)=>{const tl=window.__timelines.main;tl.pause();tl.seek(t);await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));},t);
 await p.screenshot({path:`check/t${t}.png`}); console.log(t);
}
await b.close();
