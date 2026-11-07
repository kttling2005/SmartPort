/* Shared dashboard layout: sidebar, top bar and page frame.
   Every dashboard page calls SP.mount('<key>') after defining V.<key> (and optionally BIND.<key>). */
const NAV=[['overview','Overview','overview'],['operations','Port operation center','ops'],['vessels','Vessels & berths','vessel'],['cargo','Cargo & containers','cargo'],['yard','Yard & smart gate','yard'],['services','Services & billing','bill'],['equipment','Equipment & fleet','tool'],['gis','GIS & analytics','map']];
const V={},BIND={};
const SP={
  shell(){return `
  <aside class="rail">
    <a class="brand" href="overview.html" style="text-decoration:none"><svg class="ic" viewBox="0 0 24 24"><circle cx="12" cy="5" r="2.2"/><path d="M12 7.5V21M7 11h10M4 15c0 3.5 3.5 6 8 6s8-2.5 8-6"/></svg>SmartPort</a>
    <div class="ws"><b>Port of Rotterdam</b><span>NLRTM / MAASVLAKTE</span></div>
    <div class="navlabel">Workspace</div>
    <nav class="nav" id="nav" aria-label="Workspace">${NAV.map(n=>`<a href="${n[0]}.html" data-r="${n[0]}">${ic(n[2])}${n[1]}</a>`).join('')}</nav>
    <div class="navlabel">Administration</div>
    <nav class="nav admin" aria-label="Administration"><a href="admin.html">Users &amp; access</a><a href="admin.html">Audit log</a><a href="admin.html">Settings</a></nav>
    <div class="spacer"></div>
    <div class="sys"><i></i>All systems operational<small>AIS SYNC 08:42:06 UTC+2</small></div>
    <div class="me"><div class="av">EV</div><div><b>Emma van Dijk</b><span>Operations manager</span></div><a href="login.html" style="margin-left:auto;font-size:11px">Sign out</a></div>
  </aside>
  <div class="main">
    <div class="top">
      <div class="crumb"><span>Workspace</span><span>/</span><b id="crumb"></b></div>
      <label class="search"><svg class="ic" viewBox="0 0 24 24"><circle cx="11" cy="11" r="6.5"/><path d="m20 20-4-4"/></svg><input id="q" placeholder="Search vessels, cargo, assets..." aria-label="Search"><kbd>⌘ K</kbd></label>
      <span class="clock">08:42 UTC+2</span>
      <button class="alerts" type="button">Alerts (3) <i></i></button>
      <button class="theme" id="theme" type="button" aria-label="Toggle theme"></button>
    </div>
    <div class="page" id="view"></div>
  </div>`},
  pending(title){return `<div class="head"><div><h1>${title}</h1></div></div><div class="pend"><div><h2>Screen not built yet</h2><p>This screen exists in the Figma file but has not been implemented in this app.</p></div></div>`},
  mount(key,title){
    const app=$('#app');app.className='shell';app.innerHTML=SP.shell();
    const nav=NAV.find(n=>n[0]==key);
    const name=title||(nav?nav[1]:'Administration');
    $('#crumb').textContent=name;document.title=name+' · SmartPort';
    document.querySelectorAll('#nav a').forEach(a=>{if(a.dataset.r==key)a.setAttribute('aria-current','page')});
    $('#view').innerHTML=V[key]();
    const tb=$('#theme');
    const label=()=>tb.textContent=document.documentElement.dataset.theme=='dark'?'Light':'Dark';label();
    tb.onclick=()=>{const t=document.documentElement.dataset.theme=='dark'?'light':'dark';document.documentElement.dataset.theme=t;try{localStorage.setItem('sp-theme',t)}catch(e){}label()};
    if(BIND[key])BIND[key]();
  }
};
