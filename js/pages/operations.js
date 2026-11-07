V.operations=()=>`<div class="head"><div><h1>Port operation center</h1><p>POC / TOC · Coordinate vessel movements, berth operations and shift priorities.</p></div><a class="btn pri" href="vessels.html">+ Schedule vessel</a></div>
<div class="filters"><span class="sel">15 Oct 2026</span><span class="sel">Maasvlakte</span><span class="sel">Shift A · 06:00–14:00</span><span class="updated">Live data · Updated 08:42</span></div>
${kpis(KP.map((k,i)=>i==2?['Cargo handled · 24h',...k.slice(1)]:i==1?[k[0],k[1],k[2],'+5% 18 occupied / 22 total berths',...k.slice(4)]:k))}
<div class="row2" style="grid-template-columns:minmax(0,1fr) 320px"><section class="panel"><div class="ph"><div><h2>Berth &amp; vessel overview</h2><div class="sub">Maasvlakte · 18 occupied / 4 available</div></div><a class="link" href="vessels.html">Open berth planner →</a></div>
 <div class="map" style="margin-top:14px">${portSvg({h:226,id:2})}${ctl}</div>
 <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:14px;padding:14px 16px 16px;border-top:1px solid var(--line);margin-top:14px">${BL.map(b=>`<div><span class="mono" style="font-size:10px;color:var(--dim)">${b[0]}</span><b style="display:block;font-weight:600;margin-top:2px">${b[1]}</b><small style="color:var(--dim)">${b[2].replace('Departure delayed · +45 min','Delayed · ETD 11:15')}</small></div>`).join('')}</div></section>
 <section class="panel"><div class="ph"><div><h2>Operational alerts</h2><div class="sub">3 open · 1 requires immediate action</div></div><a class="link" href="operations.html">View all →</a></div><div class="pb"><ul class="list">
 <li><div><b>B04 · Departure delayed</b><small>Ever Given · +45 min. Pilot reassigned to 11:15.</small></div><span class="pill warn" style="align-self:flex-start">High</span></li>
 <li><div><b>Berth assignment pending</b><small>COSCO Shipping Aries · ETA 09:40. Assign available berth.</small></div><span class="pill info" style="align-self:flex-start">Review</span></li>
 <li><div><b>STS-04 vibration threshold</b><small>B02 crane · Inspect after current lift cycle.</small></div><span class="pill ok" style="align-self:flex-start">Watch</span></li></ul><a class="link" href="operations.html">Acknowledge selected alerts →</a></div></section></div>
<div class="row2" style="grid-template-columns:minmax(0,1fr) 320px">${movesPanel('t-poc',false)}
 <section class="panel"><div class="ph"><div><h2>Shift task queue</h2><div class="sub">4 open · Assigned to your team</div></div><a class="link" href="operations.html">+ Add task</a></div><div class="pb"><ul class="list">
 ${[['Assign berth · COSCO Aries','Vessel planner · Due 09:00','To do','info'],['Confirm pilot · Ever Given','Marine control · Due 09:15','In progress','mute'],['Review B02 crane allocation','Terminal supervisor · Due 09:30','To do','info'],['Approve ONE clearance','Port authority · Due 10:00','Waiting','ok']].map(t=>`<li><div><b>${t[0]}</b><small>${t[1]}</small></div><span class="pill ${t[3]}" style="align-self:flex-start;white-space:nowrap">${t[2]}</span></li>`).join('')}</ul></div></section></div>
<div class="strip"><b>Marine conditions</b><span>Wind SW 12 kn</span><span>Tide +1.8 m ↗</span><span>Visibility 10 km</span><span class="ok">No navigation restrictions</span></div>
<div class="foot"><span>Sources: AIS · Terminal operating system · Port authority · IoT gateway</span><span>NLRTM / SHIFT A / UTC+2</span></div>`;

BIND.operations=()=>bindMoves('t-poc',false);
SP.mount('operations');
