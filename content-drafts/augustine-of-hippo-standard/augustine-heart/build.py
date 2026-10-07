import re
d='/Users/nicholas/Desktop/saints-website/BioCMS/content-drafts/augustine-of-hippo-standard/'
t=open(d+'augustine-heart/draft.html').read()
notes=[]
def rep(m):
    notes.append(m.group(1).strip()); n=len(notes)
    return f'<sup><a href="#note-{n}" id="ref-{n}">{n}</a></sup>'
t=re.sub(r'⟦(.*?)⟧',rep,t,flags=re.S)
# notes inside blockquote paragraphs: move marker to after closing quote is fine as is
items='\n'.join(f'<li id="note-{i}">{x} <a href="#ref-{i}">↑</a></li>' for i,x in enumerate(notes,1))
t=t.rstrip()+'\n\n<h2 id="notes">Sources: Notes</h2>\n\n<ol>\n'+items+'\n</ol>\n'
open(d+'biography.html','w').write(t)
print(len(notes),'notes')
