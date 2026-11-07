/* Shared UI helpers: sparkline KPIs, port schematic, tables, tabs, panels. */
const $=s=>document.querySelector(s);
function spark(v,col){const w=120,h=38,mx=Math.max(...v),mn=Math.min(...v),r=mx-mn||1;
 const p=v.map((y,i)=>[i*w/(v.length-1),h-3-((y-mn)/r)*(h-8)]);
 const d=p.map((a,i)=>(i?'L':'M')+a[0].toFixed(1)+' '+a[1].toFixed(1)).join(' ');
 return `<svg class="sp" viewBox="0 0 ${w} ${h}" aria-hidden="true"><path d="${d}" fill="none" stroke="${col}" stroke-width="1.500"/><circle cx="${p.at(-1)[0]}" cy="${p.at(-1)[1]}" r="2.200" fill="${col}"/></svg>`}
const KP=[
 ['Vessels in port','24','','+3 6 arriving · 4 departing today','up','ship',[10,12,11,14,13,16,15,19,18,22,21,24],'var(--accent)'],
 ['Berth occupancy','82','%','+5% 18 of 22 berths occupied','up','anchor',[60,64,62,68,66,72,70,76,74,80,79,82],'var(--accent)'],
 ['Cargo handled','18,420',' TEU','↑ 12.4% vs. previous 24 hours','up','box',[8,10,9,12,11,14,13,15,14,17,16,18],'var(--accent)'],
 ['Avg. turnaround','16.4',' hrs','↓ 1.8 hrs below 18-hour target','up','timer',[20,19,21,19,18,19,17,18,17,16,17,16],'var(--accent)']];
const kpis=(a=KP)=>`<div class="kpis">${a.map(k=>`<div class="kpi"><span class="l">${k[0]}</span>${ic(k[5])}<div class="v num">${k[1]}<small>${k[2].trim()}</small></div>${spark(k[6],k[7])}<span class="s"><span class="${k[4]}">${k[3].split(' ')[0]}</span> ${k[3].split(' ').slice(1).join(' ')}</span></div>`).join('')}</div>`;

/* port schematic */
function portSvg(opt={}){
 const col={g:'var(--ok)',c:'var(--accent)',a:'var(--warn)'};
 const berths=[['B01',40,'g'],['B02',165,'c'],['B03',290,'g'],['B04',415,'a']];
 const fill=[[1,0,1,0,0,0,1,0,0,0,1,0],[0,1,0,0,1,0,0,1,0,0,0,0],[0,0,0,1,0,0,0,0,1,0,0,0],[0,0,1,0,0,1,0,0,0,1,0,1]];
 let s=`<svg viewBox="0 0 580 ${opt.h||250}" role="img" aria-label="Schematic of berths B01 to B04"><defs><pattern id="gp${opt.id||0}" width="24" height="24" patternUnits="userSpaceOnUse"><path d="M24 0H0V24" fill="none" stroke="var(--line)" stroke-width=".6"/></pattern></defs>
 <rect width="580" height="${opt.h||250}" fill="var(--sea)"/><rect width="580" height="${opt.h||250}" fill="url(#gp${opt.id||0})" opacity=".55"/>
 <rect x="0" y="22" width="580" height="46" fill="var(--quay)"/><text x="290" y="49" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="9" letter-spacing="1.500" fill="var(--mute)">ECT DELTA TERMINAL</text>`;
 berths.forEach((b,i)=>{const x=b[1];
  s+=`<rect x="${x}" y="76" width="82" height="92" fill="var(--quay)" stroke="var(--line2)"/><text x="${x+8}" y="92" font-family="JetBrains Mono,monospace" font-size="9" fill="var(--mute)">${b[0]}</text>`;
  fill[i].forEach((f,k)=>{const cx=x+10+(k%4)*17,cy=102+Math.floor(k/4)*17;const c=f?(b[2]=='a'&&k>8?'var(--warn)':(b[2]=='c'?'var(--accent)':'var(--ok)')):'var(--line2)';
   s+=`<rect x="${cx}" y="${cy}" width="13" height="10" fill="${c}" opacity="${f?1:.55}"/>`});
  const vx=x+98;s+=`<path d="M${vx} 92h16v40l-8 14-8-14z" fill="${col[b[2]]}"/>`;
 });
 s+=`<path d="M0 188 C150 196 330 176 580 150" fill="none" stroke="var(--dim)" stroke-dasharray="5 5" stroke-width="1"/>
 <text x="290" y="${(opt.h||250)-52}" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="8.500" letter-spacing="1.500" fill="var(--dim)">EUROPAHAVEN</text>
 <path d="M12 ${(opt.h||250)-14}h26" stroke="var(--mute)"/><text x="46" y="${(opt.h||250)-11}" font-family="JetBrains Mono,monospace" font-size="8.500" fill="var(--dim)">250 m   |   SCHEMATIC · NOT FOR NAVIGATION</text>
 <text x="548" y="146" font-family="JetBrains Mono,monospace" font-size="9" fill="var(--mute)">N ↑</text></svg>`;
 return s}
const ctl=`<div class="mapctl"><button type="button" aria-label="Zoom in">+</button><button type="button" aria-label="Zoom out">−</button></div>`;
/* data */
const MOVES=[
 ['Al Jmeliyah','IMO 9708833','Arrival','08:55','B05','Hapag-Lloyd','14,000 TEU','Pilot assigned','info','View vessel'],
 ['COSCO Shipping Aries','IMO 9783497','Arrival','09:40','Unassigned','COSCO Shipping','20,119 TEU','Berth pending','warn','Assign berth'],
 ['MSC Isabella','IMO 9839272','Departure','10:30','B01','MSC','23,656 TEU','Ready to depart','ok','View vessel'],
 ['Ever Given','IMO 9811000','Departure','11:15','B04','Evergreen','20,124 TEU','Delayed · 45 min','warn','Review delay'],
 ['ONE Innovation','IMO 9939137','Arrival','11:20','B09','Ocean Network','24,136 TEU','Clearance required','warn','Review documents']];
function moves(rows,opt){
 return `<div class="tw"><table><thead><tr><th>Vessel</th><th>Movement</th><th>ETA / ETD</th><th>Berth</th>${opt.full?'<th>Agent</th><th>Capacity</th><th>Status</th><th>Action</th>':'<th>Status</th>'}</tr></thead><tbody>${rows.map(r=>`<tr><td><div class="vn"><span class="ib">${ic('vessel')}</span><div><b>${r[0]}</b><small>${r[1]}</small></div></div></td><td><span class="mv">${ic(r[2]=='Arrival'?'in':'out')}${r[2]}</span></td><td class="mono num ${r[0]=='Ever Given'?'':''}">${r[0]=='Ever Given'&&opt.full?'<span class="strike">10:30</span> 11:15':r[3]}</td><td class="${r[4]=='Unassigned'?'wn':'mono'}">${r[4]}</td>${opt.full?`<td>${r[5]}</td><td class="num">${r[6]}</td><td><span class="pill ${r[8]}">${r[7]}</span></td><td><a href="vessels.html">${r[9]}</a> ${ic('arr').replace('class="ic"','class="ic" style="display:inline;vertical-align:-3px"')}</td>`:`<td>${r[7]}</td>`}</tr>`).join('')}</tbody></table></div>`}
function movesPanel(id,full){return `<section class="panel"><div class="ph"><div><h2>Arrivals &amp; departures</h2></div>${full?`<div class="actions"><span class="sel">${ic('cal')}Next 24 hours</span><span class="sel" style="gap:8px">${ic('filt')}Filter</span></div>`:`<a class="link" href="vessels.html">Full schedule →</a>`}</div>
 <div class="tabs" role="tablist" id="${id}"><button role="tab" aria-selected="true" data-f="all">All movements (10)</button><button role="tab" aria-selected="false" data-f="Arrival">Arrivals (6)</button><button role="tab" aria-selected="false" data-f="Departure">Departures (4)</button></div>
 <div data-body></div><div class="tfoot"><span data-count></span><span>All times in UTC+2</span></div></section>`}
function bindMoves(id,full){const root=document.getElementById(id).parentElement,body=root.querySelector('[data-body]'),cnt=root.querySelector('[data-count]');
 const draw=f=>{const r=MOVES.filter(m=>f=='all'||m[2]==f);body.innerHTML=moves(r,{full});cnt.textContent=`Showing ${r.length} of ${f=='all'?10:f=='Arrival'?6:4} movements`};
 root.querySelectorAll('[role=tab]').forEach(b=>b.onclick=()=>{root.querySelectorAll('[role=tab]').forEach(x=>x.setAttribute('aria-selected',x==b));draw(b.dataset.f)});draw('all')}

const BL=[['B01','MSC Isabella','Loading · ETD 10:30','ok'],['B02','Maersk Elba','Unloading 68% · ETD 14:00','ok'],['B03','CMA CGM Louvre','Loading · ETD 12:45','ok'],['B04','Ever Given','Departure delayed · +45 min','w']];
/* ---- shared helpers for the four additional screens ---- */
const hd=(t,s,b)=>`<div class="head"><div><h1>${t}</h1><p>${s}</p></div><button class="btn pri" type="button">${b}</button></div>`;
const fl=()=>`<div class="filters"><span class="sel">15 Oct 2026</span><span class="sel">Maasvlakte</span><span class="sel">Shift A · 06:00–14:00</span><span class="updated">Live data · Updated 08:42</span></div>`;
const kp=a=>`<div class="kpis">${a.map(k=>`<div class="kpi"><span class="l">${k[0]}</span>${ic(k[4])}<div class="v num">${k[1]}${k[2]?`<small>${k[2]}</small>`:''}</div><span class="s" style="grid-column:1/-1">${k[3]}</span></div>`).join('')}</div>`;
const ph=(t,s,l)=>`<div class="ph"><div><h2>${t}</h2>${s?`<div class="sub">${s}</div>`:''}</div>${l?`<button class="link" type="button">${l}</button>`:''}</div>`;
const tbl=(h,rows,attrs=[])=>`<div class="tw"><table><thead><tr>${h.map(x=>`<th>${x}</th>`).join('')}</tr></thead><tbody>${rows.map((r,i)=>`<tr ${attrs[i]||''}>${r.map((c,j)=>`<td${j==0?' style="font-weight:500"':''}>${c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
const pl=(t,c)=>`<span class="pill ${c}">${t}</span>`;
const tabs=(id,names,i=0)=>`<div class="tabs" role="tablist" id="${id}">${names.map((n,k)=>`<button role="tab" aria-selected="${k==i}" data-i="${k}">${n}</button>`).join('')}</div>`;
const bindTabs=(id,fn)=>{const r=document.getElementById(id);r.querySelectorAll('[role=tab]').forEach(b=>b.onclick=()=>{r.querySelectorAll('[role=tab]').forEach(x=>x.setAttribute('aria-selected',x==b));fn(+b.dataset.i)})};
const pager=n=>`<span class="pg">‹ <b>1</b> 2 3 … ›</span>`;
const src=`<div class="foot"><span>Sources: AIS · Terminal operating system · Port authority · IoT gateway</span><span>NLRTM / SHIFT A / UTC+2</span></div>`;
const dl=rows=>`<dl>${rows.map(r=>`<dt>${r[0]}</dt><dd>${r[1]}</dd>`).join('')}</dl>`;
