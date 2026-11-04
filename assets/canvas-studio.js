/* Canvas template editor + native PNG export (no libraries). */
(function(){
  var T=window.DS_TEMPLATES, cv=document.getElementById('cv'), ctx=cv.getContext('2d');
  var f=function(id){return document.getElementById(id)};
  var img=null, slide=1;
  function rr(x,y,w,h,r){ctx.beginPath();ctx.moveTo(x+r,y);ctx.arcTo(x+w,y,x+w,y+h,r);ctx.arcTo(x+w,y+h,x,y+h,r);ctx.arcTo(x,y+h,x,y,r);ctx.arcTo(x,y,x+w,y,r);ctx.closePath();}
  function wrap(t,x,y,maxW,lh,maxLines){var words=t.split(/\s+/),line='',lines=[];
    words.forEach(function(w){var test=line?line+' '+w:w;if(ctx.measureText(test).width>maxW&&line){lines.push(line);line=w}else line=test});
    if(line)lines.push(line);lines=lines.slice(0,maxLines||9);lines.forEach(function(l,i){ctx.fillText(l,x,y+i*lh)});return y+lines.length*lh;}
  function font(px,w){ctx.font=(w||800)+' '+px+'px system-ui,-apple-system,"Segoe UI",Roboto,Arial,sans-serif'}
  function bg(W,H){var g=ctx.createRadialGradient(W*.8,-H*.1,10,W*.8,-H*.1,Math.max(W,H)*1.1);g.addColorStop(0,'#FFFFFF');g.addColorStop(.55,'#FAF6EC');g.addColorStop(1,'#EBE1CA');ctx.fillStyle=g;ctx.fillRect(0,0,W,H);}
  function visual(x,y,w,h,r,acc){ctx.save();rr(x,y,w,h,r);ctx.clip();
    if(img){var s=Math.max(w/img.width,h/img.height);ctx.drawImage(img,x+(w-img.width*s)/2,y+(h-img.height*s)/2,img.width*s,img.height*s);}
    else{ctx.fillStyle='#E3EFE7';ctx.fillRect(x,y,w,h);var cx=x+w*.55,cy=y+h*.5,R=Math.min(w,h)*.32;
      var g=ctx.createRadialGradient(cx-R*.35,cy-R*.4,R*.05,cx,cy,R);g.addColorStop(0,'#ffffff');g.addColorStop(.5,'#7FB89A');g.addColorStop(1,'#1F6B4A');
      ctx.fillStyle=g;ctx.beginPath();ctx.arc(cx,cy,R,0,7);ctx.fill();ctx.strokeStyle=acc;ctx.lineWidth=Math.max(4,R*.04);ctx.beginPath();ctx.arc(cx,cy,R*1.25,-2.4,.6);ctx.stroke();}
    ctx.restore();}
  function pill(t,x,y,px,acc,dark){font(px,700);var w=ctx.measureText(t).width+px*2,h=px*2.3;ctx.fillStyle=dark?'#E3EFE7':acc;rr(x,y,w,h,h/2);ctx.fill();
    ctx.fillStyle=dark?'#13241B':'#111';ctx.textBaseline='middle';ctx.fillText(t,x+px,y+h/2);ctx.textBaseline='alphabetic';return w;}
  function draw(){
    var t=T[f('tpl').value], W=t.w, H=t.h, s={h:f('head').value.toUpperCase(),sub:f('sub').value,cta:f('cta').value,acc:f('acc').value,brand:f('brand').value};
    cv.width=W;cv.height=H;cv.setAttribute('aria-label',t.name+' preview: '+s.h);
    document.documentElement.style.setProperty('--accent',s.acc);
    bg(W,H);var m=Math.round(Math.min(W,H)*.06), L=t.layout;
    ctx.fillStyle='#13241B';
    if(L==='banner'){visual(W*.52,m,W*.48-m,H-2*m,48,s.acc);font(H*.12);ctx.fillStyle='#13241B';var y=wrap(s.h,m,m+H*.2,W*.45,H*.115,3);
      font(H*.045,400);ctx.fillStyle='#46564C';y=wrap(s.sub,m,y+H*.03,W*.42,H*.06,2);pill(s.cta,m,H-m-H*.1,H*.038,s.acc);}
    else if(L==='quote'){font(W*.3);ctx.fillStyle=s.acc;ctx.fillText('\u201C',m,m+W*.25);font(W*.07);ctx.fillStyle='#13241B';var y2=wrap(s.h,m,H*.38,W-2*m,W*.075,6);
      font(W*.03,500);ctx.fillStyle='#46564C';ctx.fillText('\u2014 '+s.sub,m,y2+W*.04);}
    else if(L==='highlight'){bg(W,H);var R=W*.36;ctx.fillStyle=s.acc;ctx.beginPath();ctx.arc(W/2,H/2,R,0,7);ctx.fill();
      ctx.strokeStyle='#111';ctx.lineWidth=W*.012;ctx.lineCap='round';ctx.lineJoin='round';var k=W*.0045;ctx.save();ctx.translate(W/2-12*k*4/2,H/2-12*k*4/2);ctx.scale(k*4,k*4);
      var p=new Path2D('M12 3l2.7 5.6 6.2.9-4.5 4.3 1 6.2L12 17l-5.5 3 1-6.2L3 9.5l6.2-.9z');ctx.lineWidth=1.8;ctx.stroke(p);ctx.restore();
      font(W*.06);ctx.fillStyle='#13241B';ctx.textAlign='center';ctx.fillText(s.h.split(' ')[0],W/2,H*.9);ctx.textAlign='left';}
    else{var story=L==='story', vh=story?H*.42:(L==='carousel'?H*.38:H*.42);
      if(L==='announce'){ctx.fillStyle=s.acc;rr(m,m,W-2*m,H*.5,56);ctx.fill();font(W*.11);ctx.fillStyle='#111';wrap(s.h,m*2,m*2+W*.1,W-4*m,W*.105,3);}
      else visual(m,story?H*.14:m,W-2*m,vh,56,s.acc);
      var top=L==='announce'?m+H*.5+m*1.4:(story?H*.14:m)+vh+m*1.3;
      if(L!=='announce'){font(story?W*.095:W*.085);ctx.fillStyle='#13241B';top=wrap(s.h,m,top+W*.05,W-2*m,story?W*.09:W*.08,3);}
      font(W*.032,400);ctx.fillStyle='#46564C';top=wrap(s.sub,m,top+W*.03,W-2*m,W*.045,3);
      pill(s.cta,m,H-m-W*.08,W*.03,s.acc);
      if(L==='carousel'){font(W*.03,700);ctx.fillStyle='#46564C';ctx.textAlign='right';ctx.fillText(slide+' / 5  \u2192',W-m,H-m-W*.03);ctx.textAlign='left';}}
    font(Math.min(W,H)*.03,800);ctx.fillStyle='#13241B';if(L!=='highlight'&&L!=='quote'){ctx.textAlign='right';ctx.fillText(s.brand.toUpperCase(),W-m,story?H*.08:(L==='banner'?H-m-H*.04:H-m-W*.025));ctx.textAlign='left';}
    if(L==='quote'){pill(s.brand.toUpperCase(),m,H-m-W*.08,W*.03,s.acc,true);}
    f('size').textContent=W+' \u00D7 '+H+' px';
    var sb=f('slidebox');if(sb)sb.hidden=L!=='carousel';
  }
  function apply(){var t=T[f('tpl').value];['head','sub','cta'].forEach(function(k){if(t[k]!=null&&!f(k)._dirty)f(k).value=t[k]});draw();}
  ['head','sub','cta'].forEach(function(k){f(k).addEventListener('input',function(){f(k)._dirty=true;draw()})});
  ['acc','brand'].forEach(function(k){f(k).addEventListener('input',draw)});
  f('tpl').addEventListener('change',function(){['head','sub','cta'].forEach(function(k){f(k)._dirty=false});apply()});
  f('img').addEventListener('change',function(e){var file=e.target.files[0];if(!file)return;var r=new FileReader();r.onload=function(){var i=new Image();i.onload=function(){img=i;draw()};i.src=r.result};r.readAsDataURL(file)});
  f('clr').addEventListener('click',function(){img=null;f('img').value='';draw()});
  var sl=f('slide');if(sl)sl.addEventListener('input',function(){slide=sl.value;f('slideval').textContent=slide;draw()});
  f('export').addEventListener('click',function(){cv.toBlob(function(b){var a=document.createElement('a');a.href=URL.createObjectURL(b);
    a.download=f('tpl').value+'-'+cv.width+'x'+cv.height+'.png';document.body.appendChild(a);a.click();a.remove();setTimeout(function(){URL.revokeObjectURL(a.href)},2000);dsToast('PNG exported')},'image/png')});
  f('tpl').innerHTML=Object.keys(T).map(function(k){return '<option value="'+k+'">'+T[k].name+' ('+T[k].w+'\u00D7'+T[k].h+')</option>'}).join('');
  apply();
})();
