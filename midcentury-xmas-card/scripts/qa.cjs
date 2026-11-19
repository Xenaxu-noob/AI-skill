const {execFileSync}=require('node:child_process');
const path=require('node:path');
const root=path.resolve(__dirname,'..');
const output=path.resolve(process.argv[2]||'invitation-qa');
for(const example of ['sample','gallery','fundraiser','long-copy']){
 execFileSync(process.execPath,[path.join(__dirname,'render.cjs'),path.join(root,'examples',example+'.json'),path.join(output,example)],{stdio:'inherit',env:{...process.env,INVITATION_PROOF_ONLY:process.argv.includes('--full')?'0':'1'}});
}
