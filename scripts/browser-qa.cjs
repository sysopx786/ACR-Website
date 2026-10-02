const fs=require("node:fs");
const path=require("node:path");
const http=require("node:http");
const { chromium }=require("playwright");
const axePath=require.resolve("axe-core/axe.min.js");
const site=path.resolve(__dirname,"../dist"),screenshots=path.resolve(__dirname,"../qa-screenshots");
fs.mkdirSync(screenshots,{recursive:true});
const errors=[];
const types={".html":"text/html; charset=utf-8",".css":"text/css",".js":"text/javascript",".svg":"image/svg+xml",".jpg":"image/jpeg",".jpeg":"image/jpeg",".png":"image/png",".webp":"image/webp",".xml":"application/xml"};
const server=http.createServer((req,res)=>{
  let route;
  try{route=decodeURIComponent(new URL(req.url,"http://localhost").pathname);}catch{res.writeHead(400);res.end();return;}
  if(!route.startsWith("/ACR-Website/")){res.writeHead(404);res.end();return;}
  let relative=route.slice("/ACR-Website/".length);
  let p=path.join(site,relative);
  if(!p.startsWith(site)){res.writeHead(403);res.end();return;}
  try{if(fs.statSync(p).isDirectory())p=path.join(p,"index.html");}catch{}
  if(!fs.existsSync(p)){res.writeHead(404);res.end();return;}
  res.setHeader("content-type",types[path.extname(p)]||"application/octet-stream");
  fs.createReadStream(p).pipe(res);
});
const assert=(condition,message)=>{if(!condition)errors.push(message);};
(async()=>{
  await new Promise(resolve=>server.listen(0,"127.0.0.1",resolve));
  const base="http://127.0.0.1:"+server.address().port+"/ACR-Website/";
  const browser=await chromium.launch({headless:true,args:["--no-sandbox"]});
  try {
    const desktop=await browser.newPage({viewport:{width:1440,height:900}});
    const d404=[];desktop.on("response",r=>{if(r.url().startsWith(base)&&r.status()===404)d404.push(r.url());});
    await desktop.goto(base,{waitUntil:"domcontentloaded"});
    await desktop.locator(".site-header .links .nav-group").first().waitFor({state:"attached"});
    const navState=await desktop.evaluate(()=>({width:innerWidth,linksDisplay:getComputedStyle(document.querySelector(".site-header .links")).display,desktopItems:document.querySelectorAll(".site-header .links .nav-group").length,mobileDisplay:getComputedStyle(document.querySelector(".site-header .mobile-panel")).display}));
    console.log("DESKTOP NAV "+JSON.stringify(navState));
    assert((await desktop.locator("h1").count())===1,"desktop: missing H1");
    assert((await desktop.locator(".site-header .links .nav-group").count())>=3,"desktop: dropdown missing");
    assert(navState.linksDisplay!=="none","desktop: menu links are hidden at "+navState.width+"px");
    await desktop.locator(".site-header .links .nav-group summary").first().click();
    assert(await desktop.locator(".site-header .links .nav-group[open]").count()===1,"desktop: dropdown does not open");
    assert(await desktop.locator(".site-header .links .nav-group[open] a").count()>=3,"desktop: dropdown has no links");
    await desktop.screenshot({path:path.join(screenshots,"home-desktop.png")});
    const mobile=await browser.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true});
    const m404=[];mobile.on("response",r=>{if(r.url().startsWith(base)&&r.status()===404)m404.push(r.url());});
    await mobile.goto(base,{waitUntil:"domcontentloaded"});
    await mobile.locator(".site-header .mobile-panel .nav-group").first().waitFor({state:"attached"});
    const overflow=await mobile.evaluate(()=>document.documentElement.scrollWidth-window.innerWidth);
    assert(overflow<=2,"mobile: horizontal overflow "+overflow+" px");
    await mobile.locator(".menu-btn").click();
    assert(await mobile.locator(".mobile-panel.open").count()===1,"mobile: menu not visible");
    await mobile.locator(".mobile-panel .nav-group summary").first().click();
    assert(await mobile.locator(".mobile-panel .nav-group[open] a").count()>0,"mobile: services dropdown missing");
    await mobile.screenshot({path:path.join(screenshots,"home-mobile.png")});
    await mobile.goto(base+"es/results/",{waitUntil:"domcontentloaded"});
    await mobile.waitForSelector("[data-ba-slider]");
    assert(await mobile.locator("[data-ba-slider]").count()===10,"Spanish Results: expected 10 sliders");
    await mobile.locator("[data-ba-slider] input[type=range]").first().evaluate(input=>{
      input.value="70";input.dispatchEvent(new Event("input",{bubbles:true}));
    });
    const line=await mobile.locator("[data-ba-slider] .ba-line").first().evaluate(el=>el.style.left);
    assert(line==="70%","Spanish Results: slider handle did not move, saw "+line);
    await mobile.screenshot({path:path.join(screenshots,"results-mobile.png")});
    await mobile.locator("[data-lang-switch]").click();
    assert(new URL(mobile.url()).pathname==="/ACR-Website/results/","language switch: route incorrect: "+mobile.url());
    await desktop.addScriptTag({path:axePath});
    const violations=await desktop.evaluate(async()=>{
      const r=await window.axe.run(document,{runOnly:{type:"tag",values:["wcag2a","wcag2aa","wcag21a","wcag21aa"]}});
      return r.violations.map(v=>({id:v.id,impact:v.impact,count:v.nodes.length,targets:v.nodes.slice(0,30).map(n=>({target:n.target,summary:n.failureSummary?.slice(0,200)}))}));
    });
    console.log("ACCESSIBILITY FINDINGS "+JSON.stringify(violations));
    const critical=violations.filter(v=>v.impact==="critical");
    assert(critical.length===0,"axe: critical accessibility violations: "+JSON.stringify(critical));
    assert(d404.length===0&&m404.length===0,"Missing local assets: "+JSON.stringify([...d404,...m404]));
    console.log(JSON.stringify({desktop:"checked",mobile:"checked",spanishGallery:"checked",languageRouting:"checked",assets404s:d404.length+m404.length,accessibility:violations}));
  } finally {await browser.close();}
})().catch(e=>{errors.push(e.stack||String(e));}).finally(()=>{
  server.close();
  if(errors.length){console.error("FAILED "+errors.join("\n"));process.exitCode=1;}
  else console.log("BROWSER QA PASS");
});