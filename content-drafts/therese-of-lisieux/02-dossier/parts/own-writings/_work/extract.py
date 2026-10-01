import re,json,html,sys
def extract(fn,out):
    s=open(fn,encoding='utf-8').read()
    m=re.search(r'<script id="json-cahiers" type="application/json">(.*?)</script>',s,re.S)
    data=json.loads(m.group(1))
    with open(out,'w') as f:
        for d in data:
            keys=[k for k in d if k.startswith('content')]
            f.write(f"\n===== {d.get('page_title')} [{d.get('page_type')}]\n")
            for k in keys:
                t=d[k] or ''
                t=re.sub(r'<br\s*/?>','\n',t); t=re.sub(r'</p>','\n',t); t=re.sub(r'<[^>]+>','',t); t=html.unescape(t)
                f.write(f"--- {k}\n{t.strip()}\n")
    print(out,len(data),list(data[0].keys()))
extract(sys.argv[1],sys.argv[2])
