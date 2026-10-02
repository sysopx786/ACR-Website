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
// Navigation links are injected below, so delegate clicks from the mobile panel.
mobile?.addEventListener("click",event=>{
  if(event.target.closest("a"))closeMobileMenu();
});

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

// Shared bilingual navigation, identical on every page (desktop and mobile).
// Links use the GitHub Pages project prefix to avoid root-path 404s.
const navSpanish=document.documentElement.lang.toLowerCase().startsWith("es")||location.pathname.startsWith("/ACR-Website/es/");
const navRoot="/ACR-Website/"+(navSpanish?"es/":"");
const navLabels=navSpanish?{
  home:"Inicio",services:"Servicios",process:"Nuestro proceso",results:"Resultados",
  resultOverview:"Antes y después",areas:"Zonas de servicio",about:"Acerca de",
  contact:"Contacto",fire:"Fuego y humo",water:"Agua e inundaciones",
  restore:"Qué restauramos",professionals:"Para profesionales",cases:"Casos reales",
  chester:"Condado de Chester",aboutUs:"Sobre ACR",faq:"Preguntas frecuentes",reviews:"Reseñas",
  caseNames:["Equipo de bomberos","Vestido de novia","Uniformes y delantales de chef","Chaqueta de cuero","Ropa de cama y textiles","Colcha de retazos"]
}:{
  home:"Home",services:"Services",process:"Our Process",results:"Results",
  resultOverview:"Before & After",areas:"Service Areas",about:"About",
  contact:"Contact",fire:"Fire & Smoke",water:"Water & Flood",
  restore:"What We Restore",professionals:"For Professionals",cases:"Case Studies",
  chester:"Chester County",aboutUs:"About ACR",faq:"FAQs",reviews:"Reviews",
  caseNames:["Firefighter Turnout Gear","Wedding Gown","Chef Uniforms & Aprons","Leather Jacket","Bedding & Textiles","Patchwork Quilt"]
};
const navCaseSlugs=["firefighter-turnout-gear","wedding-gown","chef-uniforms-aprons","leather-jacket","bedding-textiles","patchwork-quilt"];
const navLink=(label,url,cls="")=>'<a'+(cls?' class="'+cls+'"':'')+' href="'+url+'">'+label+'</a>';
const navGroup=(label,items)=>'<details class="nav-group"><summary>'+label+'</summary><div class="nav-dropdown">'+items.join("")+'</div></details>';
const navEntries=[
  navLink(navLabels.home,navRoot),
  navGroup(navLabels.services,[
    navLink(navLabels.fire,navRoot+"fire-smoke-damage-clothing-restoration/"),
    navLink(navLabels.water,navRoot+"water-flood-damage-textile-restoration/"),
    navLink(navLabels.restore,navRoot+"what-we-restore/")
  ]),
  navLink(navLabels.professionals,navRoot+"for-professionals/"),
  navLink(navLabels.process,navRoot+"our-process/"),
  navGroup(navLabels.results,[
    navLink(navLabels.resultOverview,navRoot+"results/"),
    '<span class="nav-subheading">'+navLabels.cases+'</span>',
    ...navCaseSlugs.map((slug,i)=>navLink(navLabels.caseNames[i],navRoot+"case-studies/"+slug+"/"))
  ]),
  navGroup(navLabels.areas,[
    navLink(navLabels.chester,navRoot+"chester-county-clothing-restoration/")
  ]),
  navGroup(navLabels.about,[
    navLink(navLabels.aboutUs,navRoot+"about/"),
    navLink(navLabels.faq,navRoot+"faq/"),
    navLink(navLabels.reviews,navRoot+"#google-reviews")
  ]),
  navLink(navLabels.contact,navRoot+"contact/")
];
document.querySelectorAll(".site-header .links,.site-header .mobile-panel").forEach(node=>{
  node.innerHTML=navEntries.join("");
});
document.querySelectorAll(".site-header .nav-group").forEach(group=>{
  group.addEventListener("toggle",()=>{
    if(group.open)group.parentElement.querySelectorAll(".nav-group").forEach(other=>{
      if(other!==group)other.open=false;
    });
  });
});
document.addEventListener("click",event=>{
  if(!event.target.closest(".site-header .nav-group"))
    document.querySelectorAll(".site-header .nav-group[open]").forEach(group=>group.open=false);
});
document.addEventListener("keydown",event=>{
  if(event.key==="Escape"){
    document.querySelectorAll(".site-header .nav-group[open]").forEach(group=>group.open=false);
    closeMobileMenu();
  }
});
