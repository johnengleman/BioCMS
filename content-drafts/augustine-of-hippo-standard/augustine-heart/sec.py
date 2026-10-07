import sys,re
d='/Users/nicholas/Desktop/saints-website/BioCMS/content-drafts/augustine-of-hippo-standard/sources/'
for ref in sys.argv[1:]:
    b=ref.split('.')[0]
    t=open(d+f'OW-S1-conf{b}-latin.txt').read()
    m=re.search(r'(?m)^'+re.escape(ref)+r'\s*$',t)
    if not m: print('NOT FOUND',ref); continue
    n=re.search(r'(?m)^\d+\.\d+\.\d+\s*$',t[m.end():])
    print('##',ref); print(t[m.end():m.end()+(n.start() if n else 3000)].strip()); print()
