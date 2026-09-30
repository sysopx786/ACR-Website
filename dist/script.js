const header=document.querySelector(".site-header");const menuBtn=document.querySelector(".menu-btn");const mobile=document.querySelector(".mobile-panel");function onScroll(){if(scrollY>30)header?.classList.add("scrolled");else header?.classList.remove("scrolled")}onScroll();addEventListener("scroll",onScroll,{passive:true});menuBtn?.addEventListener("click",()=>{const open=mobile.classList.toggle("open");menuBtn.setAttribute("aria-expanded",String(open));document.body.classList.toggle("no-scroll",open)});

const cookieBanner=document.querySelector("[data-cookie-banner]");
const cookiePanel=document.querySelector("[data-cookie-panel]");
const storage={get(){try{return localStorage.getItem("acrCookieChoice")}catch{return null}},set(value){try{localStorage.setItem("acrCookieChoice",value)}catch{}}};
function showCookieBanner(){cookieBanner?.removeAttribute("hidden")}
function closeCookieBanner(choice){storage.set(choice);cookieBanner?.setAttribute("hidden","")}
if(cookieBanner&&!storage.get())showCookieBanner();
document.querySelectorAll("[data-cookie-settings]").forEach(button=>button.addEventListener("click",showCookieBanner));
document.querySelector("[data-cookie-accept]")?.addEventListener("click",()=>closeCookieBanner("accepted"));
document.querySelector("[data-cookie-reject]")?.addEventListener("click",()=>closeCookieBanner("rejected"));
document.querySelector("[data-cookie-manage]")?.addEventListener("click",()=>{if(cookiePanel)cookiePanel.hidden=!cookiePanel.hidden});
