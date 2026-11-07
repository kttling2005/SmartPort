const TL=[
 ['B1','Quay 1 · 400 m',[['MAERSK ELBA','ETD 19:00',2,19,'ber','maersk'],['ONE HARMONY','ETA 00:00',24,40,'sch','harmony']]],
 ['B2','Quay 1 · 380 m',[['EVER GLORY','ETD 14:00',0,14,'ber'],['CMA CGM TITAN','ETA 18:00',18,34,'sch']]],
 ['B3','Quay 2 · 400 m',[['MSC AURORA','ETD 22:00',6,22,'ber','aurora'],['HAPAG BONN','ETA 03:00',27,43,'sch']]],
 ['B4','Quay 2 · 400 m',[['COSCO PACIFIC','ETA +2 h',10,28,'del','cosco'],['ZIM ROTTERDAM','Conflict',25,42,'con','zim']]],
 ['B5','Quay 3 · 350 m',[['OOCL ATLAS','ETD 10:00',0,10,'dep'],['STS-04 maintenance','Blocked',12,32,'mnt']]],
 ['B6','Quay 3 · 350 m',[['NYK VESTA','ETA 06:00',30,46,'sch']]]];
const VD={
 zim:{n:'ZIM ROTTERDAM · B4',i:'IMO 9812377 · Container ship · 11,400 TEU',t:'Conflict',p:'bad',a:'16 h 18 m',b:'B4 · Quay 2 (400 m)',d:'366 m / 13.8 m',c:'COSCO PACIFIC · until 04:00',g:'ZIM Agencies NL',s:'Move to B6 from 16 Oct 01:00 to clear the 3 h overlap. Saves about 2.4 h of vessel waiting time.',sc:'91%',act:'Reassign to B6'},
 cosco:{n:'COSCO PACIFIC · B4',i:'IMO 9795101 · Container ship · 14,200 TEU',t:'Delayed +2 h',p:'warn',a:'2 h 05 m',b:'B4 · Quay 2 (400 m)',d:'368 m / 14.2 m',c:'ZIM ROTTERDAM · from 01:00',g:'Cosco Shipping NL',s:'Hold the ETA at 10:00 and release pilot slot P-2 to the ZIM Rotterdam call. Avoids 3 h of overlap.',sc:'84%',act:'Hold berth'},
 aurora:{n:'MSC AURORA · B3',i:'IMO 9839430 · Container ship · 16,800 TEU',t:'Berthed',p:'info',a:'Berthed',b:'B3 · Quay 2 (400 m)',d:'399 m / 14.0 m',c:'None',g:'Maersk Agency NL',s:'No action needed. Departure at 22:00 is clear of tide and pilot constraints.',sc:'97%',act:'View vessel'},
 harmony:{n:'ONE HARMONY · B1',i:'IMO 9802664 · Container ship · 14,000 TEU',t:'Scheduled',p:'mute',a:'13 h 18 m',b:'B1 · Quay 1 (400 m)',d:'364 m / 13.0 m',c:'None',g:'ONE Netherlands',s:'Keep the planned window. B1 is free from 19:00 after Maersk Elba departs.',sc:'95%',act:'Confirm window'},
 maersk:{n:'MAERSK ELBA · B1',i:'IMO 9456978 · Container ship · 15,500 TEU',t:'Unloading 68%',p:'info',a:'Berthed',b:'B1 · Quay 1 (400 m)',d:'366 m / 13.5 m',c:'None',g:'Maersk Agency NL',s:'Unloading is on plan. Departure at 19:00 leaves a 5 h gap before ONE Harmony.',sc:'96%',act:'View vessel'}};
function panelHtml(k){const d=VD[k];return `<div class="ph"><div><h2>${d.n}</h2><div class="sub">${d.i}</div></div><a class="link" href="vessels.html">Details →</a></div><div class="pb dtl">
 <div style="display:flex;justify-content:space-between;align-items:flex-end"><div><span style="color:var(--mute)">Arrives in</span><div class="big num">${d.a}</div></div><span class="pill ${d.p}">${d.t}</span></div>
 <div style="color:var(--mute);font-size:11px;display:flex;justify-content:space-between"><span>Planned berth window</span><span class="num">17 h</span></div><div class="pbar"></div>
 <div class="mono" style="font-size:10px;color:var(--dim);display:flex;justify-content:space-between"><span>16 Oct 01:00</span><span class="wn">${k=='zim'?'3 h overlap':''}</span><span>16 Oct 18:00</span></div>
 <dl><dt>Planned berth</dt><dd>${d.b}</dd><dt>Length / draft</dt><dd class="num">${d.d}</dd><dt>Conflicts with</dt><dd>${d.c}</dd><dt>Agent</dt><dd>${d.g}</dd></dl>
 <div class="sug"><b>Scheduling suggestion · Confidence ${d.sc}</b>${d.s}</div>
 <div class="stack"><button class="btn pri" type="button">${d.act}</button><button class="btn" type="button">Notify agent</button></div></div>`}
const CALLS=[['MSC AURORA','IMO 9839430','B3','15 Oct 06:00','15 Oct 22:00','Berthed','info','Maersk Agency NL','aurora'],['COSCO PACIFIC','IMO 9795101','B4','15 Oct 10:00','16 Oct 04:00','Delayed +2 h','warn','Cosco Shipping NL','cosco'],['ONE HARMONY','IMO 9802664','B1','16 Oct 00:00','16 Oct 16:00','Scheduled','mute','ONE Netherlands','harmony'],['ZIM ROTTERDAM','IMO 9812377','B4','16 Oct 01:00','16 Oct 18:00','Conflict','bad','ZIM Agencies NL','zim']];
V.vessels=()=>{const ticks=[[6,'06:00'],[12,'12:00'],[18,'18:00'],[30,'06:00'],[36,'12:00'],[42,'18:00']];
 return `<div class="head"><div><h1>Vessel management &amp; berth scheduling</h1><p>Plan vessel calls, allocate berths and resolve schedule conflicts across all terminals in real time.</p></div><a class="btn pri" href="vessels.html">+ Schedule vessel call</a></div>
<div class="filters"><span class="sel">15 Oct 2026</span><span class="sel">All terminals</span><span class="sel">All vessel types</span><span class="updated">Live data · Updated 08:42</span></div>
${kpis([['Vessels at berth','7 / 10','','+1 6 arriving · 4 departing today','up','ship',[4,5,5,6,6,7,6,7,7,7,7,7],'var(--accent)'],['Berth utilization','78','%','+4.2% vs 7-day average','up','anchor',[60,66,64,70,68,74,72,75,76,78,77,78],'var(--accent)'],['Avg. waiting time','2.4',' h','−0.6 h vs 7-day average','up','timer',[4,3.8,3.9,3.4,3.2,3.1,2.9,3,2.7,2.6,2.5,2.4],'var(--accent)'],['Schedule conflicts','2','','1 high Resolve before 12:00','bd','warn',[1,1,2,1,2,2,2,3,2,2,2,2],'var(--bad)']])}
<div class="row2" style="grid-template-columns:minmax(0,1fr) 320px"><section class="panel"><div class="ph"><div><h2>Berth schedule · 48-hour window</h2><div class="sub">Quays B1–B6 · Planned vs. actual berth windows · Refreshes every 60 seconds</div></div><a class="link" href="vessels.html">Quay map →</a></div>
 <div class="tabs" role="tablist"><button role="tab" aria-selected="true">Berth timeline</button><button role="tab" aria-selected="false">Quay map</button><button role="tab" aria-selected="false">Vessel queue (4)</button><button role="tab" aria-selected="false">Tide &amp; pilotage</button></div>
 <div class="tl"><div class="tlin"><div class="tlh"><div>BERTH</div><div class="ax"><span class="d" style="left:4px">15 Oct</span>${ticks.map(t=>`<span style="left:${t[0]/48*100}%">${t[1]}</span>`).join('')}<span class="d" style="left:50.5%">16 Oct</span></div></div>
 ${TL.map(r=>`<div class="tlr"><div class="t">${r[0]}<small>${r[1]}</small></div><div class="lane">${r[2].map(b=>`<button type="button" class="blk st-${b[4]}${b[5]=='zim'?' on':''}" ${b[5]?`data-k="${b[5]}"`:''} style="left:${b[2]/48*100}%;width:${(b[3]-b[2])/48*100}%"><span>${b[0]}</span><small>${b[1]}</small></button>`).join('')}</div></div>`).join('')}
 <div style="position:absolute;left:96px;right:0;top:30px;bottom:0;pointer-events:none"><div class="nowl" style="left:${8.7/48*100}%"></div></div></div></div>
 <div class="sw"><span><i style="border-color:var(--accent)"></i>Berthed</span><span><i style="border-color:var(--line2)"></i>Scheduled</span><span><i style="border-color:var(--warn)"></i>Delayed</span><span><i style="border-color:var(--line2);border-style:dashed"></i>Maintenance</span><span><i style="border-color:var(--bad)"></i>Conflict</span><span><i style="border-color:var(--ok)"></i>Departing</span><span class="r">Now 08:42 UTC+2 · Snap interval 15 min</span></div></section>
 <section class="panel" id="vd">${panelHtml('zim')}</section></div>
<div class="row2" style="grid-template-columns:minmax(0,1fr) 400px"><section class="panel"><div class="ph"><div><h2>Vessel calls · next 24 hours</h2><div class="sub">Arrivals, departures and berth allocation · Sorted by ETA</div></div><a class="link" href="vessels.html">Export plan →</a></div><div style="height:12px"></div>
 <div class="tw"><table><thead><tr><th>Vessel / IMO</th><th>Berth</th><th>ETA</th><th>ETD</th><th>Status</th><th>Agent</th></tr></thead><tbody>${CALLS.map(c=>`<tr data-v="${c[8]}" class="${c[8]=='zim'?'rsel':''}"><td><b style="font-weight:500">${c[0]}</b><br><small class="mono" style="color:var(--dim);font-size:10px">${c[1]}</small></td><td class="mono">${c[2]}</td><td class="mono num">${c[3]}</td><td class="mono num">${c[4]}</td><td><span class="pill ${c[6]}">${c[5]}</span></td><td>${c[7]}</td></tr>`).join('')}</tbody></table></div>
 <div class="tfoot"><span>Showing 4 of 18 vessel calls · Select a row to review berth details</span><span class="pg">‹ <b>1</b> / 5 ›</span></div></section>
 <section class="panel"><div class="ph"><div><h2>Scheduling alerts</h2><div class="sub">Conflicts and delays awaiting a decision</div></div><a class="link" href="vessels.html">View all</a></div><div class="pb"><ul class="list">
 <li><div><b>B4 · Berth window overlap</b><small>COSCO PACIFIC vs ZIM ROTTERDAM · 3 h overlap from 01:00</small></div><span class="pill warn" style="align-self:flex-start">High</span></li>
 <li><div><b>COSCO PACIFIC · ETA slipped</b><small>AIS speed 11.2 kn · Arrival delayed by 2 h</small></div><span class="pill info" style="align-self:flex-start">Watch</span></li>
 <li><div><b>STS-04 · Maintenance window</b><small>B5 blocked 12:00 – 06:00 · 1 vessel affected</small></div><span class="pill mute" style="align-self:flex-start">Info</span></li></ul>
 <div class="stack"><button class="btn pri" type="button">Resolve conflicts</button><button class="btn" type="button">Export plan</button></div></div></section></div>
<div class="strip"><span>Berth occupancy · <b>7 / 10</b></span><span>Tugs available · <b>5 / 8</b></span><span>Pilots on duty · <b>6</b></span><span>Tide window · <b>OK until 17:40</b></span><span style="margin-left:auto">Mooring crews · <b>2 free</b></span></div>
<div class="foot"><span>Sources: AIS · Terminal operating system · Port authority berth plan · Tide gauge</span><span>NLRTM / SHIFT A / UTC+2</span></div>`};
function bindVessels(){
 const pick=k=>{if(!VD[k])return;$('#vd').innerHTML=panelHtml(k);
  document.querySelectorAll('.blk').forEach(b=>b.classList.toggle('on',b.dataset.k==k));
  document.querySelectorAll('tr[data-v]').forEach(t=>t.classList.toggle('rsel',t.dataset.v==k))};
 document.querySelectorAll('.blk[data-k],tr[data-v]').forEach(el=>el.onclick=()=>pick(el.dataset.k||el.dataset.v));
 document.querySelectorAll('.tabs [role=tab]').forEach(b=>b.onclick=()=>{b.parentElement.querySelectorAll('[role=tab]').forEach(x=>x.setAttribute('aria-selected',x==b))})}

BIND.vessels=bindVessels;
SP.mount('vessels');
