
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


// ===== Naye OS 2.3 · Birthday Update =====
(function(){
  const cfg = window.NayeSpecial || {};
  const birthday = new Date(cfg.birthday?.date || "2026-08-21T00:00:00");
  const birthdayEnd = new Date(cfg.birthday?.end || "2026-08-22T00:00:00");
  const adventureUnlock = new Date(cfg.adventureUnlock || birthday);
  const now = new Date();

  const localKey = [
    now.getFullYear(),
    String(now.getMonth()+1).padStart(2,'0'),
    String(now.getDate()).padStart(2,'0')
  ].join('-');

  const daily = document.querySelector('#dailyMessage');
  if(daily){
    daily.textContent = cfg.dailyMessages?.[localKey] ||
      (now < birthday
        ? 'Naye OS está preparando una actualización especial para esta semana. ✨'
        : 'Hoy merece una pantalla un poquito más especial. ♡');
  }

  const ms = birthday - now;
  const headline = document.querySelector('#birthdayHeadline');
  const message = document.querySelector('#birthdayMessage');
  const mini = document.querySelector('#birthdayMini');
  const symbol = document.querySelector('#birthdaySymbol');
  const appStatus = document.querySelector('#birthdayAppStatus');
  const adventureStatus = document.querySelector('#adventureStatus');

  function birthdayConfetti(){
    if(sessionStorage.getItem('nayeBirthdayConfetti')) return;
    sessionStorage.setItem('nayeBirthdayConfetti','1');
    const chars=['#f49bb2','#ffd36e','#a68ae5','#89cbbb','#ffffff'];
    for(let i=0;i<65;i++){
      const p=document.createElement('span');
      p.className='confetti-piece';
      p.style.left=Math.random()*100+'vw';
      p.style.background=chars[Math.floor(Math.random()*chars.length)];
      p.style.animationDuration=(2.8+Math.random()*3)+'s';
      p.style.animationDelay=(Math.random()*1.2)+'s';
      document.body.appendChild(p);
      setTimeout(()=>p.remove(),7000);
    }
  }

  if(now >= birthday && now < birthdayEnd){
    document.body.classList.add('birthday-mode');
    if(headline) headline.textContent='¡Feliz cumpleaños, Naye! 🎂';
    if(message) message.textContent='Birthday Mode activado. Hoy el sistema es completamente tuyo.';
    if(mini) mini.textContent='HOY ♡';
    if(symbol) symbol.textContent='🥳';
    if(appStatus) appStatus.textContent='¡Abrir!';
    const heroTitle=document.querySelector('#heroTitle');
    if(heroTitle) heroTitle.textContent='Feliz cumpleaños, Naye ♡';
    const greet=document.querySelector('#greet');
    if(greet) greet.textContent='Naye OS detectó que hoy es un día bastante importante.';
    birthdayConfetti();
    const s=NayeOS.ensure();
    if(!s.achievements.includes('Birthday Mode 2026')){
      NayeOS.awardXP(50,'Birthday Mode 2026');
      render();
    }
  } else if(now < birthday){
    const days=Math.ceil(ms/86400000);
    if(headline) headline.textContent=days===1?'Falta 1 día 🎂':`Faltan ${days} días 🎂`;
    if(message) message.textContent='El 21 de agosto se desbloqueará algo nuevo.';
    if(mini) mini.textContent=days+'d';
    if(appStatus) appStatus.textContent='Bloqueada';
  } else {
    if(headline) headline.textContent='Birthday Update instalada ♡';
    if(message) message.textContent='El cumpleaños ya pasó, pero esta actualización se queda contigo.';
    if(mini) mini.textContent='21.08';
    if(appStatus) appStatus.textContent='Abrir';
  }

  if(adventureStatus){
    adventureStatus.textContent = now >= adventureUnlock ? '¡Abrir!' : 'Bloqueada';
  }

  // La futura etapa 3.0 queda dormida. No se muestra ni activa por fecha.
  if(cfg.relationshipUpdate === true){
    document.documentElement.dataset.relationshipUpdate='enabled';
    // La experiencia 3.0 se implementará/activará después conscientemente.
  }
})();


// ===== Naye OS 3.0 · Girlfriend Edition =====
// One-switch activation: js/special-events.js -> relationshipUpdate: true
(function(){
  const cfg = window.NayeSpecial || {};
  if(cfg.relationshipUpdate !== true) return;

  document.body.classList.add('relationship-mode');

  const relCard = document.querySelector('#relationshipCard');
  const relApp = document.querySelector('#relationshipApp');
  if(relCard) relCard.classList.remove('hidden');
  if(relApp) relApp.classList.remove('hidden');

  const version = document.querySelector('#osVersion');
  const lockVersion = document.querySelector('#lockVersion');
  const lockSubtitle = document.querySelector('#lockSubtitle');
  const hero = document.querySelector('#heroTitle');
  const greet = document.querySelector('#greet');

  if(version) version.textContent='NAYE OS 3.0 · GIRLFRIEND EDITION';
  if(lockVersion) lockVersion.textContent='Naye OS 3.0';
  if(lockSubtitle) lockSubtitle.textContent='Relationship status updated successfully ♡';
  if(hero) hero.textContent='Hola, novia ♡';
  if(greet) greet.textContent='Nueva etapa desbloqueada. Parece que el sistema tenía preparada una actualización importante.';

  const start = new Date(cfg.relationshipStart || '2026-08-21T00:00:00');
  const now = new Date();
  const days = Math.max(1, Math.floor((now - start) / 86400000) + 1);
  const dayBox = document.querySelector('#relationshipDay');
  if(dayBox) dayBox.textContent = days === 1 ? 'Día 1 ♡' : `Día ${days} ♡`;

  const headline = document.querySelector('#relationshipHeadline');
  const subline = document.querySelector('#relationshipSubline');
  if(headline) headline.textContent='Relationship status updated ♡';
  if(subline) subline.textContent='Nayeli + Ángel · Nueva etapa desbloqueada';

  // One-time celebration per browser session.
  if(!sessionStorage.getItem('nayeRelationshipConfetti')){
    sessionStorage.setItem('nayeRelationshipConfetti','1');
    const hearts=['💗','♡','💞','✨'];
    for(let i=0;i<52;i++){
      const el=document.createElement('span');
      el.className='heart-confetti';
      el.textContent=hearts[Math.floor(Math.random()*hearts.length)];
      el.style.left=Math.random()*100+'vw';
      el.style.fontSize=(12+Math.random()*15)+'px';
      el.style.animationDuration=(3+Math.random()*3)+'s';
      el.style.animationDelay=(Math.random()*1.4)+'s';
      document.body.appendChild(el);
      setTimeout(()=>el.remove(),7500);
    }
  }

  // Persistent achievement, only after activation.
  const s=NayeOS.ensure();
  if(!s.achievements.includes('Nueva etapa desbloqueada')){
    NayeOS.awardXP(100,'Nueva etapa desbloqueada');
    if(typeof render === 'function') render();
  }
})();
