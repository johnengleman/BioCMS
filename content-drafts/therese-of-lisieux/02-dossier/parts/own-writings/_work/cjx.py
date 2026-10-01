import re,json,html,os,sys
out=open('cj_all.txt','w')
for fn in ['carnet-jaune','carnet-jaune-2','cj-avril-1897','cj-mai-1897','cj-juin-1897','cj-juillet-1897','cj-aout-1897','cj-septembre-1897','paroles-retrouvees']:
    s=open(f'cj/{fn}.html',encoding='utf-8').read()
    m=re.search(r'<script id="json-cahiers" type="application/json">(.*?)</script>',s,re.S)
    out.write(f"\n\n########## {fn}\n")
    if m:
        data=json.loads(m.group(1))
        for d in data:
            for k in ('content_one','content_two'):
                t=d.get(k) or ''
                t=re.sub(r'<br\s*/?>',' / ',t); t=re.sub(r'</p>','\n',t); t=re.sub(r'<[^>]+>','',t); t=html.unescape(t)
                t=re.sub(r'\n\s*\n+','\n',t).strip()
                if t: out.write(f"\n=== {d.get('page_title')} {k}\n{t}\n")
    else:
        m=re.search(r'<article class="archive-single-content post-content">(.*?)</article>',s,re.S) or re.search(r'<main.*?>(.*?)</main>',s,re.S)
        t=m.group(1)
        t=re.sub(r'<script.*?</script>','',t,flags=re.S)
        t=re.sub(r'<br\s*/?>',' / ',t); t=re.sub(r'</p>','\n',t); t=re.sub(r'<[^>]+>','',t); t=html.unescape(t)
        out.write(re.sub(r'\n\s*\n+','\n',t).strip())
