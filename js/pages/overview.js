V.overview=()=>`<div class="head"><div><h1>Port overview <span class="live">Live</span></h1><p>Thursday, 15 October 2026 · Morning shift 06:00–14:00</p></div><div class="actions"><button class="btn" type="button">${ic('dl')}Export report</button><a class="btn pri" href="vessels.html">${ic('plus')}Schedule vessel</a></div></div>
${kpis()}
<div class="row2"><section class="panel"><div class="ph"><div><h2>Live port activity <span style="font-weight:400;color:var(--mute);font-size:12px;margin-left:8px">Maasvlakte ▾</span></h2></div><span class="mono" style="font-size:10px;color:var(--dim)">UPDATED 6 SEC AGO</span></div>
 <div class="map">${portSvg({h:262,id:1})}${ctl}<div class="tip"><b>Maersk Elba</b><span>IMO 9456978 · CONTAINER SHIP</span><div style="display:flex;justify-content:space-between;margin-top:6px;font-size:11px"><span style="font:11px var(--sans);color:var(--accent)">Unloading · B02</span><span class="num">68%</span></div><div class="bar"><i style="width:68%"></i></div></div></div>
 <div class="legend"><span><i style="background:var(--ok)"></i>Berthed</span><span><i style="background:var(--accent)"></i>Underway</span><span><i style="background:var(--warn)"></i>Attention</span><span class="r">SW 12 kn · +1.8 m · Visibility 10 km</span></div></section>
 <section class="panel"><div class="ph"><h2>Berth activity</h2><span style="color:var(--dim)">···</span></div><div class="pb"><div class="occ">${Array.from({length:22},(_,i)=>`<i class="${i<17?'':i==17?'w':'f'}"></i>`).join('')}</div><div class="occn"><span>18 occupied</span><b>4 available</b></div>
 <ul class="bl">${BL.map(b=>`<li><span class="bc">${b[0]}</span><div><b>${b[1]}</b><small>${b[2]}</small></div><i class="dot ${b[3]=='w'?'w':''}"></i></li>`).join('')}</ul>
 <div class="note">${ic('warn')}<span>B04 departure delayed. Pilot reassigned for 11:15.</span></div><p style="margin:12px 0 0"><a class="link" href="vessels.html">Open berth planner →</a></p></div></section></div>
${movesPanel('t-ov',true)}
<div class="foot"><span>Live data from AIS, terminal systems &amp; port authority</span><span>NLRTM / SHIFT A / 15 OCT 2026</span></div>`;

BIND.overview=()=>bindMoves('t-ov',true);
SP.mount('overview');
