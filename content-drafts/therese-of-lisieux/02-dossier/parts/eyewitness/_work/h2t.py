import re,html,sys
t=open(sys.argv[1],encoding='utf-8',errors='replace').read()
body=re.sub(r'<script.*?</script>|<style.*?</style>|<nav.*?</nav>','',t,flags=re.S)
body=re.sub(r'<(p|br|h[1-6]|li|div)[^>]*>','\n',body)
txt=html.unescape(re.sub(r'<[^>]+>',' ',body))
txt=re.sub(r'[ \t]+',' ',txt); txt=re.sub(r'\n\s*\n+','\n',txt)
m=txt.find(sys.argv[2]) if len(sys.argv)>2 else 0
end=txt.find('Bibliographie Actualités',m+10) if False else len(txt)
open(sys.argv[1].replace('.html','.txt'),'w').write(txt[max(m,0):])
print(len(txt[max(m,0):]))
