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

// GitHub Pages hosts this project below /ACR-Website/, not at domain root.
// Only a deliberate language-switch click changes the displayed language.
// This avoids cached preferences redirecting explicitly opened links to a 404.
const SITE_BASE="/ACR-Website/";
function equivalentPath(targetLang){
  let path=location.pathname;
  const hash=location.hash||"";
  const search=location.search||"";
  if(!path.startsWith(SITE_BASE))return path+search+hash;
  let relative=path.slice(SITE_BASE.length).replace(/^es\//,"");
  if(relative.endsWith("index.html"))relative=relative.slice(0,-"index.html".length);
  else if(relative.endsWith(".html"))relative=relative.slice(0,-".html".length);
  if(relative&&!relative.endsWith("/"))relative+="/";
  return SITE_BASE+(targetLang==="es"?"es/":"")+relative+search+hash;
}
document.querySelectorAll("[data-lang-switch]").forEach(link=>{
  const target=link.textContent.trim().toLowerCase().startsWith("english")?"en":"es";
  link.href=equivalentPath(target);
});
