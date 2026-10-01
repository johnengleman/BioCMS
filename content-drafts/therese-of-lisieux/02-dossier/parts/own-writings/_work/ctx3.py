import re,sys
exec(open('chk.py').read().split('d=norm')[0])
d=norm(open('/Users/nicholas/Desktop/saints-website/source-library/therese-of-lisieux/D1a-histoire-dune-ame-gutenberg-36708.txt',encoding='utf-8').read())
w=int(sys.argv[1])
for p in sys.argv[2:]:
    n=norm(p); i=d.find(n)
    print("=====",p, i)
    if i>=0: print(d[max(0,i-w):i+w])
