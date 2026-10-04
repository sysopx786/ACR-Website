// Applies verified photo selections before the GitHub Pages audit.
const fs=require('node:fs');
const root='dist/';
const asset=(name)=>'/ACR-Website/assets/'+name+'.jpg';
const stages=['assess','sort','clean','restore','finish','return'];
const descriptions={
  en:['Gloved inspection of affected textiles','Fabric items sorted by type','Commercial textile cleaning equipment','Careful treatment of delicate fabric','Professional garment finishing','Garments protected for return'],
  es:['Inspección de textiles afectados con guantes','Prendas clasificadas por tipo','Equipo de limpieza de textiles','Tratamiento cuidadoso de tela delicada','Acabado profesional de prendas','Prendas protegidas antes de su devolución']
};
const style='<style>.process-photo-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:20px}.process-photo-grid .step{display:block;border:1px solid #d4cfc5;background:#fff;padding:0}.process-photo-grid .step img{width:100%;height:230px;object-fit:cover}.process-photo-grid .step .num,.process-photo-grid .step h3,.process-photo-grid .step p{margin-left:20px;margin-right:20px}.process-photo-grid .step .num{margin-top:16px;font-size:35px}.process-photo-grid .step h3{font-size:27px}.process-photo-grid .step p{font-size:15px;margin-bottom:20px}.process-page-layout:has(.process-photo-grid){display:block;padding-block:48px}.process-page-layout:has(.process-photo-grid)>.rich-image{display:none}.process-page-layout:has(.process-photo-grid)>.process-page-content{width:100%}.water-loss-photo{margin:0;background:#eeeae2}.water-loss-photo img{width:100%;max-height:450px;object-fit:cover;display:block}.water-loss-photo figcaption{padding:10px clamp(20px,7vw,96px);font-size:13px}@media(max-width:900px){.process-photo-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}@media(max-width:600px){.process-photo-grid{grid-template-columns:1fr}}</style>';
function change(path,edit){const old=fs.readFileSync(root+path,'utf8');const updated=edit(old);if(old!==updated)fs.writeFileSync(root+path,updated)}
for(const lang of ['en','es']){
 const dir=lang==='es'?'es/':'';
 change(dir+'our-process/index.html',html=>{
   if(html.includes('process-photo-grid'))return html;
   const begin=html.indexOf('<div class="process"><div class="step">');
   const end=html.indexOf('</div><p class="copy pro-context-link">',begin);
   if(begin<0||end<0)throw new Error('Process structure changed: '+lang);
   let block=html.slice(begin,end+6);
   let index=0;
   block=block.replace(/<div class="step">/g,()=>{
      const i=index++;return '<div class="step"><img src="'+asset('process-'+stages[i])+'" loading="lazy" decoding="async" alt="'+descriptions[lang][i]+'">';
   });
   if(index!==6)throw new Error('Expected six stages: '+lang+' '+index);
   block=block.replace('class="process"','class="process process-photo-grid"');
   html=html.slice(0,begin)+block+html.slice(end+6);
   return html.replace('</head>',style+'</head>');
 });
 change(dir+'what-we-restore/index.html',html=>{
   // Show racks once as the wide photo, material detail once as the household textile card.
   return html.replace('https://images.unsplash.com/photo-1523381294911-8d3cead13475?auto=format&fit=crop&w=1400&q=82',asset('hero-garment-racks'))
   .replace('https://images.unsplash.com/photo-1604014237800-1c9102c219da?auto=format&fit=crop&w=900&q=80',asset('craft-fabric-macro'));
 });
 change(dir+'water-flood-damage-textile-restoration/index.html',html=>{
   if(html.includes('class="water-loss-photo"'))return html;
   const img='<figure class="water-loss-photo"><img src="'+asset('loss-water')+'" width="1600" height="912" alt="'+(lang==='es'?'Textiles y ropa de cama afectados por agua':'Water-damaged bedroom textiles and bedding')+'"><figcaption>'+(lang==='es'?'Textiles afectados por agua':'Household textiles affected by water damage')+'</figcaption></figure>';
   return html.replace('</section><section class="section split">','</section>'+img+'<section class="section split">').replace('</head>',style+'</head>');
 });
}
console.log('ACR restoration photo layout prepared.');
