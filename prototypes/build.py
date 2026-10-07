#!/usr/bin/env python3
"""Build the three direction prototypes (home + saint page) from real data.

Data: data/saints.json (12 saints, real summaries, credited images) and
data/therese-of-lisieux.json (full entry from Directus).
Run: python3 build.py
"""
import html
import json
import math
import os
import re

ROOT = os.path.dirname(os.path.abspath(__file__))
SAINTS = json.load(open(f'{ROOT}/data/saints.json'))
TH = json.load(open(f'{ROOT}/data/therese-of-lisieux.json'))

E = html.escape

# ---------------------------------------------------------------- data
# Roles and countries are short labels written from the saints' fact
# sheets in content-drafts/. Years follow the entries.
META = {
    'therese-of-lisieux': dict(short='St. Thérèse of Lisieux', role='Carmelite nun', place='France', years='1873–1897', focus='50% 19%'),
    'john-maximovitch': dict(short='St. John Maximovitch', role='Bishop', place='Russia · USA', years='1896–1966', focus='50% 20%'),
    'francis-of-assisi': dict(short='St. Francis of Assisi', role='Friar', place='Italy', years='1182–1226', focus='50% 14%'),
    'teresa-of-avila': dict(short='St. Teresa of Ávila', role='Carmelite nun', place='Spain', years='1515–1582', focus='50% 30%'),
    'anthony-of-padua': dict(short='St. Anthony of Padua', role='Franciscan friar', place='Portugal · Italy', years='1195–1231', focus='50% 20%'),
    'augustine-of-hippo': dict(short='St. Augustine of Hippo', role='Bishop', place='North Africa', years='354–430', focus='50% 28%'),
    'benedict-of-nursia': dict(short='St. Benedict of Nursia', role='Abbot', place='Italy', years='c. 480–547', focus='50% 30%'),
    'thomas-aquinas': dict(short='St. Thomas Aquinas', role='Dominican friar', place='Italy', years='1225–1274', focus='50% 26%'),
    'nicholas-of-myra': dict(short='St. Nicholas of Myra', role='Bishop', place='Asia Minor', years='c. 270–343', focus='50% 14%'),
    'padre-pio': dict(short='St. Pio of Pietrelcina', role='Capuchin friar', place='Italy', years='1887–1968', focus='50% 22%'),
    'seraphim-of-sarov': dict(short='St. Seraphim of Sarov', role='Hermit monk', place='Russia', years='1754–1833', focus='50% 32%'),
    'sergius-of-radonezh': dict(short='St. Sergius of Radonezh', role='Abbot', place='Russia', years='1314–1392', focus='50% 40%'),
}
ORDER = ['therese-of-lisieux', 'francis-of-assisi', 'john-maximovitch', 'teresa-of-avila',
         'anthony-of-padua', 'seraphim-of-sarov', 'augustine-of-hippo', 'padre-pio',
         'benedict-of-nursia', 'thomas-aquinas', 'nicholas-of-myra', 'sergius-of-radonezh']
BY = {s['slug']: s for s in SAINTS}
MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

# Names that appear in summaries without "St." The mock adds it.
NAME_FIX = ['Thérèse of Lisieux', 'Thérèse', 'Teresa of Ávila', 'Augustine', 'Benedict',
            'Seraphim of Sarov', 'Sergius of Radonezh', 'Anthony']


def st(text):
    """Put "St." before every saint name in a text (hard requirement 6)."""
    text = text.replace('Brother Thomas Aquinas', 'St. Thomas Aquinas').replace('Padre Pio', 'St. Pio')
    for n in NAME_FIX:
        text = re.sub(r'(?<!St\. )(?<!Saint )\b' + re.escape(n) + r'\b', 'St. ' + n, text)
    return text


def feast(s):
    d = s['feast_c'] or s['feast_o']
    m, day = int(d[5:7]), int(d[8:10])
    return f'{MONTHS[m - 1]} {day}'


def era(s):
    y = s['dy']
    if y <= 500:
        return 0
    if y <= 1500:
        return 1
    if y <= 1800:
        return 2
    return 3


ERAS = ['Early Church', 'Middle Ages', 'Early modern', 'Modern']


def years_pair(s):
    return s['by'], s['dy']


def categories(s):
    raw = s['cats']
    if isinstance(raw, str):
        raw = json.loads(raw)
    return [c.replace('_', ' ') for c in raw]


def cat_counts():
    from collections import Counter
    c = Counter()
    for s in SAINTS:
        for k in set(categories(s)):
            c[k] += 1
    return c


CATS = cat_counts()
TOP_CATS = [k for k, _ in CATS.most_common() if k in
            ('Monastics', 'Miracle Workers', 'Patron Saints', 'Bishops', 'Holy Women', 'Missionaries', 'Fathers of the Church', 'Hermits')]

NAV = ['Saints', 'Miracles', 'Novenas', 'Teachings', 'Quotes', 'Books']
FONTS = 'https://fonts.googleapis.com/css2?family={}&display=swap'

SEARCH_SVG = '<svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="9" cy="9" r="6"/><path d="m14 14 4 4"/></svg>'
CHEV_SVG = '<svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="m2 3.5 3 3 3-3"/></svg>'
ARROW = '→'

# ----------------------------------------------------- Thérèse content
bio = TH['biography']
CHAPTERS = [re.sub(r'<[^>]+>', '', h) for h in re.findall(r'<h2[^>]*>(.*?)</h2>', bio, re.S)][:12]
TEACHINGS = [re.sub(r'<[^>]+>', '', h) for h in re.findall(r'<h2[^>]*>(.*?)</h2>', TH['teachings'][0]['teachings'], re.S)]
QUOTE = TH['quotes'][0]['text']
RELICS = re.sub(r'<[^>]+>', '', TH['relic_description'])
RELIC_SHORT = st('. '.join(RELICS.split('. ')[:2]).rstrip('.') + '.')
N_MIRACLES = len(re.findall(r'<h3', TH['miracles'][0]['miracles']))
TH_FACTS = [
    ('Feast day', 'October 1'),
    ('Born', '1873, Alençon, Normandy, France'),
    ('Died', '1897, Carmel of Lisieux, Lisieux, Normandy, France'),
    ('Patron of', 'Missions (with St. Francis Xavier, named by Pius XI, 14 December 1927); France (with St. Joan of Arc, named by Pius XII, 3 May 1944)'),
    ('Venerated', 'Catholic'),
]
TH_CREDIT = 'Holy card, Druck der Waisen-Lehrlinge Obergriningen, 1916 · Public domain'
TH_SUMMARY = st(BY['therese-of-lisieux']['summary'])

PHOTOS = {
    'assisi': dict(file='assisi.webp', credit='Assisi · Photo: Roberto Berti © FAI, CC BY-SA 4.0'),
    'meteora': dict(file='meteora.webp', credit='Meteora · Photo: Dimitris9444, CC BY-SA 4.0'),
    'galilee': dict(file='galilee.webp', credit='Sea of Galilee · Photo: Grant Barclay, CC BY 2.0'),
}


def masonry(n_cols, items, est):
    """Greedy shortest-column placement, so the reading order is left to right."""
    cols = [[] for _ in range(n_cols)]
    heights = [0] * n_cols
    for it in items:
        i = heights.index(min(heights))
        cols[i].append(it)
        heights[i] += est(it)
    return cols


def head(title, fonts, css):
    fam = '&family='.join(fonts)
    return (f'<!doctype html><html lang="en"><head><meta charset="utf-8">'
            f'<meta name="viewport" content="width=device-width,initial-scale=1">'
            f'<title>{E(title)}</title>'
            f'<link rel="preconnect" href="https://fonts.googleapis.com">'
            f'<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>'
            f'<link href="{FONTS.format(fam)}" rel="stylesheet"><style>{css}</style></head>')


def write(path, content):
    os.makedirs(os.path.dirname(f'{ROOT}/{path}'), exist_ok=True)
    open(f'{ROOT}/{path}', 'w').write(content)
    print('wrote', path, len(content) // 1024, 'KB')


def est_height(slug):
    return 330 + len(BY[slug]['summary'])


# ===================================================================
# DIRECTION A: STAMP (photo fixed behind everything, "St." stamp)
# ===================================================================
A_CSS = """
:root{--ink:#14202B;--ink2:#3B4854;--mute:#68737F;--paper:#FFFCF5;--paper2:#F5EFE1;--sun:#FFB41F;--sun-ink:#3A2600;--olive:#2F6B3C;--line:rgba(20,32,43,.12)}
*{box-sizing:border-box}
body{margin:0;font-family:'Bricolage Grotesque',system-ui,sans-serif;font-weight:500;font-size:15px;line-height:1.4;color:var(--ink);background:#26331f;min-height:100vh}
a{color:inherit;text-decoration:none}
.bg{position:fixed;inset:0;z-index:-2;background-position:center 38%;background-size:cover}
.bg::after{content:'';position:absolute;inset:0;background:linear-gradient(rgba(5,12,20,.66),rgba(5,12,20,0) 240px),rgba(5,12,20,.08)}
.wrap{max-width:1400px;margin:0 auto;padding:0 28px}
header.top{display:flex;align-items:center;gap:28px;height:64px;color:#fff}
.logo{display:flex;align-items:center;gap:10px;font-weight:800;font-size:21px;letter-spacing:-.01em;white-space:nowrap}
.stamp{display:inline-flex;align-items:center;justify-content:center;background:var(--sun);color:var(--sun-ink);font-weight:800;border-radius:.28em;padding:0 .3em;line-height:1.25;letter-spacing:-.01em}
.logo .stamp{font-size:15px;height:30px;min-width:38px}
nav.main{display:flex;gap:4px;margin-left:8px}
nav.main a{padding:7px 12px;border-radius:8px;font-weight:600;font-size:14.5px;color:rgba(255,255,255,.92);text-shadow:0 1px 8px rgba(0,0,0,.35)}
nav.main a.on{background:rgba(255,255,255,.18);color:#fff}
.sp{flex:1}
.search{display:flex;align-items:center;gap:9px;background:rgba(255,252,245,.96);color:var(--mute);border-radius:10px;height:40px;padding:0 14px;width:330px;font-size:14.5px;font-weight:500;box-shadow:0 6px 20px -8px rgba(0,0,0,.45)}
.btn-dark{background:var(--ink);color:#fff;border-radius:10px;height:40px;padding:0 16px;display:inline-flex;align-items:center;font-weight:700;font-size:14px}
.chips{display:flex;align-items:center;gap:8px;height:52px}
.chip{display:inline-flex;align-items:center;gap:7px;height:34px;padding:0 13px;border-radius:9px;background:rgba(255,252,245,.95);font-weight:600;font-size:14px;color:var(--ink);box-shadow:0 4px 14px -8px rgba(0,0,0,.5)}
.chip small{font-size:12px;font-weight:600;color:var(--mute)}
.chip.on{background:var(--sun);color:var(--sun-ink)}
.chip.on small{color:rgba(58,38,0,.7)}
.grid{display:flex;gap:14px;align-items:flex-start;padding-bottom:40px;margin-top:4px}
.col{flex:1;display:flex;flex-direction:column;gap:14px;min-width:0}
.card{background:var(--paper);border-radius:14px;overflow:hidden;box-shadow:0 14px 30px -18px rgba(0,0,0,.55);display:block}
.card .im{height:128px;background-size:cover}
.card .bd{padding:14px 16px 14px}
.kick{font-size:12.5px;font-weight:600;color:var(--olive);letter-spacing:.01em}
.card h3{margin:3px 0 8px;font-size:21px;line-height:1.12;font-weight:800;letter-spacing:-.012em}
.card h3 .stamp{font-size:.62em;vertical-align:.2em;margin-right:0;height:1.3em;padding:0 .38em;border-radius:.3em}
.card p{margin:0;font-family:'Literata',Georgia,serif;font-weight:400;font-size:14.2px;line-height:1.5;color:#27323D}
.meta{display:flex;justify-content:space-between;margin-top:11px;padding-top:9px;border-top:1px solid var(--line);font-size:12.5px;font-weight:600;color:var(--mute)}
footer.foot{background:#111B24;color:#C9D1D8;margin-top:0;padding:28px 0 22px}
footer .row{display:flex;align-items:center;gap:28px;flex-wrap:wrap}
.seg{display:inline-flex;background:#1E2B37;border-radius:10px;padding:3px}
.seg span{padding:7px 15px;border-radius:8px;font-weight:600;font-size:14px;color:#AEB9C3}
.seg span.on{background:var(--sun);color:var(--sun-ink)}
footer .links{display:flex;gap:18px;font-size:14px;font-weight:500}
footer .credit{margin-top:18px;font-size:12px;color:#7D8995}
.photocredit{position:fixed;right:8px;bottom:14px;writing-mode:vertical-rl;font-size:11px;color:rgba(255,255,255,.9);text-shadow:0 1px 6px rgba(0,0,0,.8);z-index:5;letter-spacing:.01em}
/* saint page */
.sheet{background:var(--paper);border-radius:18px;margin-top:6px;padding:34px 40px 30px;box-shadow:0 30px 60px -30px rgba(0,0,0,.6)}
.cols{display:grid;grid-template-columns:minmax(0,1fr) 300px;gap:44px;align-items:start}
.hd{display:grid;grid-template-columns:178px 1fr;gap:30px;align-items:start}
.portrait img{display:block;width:100%;border-radius:4px;box-shadow:0 10px 24px -12px rgba(0,0,0,.45)}
.portrait small{display:block;margin-top:8px;font-size:11.5px;line-height:1.35;color:var(--mute);font-weight:500}
.hd .k{font-size:14px;font-weight:600;color:var(--olive);margin-top:2px}
h1{margin:6px 0 14px;font-size:48px;line-height:1.02;font-weight:800;letter-spacing:-.025em}
h1 .stamp{font-size:.52em;vertical-align:.34em;margin-right:0;height:1.18em;padding:0 .34em;border-radius:.22em}
.lead{font-family:'Literata',Georgia,serif;font-weight:400;font-size:17.5px;line-height:1.55;color:#27323D;margin:0}
.tabs{display:flex;gap:26px;border-bottom:1px solid var(--line);margin:26px 0 0;font-size:14px;font-weight:600;color:var(--mute)}
.tabs a{padding:0 0 11px;margin-bottom:-1px;border-bottom:2.5px solid transparent}
.tabs a.on{color:var(--ink);border-color:var(--sun)}
h2{font-size:24px;line-height:1.2;font-weight:800;letter-spacing:-.015em;margin:28px 0 12px;padding-bottom:8px;border-bottom:1px solid var(--line)}
.chap{columns:2;column-gap:36px;margin:0;padding:0;list-style:none;font-family:'Literata',Georgia,serif;font-size:17px;line-height:1.35}
.chap li{display:flex;gap:12px;padding:7px 0;border-bottom:1px solid var(--line);break-inside:avoid}
.chap b{font-family:'Bricolage Grotesque',sans-serif;font-size:12.5px;font-weight:700;color:var(--olive);padding-top:4px;min-width:18px}
.more{display:inline-block;margin-top:12px;font-size:14.5px;font-weight:700;color:var(--olive)}
blockquote{margin:0 0 12px;font-family:'Literata',Georgia,serif;font-style:italic;font-size:21px;line-height:1.4;padding-left:16px;border-left:3px solid var(--sun)}
.links2{font-size:15px;font-weight:600;line-height:1.9}
.links2 a{color:var(--olive)}
.links2 i{color:var(--mute);font-style:normal;margin:0 8px}
p.body{font-family:'Literata',Georgia,serif;font-size:17px;line-height:1.55;margin:0;color:#27323D}
.mrow{display:flex;justify-content:space-between;align-items:center;margin-top:30px;padding:13px 0;border-top:1px solid var(--line);border-bottom:1px solid var(--line);font-size:15px;font-weight:500;color:var(--ink2)}
.mrow b{font-weight:600;color:var(--ink)}
aside.facts{position:sticky;top:18px;background:var(--paper2);border-radius:14px;padding:16px 18px 18px}
aside dl{margin:0}
aside .r{display:grid;grid-template-columns:78px 1fr;gap:10px;padding:9px 0;border-bottom:1px solid var(--line);font-size:14px;line-height:1.4}
aside .r:last-of-type{border-bottom:0}
aside dt{color:var(--mute);font-weight:600}
aside dd{margin:0;font-weight:600;color:var(--ink)}
aside .r.big dd{font-size:20px;font-weight:800;letter-spacing:-.01em}
aside .btn-dark{display:flex;justify-content:center;width:100%;margin-top:12px}
"""


def a_header(active='Saints', on_photo=True):
    nav = ''.join(f'<a class="{"on" if n == active else ""}" href="#">{n}</a>' for n in NAV)
    return (f'<header class="top"><a class="logo" href="#"><span class="stamp">St.</span>Find a Saint</a>'
            f'<nav class="main">{nav}</nav><div class="sp"></div>'
            f'<div class="search">{SEARCH_SVG}<span>Search saints</span></div>'
            f'<a class="btn-dark" href="#">Get the app</a></header>')


def a_footer(photo):
    return (f'<footer class="foot"><div class="wrap"><div class="row">'
            f'<a class="logo" style="color:#fff" href="#"><span class="stamp">St.</span>Find a Saint</a>'
            f'<div class="seg"><span>Catholic</span><span>Orthodox</span><span class="on">Both</span></div>'
            f'<div class="sp"></div><div class="links"><a href="#">About</a><a href="#">Updates</a><a href="#">Contact</a>'
            f'<a href="#" style="color:#fff;font-weight:700">Get the app</a></div></div>'
            f'<div class="credit">{E(PHOTOS[photo]["credit"])}</div></div></footer>')


def a_card(slug):
    s, m = BY[slug], META[slug]
    nm = m['short'].replace('St. ', '<span class="stamp">St.</span> ', 1)
    return (f'<a class="card" href="#"><div class="im" style="background-image:url(../{s["file"]});background-position:{m["focus"]}"></div>'
            f'<div class="bd"><div class="kick">{E(m["role"])} · {m["years"]}</div><h3>{nm}</h3>'
            f'<p>{E(st(s["summary"]))}</p>'
            f'<div class="meta"><span>Feast {feast(s)}</span><span>{E(m["place"])}</span></div></div></a>')


def build_a():
    photo = 'meteora'
    cols = masonry(4, ORDER, est_height)
    grid = ''.join('<div class="col">' + ''.join(a_card(x) for x in c) + '</div>' for c in cols)
    chips = f'<span class="chip on">All <small>{len(SAINTS)}</small></span>'
    for k in TOP_CATS[:6]:
        chips += f'<span class="chip">{k} <small>{CATS[k]}</small></span>'
    chips += f'<span class="chip">Feast day {CHEV_SVG}</span><span class="sp"></span><span class="chip">Newest {CHEV_SVG}</span>'
    home = (head('A · Stamp · Find a Saint', ['Bricolage+Grotesque:wght@500;600;700;800', 'Literata:ital,wght@0,400;0,600;1,400'], A_CSS)
            + f'<body><div class="bg" style="background-image:url(../../public/images/hero/{PHOTOS[photo]["file"]})"></div>'
            f'<div class="wrap">{a_header()}<div class="chips">{chips}</div><main class="grid">{grid}</main></div>'
            f'<div class="photocredit">{E(PHOTOS[photo]["credit"])}</div>{a_footer(photo)}</body></html>')
    write('a-stamp/home.html', home)

    chap = ''.join(f'<li><b>{i + 1:02d}</b><span>{E(c)}</span></li>' for i, c in enumerate(CHAPTERS))
    tl = '<i>·</i>'.join(f'<a href="#">{E(t)}</a>' for t in TEACHINGS)
    facts = ''.join(
        f'<div class="r{" big" if k == "Feast day" else ""}"><dt>{k}</dt><dd>{E(v)}</dd></div>' for k, v in TH_FACTS)
    saint = (head('A · Stamp · St. Thérèse of Lisieux', ['Bricolage+Grotesque:wght@500;600;700;800', 'Literata:ital,wght@0,400;0,600;1,400'], A_CSS)
             + f'<body><div class="bg" style="background-image:url(../../public/images/hero/{PHOTOS[photo]["file"]})"></div>'
             f'<div class="wrap">{a_header()}<div class="sheet"><div class="cols"><div>'
             f'<div class="hd"><div class="portrait"><img src="../{BY["therese-of-lisieux"]["file"]}" alt="St. Thérèse of Lisieux"><small>{E(TH_CREDIT)}</small></div>'
             f'<div><div class="k">Carmelite nun · France · 1873–1897</div>'
             f'<h1><span class="stamp">St.</span> Thérèse of Lisieux</h1><p class="lead">{E(TH_SUMMARY)}</p></div></div>'
             f'<div class="tabs"><a class="on" href="#">Life</a><a href="#">Teachings</a><a href="#">Relics</a><a href="#">Miracles</a></div>'
             f'<h2 style="margin-top:22px">Life</h2><ol class="chap">{chap}</ol><a class="more" href="#">Read the full life {ARROW}</a>'
             f'<h2>Words and teachings</h2><blockquote>“{E(QUOTE)}”</blockquote><div class="links2">{tl}</div>'
             f'<h2>Relics</h2><p class="body">{E(RELIC_SHORT)}</p>'
             f'<div class="mrow"><span><b>Miracles and answered prayers</b> · {N_MIRACLES} accounts</span><span>{ARROW}</span></div>'
             f'</div><aside class="facts"><dl>{facts}</dl><a class="btn-dark" href="#">Pray in the app</a></aside></div></div></div>'
             f'<div class="photocredit">{E(PHOTOS[photo]["credit"])}</div><div style="height:40px"></div>{a_footer(photo)}</body></html>')
    write('a-stamp/saint.html', saint)




# ===================================================================
# DIRECTION B: LIFELINE (era colors, 2000-year ruler, staggered skyline)
# ===================================================================
ERA_COL = ['#2A4BFF', '#FF5436', '#F2A100', '#12A072']
ERA_TXT = ['#2038D6', '#D93A1E', '#9A6200', '#0B7A56']
B_CSS = """
:root{--paper:#EDF0F5;--ink:#0E1A2B;--ink2:#34425A;--mute:#5E6B7F;--line:#DDE2EB;--card:#fff;--c0:#2A4BFF;--c1:#FF5436;--c2:#F2A100;--c3:#12A072;--t0:#2038D6;--t1:#D93A1E;--t2:#9A6200;--t3:#0B7A56}
*{box-sizing:border-box}
body{margin:0;font-family:'Epilogue',system-ui,sans-serif;font-weight:500;font-size:15px;line-height:1.4;color:var(--ink);background:var(--paper)}
a{color:inherit;text-decoration:none}
.photo{position:absolute;left:0;right:0;top:0;height:600px;background-position:center 45%;background-size:cover;z-index:0}
.photo::after{content:'';position:absolute;inset:0;background:linear-gradient(rgba(14,26,43,0) 60%,var(--paper) 100%)}
.credit{position:absolute;right:8px;top:150px;writing-mode:vertical-rl;z-index:2;font-size:11px;color:rgba(255,255,255,.95);text-shadow:0 1px 6px rgba(0,0,0,.8);font-weight:500}
.page{position:relative;z-index:1}
.wrap{max-width:1400px;margin:0 auto;padding:0 28px}
.bar{background:#fff;border-bottom:1px solid var(--line);position:relative;z-index:3}
.bar .in{display:flex;align-items:center;gap:26px;height:58px}
.logo{display:flex;align-items:center;gap:10px;font-weight:800;font-size:19px;letter-spacing:-.02em;white-space:nowrap}
.mark{display:flex;flex-direction:column;gap:3px;width:26px}
.mark i{display:block;height:4px;border-radius:2px}
nav.main{display:flex;gap:2px}
nav.main a{padding:8px 12px;font-weight:600;font-size:14px;color:var(--ink2);border-radius:8px}
nav.main a.on{color:var(--ink);box-shadow:inset 0 -3px 0 var(--c0);border-radius:0}
.sp{flex:1}
.btn{background:var(--ink);color:#fff;border-radius:9px;height:38px;padding:0 15px;display:inline-flex;align-items:center;font-weight:700;font-size:13.5px}
.tool{display:flex;align-items:center;gap:14px;background:rgba(255,255,255,.97);border-radius:14px;padding:10px 14px;margin-top:14px;box-shadow:0 14px 34px -18px rgba(8,16,30,.6)}
.tool .s{display:flex;align-items:center;gap:9px;width:236px;height:44px;border-radius:9px;background:var(--paper);padding:0 13px;color:var(--mute);font-size:14px;flex:none}
.ruler{flex:1;position:relative;height:54px}
.rz{position:absolute;top:0;bottom:0;border-radius:6px;display:flex;align-items:flex-end;justify-content:flex-start;padding:0 0 3px 7px;font-size:10.5px;font-weight:800;letter-spacing:.07em;text-transform:uppercase;overflow:hidden}
.rb{position:absolute;height:6px;border-radius:3px;box-shadow:0 0 0 1.5px #fff}
.tick{position:absolute;top:0;width:1px;height:6px;background:rgba(14,26,43,.35)}
.drop{display:inline-flex;align-items:center;gap:7px;height:38px;padding:0 13px;border-radius:9px;border:1px solid var(--line);font-weight:600;font-size:14px;flex:none;background:#fff}
.grid{display:flex;gap:14px;align-items:flex-start;padding:18px 0 48px}
.col{flex:1;display:flex;flex-direction:column;gap:14px;min-width:0}
.card{background:var(--card);border-radius:12px;overflow:hidden;display:block;box-shadow:0 1px 2px rgba(14,26,43,.06),0 14px 28px -20px rgba(14,26,43,.55)}
.card .strip{height:5px}
.card .im{height:118px;background-size:cover}
.card .bd{padding:12px 14px 13px}
.life{display:flex;align-items:center;gap:9px;font-size:12px;font-weight:700;color:var(--ink2);letter-spacing:.01em}
.axis{position:relative;flex:1;height:3px;background:#DDE2EB;border-radius:2px}
.axis i{position:absolute;top:-2px;height:7px;border-radius:2px;min-width:5px}
.axis u{position:absolute;top:-1px;width:1px;height:5px;background:#B9C1CF}
.kick{margin-top:9px;font-size:12px;font-weight:700;display:flex;align-items:center;gap:6px;letter-spacing:.01em}
.kick i{display:block;width:8px;height:8px;border-radius:50%}
.kick span{color:var(--mute);font-weight:600}
.card h3{margin:3px 0 7px;font-size:18px;line-height:1.15;font-weight:800;letter-spacing:-.02em}
.card p{margin:0;font-family:'Spectral',Georgia,serif;font-weight:400;font-size:14.4px;line-height:1.48;color:#222E42}
.meta{display:flex;justify-content:space-between;margin-top:10px;font-size:12px;font-weight:600;color:var(--mute)}
footer.foot{background:#0E1A2B;color:#C4CCD8;padding:26px 0 22px}
footer .row{display:flex;align-items:center;gap:28px;flex-wrap:wrap}
.seg{display:inline-flex;background:#1B2A42;border-radius:10px;padding:3px}
.seg span{padding:7px 15px;border-radius:8px;font-weight:600;font-size:13.5px;color:#9FB0C9}
.seg span.on{background:#fff;color:var(--ink)}
footer .links{display:flex;gap:18px;font-size:13.5px}
footer .cr{margin-top:16px;font-size:12px;color:#77849A}
/* saint page */
.three{display:grid;grid-template-columns:244px minmax(0,1fr) 236px;gap:14px;align-items:stretch;margin-top:14px;padding-bottom:40px}
.panel{background:#fff;border-radius:14px;padding:20px 22px;box-shadow:0 14px 30px -22px rgba(14,26,43,.55)}
.side{display:flex;flex-direction:column;gap:14px}
.stick{position:sticky;top:14px}
.portrait{background:#fff;border-radius:14px;padding:14px 14px 12px;box-shadow:0 14px 30px -22px rgba(14,26,43,.55)}
.portrait img{display:block;width:100%;border-radius:4px}
.portrait small{display:block;margin-top:9px;font-size:11px;line-height:1.35;color:var(--mute);font-weight:500}
.facts{padding:6px 18px 14px}
.r{padding:10px 0;border-bottom:1px solid var(--line);font-size:14px;line-height:1.4}
.r:last-of-type{border-bottom:0}
.r dt{font-size:12px;font-weight:700;color:var(--mute);letter-spacing:.04em;text-transform:uppercase;margin-bottom:2px}
.r dd{margin:0;font-weight:600}
.r.big dd{font-size:19px;font-weight:800;letter-spacing:-.01em}
.facts .btn{display:flex;justify-content:center;margin-top:8px}
.k{font-size:13px;font-weight:700;color:var(--t3);display:flex;align-items:center;gap:7px}
.k i{display:block;width:9px;height:9px;border-radius:50%;background:var(--c3)}
h1{margin:6px 0 16px;font-size:48px;line-height:1.02;font-weight:800;letter-spacing:-.035em}
h1 em{font-style:normal;color:var(--t3)}
.big-life{margin:0 0 18px}
.big-life .ax{position:relative;height:6px;background:#DDE2EB;border-radius:3px;margin:20px 0 6px}
.big-life .ax i{position:absolute;top:-4px;height:14px;border-radius:3px;background:var(--c3);min-width:7px;box-shadow:0 0 0 3px #fff}
.big-life .ax b{position:absolute;top:-22px;font-size:12px;font-weight:800;color:var(--t3);white-space:nowrap}
.big-life .tk{position:relative;height:14px;font-size:11px;font-weight:600;color:var(--mute)}
.big-life .tk span{position:absolute;transform:translateX(-50%)}
.lead{font-family:'Spectral',Georgia,serif;font-weight:400;font-size:17.5px;line-height:1.55;color:#1E293B;margin:0}
.tabs{display:flex;gap:26px;border-bottom:1px solid var(--line);margin:24px 0 0;font-size:14px;font-weight:700;color:var(--mute)}
.tabs a{padding:0 0 11px;margin-bottom:-1px;border-bottom:3px solid transparent}
.tabs a.on{color:var(--ink);border-color:var(--c3)}
h2{font-size:22px;line-height:1.2;font-weight:800;letter-spacing:-.02em;margin:26px 0 10px}
.chap{columns:2;column-gap:30px;margin:0;padding:0;list-style:none;font-family:'Spectral',Georgia,serif;font-size:17px;line-height:1.35}
.chap li{display:flex;gap:11px;padding:7px 0;border-bottom:1px solid var(--line);break-inside:avoid}
.chap b{font-family:'Epilogue',sans-serif;font-size:12px;font-weight:800;color:var(--t3);padding-top:4px;min-width:18px}
.more{display:inline-block;margin-top:12px;font-size:14px;font-weight:700;color:var(--t3)}
blockquote{margin:0 0 10px;font-family:'Spectral',Georgia,serif;font-style:italic;font-size:21px;line-height:1.4;padding-left:16px;border-left:3px solid var(--c3)}
.links2{font-size:15px;font-weight:600;line-height:1.9}
.links2 a{color:var(--t3)}
.links2 i{color:#B6BFCC;font-style:normal;margin:0 8px}
p.body{font-family:'Spectral',Georgia,serif;font-size:17px;line-height:1.55;margin:0;color:#1E293B}
.mrow{display:flex;justify-content:space-between;margin-top:26px;padding:13px 0;border-top:1px solid var(--line);font-size:15px;color:var(--ink2);font-weight:500}
.mrow b{font-weight:700;color:var(--ink)}
.rel h4{margin:0 0 6px;font-size:12px;font-weight:800;letter-spacing:.06em;text-transform:uppercase;color:var(--mute)}
.rel a{display:flex;gap:11px;align-items:center;padding:9px 0;border-bottom:1px solid var(--line)}
.rel a:last-child{border-bottom:0}
.rel .th{width:46px;height:46px;border-radius:8px;background-size:cover;flex:none}
.rel b{display:block;font-size:14px;line-height:1.2;font-weight:700}
.rel span{font-size:12px;color:var(--mute);font-weight:600}
"""


def era_dot(i):
    return f'<i style="background:{ERA_COL[i]}"></i>'


def lane_bars():
    items = sorted(SAINTS, key=lambda s: s['by'])
    lanes = []
    out = []
    for s in items:
        for li, end in enumerate(lanes):
            if s['by'] > end + 40:
                lanes[li] = s['dy']
                lane = li
                break
        else:
            lanes.append(s['dy'])
            lane = len(lanes) - 1
        left = s['by'] / 2026 * 100
        w = max((s['dy'] - s['by']) / 2026 * 100, 0.7)
        out.append(f'<span class="rb" style="left:{left:.2f}%;width:{w:.2f}%;top:{4 + lane * 10}px;background:{ERA_COL[era(s)]}"></span>')
    return ''.join(out)


def ruler_html():
    bounds = [0, 500, 1500, 1800, 2026]
    zones = ''
    for i in range(4):
        l = bounds[i] / 2026 * 100
        w = (bounds[i + 1] - bounds[i]) / 2026 * 100
        zones += (f'<span class="rz" style="left:{l:.2f}%;width:calc({w:.2f}% - 3px);background:{ERA_COL[i]}1F;color:{ERA_TXT[i]}">{ERAS[i]}</span>')
    return f'<div class="ruler">{zones}{lane_bars()}</div>'


def b_header(active='Saints'):
    nav = ''.join(f'<a class="{"on" if n == active else ""}" href="#">{n}</a>' for n in NAV)
    mark = '<span class="mark">' + ''.join(f'<i style="background:{c};width:{w}%;margin-left:{o}%"></i>' for c, w, o in
                                            [(ERA_COL[0], 55, 0), (ERA_COL[1], 70, 25), (ERA_COL[2], 40, 55), (ERA_COL[3], 30, 70)]) + '</span>'
    return (f'<div class="bar"><div class="wrap"><div class="in"><a class="logo" href="#">{mark}Find a Saint</a>'
            f'<nav class="main">{nav}</nav><div class="sp"></div><a class="btn" href="#">Get the app</a></div></div></div>')


def b_footer():
    return ('<footer class="foot"><div class="wrap"><div class="row"><a class="logo" style="color:#fff" href="#">Find a Saint</a>'
            '<div class="seg"><span>Catholic</span><span>Orthodox</span><span class="on">Both</span></div><div class="sp"></div>'
            '<div class="links"><a href="#">About</a><a href="#">Updates</a><a href="#">Contact</a><a href="#" style="color:#fff;font-weight:700">Get the app</a></div></div>'
            '<div class="cr">' + E(PHOTOS['assisi']['credit']) + '</div></div></footer>')


def b_card(slug):
    s, m = BY[slug], META[slug]
    e = era(s)
    left = max(s['by'], 0) / 2026 * 100
    w = max((s['dy'] - s['by']) / 2026 * 100, 0.8)
    ticks = ''.join(f'<u style="left:{x / 2026 * 100:.2f}%"></u>' for x in (500, 1000, 1500))
    return (f'<a class="card" href="#"><div class="strip" style="background:{ERA_COL[e]}"></div>'
            f'<div class="im" style="background-image:url(../{s["file"]});background-position:{m["focus"]}"></div>'
            f'<div class="bd"><div class="life"><div class="axis">{ticks}<i style="left:{left:.2f}%;width:{w:.2f}%;background:{ERA_COL[e]}"></i></div><span>{m["years"]}</span></div>'
            f'<div class="kick" style="color:{ERA_TXT[e]}">{era_dot(e)}{ERAS[e]} <span>· {E(m["role"])}</span></div>'
            f'<h3>{E(m["short"])}</h3><p>{E(st(s["summary"]))}</p>'
            f'<div class="meta"><span>Feast {feast(s)}</span><span>{E(m["place"])}</span></div></div></a>')


def build_b():
    stag = [0, 56, 16, 74, 34]
    cols = masonry(5, ORDER, est_height)
    grid = ''
    for i, c in enumerate(cols):
        cards = ''.join(b_card(x) for x in c)
        grid += f'<div class="col" style="margin-top:{stag[i]}px">{cards}</div>'
    tool = (f'<div class="tool"><div class="s">{SEARCH_SVG}<span>Search saints</span></div>{ruler_html()}'
            f'<span class="drop">Category {CHEV_SVG}</span><span class="drop">Feast day {CHEV_SVG}</span></div>')
    fonts = ['Epilogue:wght@500;600;700;800', 'Spectral:ital,wght@0,400;0,600;1,400']
    home = (head('B · Lifeline · Find a Saint', fonts, B_CSS)
            + f'<body><div class="photo" style="background-image:url(../../public/images/hero/{PHOTOS["assisi"]["file"]})"></div>'
            f'<div class="page">{b_header()}<div class="wrap">{tool}<div class="credit">{E(PHOTOS["assisi"]["credit"])}</div><main class="grid">{grid}</main></div>{b_footer()}</div></body></html>')
    write('b-lifeline/home.html', home)

    t = BY['therese-of-lisieux']
    chap = ''.join(f'<li><b>{i + 1:02d}</b><span>{E(c)}</span></li>' for i, c in enumerate(CHAPTERS))
    tl = '<i>·</i>'.join(f'<a href="#">{E(x)}</a>' for x in TEACHINGS)
    facts = ''.join(f'<div class="r{" big" if k == "Feast day" else ""}"><dt>{k}</dt><dd>{E(v)}</dd></div>' for k, v in TH_FACTS)
    left = t['by'] / 2026 * 100
    w = (t['dy'] - t['by']) / 2026 * 100
    tks = ''.join(f'<span style="left:{x / 2026 * 100:.2f}%">{x if x else 1}</span>' for x in (0, 500, 1000, 1500, 2000))
    life = (f'<div class="big-life"><div class="ax"><b style="right:{100 - left - w:.2f}%">1873–1897 · 24 years</b>'
            f'<i style="left:{left:.2f}%;width:{w:.2f}%"></i></div><div class="tk">{tks}</div></div>')
    rel = ''
    for slug, note in (('teresa-of-avila', 'Carmelite nun'), ('francis-of-assisi', 'Friar'), ('padre-pio', 'Capuchin friar')):
        rs = BY[slug]
        rel += (f'<a href="#"><div class="th" style="background-image:url(../{rs["file"]});background-position:{META[slug]["focus"]}"></div>'
                f'<div><b>{E(META[slug]["short"])}</b><span>{note} · {META[slug]["years"]}</span></div></a>')
    saint = (head('B · Lifeline · St. Thérèse of Lisieux', fonts, B_CSS)
             + f'<body><div class="photo" style="height:420px;background-image:url(../../public/images/hero/{PHOTOS["assisi"]["file"]})"></div>'
             f'<div class="page">{b_header()}<div class="wrap"><div class="credit">{E(PHOTOS["assisi"]["credit"])}</div><div class="three">'
             f'<div class="side"><div class="portrait"><img src="../{t["file"]}" alt="St. Thérèse of Lisieux"><small>{E(TH_CREDIT)}</small></div>'
             f'<div class="panel facts stick"><dl style="margin:0">{facts}</dl><a class="btn" href="#">Pray in the app</a></div></div>'
             f'<div class="panel"><div class="k"><i></i>Modern · Carmelite nun · France</div><h1><em>St.</em> Thérèse of Lisieux</h1>{life}'
             f'<p class="lead">{E(TH_SUMMARY)}</p>'
             f'<div class="tabs"><a class="on" href="#">Life</a><a href="#">Teachings</a><a href="#">Relics</a><a href="#">Miracles</a></div>'
             f'<h2>Life</h2><ol class="chap">{chap}</ol><a class="more" href="#">Read the full life →</a>'
             f'<h2>Words and teachings</h2><blockquote>“{E(QUOTE)}”</blockquote><div class="links2">{tl}</div>'
             f'<h2>Relics</h2><p class="body">{E(RELIC_SHORT)}</p>'
             f'<div class="mrow"><span><b>Miracles and answered prayers</b> · {N_MIRACLES} accounts</span><span>→</span></div></div>'
             f'<div class="side"><div class="panel rel stick"><h4>Related</h4>{rel}</div></div></div></div>{b_footer()}</div></body></html>')
    write('b-lifeline/saint.html', saint)




# ===================================================================
# DIRECTION C: FIELD (flat teal color field, photo window, A-Z index)
# ===================================================================
C_CSS = """
:root{--field:#0B6F66;--field-d:#08524C;--field-l:#13867B;--butter:#FFD866;--butter-ink:#3A2E00;--ink:#10201E;--ink2:#34504D;--mute:#5F7774;--line:#DCE6E4;--paper:#FAFCFB}
*{box-sizing:border-box}
body{margin:0;font-family:'Hanken Grotesk',system-ui,sans-serif;font-weight:500;font-size:15px;line-height:1.4;color:var(--ink);background:var(--field)}
a{color:inherit;text-decoration:none}
.wrap{max-width:1400px;margin:0 auto;padding:0 28px}
header.top{display:flex;align-items:center;gap:26px;height:68px;color:#fff}
.logo{display:flex;align-items:center;gap:11px;font-family:'Gloock',Georgia,serif;font-size:27px;letter-spacing:-.005em;white-space:nowrap}
.mosaic{display:grid;grid-template-columns:11px 11px;grid-template-rows:11px 11px;gap:2px}
.mosaic i{display:block;border-radius:2.5px}
nav.main{display:flex;gap:2px;margin-left:6px}
nav.main a{padding:8px 12px;font-weight:600;font-size:14.5px;color:rgba(255,255,255,.82);border-radius:8px}
nav.main a.on{color:#fff;box-shadow:inset 0 -3px 0 var(--butter);border-radius:0}
.sp{flex:1}
.search{display:flex;align-items:center;gap:10px;background:#fff;color:var(--mute);border-radius:10px;height:42px;padding:0 15px;width:340px;font-size:14.5px}
.btn{background:var(--butter);color:var(--butter-ink);border-radius:10px;height:42px;padding:0 17px;display:inline-flex;align-items:center;font-weight:700;font-size:14px}
.az{display:flex;align-items:center;gap:0;height:46px;color:#fff}
.az span{display:inline-block;width:25px;text-align:center;font-size:13.5px;font-weight:700;letter-spacing:.02em;color:rgba(255,255,255,.34)}
.az span.has{color:#fff}
.az span.all{width:auto;padding:5px 12px;margin-right:8px;border-radius:8px;background:var(--butter);color:var(--butter-ink)}
.az .drop{display:inline-flex;align-items:center;gap:7px;height:34px;padding:0 13px;border-radius:9px;border:1.5px solid rgba(255,255,255,.55);color:#fff;font-weight:600;font-size:14px;margin-left:8px;width:auto}
.window{border-radius:26px;background-size:cover;background-position:center 62%;padding:14px;margin-bottom:34px;box-shadow:0 0 0 1px rgba(0,0,0,.08)}
.grid{display:flex;gap:12px;align-items:flex-start}
.col{flex:1;display:flex;flex-direction:column;gap:12px;min-width:0}
.card{background:#fff;border-radius:14px;padding:8px 8px 14px;display:block;box-shadow:0 12px 26px -16px rgba(0,0,0,.6)}
.card .im{height:112px;border-radius:8px;background-size:cover}
.card .bd{padding:11px 8px 0}
.kick{font-size:11.5px;font-weight:700;color:var(--field);letter-spacing:.07em;text-transform:uppercase}
.card h3{margin:5px 0 8px;font-family:'Gloock',Georgia,serif;font-weight:400;font-size:22px;line-height:1.1;letter-spacing:-.005em}
.card h3 .s{color:var(--field-l)}
.card p{margin:0;font-weight:400;font-size:14px;line-height:1.5;color:#26403D}
.meta{display:flex;justify-content:space-between;margin-top:11px;padding-top:9px;border-top:1px solid var(--line);font-size:12.5px;font-weight:600;color:var(--mute)}
.photocredit{position:fixed;right:8px;bottom:14px;writing-mode:vertical-rl;font-size:11px;color:rgba(255,255,255,.85);z-index:5}
footer.foot{background:var(--field-d);color:#BFD6D3;padding:28px 0 22px}
footer .row{display:flex;align-items:center;gap:28px;flex-wrap:wrap}
.seg{display:inline-flex;background:rgba(255,255,255,.1);border-radius:10px;padding:3px}
.seg span{padding:7px 15px;border-radius:8px;font-weight:600;font-size:14px;color:#BFD6D3}
.seg span.on{background:var(--butter);color:var(--butter-ink)}
footer .links{display:flex;gap:18px;font-size:14px}
footer .cr{margin-top:16px;font-size:12px;color:#8FB1AD}
/* saint page */
body.sp-page{background:var(--paper)}
.fieldtop{background:var(--field)}
.hero{background:var(--field);box-shadow:0 0 0 100vmax var(--field);clip-path:inset(0 -100vmax);padding:6px 0 56px;color:#fff}
.hd{display:grid;grid-template-columns:200px 1fr;gap:34px;align-items:start}
.portrait img{display:block;width:100%;border-radius:4px;box-shadow:0 16px 30px -14px rgba(0,0,0,.6)}
.portrait small{display:block;margin-top:8px;font-size:11px;line-height:1.35;color:rgba(255,255,255,.7);font-weight:500}
.k{font-size:12.5px;font-weight:700;letter-spacing:.07em;text-transform:uppercase;color:var(--butter)}
h1{margin:8px 0 16px;font-family:'Gloock',Georgia,serif;font-weight:400;font-size:48px;line-height:1.04;letter-spacing:-.01em}
h1 .s{color:var(--butter)}
.lead{font-weight:400;font-size:17.5px;line-height:1.55;color:rgba(255,255,255,.94);margin:0}
.cols{display:grid;grid-template-columns:minmax(0,1fr) 304px;gap:44px;align-items:start}
aside.facts{position:sticky;top:18px;background:#fff;border-radius:16px;padding:8px 20px 20px;margin-top:6px;box-shadow:0 24px 44px -24px rgba(0,0,0,.55);z-index:2}
aside .r{display:grid;grid-template-columns:78px 1fr;gap:10px;padding:10px 0;border-bottom:1px solid var(--line);font-size:14px;line-height:1.4}
aside .r:last-of-type{border-bottom:0}
aside dt{color:var(--mute);font-weight:600}
aside dd{margin:0;font-weight:600}
aside .r.big dd{font-family:'Gloock',Georgia,serif;font-weight:400;font-size:22px;line-height:1.1}
aside .btn{display:flex;justify-content:center;width:100%;margin-top:12px;background:var(--field);color:#fff}
.tabs{display:flex;gap:26px;border-bottom:1px solid var(--line);margin:0;padding-top:26px;font-size:14px;font-weight:700;color:var(--mute)}
.tabs a{padding:0 0 11px;margin-bottom:-1px;border-bottom:3px solid transparent}
.tabs a.on{color:var(--ink);border-color:var(--field)}
h2{font-family:'Gloock',Georgia,serif;font-weight:400;font-size:26px;line-height:1.2;margin:26px 0 10px}
.chap{columns:2;column-gap:32px;margin:0;padding:0;list-style:none;font-size:17px;line-height:1.35}
.chap li{display:flex;gap:12px;padding:8px 0;border-bottom:1px solid var(--line);break-inside:avoid}
.chap b{font-size:12.5px;font-weight:700;color:var(--field);padding-top:4px;min-width:18px}
.more{display:inline-block;margin-top:12px;font-size:14.5px;font-weight:700;color:var(--field)}
blockquote{margin:0 0 10px;font-family:'Gloock',Georgia,serif;font-size:23px;line-height:1.3;letter-spacing:.004em;padding-left:16px;border-left:4px solid var(--butter)}
.links2{font-size:15.5px;font-weight:600;line-height:1.9}
.links2 a{color:var(--field)}
.links2 i{color:#9DB6B2;font-style:normal;margin:0 8px}
p.body{font-size:17px;line-height:1.6;margin:0;color:#1C3330}
.mrow{display:flex;justify-content:space-between;margin-top:28px;padding:13px 0;border-top:1px solid var(--line);border-bottom:1px solid var(--line);font-size:15px;color:var(--ink2);font-weight:500}
.mrow b{font-weight:700;color:var(--ink)}
"""


def c_header(active='Saints'):
    nav = ''.join(f'<a class="{"on" if n == active else ""}" href="#">{n}</a>' for n in NAV)
    mos = ('<span class="mosaic"><i style="background:#FFD866"></i><i style="background:#fff"></i>'
           '<i style="background:#FF8A65"></i><i style="background:#13867B"></i></span>')
    return (f'<header class="top"><a class="logo" href="#">{mos}Find a Saint</a><nav class="main">{nav}</nav><div class="sp"></div>'
            f'<div class="search">{SEARCH_SVG}<span>Search saints</span></div><a class="btn" href="#">Get the app</a></header>')


def c_footer():
    return ('<footer class="foot"><div class="wrap"><div class="row"><a class="logo" href="#" style="color:#fff;font-size:24px">Find a Saint</a>'
            '<div class="seg"><span>Catholic</span><span>Orthodox</span><span class="on">Both</span></div><div class="sp"></div>'
            '<div class="links"><a href="#">About</a><a href="#">Updates</a><a href="#">Contact</a><a href="#" style="color:#fff;font-weight:700">Get the app</a></div></div>'
            '<div class="cr">' + E(PHOTOS['galilee']['credit']) + '</div></div></footer>')


def c_card(slug):
    s, m = BY[slug], META[slug]
    nm = m['short'].replace('St. ', '<span class="s">St.</span> ', 1)
    return (f'<a class="card" href="#"><div class="im" style="background-image:url(../{s["file"]});background-position:{m["focus"]}"></div>'
            f'<div class="bd"><div class="kick">{E(m["role"])} · {m["years"]}</div><h3>{nm}</h3><p>{E(st(s["summary"]))}</p>'
            f'<div class="meta"><span>Feast {feast(s)}</span><span>{E(m["place"])}</span></div></div></a>')


def build_c():
    letters = {m['short'].split('St. ')[1][0] for m in META.values()}
    az = '<span class="all">All</span>' + ''.join(f'<span class="{"has" if L in letters else ""}">{L}</span>' for L in 'ABCDEFGHIJKLMNOPQRSTUVWXYZ')
    az += f'<span class="sp"></span><span class="drop">Category {CHEV_SVG}</span><span class="drop">Feast day {CHEV_SVG}</span><span class="drop">Century {CHEV_SVG}</span>'
    cols = masonry(5, ORDER, est_height)
    grid = ''.join('<div class="col">' + ''.join(c_card(x) for x in c) + '</div>' for c in cols)
    fonts = ['Gloock', 'Hanken+Grotesk:wght@400;500;600;700']
    home = (head('C · Field · Find a Saint', fonts, C_CSS)
            + f'<body><div class="wrap">{c_header()}<div class="az">{az}</div>'
            f'<div class="window" style="background-image:url(../../public/images/hero/{PHOTOS["galilee"]["file"]})"><main class="grid">{grid}</main></div></div>'
            f'<div class="photocredit">{E(PHOTOS["galilee"]["credit"])}</div>{c_footer()}</body></html>')
    write('c-field/home.html', home)

    t = BY['therese-of-lisieux']
    chap = ''.join(f'<li><b>{i + 1:02d}</b><span>{E(c)}</span></li>' for i, c in enumerate(CHAPTERS))
    tl = '<i>·</i>'.join(f'<a href="#">{E(x)}</a>' for x in TEACHINGS)
    facts = ''.join(f'<div class="r{" big" if k == "Feast day" else ""}"><dt>{k}</dt><dd>{E(v)}</dd></div>' for k, v in TH_FACTS)
    saint = (head('C · Field · St. Thérèse of Lisieux', fonts, C_CSS)
             + f'<body class="sp-page"><div class="fieldtop"><div class="wrap">{c_header()}</div></div>'
             f'<div class="wrap"><div class="cols"><div>'
             f'<div class="hero"><div class="hd"><div class="portrait"><img src="../{t["file"]}" alt="St. Thérèse of Lisieux"><small>{E(TH_CREDIT)}</small></div>'
             f'<div><div class="k">Carmelite nun · France · 1873–1897</div><h1><span class="s">St.</span> Thérèse of Lisieux</h1><p class="lead">{E(TH_SUMMARY)}</p></div></div></div>'
             f'<div class="tabs"><a class="on" href="#">Life</a><a href="#">Teachings</a><a href="#">Relics</a><a href="#">Miracles</a></div>'
             f'<h2>Life</h2><ol class="chap">{chap}</ol><a class="more" href="#">Read the full life →</a>'
             f'<h2>Words and teachings</h2><blockquote>“{E(QUOTE)}”</blockquote><div class="links2">{tl}</div>'
             f'<h2>Relics</h2><p class="body">{E(RELIC_SHORT)}</p>'
             f'<div class="mrow"><span><b>Miracles and answered prayers</b> · {N_MIRACLES} accounts</span><span>→</span></div></div>'
             f'<aside class="facts"><dl style="margin:0">{facts}</dl><a class="btn" href="#">Pray in the app</a></aside></div></div>'
             f'<div style="height:48px"></div>{c_footer()}</body></html>')
    write('c-field/saint.html', saint)


if __name__ == '__main__':
    build_a()
    build_b()
    build_c()
