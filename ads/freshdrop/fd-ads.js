/* FreshDrop example ads - 10 original 1080x1080 layouts, each inspired by a general design trend. */
(function(){
var PRODUCTS=[["trunk-organizer","Trunk Organizer",28.99],["dog-car-seat-cover","Dog Car Seat Cover",28.99],["magnetic-phone-mount","Magnetic Phone Mount",18.99],
["umbrella-windshield-sunshade","Umbrella Sunshade",28.99],["backseat-organizer-tray","Back Seat Organizer",38.99],["bundle-detailing-starter","Detailing Starter Kit",38.99],
["bamboo-cutting-board","Bamboo Cutting Board",16.99],["aluminium-laptop-stand","Aluminium Laptop Stand",28.99],["bundle-on-the-road-with-dog","On the Road with Your Dog",36.99],["adjustable-wrench","Adjustable Wrench",11.99]];
var ADS=[
 {site:"Dribbble",style:"polished shot",head:"Your trunk called. It wants order.",sub:"Foldable organizer \u2014 fits every car.",acc:"#FF5A1F"},
 {site:"Behance",style:"editorial case-study",head:"Fur? Mud? No problem.",sub:"Case 02 \u2014 waterproof, scratch-proof, washable.",acc:"#FF2E63"},
 {site:"Mobbin",style:"app-screen",head:"Snap. Hold. Drive.",sub:"One-hand magnetic mount.",acc:"#00D26A"},
 {site:"Figma Community",style:"UI-kit",head:"Beat the heat",sub:"Opens like an umbrella in 3 seconds.",acc:"#FFB800"},
 {site:"Awwwards",style:"bold experimental type",head:"Chaos ends here",sub:"Tray, pockets, tablet slot.",acc:"#C6FF00"},
 {site:"Land-book",style:"clean landing hero",head:"Showroom shine at home",sub:"Everything you need for a full detail.",acc:"#2F6BFF"},
 {site:"Godly",style:"dark motion-feel",head:"Cut. Cook. Repeat.",sub:"Solid bamboo, gentle on knives.",acc:"#B44DFF"},
 {site:"Lapa Ninja",style:"minimal SaaS",head:"Neck pain? Raise it.",sub:"Better posture in one step.",acc:"#0066FF"},
 {site:"Coolors",style:"palette-driven",head:"Road-trip ready",sub:"The full dog travel bundle.",acc:"#FF3D7F"},
 {site:"Google Fonts",style:"typography-led",head:"Fix it.",sub:"Adjustable wrench, chrome vanadium.",acc:"#FF4500"}];
var C={P:"#7C4DFF",K:"#FF4D8D",C:"#0FB5C9",BG:"#0E0E22",W:"#FFFFFF",M:"#C9C9E0"};
var imgs={}, sel=0, cvs=[];
ADS.forEach(function(a,i){a.prod=i;a.price=PRODUCTS[i][2]});
function F(px,w,fam){return (w||600)+" "+px+"px "+(fam==="sys"?'system-ui,"Segoe UI",Roboto,Arial,sans-serif':'Fredoka,system-ui,sans-serif')}
function rr(x,y,w,h,r){x.beginPath();x.roundRect?x.roundRect(arguments[1],arguments[2],arguments[3],arguments[4],arguments[5]):0}
function R(c,x,y,w,h,r){c.beginPath();c.moveTo(x+r,y);c.arcTo(x+w,y,x+w,y+h,r);c.arcTo(x+w,y+h,x,y+h,r);c.arcTo(x,y+h,x,y,r);c.arcTo(x,y,x+w,y,r);c.closePath()}
function wrap(c,t,x,y,mw,lh,max){var w=t.split(/\s+/),l="",n=0;for(var i=0;i<w.length;i++){var s=l?l+" "+w[i]:w[i];if(c.measureText(s).width>mw&&l){c.fillText(l,x,y+n*lh);n++;l=w[i];if(n>=max)return y+n*lh}else l=s}c.fillText(l,x,y+n*lh);return y+(n+1)*lh}
function photo(c,a,x,y,w,h,r,bgc){c.save();R(c,x,y,w,h,r);c.fillStyle=bgc||"#fff";c.fill();c.clip();var im=a.img||imgs[PRODUCTS[a.prod][0]];
  if(im&&im.width){var s=Math.min(w/im.width,h/im.height)*.9;c.drawImage(im,x+(w-im.width*s)/2,y+(h-im.height*s)/2,im.width*s,im.height*s)}c.restore()}
function pill(c,t,x,y,px,bg,fg){c.font=F(px,600);var w=c.measureText(t).width+px*1.8,h=px*2.2;c.fillStyle=bg;R(c,x,y,w,h,h/2);c.fill();c.fillStyle=fg;c.textBaseline="middle";c.fillText(t,x+px*.9,y+h/2+1);c.textBaseline="alphabetic";return w}
function eur(p){return "\u20AC"+Number(p).toFixed(2)}
function logo(c,x,y,px,col){c.font=F(px,700);c.fillStyle=col||C.W;c.fillText("FreshDrop",x,y)}
function glow(c,x,y,r,col){var g=c.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,col);g.addColorStop(1,"rgba(14,14,34,0)");c.fillStyle=g;c.fillRect(0,0,1080,1080)}
var D=[
function(c,a){c.fillStyle=C.BG;c.fillRect(0,0,1080,1080);glow(c,800,200,700,a.acc+"88");glow(c,150,1000,600,"#FFD60066");
  c.save();c.shadowColor="rgba(0,0,0,.5)";c.shadowBlur=80;c.shadowOffsetY=40;photo(c,a,190,150,700,560,72);c.restore();
  c.textAlign="center";c.font=F(86,700);c.fillStyle=C.W;wrap(c,a.head,540,830,900,90,2);c.font=F(36,500,"sys");c.fillStyle=C.M;c.fillText(a.sub,540,1000);c.textAlign="left";},
function(c,a){c.fillStyle="#F4F2FA";c.fillRect(0,0,1080,1080);photo(c,a,540,0,540,1080,0,"#fff");c.fillStyle=C.BG;c.font=F(26,700,"sys");c.fillText("CASE STUDY \u2014 FRESHDROP",60,90);
  c.fillStyle=a.acc;c.fillRect(60,120,120,8);c.fillStyle=C.BG;c.font=F(96,700);var y=wrap(c,a.head,60,320,440,100,4);c.font=F(30,400,"sys");c.fillStyle="#4a4a66";wrap(c,a.sub,60,y+40,430,42,3);
  c.font=F(64,700);c.fillStyle=a.acc;c.fillText(eur(a.price),60,980);},
function(c,a){c.fillStyle=C.BG;c.fillRect(0,0,1080,1080);glow(c,540,540,600,a.acc+"55");c.fillStyle="#1b1b3a";R(c,300,60,480,960,70);c.fill();c.strokeStyle="#3a3a66";c.lineWidth=6;c.stroke();
  c.fillStyle="#0a0a1a";R(c,470,90,140,30,15);c.fill();photo(c,a,330,160,420,420,40);c.font=F(44,700);c.fillStyle=C.W;wrap(c,a.head,340,650,400,50,2);
  c.font=F(26,400,"sys");c.fillStyle=C.M;c.fillText(a.sub,340,770);c.font=F(48,700);c.fillStyle=C.W;c.fillText(eur(a.price),340,850);pill(c,"Shop now \u2192",340,900,30,a.acc,lum(a.acc)>.55?"#111":"#fff");
  pill(c,"\u2713 Free returns 14 days",40,140,24,C.C,"#06212a");pill(c,"\u2605 4.8 rating",820,820,24,C.K,"#fff");},
function(c,a){c.fillStyle="#16162e";c.fillRect(0,0,1080,1080);c.strokeStyle="#2a2a50";c.lineWidth=2;for(var i=0;i<1080;i+=60){c.beginPath();c.moveTo(i,0);c.lineTo(i,1080);c.moveTo(0,i);c.lineTo(1080,i);c.stroke()}
  [[60,60,580,580],[660,60,360,280],[660,360,360,280],[60,660,960,360]].forEach(function(b,i){c.fillStyle=i===1?a.acc:i===2?C.K:"#232347";R(c,b[0],b[1],b[2],b[3],36);c.fill()});
  photo(c,a,90,90,520,520,28);c.font=F(30,600);c.fillStyle="#fff";c.fillText("PRICE",700,120);c.font=F(84,700);c.fillText(eur(a.price),700,240);c.font=F(30,600);c.fillText("COMPONENT",700,420);c.font=F(60,700);c.fillText("Ships fast",700,520);
  c.font=F(84,700);c.fillStyle=C.W;c.fillText(a.head,100,800);c.font=F(32,400,"sys");c.fillStyle=C.M;c.fillText(a.sub,100,870);pill(c,"Shop now \u2192",100,920,28,a.acc,lum(a.acc)>.55?"#111":"#fff");},
function(c,a){c.fillStyle=C.BG;c.fillRect(0,0,1080,1080);photo(c,a,560,460,460,560,230,"#fff");c.save();c.font=F(250,700);c.fillStyle=a.acc;var w=a.head.toUpperCase().split(" ");
  w.forEach(function(t,i){c.fillStyle=i%2?"#FFFFFF":a.acc;c.fillText(t,-10+(i%2)*120,240+i*220)});c.restore();c.font=F(34,500,"sys");c.fillStyle=C.W;c.fillText(a.sub,50,1010);c.font=F(56,700);c.fillStyle=a.acc;c.fillText(eur(a.price),50,940);},
function(c,a){c.fillStyle="#FFFFFF";c.fillRect(0,0,1080,1080);logo(c,60,100,40,C.BG);c.font=F(26,500,"sys");c.fillStyle="#555";c.fillText("Shop    Bundles    About",640,96);
  c.textAlign="center";c.font=F(92,700);c.fillStyle=C.BG;c.fillText(a.head,540,280);c.font=F(34,400,"sys");c.fillStyle="#555";c.fillText(a.sub,540,345);c.textAlign="left";
  pill(c,"Shop now \u2014 "+eur(a.price)+" \u2192",300,390,30,a.acc,"#fff");photo(c,a,140,520,800,500,48,"#F1EEFF");},
function(c,a){c.fillStyle="#07070f";c.fillRect(0,0,1080,1080);for(var i=0;i<6;i++){c.strokeStyle=[a.acc,C.K,C.C][i%3]+"55";c.lineWidth=3;c.beginPath();c.ellipse(540,520,200+i*70,120+i*40,-.4,0,7);c.stroke()}
  glow(c,540,520,420,a.acc+"77");photo(c,a,340,320,400,400,200,"#f5f5ff");c.font=F(110,700);c.fillStyle=C.W;c.textAlign="center";c.fillText(a.head,540,900);c.font=F(30,400,"sys");c.fillStyle=C.M;c.fillText(a.sub+"  \u00B7  "+eur(a.price),540,970);c.textAlign="left";},
function(c,a){c.fillStyle="#FBFBFE";c.fillRect(0,0,1080,1080);pill(c,"New",80,90,24,"#EEE8FF",a.acc);c.font=F(80,700);c.fillStyle=C.BG;wrap(c,a.head,80,260,560,86,2);c.font=F(32,400,"sys");c.fillStyle="#666";c.fillText(a.sub,80,450);
  pill(c,"Shop now \u2014 "+eur(a.price)+" \u2192",80,500,28,a.acc,"#fff");c.fillStyle="#fff";c.shadowColor="rgba(20,20,60,.12)";c.shadowBlur=60;R(c,80,640,920,360,36);c.fill();c.shadowBlur=0;photo(c,a,110,670,300,300,24,"#F4F2FA");
  [["Posture","+ 30%"],["Weight","1.1 kg"],["Setup","0 tools"]].forEach(function(s,i){c.font=F(24,500,"sys");c.fillStyle="#888";c.fillText(s[0],460+i*180,760);c.font=F(48,700);c.fillStyle=i==0?a.acc:C.BG;c.fillText(s[1],460+i*180,830)});},
function(c,a){var pal=[a.acc,"#FFD600","#00C2FF","#111111","#FFFFFF"];pal.forEach(function(p,i){c.fillStyle=p;c.fillRect(i*216,0,216,1080)});photo(c,a,140,180,800,520,48,"#fff");
  pal.forEach(function(p,i){c.font=F(22,600,"sys");c.fillStyle=i===4?C.BG:"#fff";c.fillText(p.toUpperCase(),i*216+30,1040)});
  c.fillStyle=C.BG;R(c,140,740,800,220,40);c.fill();c.font=F(70,700);c.fillStyle="#fff";c.fillText(a.head,190,830);c.font=F(30,400,"sys");c.fillStyle=C.M;c.fillText(a.sub+"  \u00B7  "+eur(a.price),190,900);pill(c,"Shop now \u2192",700,780,26,a.acc,"#fff");},
function(c,a){c.fillStyle="#F4F2FA";c.fillRect(0,0,1080,1080);c.font=F(500,700);c.fillStyle=a.acc;c.fillText("Aa",40,470);c.font=F(26,600,"sys");c.fillStyle=C.BG;c.fillText("FREDOKA \u2014 BOLD 700",60,560);
  c.fillRect(60,580,960,3);c.font=F(180,700);c.fillStyle=C.BG;c.fillText(a.head,60,780);c.font=F(36,500);c.fillStyle="#444";c.fillText(a.sub,60,850);c.font=F(72,700);c.fillStyle=C.K;c.fillText(eur(a.price),60,980);photo(c,a,700,640,320,320,160,"#fff");}
];
function ctaBadge(c,a,i){var pos=[[720,60],[300,930],[0,0],[0,0],[700,60],[0,0],[420,40],[0,0],[0,0],[400,925]][i];if(!pos[0]&&!pos[1])return;
  c.save();c.shadowColor="rgba(0,0,0,.35)";c.shadowBlur=24;pill(c,"Shop now \u2192",pos[0],pos[1],30,a.acc,lum(a.acc)>.55?"#111":"#fff");c.restore()}
function lum(h){var n=parseInt(h.slice(1),16);return (.299*(n>>16)+.587*(n>>8&255)+.114*(n&255))/255}
function draw(i){var c=cvs[i].getContext("2d"),a=ADS[i];c.clearRect(0,0,1080,1080);D[i](c,a);if(i!==0&&i!==5)logo(c,i===1||i===7||i===9?820:60,i===1||i===7||i===9?100:1040,34,i===1||i===7||i===9?C.BG:C.W);if(i===0)logo(c,60,90,34);
  if(!a.noCta)ctaBadge(c,a,i);c.font=F(20,500,"sys");c.fillStyle="rgba(128,128,150,.9)";c.textAlign="right";c.fillText("amireven-crypto.github.io/freshdrop",1050,1066);c.textAlign="left";
  cvs[i].setAttribute("aria-label","Ad "+(i+1)+": "+a.head+", "+PRODUCTS[a.prod][1]+" "+eur(a.price))}
var g=document.getElementById("gallery");
g.innerHTML=ADS.map(function(a,i){return '<figure class="card ad"><canvas width="1080" height="1080" role="img"></canvas><figcaption><span class="badge">Inspired by '+a.site+' style</span> <span class="meta">'+a.style+'</span><br><button class="btn ghost ed" data-i="'+i+'">Edit</button> <button class="btn primary ex" data-i="'+i+'">Export PNG</button></figcaption></figure>'}).join("");
cvs=[].slice.call(g.querySelectorAll("canvas"));
var f=function(id){return document.getElementById(id)};
f("prod").innerHTML=PRODUCTS.map(function(p,i){return '<option value="'+i+'">'+p[1]+'</option>'}).join("");
function load(i){sel=i;var a=ADS[i];f("which").textContent="Editing ad "+(i+1)+" \u2014 Inspired by "+a.site+" style";f("head").value=a.head;f("sub").value=a.sub;f("price").value=a.price;f("prod").value=a.prod;f("acc").value=a.acc;}
function upd(){var a=ADS[sel];a.head=f("head").value;a.sub=f("sub").value;a.price=parseFloat(f("price").value)||0;a.acc=f("acc").value;var np=+f("prod").value;if(np!==a.prod){a.prod=np;a.img=null}draw(sel)}
["head","sub","price","acc","prod"].forEach(function(k){f(k).addEventListener("input",upd)});
f("img").addEventListener("change",function(e){var file=e.target.files[0];if(!file)return;var r=new FileReader();r.onload=function(){var im=new Image();im.onload=function(){ADS[sel].img=im;draw(sel)};im.src=r.result};r.readAsDataURL(file)});
function exp(i){cvs[i].toBlob(function(b){var l=document.createElement("a");l.href=URL.createObjectURL(b);l.download="freshdrop-ad-"+(i+1)+"-"+ADS[i].site.toLowerCase().replace(/\W+/g,"-")+"-1080x1080.png";document.body.appendChild(l);l.click();l.remove();dsToast("PNG exported")},"image/png")}
f("export").addEventListener("click",function(){exp(sel)});
g.addEventListener("click",function(e){var b=e.target.closest("button");if(!b)return;var i=+b.dataset.i;if(b.classList.contains("ed")){load(i);f("panel").scrollIntoView({behavior:"smooth"});f("head").focus()}else exp(i)});
var ps=PRODUCTS.map(function(p){return new Promise(function(res){var im=new Image();im.onload=function(){imgs[p[0]]=im;res()};im.onerror=res;im.src="img/"+p[0]+".webp"})});
var fp=document.fonts?Promise.all([document.fonts.load('700 40px Fredoka'),document.fonts.load('500 40px Fredoka')]).catch(function(){}):Promise.resolve();
Promise.all(ps.concat([fp])).then(function(){cvs.forEach(function(_,i){draw(i)});load(0)});
})();
