const {execFileSync}=require('node:child_process');
const {chromium}=require('playwright');
const fs=require('node:fs/promises'),os=require('node:os'),path=require('node:path');
const [base,output,mode]=process.argv.slice(2);
const names=['00-original','01-centered','02-split','03-illustration-top','04-bottom-tearoff'];
const inputs=names.flatMap(name=>['-i',path.join(base,name+'.mp4')]);
const encode=['-c:v','libx264','-crf','17','-pix_fmt','yuv420p','-c:a','aac','-movflags','+faststart'];
function ff(args){execFileSync('ffmpeg',['-y','-v','error',...args],{stdio:'inherit'});}
async function main(){
 if(mode==='--full'){
  const concat=names.map((_,i)=>'['+i+':v]['+i+':a]').join('')+'concat=n=5:v=1:a=1[v][a]';
  ff([...inputs,'-filter_complex',concat,'-map','[v]','-map','[a]',...encode,output]);return;
 }
 const temp=await fs.mkdtemp(path.join(os.tmpdir(),'letterpress-preview-'));
 const board=path.join(temp,'board.png');
 try{
  const browser=await chromium.launch(process.env.INVITATION_CHROME?{executablePath:process.env.INVITATION_CHROME}:{});
  try{
   const page=await browser.newPage({viewport:{width:1440,height:1016}});
   await page.setContent('<style>html,body{margin:0}canvas{display:block}</style><canvas width="1440" height="1016"></canvas>');
   await page.evaluate(()=>{
    const g=document.querySelector('canvas').getContext('2d');
    g.fillStyle='#f5ebdc';g.fillRect(0,0,1440,1016);
    g.fillStyle='#7e2b28';g.font='700 63px Georgia, serif';g.fillText('Christmas Letterpress Invitations',78,105);
    g.fillStyle='#a06250';g.fillRect(80,140,1280,2);
    const labels=[['Vertical Ticket',80,934],['Classic',750,527],['Split Layout',1068,527],['Winter Postcard',750,934],['Tear-off Ticket',1068,934]];
    g.fillStyle='#7e2b28';g.font='600 27px Georgia, serif';
    for(const [text,x,y] of labels)g.fillText(text,x,y);
   });
   await page.screenshot({path:board});
  }finally{await browser.close();}
  const boxes=[[80,182,592,716],[750,182,288,310],[1068,182,288,310],[750,589,288,310],[1068,589,288,310]];
  const delays=[0,.11,.22,.10,.20];
  const tracks=boxes.map(([x,y,w,h],i)=>'['+i+':v]setpts=PTS-STARTPTS,crop=648:816:36:42,scale='+w+':'+h+':force_original_aspect_ratio=decrease,pad='+w+':'+h+':(ow-iw)/2:(oh-ih)/2:color=0x49302a'+',setsar=1,tpad=start_mode=clone:start_duration='+delays[i]+'[card'+i+']');
  tracks.push('[5:v]fps=24[board]');
  boxes.forEach(([x,y],i)=>tracks.push((i===0?'[board]':'[p'+(i-1)+']')+'[card'+i+']overlay='+x+':'+y+'['+(i===4?'v':'p'+i)+']'));
  tracks.push('[0:a]atrim=duration=6.5,afade=t=out:st=5.62:d=.88[a]'.replace('d=.88','d=0.88'));
  ff([...inputs,'-loop','1','-i',board,'-filter_complex',tracks.join(';'),'-map','[v]','-map','[a]',...encode,'-t','6.5',output]);
 }finally{await fs.rm(temp,{recursive:true,force:true});}
}
main().catch(error=>{console.error(error);process.exitCode=1});
