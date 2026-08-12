
const $=s=>document.querySelector(s);
const lock=$("#lockScreen"),home=$("#home"),toast=$("#toast"),sheet=$("#sheet"),sheetTitle=$("#sheetTitle"),sheetContent=$("#sheetContent");
function updateTime(){
  const d=new Date();
  const t=d.toLocaleTimeString('es-MX',{hour:'2-digit',minute:'2-digit',hour12:false});
  $("#lockTime").textContent=t; $("#homeTime").textContent=t;
  $("#lockDate").textContent=d.toLocaleDateString('es-MX',{weekday:'long',day:'numeric',month:'long'});
}
updateTime(); setInterval(updateTime,30000);

const h=new Date().getHours();
$("#dayMessage").textContent=h<12?'Buenos días ♡ Hoy el sistema trae algo nuevo.':h<19?'Espero que estés teniendo un día bonito ♡':'Una actualización chiquita para terminar bonito el día ♡';

$("#unlockBtn").onclick=()=>{
  lock.style.transition='transform .65s cubic-bezier(.2,.8,.2,1),opacity .55s';
  lock.style.transform='translateY(-100%)'; lock.style.opacity='0';
  setTimeout(()=>{lock.classList.add('hidden');home.classList.remove('hidden')},550);
};
$("#closeUpdate").onclick=()=>$("#systemUpdate").style.display='none';

let tt;
function showToast(m){clearTimeout(tt);toast.textContent=m;toast.classList.add('show');tt=setTimeout(()=>toast.classList.remove('show'),2400)}
document.querySelectorAll('.locked').forEach(b=>b.onclick=()=>showToast(`${b.dataset.app} sigue bloqueada. Ángel todavía está programando 👀`));

function openSheet(title,html){sheetTitle.textContent=title;sheetContent.innerHTML=html;sheet.classList.remove('hidden')}
$("#closeSheet").onclick=()=>sheet.classList.add('hidden');
sheet.onclick=e=>{if(e.target===sheet)sheet.classList.add('hidden')};

$("#notifBtn").onclick=()=>openSheet('Notificaciones',`
  <div class="notif"><span>💗</span><div><b>Ángel</b><small>Hay una nueva versión de Naye OS esperando que la explores.</small></div></div>
  <div class="notif"><span>🔮</span><div><b>Oráculo</b><small>Predicción disponible: alguien quiere verte pronto.</small></div></div>
  <div class="notif"><span>📸</span><div><b>Recuerdos</b><small>Hay espacio reservado para cosas que todavía no han pasado.</small></div></div>
`);
$("#controlBtn").onclick=()=>openSheet('Centro de control',`
  <div class="control-grid">
    <div class="control">💗<strong>Cariño</strong><small>100%</small></div>
    <div class="control">✨<strong>Detalles</strong><small>Activados</small></div>
    <div class="control">🎮<strong>Naye Quest</strong><small>En desarrollo</small></div>
    <div class="control">🌌<strong>Estrellas</strong><small>En desarrollo</small></div>
  </div>
`);
$("#homeBtn").onclick=()=>showToast('Ya estás en casa ♡');

const surprises=[
  'Dato del sistema: alguien llamado Ángel está pensando en ti.',
  'Actualización secreta: hoy te ves especialmente bonita. Fuente: confía.',
  'Naye OS recomienda una dosis de abrazo cuando sea posible.',
  'Error 404: razón válida para no sonreír no encontrada.',
  'Sistema estable. Ángel un poquito menos cuando apareces tú.',
  'Mensaje aleatorio: gracias por dejarme hacerte estas tonterías ♡'
];
$("#surpriseWidget").onclick=()=>showToast(surprises[Math.floor(Math.random()*surprises.length)]);

let taps=0;
$("#avatarBtn").onclick=()=>{
  taps++;
  if(taps<5) showToast(`No pasó nada... (${taps}/5)`);
  else {
    taps=0;
    openSheet('Modo secreto desbloqueado 🔓',`
      <div class="notif"><span>🫶</span><div><b>Easter egg encontrado</b><small>Premio: oficialmente eres la única usuaria con permisos de administrador en Naye OS.</small></div></div>
      <div class="notif"><span>💌</span><div><b>Mensaje del desarrollador</b><small>Si encontraste esto, te debo un abrazo. Esta cláusula es legalmente inventada pero moralmente obligatoria.</small></div></div>
    `);
  }
};
