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
    const blocking=violations.filter(v=>v.impact==="critical"||v.impact==="serious");
    assert(blocking.length===0,"axe: serious or critical accessibility violations: "+JSON.stringify(blocking));

    // Dedicated English/Spanish professional pages at desktop and Android-like mobile sizes.
    const professionalResults=[];
    for(const language of ["en","es"]){
      for(const mode of ["desktop","android"]){
        const isMobile=mode==="android";
        const context=await browser.newContext({
          viewport:isMobile?{width:393,height:851}:{width:1440,height:900},
          deviceScaleFactor:isMobile?2.75:1,
          isMobile,hasTouch:isMobile,
          userAgent:isMobile?"Mozilla/5.0 (Linux; Android 15; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Mobile Safari/537.36":undefined
        });
        const page=await context.newPage(),badResponses=[],scriptErrors=[];
        page.on("response",r=>{if(r.url().startsWith(base)&&r.status()>=400)badResponses.push(r.status()+" "+r.url());});
        page.on("pageerror",e=>scriptErrors.push(String(e)));
        const target=base+(language==="es"?"es/":"")+"for-professionals/";
        const response=await page.goto(target,{waitUntil:"networkidle"});
        assert(response.status()===200,language+" "+mode+": page HTTP "+response.status());
        assert(await page.locator('html').getAttribute("lang")===language,language+" "+mode+": wrong HTML language");
        assert(await page.locator("main h1").count()===1,language+" "+mode+": expected one H1");
        assert(await page.locator(".pro-partner-card").count()===2,language+" "+mode+": two partner panels expected");
        assert(await page.locator(".claims-step").count()===6,language+" "+mode+": six workflow steps expected");
        assert(await page.locator(".pro-faq-item").count()===8,language+" "+mode+": eight FAQs expected");
        assert(await page.locator(".pro-faq-group").count()===2,language+" "+mode+": two FAQ categories expected");
        assert(await page.locator("[data-ba-slider]").count()===3,language+" "+mode+": three proof sliders expected");
        const navigation=isMobile?page.locator(".mobile-panel"):page.locator(".site-header .links");
        if(isMobile)await page.locator(".menu-btn").click();
        assert(await navigation.locator(':scope > a[href$="/for-professionals/"]').count()===1,language+" "+mode+": professional navigation must be top-level");
        assert(await navigation.locator(".nav-group a[href$='/for-professionals/']").count()===0,language+" "+mode+": professionals still in submenu");
        if(isMobile){
          assert(await page.locator(".mobile-panel.open").count()===1,language+" "+mode+": mobile menu did not open");
          await page.locator(".menu-btn").click();
        }else{
          await navigation.locator(".nav-group summary").first().click();
          assert(await navigation.locator(".nav-group[open]").count()===1,language+" desktop: nav dropdown did not open");
          await page.keyboard.press("Escape");
        }
        const faq=page.locator(".pro-faq-item").first();
        await faq.locator("summary").focus();
        await page.keyboard.press("Enter");
        assert(await faq.evaluate(e=>e.open),language+" "+mode+": FAQ did not open with Enter");
        await page.keyboard.press("Enter");
        assert(!(await faq.evaluate(e=>e.open)),language+" "+mode+": FAQ did not close with Enter");
        const step=page.locator(".claims-step").nth(1);
        await step.locator("summary").click();
        assert(await step.locator("details").evaluate(e=>e.open),language+" "+mode+": workflow accordion did not open");
        const slider=page.locator("[data-ba-slider]").first();
        await slider.locator("input[type=range]").evaluate(el=>{el.value="75";el.dispatchEvent(new Event("input",{bubbles:true}));});
        assert(await slider.locator(".ba-line").evaluate(e=>e.style.left)==="75%",language+" "+mode+": slider line not at 75%");
        assert((await slider.locator(".ba-before").evaluate(e=>e.style.clipPath)).includes("25%"),language+" "+mode+": damaged-before clipping incorrect");
        await slider.locator("input[type=range]").focus();
        await page.keyboard.press("ArrowRight");
        assert(Number(await slider.locator("input[type=range]").inputValue())>75,language+" "+mode+": keyboard slider not responding");
        const imageState=await page.locator(".pro-proof img").evaluateAll(nodes=>nodes.map(i=>({src:i.getAttribute("src"),loaded:i.complete&&i.naturalWidth>0})));
        // Force images into view so lazy images are actually requested, then verify.
        for(const card of await page.locator(".pro-proof-card").all())await card.scrollIntoViewIfNeeded();
        await page.waitForTimeout(500);
        const imageLoaded=await page.locator(".pro-proof img").evaluateAll(nodes=>nodes.every(i=>i.complete&&i.naturalWidth>0));
        assert(imageLoaded,language+" "+mode+": missing before/after image(s) "+JSON.stringify(imageState));
        const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth);
        assert(overflow<=2,language+" "+mode+": horizontal overflow "+overflow+"px");
        const localLinks=await page.locator('a[href^="/ACR-Website/"]').evaluateAll(nodes=>[...new Set(nodes.map(n=>n.getAttribute("href").split("#")[0]).filter(Boolean))]);
        for(const href of localLinks){
          const linkResp=await context.request.get("http://127.0.0.1:"+server.address().port+href);
          assert(linkResp.status()<400,language+" "+mode+": broken link "+href+" ("+linkResp.status()+")");
        }
        const localeHref=await page.locator("[data-lang-switch]").getAttribute("href");
        assert(localeHref==="/ACR-Website/"+(language==="es"?"":"es/")+"for-professionals/",language+" "+mode+": language switch URL wrong "+localeHref);
        await page.addScriptTag({path:axePath});
        const accessibility=await page.evaluate(async()=>{const r=await window.axe.run(document,{runOnly:{type:"tag",values:["wcag2a","wcag2aa","wcag21a","wcag21aa"]}});return r.violations.map(v=>({id:v.id,impact:v.impact,targets:v.nodes.slice(0,6).map(n=>n.target)}));});
        const blockingIssues=accessibility.filter(v=>v.impact==="critical"||v.impact==="serious");
        assert(blockingIssues.length===0,language+" "+mode+": blocking accessibility issues "+JSON.stringify(blockingIssues));
        assert(scriptErrors.length===0,language+" "+mode+": JavaScript errors "+JSON.stringify(scriptErrors));
        assert(badResponses.length===0,language+" "+mode+": HTTP errors "+JSON.stringify(badResponses));
        await page.screenshot({path:path.join(screenshots,"professionals-"+language+"-"+mode+".png"),fullPage:true});
        professionalResults.push({language,mode,sections:2,faq:8,slider:3,workflow:6,localLinks:localLinks.length,overflow,accessibility,scriptErrors,badResponses});
        await context.close();
      }
    }
    console.log("PROFESSIONAL QA "+JSON.stringify(professionalResults));


    // Regression: check every published English/Spanish and legacy HTML route.
    // The shared stylesheet must keep the main content compact without overflow.
    const routeFiles=[];
    const visit=(folder,relative="")=>{
      for(const entry of fs.readdirSync(folder,{withFileTypes:true})){
        const name=path.posix.join(relative,entry.name);
        if(entry.isDirectory())visit(path.join(folder,entry.name),name);
        else if(entry.name.endsWith(".html"))routeFiles.push(name);
      }
    };
    visit(site);
    const spacingResults=[];
    const auditContext=await browser.newContext({viewport:{width:393,height:851},isMobile:true,hasTouch:true});
    await auditContext.route(/^https:\/\/(fonts\.googleapis\.com|fonts\.gstatic\.com|images\.unsplash\.com)\//,route=>route.abort());
    const auditPage=await auditContext.newPage();
    for(const relative of routeFiles){
      const slug=relative.endsWith("/index.html")?relative.slice(0,-10):relative;
      const pathName=slug==="index.html"?"":slug;
      const response=await auditPage.goto(base+pathName,{waitUntil:"domcontentloaded"});
      assert(response&&response.status()===200,"sitewide: unable to load "+relative);
      await auditPage.waitForFunction(()=>[...document.styleSheets].some(s=>s.href?.includes("/ACR-Website/styles.css")),null,{timeout:10000}).catch(()=>{});
      const metric=await auditPage.evaluate(()=>{
        const main=document.querySelector("main");
        const sections=[...(main?.children||[])].filter(el=>el.matches("section.section"));
        return {
          overflow:Math.round(document.documentElement.scrollWidth-innerWidth),
          hasCss:[...document.querySelectorAll('link[rel="stylesheet"]')].some(el=>el.href.includes("/ACR-Website/styles.css")),
          largestSectionPadding:Math.max(0,...sections.map(el=>Math.max(parseFloat(getComputedStyle(el).paddingTop)||0,parseFloat(getComputedStyle(el).paddingBottom)||0))),
          duplicateHeroBrand:!!main?.querySelector(".hero .eyebrow, .pro-redesign-hero .eyebrow")?.textContent.trim().match(/^American Clothing Restoration$/i),
          textOnlySplitGaps:[...document.querySelectorAll("main > section.section.split")].filter(el=>{
            return el.children[0]?.querySelector(":scope > h2")&&!el.children[0]?.querySelector(":scope > p")&&el.children[1]?.querySelector(":scope > p");
          }).map(el=>{
            const heading=el.children[0].querySelector(":scope > h2");
            const paragraph=el.children[1].querySelector(":scope > p");
            const following=el.nextElementSibling;
            const nextHeading=following?.matches("section.section.split")?following.children[0]?.querySelector(":scope > h2"):null;
            return {
              within:Math.round(paragraph.getBoundingClientRect().top-heading.getBoundingClientRect().bottom),
              toNext:nextHeading?Math.round(nextHeading.getBoundingClientRect().top-paragraph.getBoundingClientRect().bottom):null
            };
          })
        };
      });
      assert(metric.hasCss,"sitewide: shared stylesheet absent "+relative);
      assert(metric.overflow<=2,"sitewide: horizontal overflow "+metric.overflow+"px on "+relative);
      assert(metric.largestSectionPadding<=72,"sitewide: excess section padding "+metric.largestSectionPadding+"px on "+relative);
      assert(!metric.duplicateHeroBrand,"sitewide: repeated brand hero eyebrow on "+relative);
      assert(metric.textOnlySplitGaps.every(g=>g.within<=23 && (g.toNext===null || g.toNext<=45)),
        "sitewide: stacked text blocks still too far apart on "+relative+": "+JSON.stringify(metric.textOnlySplitGaps));
      if(["fire-smoke-damage-clothing-restoration/index.html","es/fire-smoke-damage-clothing-restoration/index.html","water-flood-damage-textile-restoration/index.html","es/water-flood-damage-textile-restoration/index.html"].includes(relative)){
        console.log("TEXT SPACING EXAMPLE "+JSON.stringify({route:relative,gaps:metric.textOnlySplitGaps}));
        await auditPage.screenshot({path:path.join(screenshots,"spacing-"+relative.replace(/[\\/.]/g,"-")+".png"),fullPage:true});
      }
      spacingResults.push({route:relative,...metric});
    }
    await auditContext.close();
    console.log("SITEWIDE SPACING QA "+JSON.stringify({checked:spacingResults.length,maxOverflow:Math.max(...spacingResults.map(x=>x.overflow)),maxSectionPadding:Math.max(...spacingResults.map(x=>x.largestSectionPadding)),maxTextBlockGap:Math.max(0,...spacingResults.flatMap(x=>x.textOnlySplitGaps.map(g=>Math.max(g.within,g.toNext||0))))}));

    assert(d404.length===0&&m404.length===0,"Missing local assets: "+JSON.stringify([...d404,...m404]));
    console.log(JSON.stringify({desktop:"checked",mobile:"checked",spanishGallery:"checked",languageRouting:"checked",assets404s:d404.length+m404.length,accessibility:violations}));
  } finally {await browser.close();}
})().catch(e=>{errors.push(e.stack||String(e));}).finally(()=>{
  server.close();
  if(errors.length){console.error("FAILED "+errors.join("\n"));process.exitCode=1;}
  else console.log("BROWSER QA PASS");
});