/* Render the 10 FreshDrop TV spots: node tools/render-spots.js http://127.0.0.1:8777/ <audioDir> [chrome]
   Frames from tools/spot/spot.html (deterministic render(t)), 24 fps, + voiceover + soft beat -> ads/freshdrop/video/ad-N.mp4 */
const p=require('puppeteer-core'),{spawn,execFileSync}=require('child_process'),path=require('path'),fs=require('fs');
const BASE=process.argv[2],AUD=process.argv[3],CH=process.argv[4]||'/usr/bin/google-chrome',FPS=24,only=process.env.ONLY;
const out=path.join(__dirname,'..','ads','freshdrop','video');fs.mkdirSync(out,{recursive:true});
(async()=>{const b=await p.launch({executablePath:CH,args:['--no-sandbox']});
for(let i=0;i<10;i++){if(only&&!only.split(',').includes(String(i+1)))continue;
 const mp3=path.join(AUD,`ad-${i+1}.mp3`),ad=+execFileSync('ffprobe',['-v','error','-show_entries','format=duration','-of','csv=p=0',mp3]).toString();
 const D=Math.round((ad+1.6)*10)/10,N=Math.round(D*FPS);
 const pg=await b.newPage();await pg.setViewport({width:1080,height:1080});await pg.goto(`${BASE}tools/spot/spot.html?i=${i}&d=${D}`,{waitUntil:'networkidle0'});await pg.waitForFunction('window.READY');
 const ff=spawn('ffmpeg',['-y','-loglevel','error','-f','image2pipe','-framerate',String(FPS),'-i','-','-i',mp3,
  '-f','lavfi','-t',String(D),'-i',"aevalsrc='0.22*sin(2*PI*55*t)*exp(-14*mod(t,0.5))+0.05*sin(2*PI*880*t)*exp(-40*mod(t+0.25,0.5))':s=44100",
  '-filter_complex','[1:a]adelay=500|500,volume=1.6[v];[2:a]volume=0.5[m];[v][m]amix=inputs=2:duration=longest:normalize=0[a]',
  '-map','0:v','-map','[a]','-t',String(D),'-c:v','libx264','-preset','medium','-crf','27','-pix_fmt','yuv420p','-c:a','aac','-b:a','96k','-movflags','+faststart',path.join(out,`ad-${i+1}.mp4`)],{stdio:['pipe','inherit','inherit']});
 for(let f=0;f<N;f++){const d=await pg.evaluate(t=>{render(t);return document.getElementById('c').toDataURL('image/jpeg',.88)},f/FPS);
  if(!ff.stdin.write(Buffer.from(d.split(',')[1],'base64')))await new Promise(r=>ff.stdin.once('drain',r));}
 ff.stdin.end();await new Promise(r=>ff.on('close',r));await pg.close();console.log('ad',i+1,D+'s',N,'frames');}
await b.close()})();
