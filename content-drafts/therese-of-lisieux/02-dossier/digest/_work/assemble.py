import re,glob,sys
files=sorted(glob.glob('chunk-*.md'))
ev={}; order=[]
rank={'no':0,'partial':1,'yes':2}; srank={'low':0,'medium':1,'high':2}
def parse(block):
    lines=block.split('\n'); head=lines[0][3:].split(' | ')
    slug,key,date,title=[h.strip() for h in head[:4]]
    if len(head)>4: title=' | '.join(head[3:])
    fields={}; cur=None
    for l in lines[1:]:
        m=re.match(r'^- ([A-Za-z /]+):\s*(.*)$',l)
        if m: cur=m.group(1); fields[cur]=[m.group(2)] if m.group(2) else []
        elif cur and l.strip(): fields[cur].append(l.rstrip())
    return slug,key,date,title,fields
for f in files:
    txt=open(f).read()
    for b in re.split(r'\n(?=## )','\n'+txt.strip()):
        b=b.strip()
        if not b.startswith('## '): continue
        slug,key,date,title,fl=parse(b)
        if slug not in ev:
            ev[slug]=dict(key=key,date=date,title=title,f=fl); order.append(slug)
        else:
            e=ev[slug]['f']
            for k,v in fl.items():
                if k not in e: e[k]=v; continue
                if k=='Cards':
                    a=[x.strip() for x in ' '.join(e[k]).split(',') if x.strip()]
                    for x in ' '.join(v).split(','):
                        x=x.strip()
                        if x and x not in a: a.append(x)
                    e[k]=[', '.join(a)]
                elif k=='What happened': e[k]=[' '.join(e[k])+' '+' '.join(v)]
                elif k=='New to English readers':
                    if rank.get(v[0].split()[0].strip(),0)>rank.get(e[k][0].split()[0].strip(),0): e[k]=v
                elif k=='Scene potential':
                    if srank.get(v[0].split()[0].strip(':,'),0)>srank.get(e[k][0].split()[0].strip(':,'),0): e[k]=v
                else:
                    if v and v[0].strip().lower().startswith('none') and len(v)==1: continue
                    if e[k] and e[k][0].strip().lower().startswith('none') and len(e[k])==1: e[k]=v
                    else: e[k]=e[k]+v if k=='Best details' else [' '.join(e[k])+' | '+' '.join(v)]
srt=sorted(range(len(order)),key=lambda i:(ev[order[i]]['key'],i))
out=[]
try: summ=open('summary.md').read()
except: summ='# P6 digest (1897) - period summary pending\n'
out.append(summ.rstrip()+'\n\n---\n\n## Events\n')
idmap={}
for n,i in enumerate(srt,1):
    s=order[i]; e=ev[s]; eid='E-P6-%03d'%n; idmap[s]=eid
    out.append('### %s — %s — %s'%(eid,e['date'],e['title']))
    for k in ['What happened','Cards','Best details','Evidence','Conflicts','New to English readers','Scene potential']:
        v=e['f'].get(k,['—'])
        if k=='Best details':
            out.append('- Best details:'); out.extend(v if v else ['  - —'])
        else: out.append('- %s: %s'%(k,' '.join(v)))
    out.append('')
text='\n'.join(out)
for slug in sorted(idmap,key=len,reverse=True):
    text=re.sub(r'(?<![A-Za-z0-9-])'+re.escape(slug)+r'(?![A-Za-z0-9-])',idmap[slug],text)
open('../P6.md','w').write(text)
open('idmap.txt','w').write('\n'.join('%s\t%s\t%s\t%s'%(idmap[s],ev[s]['key'],s,ev[s]['title']) for s in sorted(idmap,key=idmap.get)))
print(len(order),'events')
