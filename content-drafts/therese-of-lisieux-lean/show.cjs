// usage: node show.cjs from to  (merged numbers)
const fs=require('fs');
const t=fs.readFileSync('../therese-of-lisieux/02-dossier/miracles.md','utf8');
const parts=t.split(/\n(?=### M-\d{3} )/).slice(1);
const [a,b]=[+process.argv[2],+process.argv[3]];
const cap=(s,n)=>s&&s.length>n?s.slice(0,n)+'…':s;
for(const p of parts){
  const m=p.match(/^### M-(\d{3}) — (.*)/);const n=+m[1];if(n<a||n>b)continue;
  const g=l=>{const r=p.match(new RegExp('\\n- '+l+':? ?(.*)'));return r?r[1]:''};
  console.log(`\n## M-${m[1]} | ${m[2]}`);
  console.log('Date:',g('Date'),'| Status:',g('Status label'));
  console.log('REP:',cap(g('What was reported'),+process.argv[4]||900));
  const med=g('Medical or natural facts \\(as in the sources\\)');if(med)console.log('MED:',cap(med,350));
  console.log('SRC:',cap(g('Sources cited'),260));
}
