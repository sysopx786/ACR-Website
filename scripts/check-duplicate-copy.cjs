const fs=require("node:fs");
const path=require("node:path");
const root=path.resolve(__dirname,"../dist");
const errors=[];let reviewed=0;
function walk(dir){return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(dir,e.name)):[path.join(dir,e.name)]);}
const pages=walk(root).filter(p=>p.endsWith("index.html"));
const normalize=s=>s.replace(/<[^>]*>/g," ").replace(/&(?:nbsp|amp|mdash|ndash|rsquo|lsquo|quot);/g," ").replace(/\s+/g," ").trim().toLowerCase();
for(const page of pages){
 const html=fs.readFileSync(page,"utf8");
 const main=html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1];
 const name=path.relative(root,page).replaceAll(path.sep,"/");
 if(!main){errors.push(name+": missing main");continue;}
 const seen=new Map();
 for(const m of main.matchAll(/<(p|h2|h3)\b[^>]*>([\s\S]*?)<\/\1>/gi)){
  const text=normalize(m[2]);
  if(text.length<65)continue;
  if(seen.has(text))errors.push(name+": repeated long paragraph/heading: "+text.slice(0,90));
  else seen.set(text,true);
 }
 if(name.endsWith("service-areas/index.html")){
  const isEs=name.startsWith("es/");
  const phrase=isEs?"listado de condados y localidades para consultas":"county and community inquiry directory";
  if(main.toLowerCase().includes(phrase))errors.push(name+": redundant state-by-state disclaimer");
  if(!main.includes(isEs?"120 minutos (2 horas)":"120-minute (2-hour)"))errors.push(name+": two-hour estimate missing from search help");
 }
 if(name==="index.html"||name==="es/index.html"){
  if((main.match(/faq\/#q\d+/g)||[]).length!==6)errors.push(name+": expected six linked FAQ previews");
  if(main.includes('class="acr-faq-answer"'))errors.push(name+": duplicate FAQ answers on homepage");
 }
 reviewed++;
}
if(errors.length){console.error(errors.join("\n"));process.exit(1);}
console.log("PASS: "+reviewed+" canonical HTML routes without repeated long same-page paragraphs; FAQ previews and service-area notices verified.");
