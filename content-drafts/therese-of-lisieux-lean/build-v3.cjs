const fs=require('fs');
const esc=s=>s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
const slugify=s=>s.normalize('NFD').replace(/[̀-ͯ]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,60).replace(/-$/,'');
const CARMEL='https://archives.carmeldelisieux.fr/';
const SEARCH=q=>'https://archive.org/search?query='+encodeURIComponent(q);
const M={
 T24:['Taylor, <em>Sœur Thérèse of Lisieux</em> (1924)','https://archive.org/details/sceurthereseofli0000tnta'],
 T27:['Taylor, <em>Saint Thérèse of Lisieux, the Little Flower of Jesus</em> (1927 text)','https://archive.org/details/bwb_Y0-BYN-997'],
 LAV:['Laveille, <em>St Thérèse of the Child Jesus</em> (Benziger, 1928)',SEARCH('Laveille Therese Child Jesus 1928')],
 DET:['de Teil, <em>The Cause of Beatification of the Little Flower of Jesus</em> (1913)',SEARCH('de Teil Cause of Beatification Little Flower of Jesus')],
 DOL:['Dolan, <em>The Living Sisters of the Little Flower</em> (1926)',SEARCH('Dolan Living Sisters of the Little Flower')],
 FND:['<em>The Foundation of the Carmel of Lisieux</em> (1913)',SEARCH('Foundation of the Carmel of Lisieux 1913')],
 PO:['Ordinary Process testimony (1910–11)',CARMEL+'naissance-dune-sainte/les-proces-la-sainte-de-therese/le-proces-ordinaire/les-temoignages-du-proces-ordinaire/'],
 PA:['Apostolic Process testimony (1915–17)',CARMEL+'naissance-dune-sainte/les-proces-la-sainte-de-therese/le-proces-apostolique/les-temoignages-du-proces-apostolique/'],
 AAS15:['<em>Acta Apostolicae Sedis</em> 15 (1923)','https://www.vatican.va/archive/AAS/index_it.htm'],
 AAS17:['<em>Acta Apostolicae Sedis</em> 17 (1925)','https://www.vatican.va/archive/AAS/index_it.htm'],
};
const a=(t,u)=>`<a href="${u}">${t}</a>`;
const SHORT={T24:'Taylor 1924',T27:'Taylor 1927',LAV:'Laveille 1928',DET:'de Teil 1913',DOL:'Dolan 1926',FND:'Foundation of the Carmel 1913',PO:'Ordinary Process',PA:'Apostolic Process',AAS15:'AAS 15 (1923)',AAS17:'AAS 17 (1925)'};
function srcLine(raw){
  return esc(raw).replace(/\{(\w+)\}/g,(m,k)=>SHORT[k]);
}
function srcLineOld(raw){
  let had=false;
  let s=esc(raw).replace(/\{(\w+)\}/g,(m,k)=>{had=true;return a(...M[k]).replace(/&amp;/g,'&')});
  // esc turned <em> in macros? macros inserted after esc, fine
  if(!had){
    let u=CARMEL;
    if(/Manuscript A/.test(raw))u+='archive/manuscrit-a/';
    else if(/Manuscript B/.test(raw))u+='archive/manuscrit-b/';
    else if(/Manuscript C/.test(raw))u+='archive/manuscrit-c/';
    else if(/Letters? LT|letter|CF \d|correspondence/i.test(raw))u+='correspondance/';
    else if(/louisandzeliemartin/.test(raw))u='https://www.louisandzeliemartin.org/';
    else if(/Genealogy|genealogy/.test(raw))u+='environnement-familial/histoire-et-genealogie-des-martin-et-guerin/';
    s+=' ('+a('link',u)+')';
  }
  return s;
}
// parse dossier statuses
const dos=fs.readFileSync('../therese-of-lisieux/02-dossier/miracles.md','utf8');
const status={};
for(const p of dos.split(/\n(?=### M-\d{3} )/).slice(1)){
  const n=+p.match(/^### M-(\d{3})/)[1];
  status[n]=p.match(/\n- Status label: (.*)/)[1].trim();
}
const entries=[];
for(const f of fs.readdirSync('mir').filter(x=>/^c\d+\.txt$/.test(x)).sort()){
  for(const blk of fs.readFileSync('mir/'+f,'utf8').split(/^=== /m).slice(1)){
    const lines=blk.trim().split('\n');
    const [num,title]=lines[0].split(' | ');
    const src=lines.filter(l=>l.startsWith('@ ')).map(l=>l.slice(2)).join('; ');
    const body=lines.slice(1).filter(l=>!l.startsWith('@ ')).join(' ').trim();
    entries.push({n:+num,title:title.trim(),body,src});
  }
}
entries.sort((x,y)=>x.n-y.n);
if(entries.length!==322)throw Error('count '+entries.length);
const groups=[
 ['approved','Miracles approved by the Church',1,4,'<p>These four healings were examined by the Church and approved, two for the beatification in 1923 and two for the canonization in 1925. Each decree used the diagnoses of medical experts appointed by the Congregation of Rites.</p>'],
 ['examined','Cases examined by a Church inquiry',5,9,'<p>These cases were examined by a canonical inquiry or tribunal and were not approved as miracles. Four of the five concern one Carmel at Gallipoli.</p>'],
 ['articles','Cases presented to the Church process, 1901 to 1915',10,78,'<p>These cases were listed either in the vice-postulator&#8217;s Articles of the Cause (1910) or in Mère Agnès&#8217;s 1915 summary of 54 dossiers. They were presented to the process as cases and were not approved.</p>'],
 ['life','During Thérèse&#8217;s life, 1873 to 1897',79,129,'<p>These accounts concern events before her death. Many are her own reports of answered prayer, dreams and signs, and some are family reports. None is attributed to her as a miracle worker in her lifetime, and each keeps the label of who reported it.</p>'],
 ['after','After Thérèse&#8217;s death, 1897 to the present',130,295,'<p>These accounts are sworn testimony at the Church processes, records kept by the Carmel, and popular reports. They run from the days around her death through the First World War, the beatification and canonization, and the later letters printed by Taylor.</p>'],
 ['family','Appendix 1: family and earlier events not attributed to Thérèse',296,308,'<p>These events concern her family and the Carmel&#8217;s foundress, and the two miracles approved for the beatification and canonization of her parents. They are listed so that readers can see what belongs to the family and what belongs to Thérèse.</p>'],
 ['summary','Appendix 2: collective and summary reports, and predictions',309,322,'<p>These entries are summaries, predictions and statements about many events, and not single events. They are kept because the sources treat them as part of the record.</p>'],
];
let html='<p>This list gathers the accounts attributed to Thérèse of Lisieux, with their sources and their status. Each entry says who reported the event and how the report was treated. It makes no claim that any event was a miracle, and it does not dismiss any of them. Only the four healings in the first group were approved by the Church. Every other entry is a report, and the label under each one says only who made it. Where the sources disagree, the entry says so, and a key to the sources follows the last entry. The list has 322 entries, drawn from the Church decrees, the sworn testimony of the processes, Taylor, Laveille, de Teil, and Thérèse&#8217;s own writings.</p>\n';
const counts={};
for(const [id,h,lo,hi,intro] of groups){
  html+=`<h2 id="${id}">${h}</h2>\n${intro}\n`;
  counts[h]=0;
  for(const e of entries.filter(e=>e.n>=lo&&e.n<=hi)){
    counts[h]++;
    const id3='m'+String(e.n).padStart(3,'0');
    html+=`<h3 id="${id3}">${esc(e.title)}</h3>\n<p>${esc(e.body)}</p>\n<p>Status: ${esc(status[e.n])}.</p>\n<p>Source: ${srcLine(e.src)}.</p>\n`;
  }
}
html+='<h2 id="source-key">Key to the sources</h2>\n<p>Each entry ends with a short source line. The sources named in those lines are listed here with links.</p>\n<ul>\n';
for(const k of Object.keys(M)){html+='<li>'+a(M[k][0],M[k][1])+'</li>\n'}
html+='<li>'+a('Manuscripts A, B and C, the letters, and the Yellow Notebook, Carmel of Lisieux archives',CARMEL)+'</li>\n<li>'+a('The cause of Louis and Zélie Martin','https://www.louisandzeliemartin.org/')+'</li>\n</ul>\n<p>Taylor and Laveille give page numbers of the scans, and the depositions give the folio numbers of the process copies. The Carmel&#8217;s own page numbers may differ.</p>\n';
fs.writeFileSync('miracles-v3.html',html);
fs.writeFileSync('miracle-counts.json',JSON.stringify(counts,null,1));
console.log(counts,html.length);
