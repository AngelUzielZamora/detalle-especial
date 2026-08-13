
const $=s=>document.querySelector(s);
const s=NayeOS.ensure();
document.body.dataset.theme=s.theme||'rosa';
function time(){const d=new Date(),t=d.toLocaleTimeString('es-MX',{hour:'2-digit',minute:'2-digit',hour12:false});$('#lockTime').textContent=t;$('#homeTime').textContent=t;$('#lockDate').textContent=d.toLocaleDateString('es-MX',{weekday:'long',day:'numeric',month:'long'})}
time();setInterval(time,30000);
const h=new Date().getHours();$('#greet').textContent=h<12?'Buenos días ♡ Hoy hay cosas nuevas por descubrir.':h<19?'Espero que estés teniendo un día bonito ♡':'Una actualización para cerrar bonito el día ♡';
function render(){
  const s=NayeOS.ensure(),level=Math.floor(s.xp/100)+1;
  $('#level').textContent='Nivel '+level; $('#xpText').textContent=s.xp+' XP'; $('#xpFill').style.width=(s.xp%100)+'%'; $('#coins').textContent=s.coins||0;
  $('#petName').textContent=s.pet?.name||'Mochi';
  const mood=s.pet?.mood||70; $('#petMood').textContent=mood>85?'Está feliz de verte ♡':mood>60?'Está de buenas ✨':'Necesita un poquito de atención.';
  const day=NayeOS.todayKey(),d=s.daily?.[day]||{};
  const missions=[(d.apps||0)>=3,(d.diary||0)>=1,(d.oracle||0)>=1,(d.quest||0)>=1];
  $('#missionSummary').textContent=missions.filter(Boolean).length+'/4 completadas';
}
render();
const diary=JSON.parse(localStorage.getItem('nayeDiary')||'[]');if(diary.length)$('#thought').textContent=diary[0].text;
$('#unlock').onclick=()=>{NayeOS.awardXP(5,'Primer inicio 2.2');$('#lock').classList.add('hidden');$('#home').classList.remove('hidden');render()};
document.querySelectorAll('.track').forEach(a=>a.addEventListener('click',()=>NayeOS.visit(a.dataset.app)));
let taps=0,toast=$('#toast');function show(m){toast.textContent=m;toast.classList.add('show');setTimeout(()=>toast.classList.remove('show'),2200)}
$('#avatar').onclick=()=>{taps++;if(taps<5)show('No pasó nada... '+taps+'/5');else{taps=0;NayeOS.awardXP(25,'¿Por qué estás tocando todo?');show('Easter egg: administradora oficial de Naye OS ♡');render()}};
$('#petBtn').onclick=()=>{const s=NayeOS.ensure();s.pet.mood=Math.min(100,(s.pet.mood||70)+8);s.xp+=2;NayeOS.save(s);show('Mochi recibió cariño +2 XP 🐰');render()};
