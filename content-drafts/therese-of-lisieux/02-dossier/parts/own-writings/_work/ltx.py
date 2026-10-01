import re,html,os,sys
d=sys.argv[1]; out=sys.argv[2]
rows=[]
for fn in os.listdir(d):
    s=open(os.path.join(d,fn),encoding='utf-8').read()
    m=re.search(r'<article class="archive-single-content post-content">(.*?)</article>',s,re.S)
    if not m:
        m=re.search(r'<main.*?>(.*?)</main>',s,re.S)
    t=m.group(1) if m else ''
    t=re.sub(r'<figure.*?</figure>','',t,flags=re.S)
    t=re.sub(r'<br\s*/?>',' / ',t); t=re.sub(r'</p>|</h\d>|</li>','\n',t); t=re.sub(r'<[^>]+>','',t); t=html.unescape(t)
    t=t.replace('\xa0',' '); t=re.sub(r'[ \t]+',' ',t); t=re.sub(r'\n\s*\n+','\n',t).strip()
    title=re.search(r'<title>(.*?)</title>',s,re.S); title=html.unescape(title.group(1)).strip() if title else fn
    num=re.search(r'lt-(\d+)',fn); key=int(num.group(1)) if num else 9999
    rows.append((key,fn,title,t))
rows.sort()
with open(out,'w') as f:
    for k,fn,title,t in rows:
        f.write(f"\n##### {title}  [{fn}]\n{t}\n")
print(len(rows))
