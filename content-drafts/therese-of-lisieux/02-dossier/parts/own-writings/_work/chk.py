import re,sys,unicodedata
def norm(s):
    s=s.replace('’',"'").replace('œ','oe').replace('Œ','Oe')
    s=re.sub(r'[_*]','',s)
    s=re.sub(r'\s+',' ',s).lower()
    return s
d=norm(open('/Users/nicholas/Desktop/saints-website/source-library/therese-of-lisieux/D1a-histoire-dune-ame-gutenberg-36708.txt',encoding='utf-8').read())
for p in sys.argv[1:]:
    n=norm(p); i=d.find(n)
    if i<0: print(f"ABSENT: {p}")
    else:
        line=d[:i].count('\n')
        print(f"FOUND @{i}: {p} || ...{d[max(0,i-150):i+250]}...")
