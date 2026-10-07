import sys,re,glob
# usage: sec.py book.chap.sec ...
for ref in sys.argv[1:]:
    b,c,s=ref.split('.')
    t=open(f'sources/OW-S1-conf{b}-latin.txt').read()
    parts=re.split(r'\n\s*(\d+\.\d+\.\d+)[ \t]*\n',t)
    d={parts[i]:parts[i+1] for i in range(1,len(parts)-1,2)}
    print('###',ref); print(d.get(ref,'NOT FOUND').strip()); print()
