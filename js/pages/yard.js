/* ---- Yard ---- */
const YB=[['A01',72],['A02',65],['A03',88],['A04',59],['B01',81],['B02',76],['B03',62],['B04',91],['C01',68],['C02',74],['R01',83],['R02',85]];
let ySel='A03';
function yRender(){
 document.getElementById('y-grid').innerHTML=YB.map(b=>{const n=Math.round(b[1]/10),c=b[1]>=90?'var(--warn)':'var(--ok)';
  return `<button type="button" class="yb${b[0]==ySel?' on':''}" data-b="${b[0]}"><span class="yh"><b class="mono">${b[0]}</b><span class="num">${b[1]}%</span></span><span class="ys">${Array.from({length:10},(_,i)=>`<i style="background:${i<n?c:'var(--line)'}"></i>`).join('')}</span></button>`}).join('');
 const b=YB.find(x=>x[0]==ySel),o=Math.round(b[1]*8);
 document.getElementById('y-info').innerHTML=`<span>${b[0]} selected · ${o} / 800 slots · ${b[1]}% occupied · ${800-o} available</span><button class="link" type="button">Open block →</button>`;
 document.querySelectorAll('.yb').forEach(e=>e.onclick=()=>{ySel=e.dataset.b;yRender()})}
V.yard=()=>`${hd('Yard management &amp; smart gate','Balance yard capacity, coordinate truck appointments and monitor gate movements.','+ Book appointment')}${fl()}
${kp([['Yard occupancy','76%','','+2% 8,246 / 10,850 slots · 2 blocks above 85%','yard'],['Truck turnaround','32','min','↓ 4 min · Target ≤ 35 min · 4 min below yesterday','timer'],['Gate throughput · today','486','trucks','+12% · 4 lanes open · 1 busy · 1 closed','ops'],['Appointments · this hour','42','','+6 · 28 arrived · 10 expected · 4 late','bill']])}
<div class="row2" style="grid-template-columns:minmax(0,1fr) 400px;align-items:start"><section class="panel">${ph('Yard occupancy','Block view · Capacity updated every 30 seconds','Rebalance yard →')}
 <div style="padding:14px 16px 0"><div class="road"><span>QUAYSIDE TRANSFER ROAD</span><span>→ → → → →</span></div><div id="y-grid" class="ygrid"></div><div class="road" style="margin-top:10px"><span>LANDSIDE SERVICE ROAD</span><span style="color:var(--fg)">TRUCK HOLDING → SMART GATE</span></div></div>
 <div class="sw"><span><i style="background:var(--ok);border-color:var(--ok)"></i>Occupied</span><span><i style="border-color:var(--line2)"></i>Available</span><span><i style="border-color:var(--accent)"></i>Selected</span><span>R = Reefer zone</span><span class="r">N ↑ · Schematic</span></div>
 <div class="tfoot" id="y-info"></div></section>
 <section class="panel">${ph('Smart gate lanes','Gate North · OCR / RFID enabled','Gate controls →')}<div class="pb" style="padding-top:8px">${tbl(['Lane','Direction','State','Reader'],[['G01','Inbound','Open','OCR ✓'],['G02','Inbound','Busy','B-RX 482'],['G03','Inbound','Open','OCR ✓'],['G04','Outbound','Open','RFID ✓'],['G05','Outbound','Open','RFID ✓'],['G06','Outbound','<span class="wn">Closed</span>','Maintenance']].map(r=>[`<span class="mono">${r[0]}</span>`,r[1],r[2],r[3]]))}<div class="note" style="margin-top:12px">${ic('warn')}<span>G02 · Plate mismatch detected. Manual verification required before entry.</span></div></div></section></div>
<div class="row2" style="grid-template-columns:minmax(0,1fr) 400px;align-items:start"><section class="panel">${ph('Truck appointments','Today · Next available slot 10:30–11:00','View calendar →')}
 <div class="filters" style="padding:14px 16px 14px"><span class="sel">09:00–12:00</span><span class="sel">All statuses</span><label class="search" style="width:min(240px,100%)"><input placeholder="Search truck / booking" aria-label="Search trucks"></label></div>
 ${tbl(['Booking / truck','Time slot','Container','Move','Status'],[['APT-2048 / B-RX 482','09:00–09:30','MSKU 784329-1','Pickup',pl('Gate check','info')],['APT-2049 / 82-BLK-6','09:00–09:30','CMAU 308712-4','Pickup',pl('Arrived','ok')],['APT-2050 / RT-725-K','09:30–10:00','MSCU 621845-0','Drop-off',pl('Confirmed','mute')],['APT-2051 / BX-GH 913','09:30–10:00','EGHU 910234-6','Pickup',pl('Customs hold','warn')]])}
 <div class="tfoot"><span>Showing 4 of 168 appointments · All times UTC+2</span>${pager()}</div></section>
 <section class="panel">${ph('Movement queue','24 pending moves · Ordered by priority','Dispatch →')}<div class="pb"><ul class="list">${[['MV-087 · A03 → Gate North','MSKU 784329-1 · YT-12 · Pickup','Ready','ok'],['MV-088 · Quay B02 → C02','MAEU 912804-5 · YT-08 · Discharge','Moving','info'],['MV-089 · R02 → Inspection','CMAU 308712-4 · Assign tractor','Queued','mute'],['MV-090 · D04 → Customs','EGHU 910234-6 · Release required','On hold','warn']].map(m=>`<li><div><b>${m[0]}</b><small>${m[1]}</small></div>${pl(m[2],m[3])}</li>`).join('')}</ul></div></section></div>${src}`;

BIND.yard=()=>yRender();
SP.mount('yard');
