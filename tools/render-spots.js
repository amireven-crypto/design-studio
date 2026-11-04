/* Render the 11 FreshDrop TV spots: node tools/render-spots.js http://127.0.0.1:8777/ <audioDir> [chrome]
   Frames from tools/spot/spot.html (deterministic render(t)), 24 fps, + voiceover + sidechain-ducked beat (-16 LUFS) -> ads/freshdrop/video/ad-N.mp4 */
const p=require('puppeteer-core'),{spawn,execFileSync}=require('child_process'),path=require('path'),fs=require('fs');
const BASE=process.argv[2],AUD=process.argv[3],CH=process.argv[4]||'/usr/bin/google-chrome',FPS=24,only=process.env.ONLY;
const out=path.join(__dirname,'..','ads','freshdrop','video');fs.mkdirSync(out,{recursive:true});
// shot boundaries cut on sentence starts (voice is delayed 0.5 s)
function qs(i,TM,D){if(!TM)return '';const st=TM.starts.map(v=>+(v+.5).toFixed(2));
 if(i===10){const idx=[0,2,3,4,5,6,8,11,12];return '&ts='+idx.map((k,n)=>n===0?0:st[k]).join(',');}
 const S=JSON.parse(fs.readFileSync(path.join(__dirname,'spot','vo-en.json')))[i];const k=S.findIndex((t,j)=>/FreshDrop /.test(t)&&j<S.length-1);
 const b1=st[k],b4=st[st.length-1],b2=b1+(b4-b1)*.4,b3=b1+(b4-b1)*.7;return '&b='+[b1,b2,b3,b4].map(v=>v.toFixed(2)).join(',');}
(async()=>{const b=await p.launch({executablePath:CH,args:['--no-sandbox']});
for(let i=0;i<11;i++){if(only&&!only.split(',').includes(String(i+1)))continue;
 const mp3=path.join(AUD,`ad-${i+1}.wav`),ad=+execFileSync('ffprobe',['-v','error','-show_entries','format=duration','-of','csv=p=0',mp3]).toString();
 const TM=fs.existsSync(path.join(AUD,'timings.json'))?JSON.parse(fs.readFileSync(path.join(AUD,'timings.json')))[i+1]:null;
 const D=Math.round((ad+(i===10?1.5:1.8))*10)/10,N=Math.round(D*FPS);
 const pg=await b.newPage();await pg.setViewport({width:1080,height:1080});await pg.goto(`${BASE}tools/spot/${i===10?'dream':'spot'}.html?i=${i}&d=${D}${qs(i,TM,D)}`,{waitUntil:'networkidle0'});await pg.waitForFunction('window.READY');
 const ff=spawn('ffmpeg',['-y','-loglevel','error','-f','image2pipe','-framerate',String(FPS),'-i','-','-i',mp3,
  '-f','lavfi','-t',String(D),'-i',"aevalsrc='0.22*sin(2*PI*55*t)*exp(-14*mod(t,0.5))+0.05*sin(2*PI*880*t)*exp(-40*mod(t+0.25,0.5))':s=44100",
  '-filter_complex','[1:a]adelay=500,apad,asplit=2[v][sc];[2:a]volume=0.55,lowpass=f=6000[m0];[m0][sc]sidechaincompress=threshold=0.03:ratio=8:attack=20:release=350[m];[v][m]amix=inputs=2:duration=first:normalize=0,loudnorm=I=-16:TP=-1.5:LRA=9,aresample=44100[a]',
  '-map','0:v','-map','[a]','-t',String(D),'-c:v','libx264','-preset','medium','-crf','27','-pix_fmt','yuv420p','-c:a','aac','-b:a','96k','-movflags','+faststart',path.join(out,`ad-${i+1}.mp4`)],{stdio:['pipe','inherit','inherit']});
 for(let f=0;f<N;f++){const d=await pg.evaluate(t=>{render(t);return document.getElementById('c').toDataURL('image/jpeg',.88)},f/FPS);
  if(!ff.stdin.write(Buffer.from(d.split(',')[1],'base64')))await new Promise(r=>ff.stdin.once('drain',r));}
 ff.stdin.end();await new Promise(r=>ff.on('close',r));await pg.close();console.log('ad',i+1,D+'s',N,'frames');}
await b.close()})();
