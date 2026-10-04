const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const { chromium } = require('playwright');
const root=path.resolve(__dirname,'../dist');
const out=path.resolve(__dirname,'../qa-screenshots');
fs.mkdirSync(out,{recursive:true});
const mime={'.html':'text/html','.css':'text/css','.js':'application/javascript','.jpg':'image/jpeg','.png':'image/png','.svg':'image/svg+xml'};
const server=http.createServer((req,res)=>{
  const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
  if(!pathname.startsWith('/ACR-Website/')){res.writeHead(404);return res.end();}
  let file=path.resolve(root,pathname.slice('/ACR-Website/'.length));
  if(!file.startsWith(root+path.sep)){res.writeHead(403);return res.end();}
  if(fs.existsSync(file)&&fs.statSync(file).isDirectory())file=path.join(file,'index.html');
  if(!fs.existsSync(file)){res.writeHead(404);return res.end();}
  res.setHeader('content-type',mime[path.extname(file)]||'application/octet-stream');
  fs.createReadStream(file).pipe(res);
});
(async()=>{
 await new Promise(ok=>server.listen(0,'127.0.0.1',ok));
 const base='http://127.0.0.1:'+server.address().port+'/ACR-Website/';
 const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
 try{
  for(const lang of ['en','es']){
   for(const [device,width,height] of [['desktop',1440,900],['tablet',820,1000],['phone',390,844]]){
    const page=await browser.newPage({viewport:{width,height}});
    await page.goto(base+(lang==='es'?'es/':'')+'our-process/',{waitUntil:'load'});
    const metrics=await page.locator('.process-photo-grid > .step').evaluateAll(cards=>cards.map(card=>{
      const img=card.querySelector('img'),r=card.getBoundingClientRect(),i=img.getBoundingClientRect(),
        copy=card.querySelector('.num').getBoundingClientRect();
      return {cardWidth:r.width,imageWidth:i.width,imageHeight:i.height,imageTop:i.top,imageBottom:i.bottom,
        copyTop:copy.top,complete:img.complete,naturalWidth:img.naturalWidth,
        imageVisible:getComputedStyle(img).display!=='none',src:img.getAttribute('src')};
    }));
    if(metrics.length!==6)throw Error(lang+'/'+device+': expected 6 image cards, got '+metrics.length);
    for(const [idx,m] of metrics.entries()){
      if(!m.complete||m.naturalWidth<500)throw Error(lang+'/'+device+' image '+idx+' did not load: '+JSON.stringify(m));
      if(!m.imageVisible||m.imageWidth<m.cardWidth*0.95||m.imageHeight<140)
       throw Error(lang+'/'+device+' image '+idx+' clipped to a narrow column: '+JSON.stringify(m));
      if(m.imageBottom>m.copyTop+2)throw Error(lang+'/'+device+' photo and text overlap: '+JSON.stringify(m));
    }
    if(new Set(metrics.map(m=>m.src)).size!==6)throw Error(lang+'/'+device+': duplicate process image');
    const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth);
    if(overflow>3)throw Error(lang+'/'+device+': horizontal overflow '+overflow);
    await page.screenshot({path:path.join(out,'process-'+lang+'-'+device+'.png'),fullPage:true});
    console.log('PASS '+lang+' '+device+' '+metrics.map(m=>Math.round(m.imageWidth)).join(',')+' px image widths');
    await page.close();
   }
  }
 }finally{await browser.close();await new Promise(ok=>server.close(ok));}
})().catch(e=>{console.error(e);process.exitCode=1;server.close();});
