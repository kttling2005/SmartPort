/* ---- Cargo ---- */
const CG=[
 ['MSKU 784329-1',"40' HC / Dry",'Maersk Elba / 642W','A03 · 12 · 2','24.6 t','Released','Discharged','ok'],
 ['MSCU 621845-0',"20' GP / Dry",'MSC Isabella / 611E','B01 · Vessel','18.2 t','Released','Loading','info'],
 ['CMAU 308712-4',"40' RF / Reefer",'CMA CGM Louvre / 122W','R02 · 08 · 1','22.8 t','Released','Connected','ok'],
 ['EGHU 910234-6',"40' HC / Dry",'Ever Given / 008W','D04 · 21 · 3','26.1 t','Hold','Review documents','warn'],
 ['COSU 572091-3',"20' TK / Tank",'COSCO Aries / 239E','Vessel · Bay 018','21.4 t','Pending','Awaiting arrival','mute']];
const CGD=[
 ['45G1 · 40\' high cube','General cargo · 24.6 t','Bay 034 / Row 08 / Tier 82','Yard A03 · Slot 12 · Tier 2','Released · 08:15','Rotterdam Logistics BV','Truck pickup · 09:15'],
 ['22G1 · 20\' general purpose','Consumer goods · 18.2 t','Bay 028 / Row 04 / Tier 84','Berth B01 · On vessel','Released · 07:50','Benelux Retail NV','Vessel load · 10:30'],
 ['45R1 · 40\' reefer','Chilled produce · 22.8 t','Bay 036 / Row 06 / Tier 82','Reefer R02 · Slot 08 · Tier 1','Released · 06:40','Fresh Chain BV','Truck pickup · 11:00'],
 ['45G1 · 40\' high cube','Machinery · 26.1 t','Bay 040 / Row 02 / Tier 84','Yard D04 · Slot 21 · Tier 3','Hold · documents','Delta Machinery GmbH','Customs review · 10:00'],
 ['22T1 · 20\' tank','Liquid chemicals · 21.4 t','Bay 018 / Row 02 / Tier 82','Vessel COSCO Aries · Not arrived','Pending','Rhine Chemicals BV','Awaiting arrival · ETA 09:40']];
let cgSel=0;
function bayGrid(){
 const bays=['026','028','030','032','034','036','038','040','042','044','046','048'];
 const rf={'86':['034','042'],'84':['026','034','042'],'82':['026','042'],'04':['026','034','042'],'02':['026','034','042']};
 const em={'86':['026','032','038','044'],'02':['046','048']};
 let h=`<div class="bay"><span class="bh">BAY</span>${bays.map(b=>`<span class="bh${b=='034'?' on':''}">${b}</span>`).join('')}`;
 ['86','84','82','|','04','02'].forEach(r=>{
  if(r=='|'){h+=`<span class="bdiv"></span>`;return}
  h+=`<span class="bh">${r}</span>`;
  bays.forEach(b=>{let c='d',t="40'";
   if((rf[r]||[]).includes(b)){c='r';t='RF'}
   if((em[r]||[]).includes(b)){c='e';t='–'}
   if(r=='82'&&b=='034'){c='s';t='MSKU'}
   h+=`<span class="bcell ${c}">${t}</span>`})});
 return h+`</div>`}
function cgRender(){
 const d=CGD[cgSel],c=CG[cgSel];
 document.getElementById('cg-sel').innerHTML=`${ph('Selected container','','Open record ↗')}<div class="pb dtl"><div style="display:flex;justify-content:space-between;align-items:center;margin-top:4px"><span class="mono" style="font-size:18px;font-weight:600">${c[0].replace(' ','&nbsp;')}</span>${pl(c[6].split(' ')[0]=='Review'?'Hold':c[6],c[7])}</div>${dl([['Type / size',d[0]],['Cargo / weight',d[1]],['Vessel slot',d[2]],['Current location',d[3]],['Customs',d[4]],['Consignee',d[5]],['Next move',d[6]]])}<div class="stack"><button class="btn pri" type="button">Create move order</button><button class="btn" type="button">View history</button></div></div>`;
 document.getElementById('cg-inv').innerHTML=tbl(['','Container ID','Size / type','Vessel / voyage','Location','Gross wt.','Customs','Status / action'],CG.map((r,i)=>[`<input type="checkbox" aria-label="Select ${r[0]}" ${i==cgSel?'checked':''} data-i="${i}">`,`<span class="mono">${r[0]}</span>`,r[1],r[2],r[3],`<span class="num">${r[4]}</span>`,pl(r[5],r[5]=='Hold'?'warn':r[5]=='Pending'?'mute':'ok'),`${r[6]}${r[6]=='Awaiting arrival'?'':' <a href="cargo.html">'+(r[6].startsWith('Review')?'':'View')+' →</a>'}`]),CG.map((r,i)=>`data-i="${i}" class="${i==cgSel?'rsel':''}" style="cursor:pointer"`));
 document.querySelectorAll('#cg-inv tbody tr').forEach(t=>t.onclick=()=>{cgSel=+t.dataset.i;cgRender()});
 document.getElementById('cg-cnt').textContent='1 selected · Showing 5 of 8,246 containers'}
V.cargo=()=>`${hd('Cargo stowage &amp; container management','Plan vessel stowage, track container inventory and resolve cargo exceptions.','+ Register container')}${fl()}
${kp([['Containers in terminal','8,246','','12,680 TEU · 64% import / 36% export','cargo'],['Moves this shift','1,284','','Target 1,600 · 80% complete','timer'],['Reefer connections','218 / 260','','42 available · 2 temperature alerts','cargo'],['Cargo exceptions','12','','5 customs holds · 7 documentation checks','bill']])}
<div class="row2" style="grid-template-columns:minmax(0,1fr) 400px;align-items:start"><section class="panel">${ph('Vessel stowage plan','Maersk Elba · B02 · Voyage 642W · 68% discharged','Validate plan →')}
 ${tabs('cg-tabs',['Bay plan','Load sequence','Discharge plan'])}
 <div class="filters" style="padding:14px 16px 0"><span class="sel">Vessel: Maersk Elba</span><span class="sel">All bays</span><span class="sel">Show cargo type</span></div>
 <div class="tl" style="margin-top:14px;border:0">${bayGrid()}</div>
 <div class="sw"><span><i style="border-color:var(--line2);background:var(--quay)"></i>Dry cargo</span><span><i style="border-color:var(--line2);background:var(--line2)"></i>Reefer</span><span><i style="border-color:var(--line2);border-style:dashed"></i>Empty slot</span><span><i style="border-color:var(--accent);background:var(--accent-soft)"></i>Selected</span><span class="r">Stern ← SIDE ELEVATION → Bow</span></div>
 <div class="tfoot"><span>Last validated 08:30 · 2 placement conflicts</span><button class="link" type="button">Review conflicts →</button></div></section>
 <section class="panel" id="cg-sel"></section></div>
<section class="panel">${ph('Container inventory','Track cargo across vessel, yard and gate locations.','Import manifest / Export CSV ↓')}
 <div class="filters" style="padding:14px 16px 14px"><label class="search" style="width:min(300px,100%)"><input id="cgq" placeholder="Search container ID, booking or B/L" aria-label="Search containers"></label><span class="sel">Status: All</span><span class="sel">Cargo type</span><span class="sel">Location</span><span class="sel">More filters (2)</span></div>
 <div id="cg-inv"></div><div class="tfoot"><span><span id="cg-cnt"></span></span>${pager()}</div></section>${src}`;

BIND.cargo=()=>{cgRender();bindTabs('cg-tabs',()=>{})};
SP.mount('cargo');
