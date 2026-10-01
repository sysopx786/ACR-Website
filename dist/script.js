const header=document.querySelector(".site-header");
const menuBtn=document.querySelector(".menu-btn");
const mobile=document.querySelector(".mobile-panel");

function onScroll(){
  if(scrollY>30)header?.classList.add("scrolled");
  else header?.classList.remove("scrolled");
}

function closeMobileMenu(){
  mobile?.classList.remove("open");
  menuBtn?.setAttribute("aria-expanded","false");
  document.body.classList.remove("no-scroll");
}

onScroll();
addEventListener("scroll",onScroll,{passive:true});
menuBtn?.addEventListener("click",()=>{
  const open=mobile.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded",String(open));
  document.body.classList.toggle("no-scroll",open);
});
mobile?.querySelectorAll("a").forEach(link=>link.addEventListener("click",closeMobileMenu));

const langStore={
  get(){try{return localStorage.getItem("acrLanguage")}catch{return null}},
  set(value){try{localStorage.setItem("acrLanguage",value)}catch{}}
};

function currentLang(){
  return document.documentElement.lang==="es"?"es":"en";
}

function equivalentPath(targetLang){
  const path=location.pathname;
  const hash=location.hash||"";
  if(targetLang==="es"){
    if(path==="/")return "/es/"+hash;
    if(path.startsWith("/es/"))return path+hash;
    const cleaned=path.replace(/\.html$/,"/").replace(/\/$/,"");
    return (`/es${cleaned || ""}/`).replace(/\/{2,}/g,"/")+hash;
  }
  if(!path.startsWith("/es/"))return path+hash;
  const without=path.replace(/^\/es/,"")||"/";
  return without+hash;
}

const savedLang=langStore.get();
if(!savedLang&&currentLang()==="es")langStore.set("es");
if(savedLang&&savedLang!==currentLang()){
  location.replace(equivalentPath(savedLang));
}

document.querySelectorAll("[data-lang-switch]").forEach(link=>{
  const target=link.textContent.trim().toLowerCase().startsWith("english")?"en":"es";
  link.href=equivalentPath(target);
  link.addEventListener("click",()=>{
    langStore.set(target);
  });
});
