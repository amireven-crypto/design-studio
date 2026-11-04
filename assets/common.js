/* Shared: sidebar rail, toast, copy helper */
(function(){
  try{if(localStorage.dsAccentDark)document.documentElement.style.setProperty('--accent',localStorage.dsAccentDark)}catch(e){}
  var root=document.documentElement.dataset.root||'./';
  var items=[['home','','Hub'],['globe','websites/','Websites'],['rocket','landing/','Landing pages'],['megaphone','ads/','Ads'],
    ['share','social/','Social posts'],['mail','email/','Email'],['blocks','components/','Components'],['star','icons/','Icons'],['palette','brand-kit/','Brand kit']];
  var cur=document.documentElement.dataset.page||'';
  var nav=document.getElementById('rail');
  if(nav){nav.innerHTML=items.map(function(i){return '<a href="'+root+i[1]+'" title="'+i[2]+'"'+(cur===i[1]?' aria-current="page"':'')+'>'+dsIcon(i[0],i[2])+'</a>'}).join('')+'<span class="sp"></span>';}
  var t=document.createElement('div');t.className='toast';t.setAttribute('role','status');document.body.appendChild(t);
  window.dsToast=function(m){t.textContent=m;t.classList.add('on');clearTimeout(t._h);t._h=setTimeout(function(){t.classList.remove('on')},1600)};
  window.dsCopy=function(txt,msg){
    function ok(){dsToast(msg||'Copied!')}
    if(navigator.clipboard&&window.isSecureContext){navigator.clipboard.writeText(txt).then(ok,fb)}else fb();
    function fb(){var a=document.createElement('textarea');a.value=txt;a.setAttribute('aria-hidden','true');a.style.position='fixed';a.style.opacity=0;document.body.appendChild(a);a.select();try{document.execCommand('copy')}catch(e){}a.remove();ok()}
  };
  document.querySelectorAll('[role=tablist]').forEach(function(tl){
    tl.addEventListener('click',function(e){var b=e.target.closest('button');if(!b)return;
      tl.querySelectorAll('button').forEach(function(x){x.setAttribute('aria-selected',x===b)});});
  });
})();
