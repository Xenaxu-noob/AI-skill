const {chromium}=require('playwright');
const {pathToFileURL}=require('node:url'),{execFileSync,spawn}=require('node:child_process');
const {once}=require('node:events');
const path=require('node:path'),fs=require('node:fs/promises');
const ff='ffmpeg',probe='ffprobe';
const variants=['00-original','01-centered','02-split','03-illustration-top','04-bottom-tearoff'];
(async()=>{
 const assets=path.join(__dirname,'..','assets');
 if(process.argv[2]==='--check'){
  execFileSync(ff,['-version']);execFileSync(probe,['-version']);
  const b=await chromium.launch(process.env.INVITATION_CHROME ? {executablePath: process.env.INVITATION_CHROME} : {});await b.close();console.log('Chromium, ffmpeg and ffprobe ready');return;
 }
 const config=JSON.parse(await fs.readFile(process.argv[2],'utf8'));
 const out=path.resolve(process.argv[3]||'invitation-output');
 const selected=config.layout==='all'?variants:[config.layout];
 const fields={kicker:32,title:38,when:46,where:65,rsvp:86,stub:12};
 if(!selected.every(v=>variants.includes(v))||!['title','when','where'].every(k=>typeof config[k]==='string'&&config[k].trim())) throw Error('Choose a valid layout and provide title, when and where');
 for(const [key,limit] of Object.entries(fields)){
  const copy=config[key]??'';
  if(typeof copy!=='string'||Array.from(copy).length>limit)throw Error(key+' exceeds its copy allowance: '+limit);
 }
 const hold=config.hold??5;
 if(!Number.isFinite(hold)||hold<4||hold>12)throw Error('Hold must be 4–12 seconds');
 const duration=(112/24+hold).toFixed(3);
 await fs.mkdir(out,{recursive:true});
 const browser=await chromium.launch(process.env.INVITATION_CHROME ? {executablePath: process.env.INVITATION_CHROME} : {});
 try {
 const page=await browser.newPage({viewport:{width:720,height:900},deviceScaleFactor:1,reducedMotion:'no-preference'});
 for(const variant of selected){
  await page.goto(pathToFileURL(path.join(assets,variant+'.html')).href);
  const artwork=config.artwork?'data:image/png;base64,'+(await fs.readFile(path.resolve(path.dirname(process.argv[2]),config.artwork))).toString('base64'):'';
  await page.evaluate(async ({config,artwork})=>{
   for(const [key,placement] of Object.entries(config.placements||{})){
    const node=document.querySelector('[data-text="'+key+'"]');
    if(!node||!Array.isArray(placement)||placement.length!==5||!placement.every(Number.isFinite))throw Error('Invalid placement '+key);
    const [left,top,width,height,size]=placement;
    if(left<0||top<0||width<=0||height<=0||left+width>100||top+height>100||size<=0)throw Error('Placement outside the card: '+key);
    Object.assign(node.style,{left:left+'%',top:top+'%',width:width+'%',height:height+'%'});
    node.dataset.size=size;
   }
   if(artwork){
    const image=new Image();
    image.src=artwork;
    await image.decode();
    if(Math.abs(image.naturalWidth/image.naturalHeight-.8)>.015)throw Error('Custom artwork must be portrait 4:5');
    document.querySelector('.stage').style.setProperty('--art','url('+artwork+')');
   }
   for(const input of document.querySelectorAll('form input'))input.value=config[input.name]||'';
   sync();
  },{config,artwork});
  await page.getByRole('button',{name:'收件人预览'}).click();
  await page.addStyleTag({content:'main.recipient{padding:0;max-width:none;width:100%}.stage{width:100%;border-radius:0;box-shadow:none}#back,.hint{display:none}'});
  await page.evaluate(()=>document.activeElement.blur());
  const stage=page.locator('.stage');
  const sealed=await stage.screenshot({type:'jpeg',quality:95});
  await page.evaluate(()=>{
   open(false);
   window.frameAnimations=document.querySelector('.stage').getAnimations({subtree:true});
   frameAnimations.forEach(a=>{a.pause();a.currentTime=0});
  });
  await page.evaluate(()=>frameAnimations.forEach(a=>a.currentTime=3800));
  const invalid=await page.evaluate(()=>Array.from(card.querySelectorAll('[data-text]')).filter(el=>el.textContent && (el.scrollWidth>el.clientWidth+1 || el.scrollHeight>el.clientHeight+1 || parseFloat(getComputedStyle(el).fontSize)<12)).map(el=>el.dataset.text));
  if(invalid.length)throw Error('Text needs a wider layout or shorter copy: '+invalid.join(', '));
  await stage.screenshot({path:path.join(out,variant+'-proof.png')});
  if(process.env.INVITATION_PROOF_ONLY==='1')continue;
  const mp4=path.join(out,variant+'.mp4');
  const music=path.join(assets,variant+'.m4a');
  const filter='[0:v]tpad=stop_mode=clone:stop_duration='+hold+'[v];[1:a]apad,atrim=duration='+duration+',afade=t=out:st='+(duration-1)+':d=1'+(config.mute?',volume=0':'')+'[a]';
  const proc=spawn(ff,['-y','-v','error','-f','image2pipe','-framerate','24','-vcodec','mjpeg','-i','pipe:0','-i',music,'-filter_complex',filter,'-map','[v]','-map','[a]','-c:v','libx264','-crf','17','-preset','fast','-pix_fmt','yuv420p','-color_range','tv','-c:a','aac','-b:a','160k','-movflags','+faststart','-t',duration,mp4],{stdio:['pipe','ignore','inherit']});
  const done=once(proc,'close');
  const write=async image=>{if(!proc.stdin.write(image))await once(proc.stdin,'drain')};
  for(let frame=0;frame<20;frame++)await write(sealed);
  for(let frame=0;frame<92;frame++){
   await page.evaluate(t=>frameAnimations.forEach(a=>a.currentTime=t),frame*1000/24);
   await write(await stage.screenshot({type:'jpeg',quality:95}));
  }
  proc.stdin.end();
  const [status]=await done;if(status!==0)throw Error('Failed to render '+variant);
  const result=JSON.parse(execFileSync(probe,['-v','error','-show_entries','stream=codec_name,width,height:format=duration','-of','json',mp4]));
  const [picture,audio]=result.streams;
  if(picture.codec_name!=='h264'||picture.width!==720||picture.height!==900||audio.codec_name!=='aac'||Math.abs(Number(result.format.duration)-Number(duration))>.08)throw Error(JSON.stringify(result));
  execFileSync(ff,['-v','error','-i',mp4,'-f','null','-']);
  console.log(variant+' verified '+result.format.duration+' s');
 }
 }finally{await browser.close()}
})().catch(e=>{console.error(e);process.exitCode=1});