import re, glob, sys, json
OUT='/private/tmp/claude-501/-Users-nicholas-Desktop-saints-website/e5f47d61-2316-4712-8219-d4c1aba2c8b7/scratchpad/ew/out/'
MON={'jan':1,'janv':1,'feb':2,'fév':2,'fev':2,'févr':2,'mar':3,'mars':3,'apr':4,'avr':4,'may':5,'mai':5,'jun':6,'juin':6,'jul':7,'juil':7,'aug':8,'août':8,'aout':8,'sep':9,'sept':9,'oct':10,'nov':11,'dec':12,'déc':12}
HDR=re.compile(r'^###\s+([A-Z])-([FMSQ])(\d+)\s*[—–-]+\s*(.*)$')

def parse(fn):
    b=fn.split('/')[-1][:-3]
    blocks=[];cur=None;section=None
    for line in open(fn,encoding='utf-8'):
        m=HDR.match(line.rstrip('\n'))
        if m:
            cur={'batch':m.group(1),'kind':m.group(2),'num':int(m.group(3)),'title':m.group(4).strip(),'body':[]}
            cur['old']=f"{m.group(1)}-{m.group(2)}{m.group(3)}"
            blocks.append(cur); continue
        if line.startswith('## '):
            cur=None; section=line.strip(); continue
        if cur is not None: cur['body'].append(line.rstrip('\n'))
    return blocks

def field(bl,name):
    for l in bl['body']:
        s=l.strip()
        if s.lower().startswith('- '+name.lower()):
            return s.split(':',1)[1].strip() if ':' in s else ''
    return ''

def datekey(text):
    t=text.lower()
    m=re.search(r'\b(1[89]\d\d)\b',t)
    if not m: return None
    y=int(m.group(1)); pre=t[:m.start()]
    mo=0; d=0
    mm=re.search(r'(\d{1,2})?\s*(?:er)?\s*([a-zéû]{3,9})\.?\s*$',pre.strip())
    if mm:
        w=mm.group(2)
        for k,v in MON.items():
            if w.startswith(k): mo=v; break
        if mo and mm.group(1): d=int(mm.group(1))
    return (y,mo,d)

if __name__=='__main__':
    files=sorted(glob.glob(OUT+'*.md'))
    allb=[]
    for f in files: allb+=parse(f)
    kinds={}
    for b in allb: kinds[(b['batch'],b['kind'])]=kinds.get((b['batch'],b['kind']),0)+1
    print(sorted(kinds.items()))
    und=0
    for b in allb:
        if b['kind']=='F':
            k=datekey(field(b,'When'))
            if k is None: und+=1
    print('undated facts',und, 'total facts', sum(1 for b in allb if b['kind']=='F'))

def sections(fn, name):
    """return text of a '## name' section"""
    out=[];on=False
    for line in open(fn,encoding='utf-8'):
        if line.startswith('## '):
            on = line.lower().startswith('## '+name.lower())
            continue
        if on: out.append(line.rstrip('\n'))
    return '\n'.join(out).strip()

def build(dest):
    files=sorted(glob.glob(OUT+'*.md'))
    allb=[]
    for f in files: allb+=parse(f)
    order='LABCDEFGHIJK'
    F=[b for b in allb if b['kind']=='F']
    M=[b for b in allb if b['kind']=='M']
    S=[b for b in allb if b['kind']=='S']
    Q=[b for b in allb if b['kind']=='Q']
    def key(b,txt):
        k=datekey(txt)
        return (0,)+k if k else (1,9999,0,0)
    for b in F: b['k']=key(b,field(b,'When'))
    for b in M:
        t=field(b,'Period')+' '+b['title']+' '+field(b,'What was reported')
        k=datekey(b['title']) or datekey(field(b,'What was reported')) or datekey(field(b,'Period'))
        b['k']=(0,)+k if k else (1,9999,0,0)
    F.sort(key=lambda b:(b['k'],order.index(b['batch']),b['num']))
    M.sort(key=lambda b:(b['k'],order.index(b['batch']),b['num']))
    idmap={}
    for i,b in enumerate(F,1): b['new']=f'F-EW-{i:03d}'; idmap[f"{b['batch']}-{b['kind']}{b['num']}"]=b['new']
    for i,b in enumerate(M,1): b['new']=f'M-EW-{i:03d}'; idmap[f"{b['batch']}-{b['kind']}{b['num']}"]=b['new']
    for i,b in enumerate(S,1): b['new']=f'S-EW-{i:03d}'; idmap[f"{b['batch']}-{b['kind']}{b['num']}"]=b['new']
    for i,b in enumerate(Q,1): b['new']=f'Q-EW-{i:03d}'; idmap[f"{b['batch']}-{b['kind']}{b['num']}"]=b['new']
    def fix(s):
        def r(m):
            k=f"{m.group(1)}-{m.group(2)}{int(m.group(3))}"
            return idmap.get(k,m.group(0))
        return re.sub(r'\b([A-L])-([FMSQ])0*(\d+)\b',r,s)
    def render(b):
        body='\n'.join(b['body']).rstrip()
        body=re.sub(r'\n-{3,}\s*$','',body).rstrip()
        return f"### {b['new']} — {fix(b['title'])}\n{fix(body)}\n- Extraction ID: {b['old']}\n"
    json.dump({'idmap':idmap},open(OUT+'../idmap.json','w'))
    return F,M,S,Q,render,fix
