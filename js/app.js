
const boot=document.getElementById('boot'),os=document.getElementById('os'),bootText=document.getElementById('bootText'),bootProgress=document.getElementById('bootProgress');
const bootSteps=[['Inicializando sistema…',18],['Verificando usuaria…',42],['Nayeli detectada ✓',66],['Cargando detallitos…',86],['Bienvenida, Naye ♡',100]];
let i=0;
function nextBoot(){if(i>=bootSteps.length){setTimeout(()=>{boot.style.opacity='0';setTimeout(()=>{boot.classList.add('hidden');os.classList.remove('hidden');os.setAttribute('aria-hidden','false')},500)},550);return;}bootText.textContent=bootSteps[i][0];bootProgress.style.width=bootSteps[i][1]+'%';i++;setTimeout(nextBoot,620)}
setTimeout(nextBoot,450);
function updateClock(){const d=new Date();document.getElementById('clock').textContent=d.toLocaleTimeString('es-MX',{hour:'2-digit',minute:'2-digit',hour12:false})}
updateClock();setInterval(updateClock,30000);
const hour=new Date().getHours();document.getElementById('greeting').textContent=hour<12?'Buenos días ♡ Tengo unas cositas guardadas para ti.':hour<19?'Espero que estés teniendo un día bonito ♡':'Un rinconcito para cerrar bonito el día ♡';
const toast=document.getElementById('toast');let toastTimer;
function showToast(msg){clearTimeout(toastTimer);toast.textContent=msg;toast.classList.add('show');toastTimer=setTimeout(()=>toast.classList.remove('show'),2400)}
document.querySelectorAll('.locked').forEach(btn=>btn.addEventListener('click',()=>showToast(`${btn.dataset.name} todavía está en desarrollo ✨`)));
document.getElementById('dismissUpdate').addEventListener('click',()=>document.getElementById('updateCard').style.display='none');
