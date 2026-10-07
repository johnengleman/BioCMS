import re
d='/Users/nicholas/Desktop/saints-website/BioCMS/content-drafts/sergius-of-radonezh-standard/'
t=open(d+'sergius-heart/draft.html').read()
notes=[]
def rep(m):
    notes.append(m.group(1)); n=len(notes)
    return f'<sup><a href="#note-{n}" id="ref-{n}">{n}</a></sup>'
out=re.sub(r'⟦[^|⟧]*\|([^⟧]*)⟧',rep,t)
assert '⟦' not in out
out=out.rstrip()+'\n\n<h2 id="notes">Sources: Notes</h2>\n<ol>\n'+''.join(f'  <li id="note-{i}">{x} <a href="#ref-{i}">↑</a></li>\n' for i,x in enumerate(notes,1))+'</ol>\n'
open(d+'biography.html','w').write(out)
print('notes',len(notes))
