const YEAR = 2026;

const months = [
  "ENERO","FEBRERO","MARZO","ABRIL","MAYO","JUNIO",
  "JULIO","AGOSTO","SEPTIEMBRE","OCTUBRE","NOVIEMBRE","DICIEMBRE"
];

const holidays = {
  "2026-01-01":"Año Nuevo",
  "2026-04-03":"Viernes Santo",
  "2026-04-04":"Sábado Santo",
  "2026-05-01":"Día del Trabajo",
  "2026-05-21":"Glorias Navales",
  "2026-06-29":"San Pedro y San Pablo",
  "2026-07-16":"Virgen del Carmen",
  "2026-08-15":"Asunción de la Virgen",
  "2026-09-18":"Independencia Nacional",
  "2026-09-19":"Glorias del Ejército",
  "2026-10-12":"Encuentro Dos Mundos",
  "2026-10-31":"Día Iglesias Evangélicas",
  "2026-11-01":"Todos los Santos",
  "2026-12-08":"Inmaculada Concepción",
  "2026-12-25":"Navidad"
};

const grid = document.getElementById("yearGrid");

function daysInMonth(y,m){ return new Date(y,m+1,0).getDate(); }
function mondayIndex(d){ return (d+6)%7; }

function createMonth(m){
  const box=document.createElement("div");
  box.className="month";

  box.innerHTML=`<div class="month-title">${months[m]}</div>`;
  const dow=document.createElement("div");
  dow.className="dow";
  ["Lu","Ma","Mi","Ju","Vi","Sá","Do"].forEach(d=>dow.innerHTML+=`<div>${d}</div>`);
  box.appendChild(dow);

  const days=document.createElement("div");
  days.className="days";

  const first=new Date(YEAR,m,1);
  const start=mondayIndex(first.getDay());
  const dim=daysInMonth(YEAR,m);

  for(let i=0;i<42;i++){
    const d=document.createElement("div");
    const day=i-start+1;
    const wd=i%7;
    if(wd>=5) d.classList.add("weekend");

    if(day>0 && day<=dim){
      const key=`${YEAR}-${String(m+1).padStart(2,"0")}-${String(day).padStart(2,"0")}`;
      d.innerHTML=`<strong>${day}</strong>`;
      if(holidays[key]){
        d.classList.add("holiday");
        d.innerHTML=`<strong>${day}</strong><span>${holidays[key]}</span>`;
      }
    } else {
      d.classList.add("out");
    }
    days.appendChild(d);
  }

  box.appendChild(days);
  return box;
}

for(let i=0;i<12;i++) grid.appendChild(createMonth(i));

/* BOTONES */
document.getElementById("btnPDF").onclick=()=>window.print();

document.getElementById("btnPNG").onclick=async()=>{
  const node=document.getElementById("calendar");
  const dataUrl=await htmlToImage.toPng(node,{pixelRatio:2,backgroundColor:"#ffffff"});
  const a=document.createElement("a");
  a.download="Calendario_Profesional_2026_Marcsene_Orthela.png";
  a.href=dataUrl;
  a.click();
};
