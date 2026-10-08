#!/usr/bin/env python3
"""W3 "Photo search" wireframe for Discover the Saints: home.html + saint.html (one responsive file each).

Spec: committee/05-chair.md, sections A, B (shared + W3), D.
Run: python3 gen.py   (writes home.html and saint.html next to this file)
"""
import html
import json
import os
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
PROTO = os.path.abspath(os.path.join(HERE, '..', '..'))
sys.path.insert(0, PROTO)
import build as b  # noqa: E402  (read-only helpers; build.py is not edited)

E = html.escape
IMG = '../../assets/{}.jpg'
PHOTO = '../../../public/images/hero/galilee.webp'
CREDIT = 'Sea of Galilee · Grant Barclay · CC BY 2.0'
CREDIT_URL = 'https://www.flickr.com/photos/grantbarclay/'
MONTHS = b.MONTHS
MONTHS_LONG = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
               'September', 'October', 'November', 'December']
NAV = b.NAV

# Decision A6: "St. Pio of Pietrelcina" (META already carries it). Decision A14: kicker = role · years.
META = {k: dict(v) for k, v in b.META.items()}
for _k, _f in {'augustine-of-hippo': '50% 9%', 'benedict-of-nursia': '50% 11%', 'nicholas-of-myra': '50% 17%'}.items():
    META[_k]['focus'] = _f
# St. Sergius: the saint is a small figure inside a 17th-c. vita icon; view the centre panel only.
VIEWBOX = {'sergius-of-radonezh': 'inset(16% 25% 70% 25%)'}

# Decision A11: shown categories, fixed order.
CATS_SHOWN = [('Bishops', 3), ('Hermits', 3), ('Ascetics', 3), ('Nuns', 2), ('Holy Women', 2),
              ('Missionaries', 2), ('Converts', 1), ('Confessors', 1), ('Fathers of the Church', 1)]


def md(d):
    """'2000-08-28' -> (month index 0-11, 'Aug 28')."""
    m, day = int(d[5:7]), int(d[8:10])
    return m - 1, f'{MONTHS[m - 1]} {day}'


def card_meta(s):
    """Decision A8: one date if one tradition or the same date; else both, and the place drops."""
    c, o = s['feast_c'], s['feast_o']
    place = META[s['slug']]['place']
    if c and o and c[5:] != o[5:]:
        return f'Feast {md(c)[1]} · Orth. {md(o)[1]}', ''
    return f'Feast {md(c or o)[1]}', place


def month_counts():
    n = [0] * 12
    for s in b.SAINTS:
        ms = {md(d)[0] for d in (s['feast_c'], s['feast_o']) if d}
        for m in ms:
            n[m] += 1
    return n


MCOUNT = month_counts()
OCT = [s for s in b.SAINTS if any(d and d[5:7] == '10' for d in (s['feast_c'], s['feast_o']))]


def short_first(s):
    """'St. Thérèse of Lisieux' -> 'St. Thérèse' (index tile names)."""
    n = META[s['slug']]['short']
    return n.split(' of ')[0]


# ------------------------------------------------------------------ icons
I_SEARCH = ('<svg class="ic" width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" '
            'stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="9" cy="9" r="6"/><path d="m14 14 4 4"/></svg>')
I_CHEV = ('<svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="1.6" '
          'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m2 3.5 3 3 3-3"/></svg>')
I_MENU = ('<svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" stroke-width="1.8" '
          'stroke-linecap="round" aria-hidden="true"><path d="M3 6h16M3 11h16M3 16h16"/></svg>')
I_CLOSE = ('<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" '
           'stroke-linecap="round" aria-hidden="true"><path d="m5 5 10 10M15 5 5 15"/></svg>')
TAB_ICONS = {
    'Saints': '<rect x="3" y="3" width="6" height="8" rx="1.5"/><rect x="13" y="3" width="6" height="5" rx="1.5"/><rect x="3" y="14" width="6" height="5" rx="1.5"/><rect x="13" y="11" width="6" height="8" rx="1.5"/>',
    'Feasts': '<rect x="3" y="4.5" width="16" height="14" rx="2"/><path d="M3 9h16M7.5 2.5v4M14.5 2.5v4"/>',
    'Categories': '<path d="M4 6h14M4 11h14M4 16h9"/>',
    'Sort': '<path d="M7 4v14M3.5 14.5 7 18l3.5-3.5M15 18V4M11.5 7.5 15 4l3.5 3.5"/>',
}


def tab_icon(k):
    return (f'<svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" stroke-width="1.7" '
            f'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">{TAB_ICONS[k]}</svg>')


# ------------------------------------------------------------------ CSS
CSS = r"""
:root{--ink:#111;--ink2:#555;--mute:#767676;--line:#E2E2E2;--chip:#F1F1F1;--tint:#F5F5F5;--off:#B8B8B8;
  --gut:48px;--gap:16px;--shadow:0 1px 2px rgb(0 0 0/.06),0 6px 18px -6px rgb(0 0 0/.22)}
*{box-sizing:border-box}
html{-webkit-text-size-adjust:100%}
body{margin:0;font-family:Inter,system-ui,sans-serif;font-size:14px;line-height:1.4;color:var(--ink);background:#646464;
  font-feature-settings:"cv11","ss01";-webkit-font-smoothing:antialiased}
a{color:inherit;text-decoration:none}
h1,h2,h3,p,dl,dd,figure,blockquote{margin:0}
ul,ol{margin:0;padding:0;list-style:none}
button{font:inherit;color:inherit;background:none;border:0;padding:0;cursor:pointer}

/* ---------- photo (fixed, Galilee, grayscale; gradient only where header text sits) */
.photo{position:fixed;inset:0 0 auto 0;height:100vh;z-index:-1;background:#646464 url(PHOTO) center 40%/cover no-repeat;filter:grayscale(1)}
.photo::before{content:"";position:absolute;inset:auto 0 0 0;height:160px;background:linear-gradient(rgb(100 100 100/0),#646464)}
.photo::after{content:"";position:absolute;inset:0 0 auto 0;height:140px;
  background:linear-gradient(rgb(0 0 0/.5),rgb(0 0 0/.42) 48px,rgb(0 0 0/.36) 100px,rgb(0 0 0/0) 140px)}

/* ---------- header on the photo (no fill) */
.bar{position:relative;height:48px;display:flex;align-items:center;padding:0 var(--gut);color:#fff;z-index:5}
.logo{font-size:20px;font-weight:700;letter-spacing:-.015em;white-space:nowrap;display:flex;align-items:center;gap:10px}
.mark{display:none;width:32px;height:32px;border-radius:8px;background:var(--ink);color:#fff;font-size:15px;font-weight:700;
  align-items:center;justify-content:center;letter-spacing:-.02em;flex:none}
.nav{position:absolute;left:50%;transform:translateX(-50%);display:flex;gap:28px;font-size:14px;font-weight:500}
.nav a{position:relative;padding:6px 0}
.nav a.on::after{content:"";position:absolute;left:0;right:0;bottom:0;height:2px;background:currentColor;border-radius:1px}
.sp{flex:1}
.app{height:36px;padding:0 16px;border-radius:8px;display:inline-flex;align-items:center;font-size:14px;font-weight:600;
  background:#fff;color:var(--ink);white-space:nowrap}
.bar .search.m{display:none}
.menu{display:none;width:40px;height:40px;align-items:center;justify-content:center;margin-right:-8px}
.hero{position:relative;height:64px}
.search{display:flex;align-items:center;gap:12px;background:#fff;color:var(--mute);border-radius:999px;font-size:15px;white-space:nowrap}
.search .ic{color:var(--ink);flex:none}
.hero .search{position:absolute;left:50%;top:4px;width:560px;height:48px;margin-left:-280px;padding:0 20px;box-shadow:0 8px 24px -10px rgb(0 0 0/.45)}
.credit{position:absolute;right:var(--gut);top:39px;height:20px;padding:0 8px;border-radius:4px;display:inline-flex;align-items:center;
  font-size:11.5px;line-height:1;color:rgb(255 255 255/.85);background:rgb(0 0 0/.5);white-space:nowrap}
.credit:hover{text-decoration:underline}

/* ---------- compact header (after the photo header scrolls away) */
.compact{position:fixed;inset:0 0 auto 0;height:56px;z-index:20;display:flex;align-items:center;gap:16px;padding:0 var(--gut);
  background:rgb(255 255 255/.88);-webkit-backdrop-filter:blur(18px) saturate(1.4);backdrop-filter:blur(18px) saturate(1.4);
  box-shadow:0 1px 0 rgb(0 0 0/.08);transform:translateY(-100%);transition:transform .2s ease;color:var(--ink)}
body.scrolled .compact{transform:none}
.compact .logo{font-size:18px;margin-right:12px}
.compact .navc{display:flex;gap:22px;font-size:14px;font-weight:500;color:var(--ink2)}
.compact .navc a.on{color:var(--ink)}
.compact .search{width:360px;height:36px;padding:0 14px;font-size:14px;background:#fff;box-shadow:inset 0 0 0 1px var(--line)}
.compact .search .ic{width:16px;height:16px}
.browse{height:36px;padding:0 12px 0 14px;border-radius:8px;background:var(--chip);display:inline-flex;align-items:center;gap:8px;font-size:14px;font-weight:600}
.compact .app{background:var(--ink);color:#fff}
.cname{font-size:15px;font-weight:700;letter-spacing:-.01em;white-space:nowrap;padding-left:16px;border-left:1px solid var(--line);margin-left:-4px}
.ctabs{display:flex;gap:24px;height:56px;margin-left:12px}
.ctabs a{display:flex;align-items:center;font-size:14px;font-weight:600;color:var(--ink2);position:relative}
.ctabs a.on{color:var(--ink)}
.ctabs a.on::after{content:"";position:absolute;left:0;right:0;bottom:0;height:2px;background:var(--ink)}

/* ---------- wall */
.wall{display:flex;align-items:flex-start;gap:var(--gap);padding:12px var(--gut) 48px}
.col{flex:1 1 0;min-width:0;display:flex;flex-direction:column;gap:var(--gap)}
.card{display:flex;flex-direction:column;background:#fff;border-radius:10px;box-shadow:var(--shadow);overflow:hidden;padding:0 14px 2px}
.card .im{display:block;width:calc(100% + 28px);height:104px;margin:0 -14px 12px;object-fit:cover;filter:grayscale(1);background:var(--tint)}
.kick{font-size:12.5px;font-weight:500;line-height:1.3;color:var(--ink2)}
.card .nm{font-size:20px;line-height:1.2;font-weight:700;letter-spacing:-.015em;margin:4px 0 8px;text-wrap:balance}
.sum{font-size:14.5px;line-height:1.5;color:var(--ink);text-wrap:pretty}
.meta{display:flex;justify-content:space-between;gap:12px;align-items:center;height:30px;margin-top:12px;border-top:1px solid var(--line);
  font-size:12.5px;color:var(--ink2);white-space:nowrap}

/* index tile: first item of column 1, not sticky */
.index{background:#fff;border-radius:10px;box-shadow:var(--shadow);padding:16px 16px 14px}
.today{display:flex;justify-content:space-between;align-items:baseline;font-size:16px;font-weight:700;letter-spacing:-.01em}
.today span{font-size:14px;font-weight:500;color:var(--ink2)}
.todayn{font-size:13px;color:var(--ink2);margin-top:4px;line-height:1.45}
.todayn a{text-decoration:underline;text-decoration-color:#C9C9C9;text-underline-offset:2px}
.ih{font-size:12.5px;font-weight:600;color:var(--ink2);margin:12px 0 2px;padding-top:11px;border-top:1px solid var(--line)}
.cats{display:grid;grid-template-columns:1fr 1fr;column-gap:16px}
.cats a{display:flex;justify-content:space-between;align-items:center;height:27px;font-size:13.5px;font-weight:500}
.cats a i{font-style:normal;font-size:12.5px;color:var(--mute);font-variant-numeric:tabular-nums}
.cats a.w{grid-column:1/-1}
.months{display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin-top:6px}
.months a{position:relative;height:28px;border-radius:6px;background:var(--chip);display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:500}
.months a.off{background:none;color:var(--off);box-shadow:inset 0 0 0 1px #EBEBEB}
.months a.dot::after{content:"";width:4px;height:4px;margin-left:5px;border-radius:50%;background:var(--ink)}
.sortrow{display:flex;align-items:center;gap:10px;font-size:13.5px;margin-top:12px;padding-top:11px;border-top:1px solid var(--line)}
.sortrow .l{font-size:12.5px;font-weight:600;color:var(--ink2);margin-right:2px}
.sortrow a{font-weight:500}
.sortrow .d{color:var(--off)}

/* ---------- footer: one row, tradition switch left, nav right */
.foot{height:64px;background:#fff;display:flex;align-items:center;gap:24px;padding:0 var(--gut);border-top:1px solid var(--line)}
.trad{display:flex;gap:4px}
.trad a{height:30px;padding:0 12px;border-radius:6px;display:inline-flex;align-items:center;font-size:13px;font-weight:500;background:var(--chip)}
.trad a.on{background:var(--ink);color:#fff}
.fnav{display:flex;gap:24px;font-size:14px;color:var(--ink2);margin-left:auto}

/* ---------- saint page (S3: title across, infobox right) */
.sheet{position:relative;margin:8px 24px 0;background:#fff;border-radius:16px;padding:40px}
.skick{font-size:12.5px;font-weight:500;color:var(--ink2)}
.sname{font-size:48px;line-height:1.05;font-weight:700;letter-spacing:-.025em;margin:8px 0 28px}
.sgrid{display:grid;grid-template-columns:minmax(0,1fr) 320px;grid-template-rows:auto 1fr;grid-template-areas:"lead box" "main box";column-gap:48px;align-items:stretch}
.sgrid>.lead{grid-area:lead}.sgrid>.box{grid-area:box}.sgrid>.main{grid-area:main}
.lead{font-size:17.5px;line-height:1.6;max-width:680px;text-wrap:pretty}
.h2row{display:flex;align-items:baseline;justify-content:space-between;gap:16px;margin:48px 0 14px;padding-bottom:10px;border-bottom:1px solid var(--line);scroll-margin-top:72px}
.h2row h2{font-size:26px;line-height:1.2;font-weight:600;letter-spacing:-.015em}
.more{font-size:14px;font-weight:600;text-decoration:underline;text-underline-offset:3px;text-decoration-thickness:1px;white-space:nowrap}
.chap{display:grid;grid-template-columns:1fr 1fr;grid-auto-flow:column;grid-template-rows:repeat(6,38px);column-gap:32px}
.chap.t{grid-template-rows:repeat(3,38px)}
.chap a{display:flex;align-items:center;gap:14px;border-bottom:1px solid var(--line);font-size:15px;font-weight:500;min-width:0}
.chap a b{font-weight:500;font-size:13px;color:var(--mute);font-variant-numeric:tabular-nums;width:20px;flex:none}
.chap a span{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.quotes{display:grid;grid-template-columns:1fr 1fr;gap:32px;margin-top:28px}
.quotes blockquote{font-size:20px;line-height:1.4;font-weight:400;letter-spacing:-.01em;padding-left:18px;border-left:2px solid var(--ink);text-wrap:pretty}
.place{font-size:15px;font-weight:600;margin-bottom:6px}
.body{font-size:17.5px;line-height:1.6;max-width:680px}
.mir{display:flex;align-items:center;justify-content:space-between;height:48px;margin-top:48px;border-top:1px solid var(--line);border-bottom:1px solid var(--line);
  font-size:15px;color:var(--mute)}
.mir:hover{color:var(--ink)}
.box{min-width:0}
.pframe{background:var(--tint);border-radius:10px;height:280px;display:flex;align-items:center;justify-content:center}
.pframe img{width:154px;height:240px;display:block;filter:grayscale(1)}
.cap{font-size:12.5px;color:var(--mute);margin-top:8px}
.facts{position:sticky;top:72px;margin-top:16px}
.facts dl{display:grid;grid-template-columns:96px minmax(0,1fr);border-top:1px solid var(--line)}
.facts dt,.facts dd{padding:9px 0;border-bottom:1px solid var(--line)}
.facts dt{font-size:13px;color:var(--ink2);line-height:20px}
.facts dd{font-size:14px;line-height:20px}
.pray{display:flex;align-items:center;justify-content:center;height:38px;margin-top:16px;border-radius:8px;background:var(--ink);color:#fff;font-size:14px;font-weight:600}
.saint .foot{margin-top:24px}
.pcap{display:none}

/* phone-only pieces hidden on desktop */
.tabbar,.sbar,.sheetm,.pfloat{display:none}

/* ================================================================ phone */
@media (max-width:700px){
  :root{--gut:16px}
  body{background:#fff;padding-bottom:56px}
  .photo{position:absolute;top:52px;height:112px;inset:52px 0 auto 0;background-position:center 46%}
  .photo::after{display:none}
  .bar{position:sticky;top:0;height:52px;background:#fff;color:var(--ink);gap:10px;z-index:30;box-shadow:0 1px 0 var(--line)}
  .bar .nav,.bar .app{display:none}
  .mark,.menu{display:inline-flex}
  .bar .sp{display:none}
  .menu{margin-left:auto}
  .bar .logo{font-size:17px}
  .bar .wm{transition:opacity .15s}
  .bar .search.m{display:none;flex:1;height:36px;padding:0 12px;font-size:14px;background:var(--chip);gap:8px}
  .bar .search.m .ic{width:16px;height:16px}
  body.scrolled .bar .wm{display:none}
  body.scrolled .bar .search.m{display:flex}
  .compact{display:none}
  .hero{height:112px}
  .hero .search{left:16px;right:16px;top:20px;width:auto;height:44px;margin:0;padding:0 16px;box-shadow:0 6px 18px -8px rgb(0 0 0/.5)}
  .credit{right:16px;top:auto;bottom:18px;height:18px;padding:0 6px;font-size:11.5px}
  .wall{display:block;position:relative;margin-top:-12px;background:#fff;border-radius:16px 16px 0 0;padding:4px 0 0}
  .index{display:none}
  .card{border-radius:0;box-shadow:none;padding:18px 16px 18px;border-bottom:1px solid var(--line);overflow:visible}
  .card .im{order:3;width:100%;height:96px;margin:12px 0 12px;border-radius:6px}
  .card .kick{order:1}
  .card .nm{order:2;font-size:19px;margin:3px 0 0}
  .card .sum{order:4;font-size:15px}
  .card .meta{order:5;height:auto;margin-top:10px;border-top:0;justify-content:flex-start;gap:0}
  .card .meta span+span::before{content:"·";margin:0 6px}
  .foot{height:auto;flex-direction:column;align-items:flex-start;gap:14px;padding:20px 16px 24px}
  .fnav{margin-left:0;display:grid;grid-template-columns:repeat(3,auto);justify-content:start;gap:8px 28px}
  .tabbar{display:flex;position:fixed;inset:auto 0 0 0;height:56px;background:#fff;box-shadow:0 -1px 0 var(--line);z-index:40}
  .tabbar a{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;font-size:11.5px;font-weight:500;color:var(--ink2)}
  .tabbar a.on{color:var(--ink);font-weight:600}
  /* sheet opened from the bottom bar */
  .sheetm{position:fixed;inset:0;background:#fff;z-index:60;flex-direction:column}
  body.sheet-open .sheetm{display:flex}
  .sheetm header{height:52px;display:flex;align-items:center;justify-content:space-between;padding:0 8px 0 16px;border-bottom:1px solid var(--line);font-size:16px;font-weight:600}
  .sheetm header button{width:44px;height:44px;display:flex;align-items:center;justify-content:center}
  .sheetm a{display:flex;align-items:center;justify-content:space-between;height:48px;margin:0 16px;border-bottom:1px solid var(--line);font-size:16px}
  .sheetm a i{font-style:normal;font-size:14px;color:var(--mute)}
  .sheetm a.off{color:var(--off)}
  .sheetm a.off i{color:var(--off)}
  .sheetm a .d{display:inline-block;width:5px;height:5px;border-radius:50%;background:var(--ink);margin-left:8px;vertical-align:middle}

  /* saint phone */
  .saint .photo,.saint .hero,.saint .compact{display:none}
  .saint .bar .wm{display:none}
  .saint .bar .search.m{display:flex}
  .sheet{margin:0;border-radius:0;padding:20px 16px 8px}
  .sname{font-size:36px;line-height:1.05;margin:6px 0 0;letter-spacing:-.02em}
  .pfloat{display:block;float:right;width:96px;margin:2px 0 10px 16px}
  .pfloat img{display:block;width:96px;height:150px;filter:grayscale(1)}
  .pfloat .pcap{display:block;font-size:11.5px;line-height:1.35;color:var(--mute);margin-top:6px}
  .sgrid{display:block}
  .lead{font-size:17px;margin-top:14px}
  .pframe,.box>.cap{display:none}
  .facts{position:static;margin-top:0;clear:both}
  .facts .pray{display:none}
  .facts dl{grid-template-columns:96px minmax(0,1fr);margin-top:20px}
  .h2row{margin:40px 0 8px;scroll-margin-top:60px}
  .h2row h2{font-size:24px}
  .chap,.chap.t{grid-template-columns:1fr;grid-auto-flow:row;grid-template-rows:none}
  .chap a{min-height:40px;padding:9px 0;align-items:flex-start;line-height:22px}
  .chap a span{white-space:normal}
  .chap a b{line-height:22px}
  .quotes{grid-template-columns:1fr;gap:20px;margin-top:20px}
  .quotes blockquote{font-size:20px;padding-left:14px}
  .body{font-size:17px}
  .mir{margin-top:40px;height:auto;min-height:48px;padding:12px 0;gap:12px}
  .saint .foot{margin-top:24px}
  .sbar{display:flex;position:fixed;inset:auto 0 0 0;height:56px;background:#fff;box-shadow:0 -1px 0 var(--line);z-index:40;padding:0 16px;align-items:stretch;gap:8px}
  .sbar nav{flex:1;display:flex;gap:20px}
  .sbar nav a{display:flex;align-items:center;font-size:14px;font-weight:600;color:var(--ink2);position:relative}
  .sbar nav a.on{color:var(--ink)}
  .sbar nav a.on::after{content:"";position:absolute;left:0;right:0;bottom:0;height:2px;background:var(--ink)}
  .sbar .pray{width:88px;height:40px;margin:8px 0 0;flex:none}
}
"""
CSS = CSS.replace('PHOTO', PHOTO)

JS = r"""
(function(){
  var B=document.body, PHONE=700;
  function phone(){return innerWidth<=PHONE}
  // masonry: saints.json order, shortest column first; index tile is item 1 (column 1)
  var wall=document.getElementById('wall');
  var items=wall?[].slice.call(wall.querySelectorAll('.item')):[];
  function layout(){
    if(!wall)return;
    if(phone()){wall.replaceChildren.apply(wall,items);return}
    var gap=16,w=wall.clientWidth-parseFloat(getComputedStyle(wall).paddingLeft)*2;
    var n=Math.max(2,Math.min(6,Math.floor((w+gap)/(256+gap))));
    var cols=[];for(var i=0;i<n;i++){var c=document.createElement('div');c.className='col';cols.push(c)}
    wall.replaceChildren.apply(wall,cols);
    items.forEach(function(it){
      var best=cols[0],bh=Infinity;
      cols.forEach(function(c){var h=c.getBoundingClientRect().height;if(h<bh-0.5){bh=h;best=c}});
      best.appendChild(it);
    });
  }
  // compact header after the photo header leaves
  function onScroll(){
    var y=scrollY;B.classList.toggle('scrolled',phone()?y>110:y>104);
    var tabs=document.querySelectorAll('[data-spy]');if(!tabs.length)return;
    var cur=null;['life','teachings','relics'].forEach(function(id){var el=document.getElementById(id);if(el&&el.getBoundingClientRect().top<innerHeight*0.35)cur=id});
    if(!cur)cur='life';
    tabs.forEach(function(a){a.classList.toggle('on',a.getAttribute('href')==='#'+cur)});
  }
  function state(){
    var h=location.hash.slice(1),m=/y=(\d+)/.exec(h);
    if(/sheet/.test(h))B.classList.add('sheet-open');
    if(m)window.scrollTo(0,+m[1]);
    onScroll();
  }
  (document.fonts?document.fonts.ready:Promise.resolve()).then(function(){layout();state()});
  addEventListener('resize',function(){layout();onScroll()});
  addEventListener('scroll',onScroll,{passive:true});
  document.querySelectorAll('[data-sheet]').forEach(function(a){a.addEventListener('click',function(e){e.preventDefault();B.classList.add('sheet-open')})});
  document.querySelectorAll('[data-close]').forEach(function(a){a.addEventListener('click',function(){B.classList.remove('sheet-open')})});
})();
"""


def head(title):
    return ('<!doctype html><html lang="en"><head><meta charset="utf-8">'
            '<meta name="viewport" content="width=device-width,initial-scale=1">'
            f'<title>{E(title)}</title>'
            '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>'
            '<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">'
            f'<style>{CSS}</style></head>')


def bar(saint=False):
    nav = ''.join(f'<a href="{"home.html" if n == "Saints" else "#"}"{" class=on" if n == "Saints" else ""}>{n}</a>' for n in NAV)
    return (f'<header class="bar" data-d="1" data-m="1">'
            f'<a class="logo" href="home.html"><span class="mark" aria-hidden="true">D</span><span class="wm">Discover the Saints</span></a>'
            f'<nav class="nav" aria-label="Main">{nav}</nav>'
            f'<a class="search m" href="#" role="search">{I_SEARCH}Search saints</a>'
            f'<span class="sp"></span><a class="app" href="#">Get the app</a>'
            f'<button class="menu" aria-label="Menu">{I_MENU}</button></header>')


def hero():
    return (f'<div class="hero"><a class="search" href="#" role="search" data-d="2" data-m="2">{I_SEARCH}Search saints</a>'
            f'<a class="credit" href="{CREDIT_URL}" data-d="3" data-m="3">{E(CREDIT)}</a></div>')


def compact(saint=False):
    if saint:
        mid = (f'<span class="cname">{E(META["therese-of-lisieux"]["short"])}</span>'
               f'<nav class="ctabs"><a href="#life" data-spy class="on">Life</a><a href="#teachings" data-spy>Teachings</a><a href="#relics" data-spy>Relics</a></nav>')
    else:
        nav = ''.join(f'<a href="#"{" class=on" if n == "Saints" else ""}>{n}</a>' for n in NAV)
        mid = f'<nav class="navc">{nav}</nav>'
    right = '' if saint else f'<button class="browse">Browse {I_CHEV}</button>'
    return (f'<header class="compact" aria-label="Compact header"><a class="logo" href="home.html">Discover the Saints</a>{mid}'
            f'<span class="sp"></span>{right}<a class="search" href="#" role="search">{I_SEARCH}Search saints</a>'
            f'<a class="app" href="#">Get the app</a></header>')


def footer(n):
    trad = ''.join(f'<a href="#"{" class=on aria-current=true" if t == "Both" else ""}>{t}</a>' for t in ('Catholic', 'Orthodox', 'Both'))
    nav = ''.join(f'<a href="#">{x}</a>' for x in NAV)
    return f'<footer class="foot"><nav class="trad" aria-label="Tradition" data-d="{n}" data-m="{n}">{trad}</nav><nav class="fnav">{nav}</nav></footer>'


def card(s, extra=''):
    slug = s['slug']
    m = META[slug]
    f, place = card_meta(s)
    href = 'saint.html' if slug == 'therese-of-lisieux' else '#'
    return (f'<a class="card item" href="{href}"{extra}>'
            f'<img class="im" src="{IMG.format(slug)}" alt="{E(m["short"])}" style="object-position:{m["focus"]}{';object-view-box:' + VIEWBOX[slug] if slug in VIEWBOX else ''}" loading="eager">'
            f'<div class="kick">{E(m["role"])} · {E(m["years"])}</div>'
            f'<h3 class="nm">{E(m["short"])}</h3>'
            f'<p class="sum">{E(b.st(s["summary"]).strip())}</p>'
            f'<div class="meta"><span>{E(f)}</span>{f"<span>{E(place)}</span>" if place else ""}</div></a>')


def index_tile():
    names = ' · '.join(f'<a href="#">{E(short_first(s))}</a>' for s in OCT)
    cats = ''.join(f'<a href="#"{" class=w" if len(k) > 14 else ""}>{E(k)}<i>{n}</i></a>' for k, n in CATS_SHOWN)
    months = ''.join(
        f'<a href="#" class="{"off" if MCOUNT[i] == 0 else ""}{" dot" if i == 9 else ""}"'
        f'{" aria-disabled=true" if MCOUNT[i] == 0 else ""}>{mo}</a>' for i, mo in enumerate(MONTHS))
    return (f'<section class="index item" aria-label="Browse" data-d="4">'
            f'<a class="today" href="#">October<span>{len(OCT)} saints →</span></a>'
            f'<div class="todayn">{names}</div>'
            f'<div class="ih">Categories</div><div class="cats">{cats}</div>'
            f'<div class="ih">Feast month</div><div class="months">{months}</div>'
            f'<div class="sortrow"><span class="l">Sort</span><a href="#">Feast date</a><span class="d">·</span><a href="#">A–Z</a></div>'
            f'</section>')


def feast_sheet():
    rows = ''.join(
        f'<a href="#"{" class=off" if MCOUNT[i] == 0 else ""}><span>{mo}{"<span class=d></span>" if i == 9 else ""}</span><i>{MCOUNT[i]}</i></a>'
        for i, mo in enumerate(MONTHS_LONG))
    return (f'<div class="sheetm" role="dialog" aria-label="Feast month"><header>Feast month'
            f'<button data-close aria-label="Close">{I_CLOSE}</button></header>{rows}</div>')


def tabbar():
    out = []
    for k in ('Saints', 'Feasts', 'Categories', 'Sort'):
        attr = ' class=on' if k == 'Saints' else ' data-sheet'
        out.append(f'<a href="#"{attr}>{tab_icon(k)}{k}</a>')
    return f'<nav class="tabbar" aria-label="Browse" data-m="5">{"".join(out)}</nav>'


def build_home():
    cards = []
    for s in b.SAINTS:
        extra = ''
        if s['slug'] == 'therese-of-lisieux':
            extra = ' data-d="5" data-m="4"'
        if s['slug'] == 'augustine-of-hippo':
            extra = ' data-d="6"'
        cards.append(card(s, extra))
    page = (head('Discover the Saints') + '<body class="home">'
            '<div class="photo" role="img" aria-label="Sea of Galilee at sunset"></div>'
            + bar() + hero() + compact()
            + f'<main class="wall" id="wall">{index_tile()}{"".join(cards)}</main>'
            + footer(7 if True else 0).replace('data-m="7"', 'data-m="6"')
            + tabbar() + feast_sheet()
            + f'<script>{JS}</script></body></html>')
    open(os.path.join(HERE, 'home.html'), 'w').write(page)
    print('wrote home.html', len(page) // 1024, 'KB')


def build_saint():
    s = b.BY['therese-of-lisieux']
    m = META[s['slug']]
    kicker = f'{m["role"]} · {m["place"]} · {m["years"]}'
    ch = ''.join(f'<a href="#"><b>{i + 1:02d}</b><span>{E(t)}</span></a>' for i, t in enumerate(b.CHAPTERS))
    tch = ''.join(f'<a href="#"><b>{i + 1:02d}</b><span>{E(t)}</span></a>' for i, t in enumerate(b.TEACHINGS))
    q2 = b.TH['quotes'][4]['text']
    facts = [
        ('Feast', 'October 1'),
        ('Born', '1873, Alençon, France'),
        ('Died', '1897, Lisieux, France'),
        ('Patron of', 'Missions, with St. Francis Xavier; France, with St. Joan of Arc'),
        ('Venerated', 'Catholic'),
    ]
    dl = ''.join(f'<dt>{k}</dt><dd>{E(v)}</dd>' for k, v in facts)
    cap = 'Holy card, 1916 · Public domain'
    alt = 'St. Thérèse of Lisieux, First Communion holy card, 1916'
    img = IMG.format(s['slug'])
    lead = f'<p class="lead" data-d="2">{E(b.TH_SUMMARY.strip())}</p>'
    main = (f'<div class="main">'
            f'<div class="h2row" id="life" data-d="5" data-m="4"><h2>Life</h2><a class="more" href="#">Read the full life →</a></div>'
            f'<div class="chap">{ch}</div>'
            f'<div class="h2row" id="teachings" data-d="6"><h2>Words and teachings</h2></div>'
            f'<div class="chap t">{tch}</div>'
            f'<div class="quotes"><blockquote>“{E(b.QUOTE)}”</blockquote><blockquote>“{E(q2)}”</blockquote></div>'
            f'<div class="h2row" id="relics" data-d="7"><h2>Relics</h2></div>'
            f'<p class="place">{E(b.TH["relic_location"])}</p><p class="body">{E(b.RELIC_SHORT)}</p>'
            f'<a class="mir" href="#" data-d="8" data-m="5"><span>Miracles and answered prayers · <span style="white-space:nowrap">{b.N_MIRACLES} accounts</span></span><span>→</span></a>'
            f'</div>')
    box = (f'<aside class="box" aria-label="Facts">'
           f'<figure class="pframe" data-d="3"><img src="{img}" alt="{E(alt)}"></figure>'
           f'<div class="cap">{cap}</div>'
           f'<div class="facts" data-d="4" data-m="3"><dl>{dl}</dl><a class="pray" href="#">Pray in the app</a></div></aside>')
    sbar = ('<nav class="sbar" aria-label="Sections" data-m="6"><nav>'
            '<a href="#life" data-spy class="on">Life</a><a href="#teachings" data-spy>Teachings</a><a href="#relics" data-spy>Relics</a>'
            '</nav><a class="pray" href="#">Pray</a></nav>')
    page = (head('St. Thérèse of Lisieux · Discover the Saints') + '<body class="saint">'
            '<div class="photo" role="img" aria-label="Sea of Galilee at sunset"></div>'
            + bar(saint=True) + hero() + compact(saint=True)
            + f'<article class="sheet">'
            f'<figure class="pfloat" data-m="2"><img src="{img}" alt="{E(alt)}"><figcaption class="pcap">{cap}</figcaption></figure>'
            f'<div class="skick">{E(kicker)}</div><h1 class="sname" data-d="1">{E(m["short"])}</h1>'
            f'<div class="sgrid">{lead}{box}{main}</div></article>'
            + footer(9).replace('data-m="9"', 'data-m="7"')
            + sbar + f'<script>{JS}</script></body></html>')
    # The header carries data-d="1"/data-m="1"; the saint page numbers its notes from the name.
    page = page.replace('<header class="bar" data-d="1" data-m="1">', '<header class="bar" data-m="1">', 1)
    page = page.replace('<a class="search" href="#" role="search" data-d="2" data-m="2">', '<a class="search" href="#" role="search">', 1)
    page = page.replace(' data-d="3" data-m="3">' + E(CREDIT), ' data-d="10">' + E(CREDIT), 1)
    open(os.path.join(HERE, 'saint.html'), 'w').write(page)
    print('wrote saint.html', len(page) // 1024, 'KB')


if __name__ == '__main__':
    build_home()
    build_saint()
