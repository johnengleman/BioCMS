import re,json,html,sys
fn,out,letter=sys.argv[1:4]
s=open(fn,encoding='utf-8').read()
m=re.search(r'<script id="json-cahiers" type="application/json">(.*?)</script>',s,re.S)
data=json.loads(m.group(1))
with open(out,'w') as f:
    for d in data:
        num=re.search(r'(\d+)\s*$',d['page_title']).group(1).lstrip('0')
        for k,side in (('content_one','r'),('content_two','v')):
            t=d.get(k) or ''
            t=re.sub(r'<br\s*/?>',' / ',t); t=re.sub(r'</p>','\n',t); t=re.sub(r'<[^>]+>','',t); t=html.unescape(t)
            t=re.sub(r'\n\s*\n+','\n',t).strip()
            f.write(f"\n##### Ms {letter} {num}{side}\n{t}\n")
