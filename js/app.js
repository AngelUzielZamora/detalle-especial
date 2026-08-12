
const boot=document.getElementById('boot'),os=document.getElementById('os'),bootText=document.getElementById('bootText'),bootProgress=document.getElementById('bootProgress');
const steps=[['Inicializando sistema…',18],['Verificando usuaria…',40],['Nayeli detectada ✓',62],['Buscando actualizaciones…',78],['Naye OS 1.1 lista ✨',92],['Bienvenida, Naye ♡',100]];
let i=0;function next(){if(i>=steps.length){setTimeout(()=>{boot.style.opacity='0';setTimeout(()=>{boot.classList.add('hidden');os.classList.remove('hidden');os.setAttribute('aria-hidden','false')},500)},500);return;}bootText.textContent=steps[i][0];bootProgress.style.width=steps[i][1]+'%';i++;setTimeout(next,520)}setTimeout(next,350);
function clock(){const d=new Date();document.getElementById('clock').textContent=d.toLocaleTimeString('es-MX',{hour:'2-digit',minute:'2-digit',hour12:false})}clock();setInterval(clock,30000);
const h=new Date().getHours();document.getElementById('greeting').textContent=h<12?'Buenos días ♡ Tengo unas cositas guardadas para ti.':h<19?'Espero que estés teniendo un día bonito ♡':'Un rinconcito para cerrar bonito el día ♡';
const toast=document.getElementById('toast');let tt;function show(msg){clearTimeout(tt);toast.textContent=msg;toast.classList.add('show');tt=setTimeout(()=>toast.classList.remove('show'),2300)}
document.querySelectorAll('.locked').forEach(b=>b.addEventListener('click',()=>show(`${b.dataset.name} todavía está en desarrollo ✨`)));
document.getElementById('dismissUpdate').onclick=()=>document.getElementById('updateCard').style.display='none';
