#!/usr/bin/env python3
"""W1 "One bar" wireframe generator (home + saint page, one responsive file each).

Run:  python3 gen.py            -> home.html, saint.html
      python3 gen.py artboards  -> artboard-*.html (legend column beside the page shots)
Data comes from ../../data (saints.json, therese-of-lisieux.json) through build.py helpers.
"""
import html
import json
import os
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
PROTO = os.path.abspath(os.path.join(HERE, '..', '..'))
sys.path.insert(0, PROTO)
import build as B  # noqa: E402  (helpers only; build.py is not edited)

E = html.escape
SHOTS = os.path.join(PROTO, 'shots', 'round1')
IMG = '../../'                       # prototypes/ from wireframes/w1/
PHOTO = '../../../public/images/hero/galilee.webp'
CREDIT = 'Sea of Galilee · Grant Barclay · CC BY 2.0'
CREDIT_URL = 'https://creativecommons.org/licenses/by/2.0/'
MONTHS = B.MONTHS
NAV = B.NAV

# ------------------------------------------------------------------ data
META = {k: dict(v) for k, v in B.META.items()}
META['padre-pio']['short'] = 'St. Pio of Pietrelcina'       # spec A6

# Categories: case-normalised, non-empty, <= 60 % of saints (spec A11).
def cats(s):
    raw = json.loads(s['cats']) if isinstance(s['cats'], str) else s['cats']
    out = set()
    for c in raw:
        c = c.replace('_', ' ').strip()
        out.add(c[:1].upper() + c[1:])
    return out


COUNT = {}
for s in B.SAINTS:
    for c in cats(s):
        COUNT[c] = COUNT.get(c, 0) + 1
SHOWN = [c for c in ['Bishops', 'Hermits', 'Ascetics', 'Nuns', 'Holy Women', 'Missionaries',
                     'Converts', 'Fathers of the Church', 'Confessors']
         if 0 < COUNT.get(c, 0) <= 0.6 * len(B.SAINTS)]
ROW_CATS = SHOWN[:6]                  # desktop facet row (zone 660)


def md(d):
    return (int(d[5:7]), int(d[8:10])) if d else None


def feast_line(s):
    """Both mode: one date if one tradition or same date, else 'Feast Aug 28 · Orth. Jun 15'."""
    c, o = md(s['feast_c']), md(s['feast_o'])
    f = lambda t: f'{MONTHS[t[0] - 1]} {t[1]}'
    if c and o and c != o:
        return f'Feast {f(c)} · Orth. {f(o)}', True
    return f'Feast {f(c or o)}', False


FEAST_MONTHS = set()
for s in B.SAINTS:
    for d in (s['feast_c'], s['feast_o']):
        if d:
            FEAST_MONTHS.add(md(d)[0])
CUR_MONTH = 10                         # today is 2026-10-07

# ------------------------------------------------------------------ svg
SEARCH = ('<svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" '
          'stroke-linecap="round" aria-hidden="true"><circle cx="9" cy="9" r="6"/><path d="m14 14 4 4"/></svg>')
CHEV = ('<svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="1.6" '
        'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m2 3.5 3 3 3-3"/></svg>')
MENU = ('<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" '
        'stroke-linecap="round" aria-hidden="true"><path d="M3 6h14M3 10h14M3 14h14"/></svg>')

# ------------------------------------------------------------------ css
CSS = r"""
:root{--ink:#111;--ink2:#555;--mute:#767676;--line:#E2E2E2;--chip:#F1F1F1;--panel:#F5F5F5;--g:26px}
*{box-sizing:border-box}
html{-webkit-text-size-adjust:100%}
body{margin:0;font-family:Inter,system-ui,sans-serif;font-size:14px;line-height:1.45;color:var(--ink);background:#808080;
  font-feature-settings:"cv11","ss01";-webkit-font-smoothing:antialiased;overflow-x:hidden}
a{color:inherit;text-decoration:none}
button{font:inherit;color:inherit;background:none;border:0;padding:0;cursor:pointer}
img{display:block}
.photo{position:fixed;left:0;top:0;width:100%;height:100vh;z-index:-1;background:#808080 url(PHOTO) center 38%/cover no-repeat;filter:grayscale(1)}
.photo::after{content:"";position:absolute;left:0;right:0;bottom:0;height:18%;background:linear-gradient(rgb(128 128 128/0),#808080)}
.credit{font-size:11.5px;line-height:16px;color:rgb(255 255 255/.85);white-space:nowrap;letter-spacing:.005em}
.credit a:hover{text-decoration:underline}

/* header */
.hdr{position:sticky;top:0;z-index:20;height:56px;display:flex;align-items:center;padding:0 var(--g);
  background:rgb(255 255 255/.8);-webkit-backdrop-filter:blur(14px) saturate(1.2);backdrop-filter:blur(14px) saturate(1.2);
  border-bottom:1px solid rgb(0 0 0/.06)}
.logo{font-size:20px;font-weight:700;letter-spacing:-.02em;white-space:nowrap;flex:none;margin-right:40px}
.mark{display:none}
.nav{display:flex;gap:26px;font-size:14px;font-weight:500;color:#2b2b2b}
.nav a{position:relative;line-height:56px}
.nav a.on{color:var(--ink);font-weight:600}
.nav a.on::after{content:"";position:absolute;left:0;right:0;bottom:0;height:2px;background:var(--ink)}
.sp{flex:1}
.search{display:flex;align-items:center;gap:9px;width:320px;height:36px;padding:0 14px;border-radius:18px;background:#fff;
  box-shadow:inset 0 0 0 1px #D6D6D6;color:#555;font-size:14px}
.search svg{flex:none;color:#111}
.btn{display:inline-flex;align-items:center;justify-content:center;height:36px;padding:0 16px;border-radius:8px;
  background:var(--ink);color:#fff;font-size:14px;font-weight:600;white-space:nowrap}
.hdr .btn{width:112px;margin-left:12px}
.menu{display:none}

/* facet row (desktop, on the photo, not sticky) */
.facets{height:44px;display:flex;align-items:center;padding:0 var(--g);gap:22px;position:relative}
.chips{display:flex;gap:6px;width:660px;flex:none}
.chip{display:inline-flex;align-items:center;gap:5px;height:30px;padding:0 10px;border-radius:15px;background:rgb(255 255 255/.92);
  font-size:13px;font-weight:500;color:var(--ink);white-space:nowrap;box-shadow:0 1px 2px rgb(0 0 0/.08)}
.chip i{font-style:normal;color:var(--ink2);font-variant-numeric:tabular-nums}
.chip.on{background:var(--ink);color:#fff}.chip.on i{color:rgb(255 255 255/.72)}
.months{display:flex;width:408px;height:30px;flex:none;border-radius:15px;background:rgb(255 255 255/.92);box-shadow:0 1px 2px rgb(0 0 0/.08);overflow:hidden}
.months a{position:relative;width:34px;display:flex;align-items:center;justify-content:center;font-size:12.5px;font-weight:500;color:var(--ink)}
.months a.off{color:var(--mute);font-weight:400;pointer-events:none}
.months a.now::after{content:"";position:absolute;bottom:3px;left:50%;width:4px;height:4px;margin-left:-2px;border-radius:2px;background:var(--ink)}
.months a:hover{background:var(--chip)}
.facets .credit{flex:1;text-align:right;align-self:stretch;display:flex;align-items:center;justify-content:flex-end;
  margin-right:calc(-1 * var(--g));padding-right:var(--g);
  background:linear-gradient(to left,rgb(0 0 0/.7),rgb(0 0 0/.68) 80%,rgb(0 0 0/0))}

/* masonry */
.wall{display:flex;gap:12px;align-items:flex-start;padding:12px var(--g) 0}
.col{flex:1;min-width:0;display:flex;flex-direction:column;gap:12px}
.card{display:block;background:#fff;border-radius:10px;overflow:hidden;
  box-shadow:0 1px 2px rgb(0 0 0/.07),0 10px 24px -14px rgb(0 0 0/.35)}
.card .im{width:100%;height:112px;object-fit:cover;filter:grayscale(1);background:#ddd}
.card .id{padding:14px 14px 0}
.kick{font-size:12.5px;font-weight:500;color:var(--ink2);line-height:1.35}
.card h3{margin:4px 0 0;font-size:20px;line-height:1.2;font-weight:700;letter-spacing:-.015em}
.card .sum{margin:8px 0 0;padding:0 14px;font-size:14.5px;line-height:1.5;color:var(--ink)}
.card .meta{display:flex;justify-content:space-between;align-items:center;height:30px;margin:12px 14px 6px;
  border-top:1px solid var(--line);font-size:12.5px;color:var(--ink2);font-variant-numeric:tabular-nums}
.card .pmeta{display:none}
.pfilters,.pcredit{display:none}

/* footer */
.foot{margin-top:32px;background:#fff;border-top:1px solid var(--line)}
.foot .in{height:64px;display:flex;align-items:center;padding:0 var(--g);gap:24px}
.trad{display:inline-flex;padding:3px;border-radius:9px;background:var(--chip);gap:2px}
.trad button{height:28px;padding:0 13px;border-radius:7px;font-size:13px;font-weight:500;color:var(--ink2)}
.trad button.on{background:var(--ink);color:#fff}
.foot nav{display:flex;gap:24px;font-size:14px;color:var(--ink2)}

/* ---------------- saint page ---------------- */
.cstrip{height:16px;display:flex;justify-content:flex-end;padding:0 24px}
.cstrip .credit{padding:0 8px;margin-right:12px;border-radius:0 0 6px 6px;background:rgb(0 0 0/.58)}
.sheet{margin:0 24px;background:#fff;border-radius:16px;padding:40px;box-shadow:0 20px 50px -30px rgb(0 0 0/.5)}
.sgrid{display:grid;grid-template-columns:minmax(0,1fr) 300px;column-gap:48px;align-items:start}
.sgrid>.main{grid-column:1;grid-row:1}
.sgrid>.stream{grid-column:1;grid-row:2}
.sgrid>.facts{grid-column:2;grid-row:1/span 2}
.top{display:grid;grid-template-columns:200px minmax(0,1fr);gap:32px;align-items:start}
.portrait img{width:200px;height:312px;object-fit:contain;border-radius:4px;filter:grayscale(1)}
.portrait figcaption{margin-top:8px;font-size:12px;line-height:1.35;color:var(--ink2)}
figure{margin:0}
.ident .kick{margin-top:2px}
h1{margin:6px 0 16px;font-size:48px;line-height:1.05;font-weight:700;letter-spacing:-.025em}
.lead{margin:0;max-width:680px;font-size:17.5px;line-height:1.6;color:var(--ink)}
.tabs{position:sticky;top:56px;z-index:5;display:flex;gap:28px;height:44px;margin-top:32px;background:#fff;
  border-bottom:1px solid var(--line);font-size:14px;font-weight:600;color:var(--ink2)}
.tabs a{display:flex;align-items:center;margin-bottom:-1px;border-bottom:2px solid transparent}
.tabs a.on{color:var(--ink);border-color:var(--ink)}
h2{font-size:26px;line-height:1.2;font-weight:600;letter-spacing:-.015em;margin:0}
.h2row{display:flex;align-items:baseline;justify-content:space-between;margin:48px 0 14px;padding-bottom:10px;border-bottom:1px solid var(--line)}
section:first-of-type .h2row{margin-top:32px}
.more{font-size:14px;font-weight:600;white-space:nowrap}
.more:hover,.mrow:hover b{text-decoration:underline}
.chap{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:1fr 1fr;grid-template-rows:repeat(6,38px);grid-auto-flow:column;column-gap:32px}
.chap li{display:flex;align-items:center;gap:14px;border-bottom:1px solid var(--line);font-size:15px;white-space:nowrap;overflow:hidden}
.chap li b{width:20px;flex:none;font-size:12.5px;font-weight:500;color:var(--mute);font-variant-numeric:tabular-nums}
.themes{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(3,1fr);column-gap:32px}
.themes li{height:38px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid var(--line);font-size:15px}
.themes li span{color:var(--mute)}
.quotes{display:grid;grid-template-columns:1fr 1fr;gap:32px;margin-top:28px}
.quotes blockquote{margin:0;font-size:20px;line-height:1.4;font-weight:400;letter-spacing:-.01em;padding-left:16px;border-left:2px solid var(--ink)}
.place{font-size:15px;font-weight:600;margin:0 0 6px}
.body{margin:0;max-width:680px;font-size:17.5px;line-height:1.6}
.mrow{display:flex;align-items:center;justify-content:space-between;height:48px;margin-top:48px;border-top:1px solid var(--line);border-bottom:1px solid var(--line);
  font-size:15px;color:var(--mute)}
.mrow b{font-weight:400}
.facts{position:sticky;top:72px;background:var(--panel);border-radius:10px;padding:20px}
.facts dl{margin:0}
.facts .r{display:grid;grid-template-columns:84px minmax(0,1fr);gap:12px;padding:9px 0;border-bottom:1px solid #E4E4E4}
.facts .r:first-child{padding-top:0}
.facts dt{font-size:13px;color:var(--ink2);line-height:1.45}
.facts dd{margin:0;font-size:14px;line-height:1.45;color:var(--ink)}
.facts .btn{display:flex;width:100%;height:38px;margin-top:16px}
.bbar{display:none}

/* ---------------- phone ---------------- */
@media (max-width:720px){
  :root{--g:16px}
  body{background:#fff}
  .photo{height:100vh}
  .hdr{height:52px;gap:10px;background:#fff;-webkit-backdrop-filter:none;backdrop-filter:none;border-bottom:0}
  .nav,.hdr .btn{display:none}
  .logo{font-size:16px;letter-spacing:-.025em;margin-right:0}
  .search{padding:0 12px;gap:7px}
  .search span{white-space:nowrap;overflow:hidden}
  .mark{display:none;flex:none;width:32px;height:32px;border-radius:8px;background:var(--ink);color:#fff;align-items:center;justify-content:center;
    font-size:15px;font-weight:700;letter-spacing:-.02em}
  .search{flex:1;width:auto;min-width:0;height:36px}
  .hdr .sp{display:none}
  .menu{display:flex;flex:none;width:40px;height:40px;align-items:center;justify-content:center;margin-right:-6px}
  .facets{display:none}
  .pcredit{display:flex;align-items:flex-end;justify-content:flex-end;height:80px;padding:0 16px 6px;position:relative}
  .pcredit::before{content:"";position:absolute;inset:0;background:linear-gradient(rgb(0 0 0/0),rgb(0 0 0/.55) 70%)}
  .pcredit .credit{position:relative}
  .home main{background:#fff;border-radius:16px 16px 0 0;position:relative}
  .pfilters{display:flex;align-items:center;height:40px;padding:0 16px;gap:6px;border-bottom:1px solid var(--line);font-size:14px;font-weight:500}
  .pfilters button{display:inline-flex;align-items:center;gap:5px;height:40px}
  .pfilters span{color:var(--mute);padding:0 2px}
  .wall{display:block;padding:0}
  .col{display:contents}
  .card{display:grid;grid-template-columns:72px minmax(0,1fr);column-gap:14px;border-radius:0;box-shadow:none;padding:16px;border-bottom:1px solid var(--line)}
  .card .im{width:72px;height:90px;border-radius:6px}
  .card .id{padding:0;align-self:center}
  .card h3{font-size:19px;margin-top:3px}
  .card .pmeta{display:block;margin-top:5px;font-size:12.5px;color:var(--ink2)}
  .card .sum{grid-column:1/-1;padding:0;margin-top:12px;font-size:15px}
  .card .meta{display:none}
  .foot{margin-top:0}
  .foot .in{height:auto;flex-direction:column;align-items:flex-start;gap:14px;padding:14px 16px 20px}
  .foot nav{display:grid;grid-template-columns:repeat(3,auto);justify-content:start;gap:10px 28px;font-size:13.5px}

  /* saint */
  .cstrip{height:44px;align-items:center;justify-content:flex-end;padding:0 16px;margin-bottom:-12px;position:relative}
  .cstrip::before{content:"";position:absolute;inset:0;background:linear-gradient(rgb(0 0 0/.55),rgb(0 0 0/.62))}
  .cstrip .credit{position:relative;background:none;margin:0;padding:0 0 10px}
  .sheet{margin:0;border-radius:16px 16px 0 0;padding:20px 16px 8px;box-shadow:none;position:relative}
  .sgrid{display:flex;flex-direction:column;gap:0}
  .sgrid>.main{display:contents}
  .top{display:grid;grid-template-columns:minmax(0,1fr) 96px;grid-template-areas:"id pt" "lead lead";gap:0 16px}
  .ident{display:contents}
  .ident .hd{grid-area:id;align-self:start}
  .portrait{grid-area:pt}
  .portrait img{width:96px;height:150px}
  .portrait figcaption{display:none}
  h1{font-size:36px;line-height:1.08;margin:6px 0 0}
  .lead{grid-area:lead;margin-top:16px;font-size:17px}
  .facts{order:2;position:static;background:none;border-radius:0;padding:0;margin-top:20px;border-top:1px solid var(--line)}
  .facts .r{grid-template-columns:96px minmax(0,1fr);padding:10px 0;border-bottom-color:var(--line)}
  .facts .r:first-child{padding-top:10px}
  .facts .btn{display:none}
  .stream{order:3}
  .tabs{top:52px;height:40px;margin:24px -16px 0;padding:0 16px;gap:24px}
  .h2row{margin:36px 0 12px}
  section:first-of-type .h2row{margin-top:24px}
  h2{font-size:24px}
  .chap{grid-template-columns:1fr;grid-template-rows:none;grid-auto-flow:row}
  .chap li{min-height:38px;height:auto;padding:9px 0;white-space:normal;align-items:baseline}
  .themes{grid-template-columns:1fr}
  .quotes{grid-template-columns:1fr;gap:20px;margin-top:24px}
  .quotes blockquote{font-size:19px}
  .body{font-size:17px}
  .mrow{margin-top:36px;font-size:14px;letter-spacing:-.005em}
  .bbar{display:flex;position:fixed;left:0;right:0;bottom:0;z-index:30;height:52px;align-items:center;justify-content:space-between;
    padding:0 16px;background:#fff;border-top:1px solid var(--line);visibility:hidden;opacity:0;transition:opacity .2s}
  .bbar.show{visibility:visible;opacity:1}
  .bbar b{font-size:15px;font-weight:600}
  .bbar .btn{height:36px}
  .saint .foot{padding-bottom:52px}
}
""".replace('PHOTO', PHOTO)


def head(title, cls):
    return ('<!doctype html><html lang="en"><head><meta charset="utf-8">'
            '<meta name="viewport" content="width=device-width,initial-scale=1">'
            f'<title>{E(title)}</title>'
            '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>'
            '<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">'
            f'<style>{CSS}</style></head><body class="{cls}"><div class="photo" aria-hidden="true"></div>')


def header():
    nav = ''.join(f'<a class="{"on" if n == "Saints" else ""}" href="#">{n}</a>' for n in NAV)
    return ('<header class="hdr" data-n="hdr"><a class="logo" href="home.html">Discover the Saints</a>'
            ''
            f'<nav class="nav">{nav}</nav><div class="sp"></div>'
            f'<label class="search" role="search">{SEARCH}<span>Search saints</span></label>'
            '<a class="btn" href="#">Get the app</a>'
            f'<button class="menu" aria-label="Menu">{MENU}</button></header>')


def credit():
    return f'<span class="credit"><a data-n="credit" href="{CREDIT_URL}">{E(CREDIT)}</a></span>'


def footer():
    nav = ''.join(f'<a href="#">{n}</a>' for n in NAV)
    return ('<footer class="foot" data-n="foot"><div class="in"><div class="trad" role="radiogroup" aria-label="Tradition">'
            '<button role="radio" aria-checked="false">Catholic</button><button role="radio" aria-checked="false">Orthodox</button>'
            f'<button class="on" role="radio" aria-checked="true">Both</button></div><div class="sp"></div><nav>{nav}</nav></div></footer>')


def card(s):
    m = META[s['slug']]
    line, two = feast_line(s)
    place = '' if two else m['place']
    alt = m['short']
    meta_txt = line if two else f'{line} · {place}'
    return (f'<a class="card" href="saint.html">'
            f'<img class="im" src="{IMG}{s["file"]}" alt="{E(alt)}" style="object-position:{m["focus"]}">'
            f'<div class="id"><div class="kick">{E(m["role"])} · {m["years"]}</div><h3>{E(m["short"])}</h3>'
            f'<div class="pmeta">{E(meta_txt)}</div></div>'
            f'<p class="sum">{E(B.st(s["summary"]).strip())}</p>'
            f'<div class="meta"><span>{E(line)}</span><span>{E(place)}</span></div></a>')


MASONRY_JS = r"""
<script>
(function(){
  var wall=document.querySelector('.wall'),cards=[].slice.call(wall.querySelectorAll('.card'));
  function lay(){
    var w=wall.clientWidth-52,n=window.innerWidth<=720?1:Math.max(2,Math.floor((w+12)/280));
    wall.innerHTML='';var cols=[];
    for(var i=0;i<n;i++){var c=document.createElement('div');c.className='col';wall.appendChild(c);cols.push(c)}
    cards.forEach(function(k){var best=cols[0];cols.forEach(function(c){if(c.offsetHeight<best.offsetHeight)best=c});best.appendChild(k)});
  }
  var t;window.addEventListener('resize',function(){clearTimeout(t);t=setTimeout(lay,80)});
  (document.fonts?document.fonts.ready:Promise.resolve()).then(lay);lay();
})();
</script>"""


def build_home():
    chips = f'<a class="chip on" href="#">All <i>{len(B.SAINTS)}</i></a>'
    chips += ''.join(f'<a class="chip" href="#">{c} <i>{COUNT[c]}</i></a>' for c in ROW_CATS)
    months = ''.join(
        f'<a class="{"off" if i + 1 not in FEAST_MONTHS else ""}{" now" if i + 1 == CUR_MONTH else ""}" href="#"'
        f' title="Feasts in {m}">{m}</a>' for i, m in enumerate(MONTHS))
    cards = ''.join(card(s) for s in B.SAINTS)
    out = (head('Discover the Saints', 'home') + header()
           + f'<div class="facets"><nav class="chips" data-n="chips">{chips}</nav>'
             f'<nav class="months" data-n="months" aria-label="Feast month">{months}</nav>{credit()}</div>'
           + f'<div class="pcredit">{credit()}</div>'
           + '<main><div class="pfilters" data-n="pfilters">'
             f'<button>Category {CHEV}</button><span>·</span><button>Feast month {CHEV}</button><span>·</span><button>Sort {CHEV}</button></div>'
             f'<div class="wall" data-n="wall">{cards}</div></main>'
           + footer() + MASONRY_JS + '</body></html>')
    open(os.path.join(HERE, 'home.html'), 'w').write(out)
    print('home.html', len(out) // 1024, 'KB')


SAINT_JS = r"""
<script>
(function(){
  var facts=document.querySelector('.facts'),bar=document.querySelector('.bbar');
  var tabs=[].slice.call(document.querySelectorAll('.tabs a')),secs=tabs.map(function(a){return document.querySelector(a.getAttribute('href'))});
  function on(){
    var r=facts.getBoundingClientRect();bar.classList.toggle('show',window.innerWidth<=720&&r.bottom<52);
    var y=window.innerHeight*0.4,k=0;secs.forEach(function(s,i){if(s.getBoundingClientRect().top<=y+10)k=i});
    tabs.forEach(function(a,i){a.classList.toggle('on',i===k)});
  }
  window.addEventListener('scroll',on,{passive:true});window.addEventListener('resize',on);
  var m=location.hash.match(/^#y=(\d+)/);if(m){history.replaceState(null,'',location.pathname);setTimeout(function(){window.scrollTo(0,+m[1]);on()},50)}
  on();
})();
</script>"""


def build_saint():
    s = B.BY['therese-of-lisieux']
    th = B.TH
    quotes = [q['text'] for q in th['quotes']]
    q2 = [quotes[0], next(q for q in quotes if q.startswith('I’m made so'))]
    chap = ''.join(f'<li><b>{i + 1:02d}</b><a href="#">{E(c)}</a></li>' for i, c in enumerate(B.CHAPTERS))
    themes = ''.join(f'<li><a href="#">{E(t)}</a><span>→</span></li>' for t in B.TEACHINGS)
    facts = [
        ('Feast', 'October 1'),
        ('Born', '1873, Alençon, France'),
        ('Died', '1897, Lisieux, France'),
        ('Patron of', 'Missions, with St. Francis Xavier; France, with St. Joan of Arc'),
        ('Venerated', 'Catholic'),
    ]
    dl = ''.join(f'<div class="r"><dt>{k}</dt><dd>{E(v)}</dd></div>' for k, v in facts)
    lead = E(B.TH_SUMMARY.strip())
    out = (head('St. Thérèse of Lisieux · Discover the Saints', 'saint') + header()
           + f'<div class="cstrip">{credit()}</div>'
           + '<main class="sheet"><div class="sgrid"><div class="main">'
             '<div class="top" data-n="top">'
             f'<figure class="portrait" data-n="portrait"><img src="{IMG}{s["file"]}" alt="St. Thérèse of Lisieux, holy card, 1916">'
             '<figcaption>Holy card, 1916 · Public domain</figcaption></figure>'
             '<div class="ident"><div class="hd"><div class="kick">Carmelite nun · France · 1873–1897</div>'
             '<h1 data-n="name">St. Thérèse of Lisieux</h1></div>'
             f'<p class="lead">{lead}</p></div></div>'
             '</div>'   # close .main temporarily (facts sit between on phone)
             f'<aside class="facts" data-n="facts"><dl>{dl}</dl><a class="btn" href="#">Pray in the app</a></aside>'
             '<div class="stream">'
             '<nav class="tabs" data-n="tabs"><a class="on" href="#life">Life</a><a href="#teachings">Teachings</a><a href="#relics">Relics</a></nav>'
             f'<section id="life"><div class="h2row" data-n="life"><h2>Life</h2><a class="more" href="#">Read the full life →</a></div><ol class="chap">{chap}</ol></section>'
             f'<section id="teachings"><div class="h2row" data-n="teach"><h2>Words and teachings</h2></div><ul class="themes">{themes}</ul>'
             f'<div class="quotes"><blockquote>“{E(q2[0])}”</blockquote><blockquote>“{E(q2[1])}”</blockquote></div></section>'
             f'<section id="relics"><div class="h2row" data-n="relics"><h2>Relics</h2></div><p class="place">Carmel of Lisieux, Lisieux, France</p>'
             f'<p class="body">{E(B.RELIC_SHORT)}</p></section>'
             f'<a class="mrow" href="#" data-n="mrow"><b>Miracles and answered prayers · {B.N_MIRACLES} accounts</b><span>→</span></a>'
             '</div></div></main>'
           + footer()
           + '<div class="bbar" data-n="bbar"><b>Oct 1</b><a class="btn" href="#">Pray in the app</a></div>'
           + SAINT_JS + '</body></html>')
    open(os.path.join(HERE, 'saint.html'), 'w').write(out)
    print('saint.html', len(out) // 1024, 'KB')


if __name__ == '__main__':
    if len(sys.argv) > 1 and sys.argv[1] == 'artboards':
        import artboards
        artboards.main()
    else:
        build_home()
        build_saint()
