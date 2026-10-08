#!/usr/bin/env python3
"""W2 "Side index" wireframe: home.html + saint.html (one responsive file each).

Spec: committee/05-chair.md, sections A, B (Shared + W2), D.
Run: python3 wireframes/w2/gen.py   (from /home/user/BioCMS/prototypes)
"""
import html
import os
import re
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.abspath(os.path.join(HERE, '..', '..')))
import build as B  # noqa: E402  (data helpers only; build.py is not edited)

E = html.escape
ASSETS = '../../assets'
PHOTO = '../../../public/images/hero/galilee.webp'
NAV = ['Saints', 'Miracles', 'Novenas', 'Teachings', 'Quotes', 'Books']
MON = B.MONTHS
CREDIT_PLACE = 'Sea of Galilee'
CREDIT_BY = 'Grant Barclay'
CREDIT_LIC = 'CC BY 2.0'
LIC_URL = 'https://creativecommons.org/licenses/by/2.0/'

# Chair A11: shown categories, fixed order and counts (Bishops added to St. John Maximovitch).
CATS = [('Bishops', 3), ('Hermits', 3), ('Ascetics', 3), ('Nuns', 2), ('Holy Women', 2),
        ('Missionaries', 2), ('Converts', 1), ('Fathers of the Church', 1), ('Confessors', 1)]

ORDER = [s['slug'] for s in B.SAINTS]  # Chair A16: saints.json order

# META focus points cut the face off at 278x124 / 343x104 for three saints; these move the crop up to the face.
FOCUS = {'augustine-of-hippo': '50% 8%', 'benedict-of-nursia': '50% 11%', 'sergius-of-radonezh': '50% 16%'}


def md(d):
    return f'{MON[int(d[5:7]) - 1]} {int(d[8:10])}'


def feast_line(s):
    """Chair A8 (Both mode): one date, or 'Feast Aug 28 · Orth. Jun 15' (place drops)."""
    c, o = s['feast_c'], s['feast_o']
    if c and o and c != o:
        return f'Feast {md(c)} · Orth. {md(o)}', False
    return f'Feast {md(c or o)}', True


def months_with_saints():
    out = set()
    for s in B.SAINTS:
        for d in (s['feast_c'], s['feast_o']):
            if d:
                out.add(int(d[5:7]) - 1)
    return out


ACTIVE_MONTHS = months_with_saints()
CURRENT_MONTH = 9  # October (today 2026-10-07)

ICON_SEARCH = ('<svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" '
               'stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="9" cy="9" r="6"/>'
               '<path d="m14 14 4 4"/></svg>')
CHEV = ('<svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="1.6" '
        'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m2 3.5 3 3 3-3"/></svg>')
ICON_MENU = ('<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" '
             'stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M3 6h14M3 10h14M3 14h14"/></svg>')
ICON_X = ('<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" '
          'stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="m5 5 10 10M15 5 5 15"/></svg>')

CSS = r"""
:root{--ink:#111;--ink2:#555;--mute:#767676;--line:#E2E2E2;--chip:#F1F1F1;--panel:#F5F5F5;--r:10px}
*{box-sizing:border-box}
html{-webkit-text-size-adjust:100%}
body{margin:0;font-family:Inter,system-ui,sans-serif;font-size:14px;line-height:1.4;color:var(--ink);background:#666;
  font-feature-settings:"cv11","ss01";-webkit-font-smoothing:antialiased}
a{color:inherit;text-decoration:none}
img{display:block}
.photo{position:fixed;inset:0;z-index:-1;background:#666 url(PHOTO) center 46%/cover no-repeat;filter:grayscale(1)}
.mobile-only{display:none}

/* header */
.hdr{position:sticky;top:0;z-index:40;height:56px;background:rgba(255,255,255,.98);
  -webkit-backdrop-filter:blur(24px);backdrop-filter:blur(24px);
  box-shadow:0 1px 0 rgba(0,0,0,.06)}
.hdr .in{display:flex;align-items:center;height:100%;padding:0 24px}
.logo{font-size:20px;font-weight:700;letter-spacing:-.02em;white-space:nowrap;margin-right:40px}
.nav{display:flex;gap:24px;height:100%}
.nav a{position:relative;display:flex;align-items:center;font-size:14px;font-weight:500;color:var(--ink2)}
.nav a.on{color:var(--ink);font-weight:600}
.nav a.on::after{content:"";position:absolute;left:0;right:0;bottom:0;height:2px;background:var(--ink)}
.search{margin-left:auto;display:flex;align-items:center;gap:8px;width:400px;height:36px;padding:0 14px;border-radius:18px;
  background:#fff;border:1px solid var(--line);color:var(--mute);font-size:14px}
.search svg{color:var(--ink2);flex:none}
.btn{display:inline-flex;align-items:center;justify-content:center;height:36px;padding:0 16px;border-radius:8px;
  background:var(--ink);color:#fff;font-size:14px;font-weight:600;white-space:nowrap}
.hdr .btn{margin-left:12px}
.menu{display:none;width:40px;height:40px;align-items:center;justify-content:center;flex:none;margin-right:-8px}

/* footer */
.ft{position:relative;display:flex;align-items:center;justify-content:space-between;height:64px;padding:0 24px;
  background:#fff;border-top:1px solid var(--line)}
.seg{display:flex;gap:4px}
.seg a{display:flex;align-items:center;height:30px;padding:0 12px;border-radius:6px;font-size:13px;font-weight:500;color:var(--ink2)}
.seg a.on{background:var(--ink);color:#fff}
.ft nav{display:flex;gap:24px;font-size:14px;font-weight:500;color:var(--ink2)}

/* ---------------- home ---------------- */
.home{display:grid;grid-template-columns:232px minmax(0,1fr);gap:12px;padding:12px 24px 40px;align-items:start}
.side{position:sticky;top:68px}
.rail{background:#fff;border-radius:var(--r);padding:16px;box-shadow:0 1px 2px rgba(0,0,0,.06),0 10px 28px -14px rgba(0,0,0,.35)}
.rail h4{margin:0 0 4px;height:20px;font-size:12.5px;line-height:20px;font-weight:600;color:var(--ink2)}
.rail section+section{margin-top:12px;padding-top:12px;border-top:1px solid var(--line)}
.cats a{display:flex;align-items:center;justify-content:space-between;height:28px;margin:0 -8px;padding:0 8px;border-radius:6px;font-size:14px}
.cats a:hover{background:var(--chip)}
.cats small,.n{font-size:12.5px;color:var(--mute);font-variant-numeric:tabular-nums}
.months{display:grid;grid-template-columns:repeat(4,50px);grid-auto-rows:28px}
.months a{position:relative;display:flex;align-items:center;justify-content:center;border-radius:6px;font-size:13px;font-weight:600}
.months a:hover{background:var(--chip)}
.months a.off{color:var(--mute);font-weight:400;pointer-events:none}
.months a.now::after{content:"";position:absolute;left:50%;bottom:2px;width:4px;height:4px;margin-left:-2px;border-radius:50%;background:var(--ink)}
.sorts{display:flex;gap:6px}
.sorts a{display:flex;align-items:center;height:28px;padding:0 10px;border-radius:6px;background:var(--chip);font-size:13px;font-weight:500}
.credit{position:relative;display:block;margin-top:12px;padding:0 2px;color:#fff;text-shadow:0 1px 2px rgba(0,0,0,.45)}
.credit::before{content:"";position:absolute;z-index:-1;left:-40px;right:-20px;top:-22px;bottom:-22px;
  background:radial-gradient(closest-side,rgba(0,0,0,.42),rgba(0,0,0,0));pointer-events:none}
.credit b{display:block;font-size:13px;line-height:18px;font-weight:600}
.credit span{display:block;font-size:11.5px;line-height:16px;color:rgba(255,255,255,.85)}
.credit a:hover{text-decoration:underline}

.wall{display:flex;gap:12px;align-items:flex-start;min-height:800px}
.col{flex:1 1 0;min-width:0;display:flex;flex-direction:column;gap:12px}
.card{display:block;background:#fff;border-radius:var(--r);overflow:hidden;
  box-shadow:0 1px 2px rgba(0,0,0,.06),0 10px 28px -14px rgba(0,0,0,.35)}
.card .im{width:100%;height:124px;object-fit:cover;filter:grayscale(1);background:var(--panel)}
.card .bd{padding:14px 14px 2px}
.kick{font-size:12.5px;line-height:18px;font-weight:500;color:var(--ink2)}
.card h3{margin:4px 0 8px;font-size:20px;line-height:1.2;font-weight:700;letter-spacing:-.012em}
.card p{margin:0;font-size:14.5px;line-height:1.5;color:var(--ink)}
.meta{display:flex;justify-content:space-between;align-items:center;gap:8px;height:30px;margin-top:12px;
  border-top:1px solid var(--line);font-size:12.5px;color:var(--ink2);white-space:nowrap}
.credit-m{display:none}
.frow{display:none}
.frow-line{display:none}
.fsheet{display:none;outline:none}
.fsheet:target{display:block;position:fixed;inset:0;z-index:60;background:#fff;overflow:auto;padding:0 16px 32px}

/* phone menu sheet (opens from the menu button; home.html#menu) */
.sheet-menu{display:none;outline:none}
.sheet-menu:target{display:block;position:fixed;inset:0;z-index:60;background:#fff;overflow:auto;padding:0 16px 32px}
.sm-top{display:flex;align-items:center;justify-content:space-between;height:52px;border-bottom:1px solid var(--line);margin:0 -16px;padding:0 16px}
.sm-top b{font-size:17px;font-weight:700;letter-spacing:-.01em}
.sm-nav a{display:flex;align-items:center;justify-content:space-between;height:48px;border-bottom:1px solid var(--line);font-size:16px;font-weight:500}
.sm-nav a.on{font-weight:700}
.sheet-menu h4{margin:24px 0 4px;font-size:13px;font-weight:600;color:var(--ink2)}
.sm-cats a{display:flex;align-items:center;justify-content:space-between;height:44px;border-bottom:1px solid var(--line);font-size:15px}
.sm-months{display:grid;grid-template-columns:repeat(4,1fr);grid-auto-rows:44px;border-top:1px solid var(--line)}
.sm-months a{position:relative;display:flex;align-items:center;justify-content:center;border-bottom:1px solid var(--line);font-size:15px;font-weight:600}
.sm-months a.off{color:var(--mute);font-weight:400}
.sm-months a.now::after{content:"";position:absolute;left:50%;bottom:7px;width:4px;height:4px;margin-left:-2px;border-radius:50%;background:var(--ink)}
.sm-sort{display:flex;gap:8px}
.sm-sort a{display:flex;align-items:center;height:36px;padding:0 14px;border-radius:6px;background:var(--chip);font-size:14px;font-weight:500}
.sheet-menu .btn{width:100%;height:44px;margin-top:20px}

/* ---------------- saint ---------------- */
.page{max-width:1088px;margin:16px auto 24px;background:#fff;border-radius:16px;padding:40px;box-shadow:0 20px 50px -24px rgba(0,0,0,.45)}
.sgrid{display:grid;grid-template-columns:240px minmax(0,1fr);gap:48px;align-items:stretch}
.idcol{position:relative}
.portrait{margin:0}
.portrait img{width:205px;height:320px;object-fit:contain;filter:grayscale(1)}
.portrait figcaption{margin-top:8px;font-size:12.5px;line-height:1.4;color:var(--mute)}
.facts{position:sticky;top:72px;margin-top:24px;background:var(--panel);border-radius:var(--r);padding:20px}
.facts dl{margin:0}
.facts .r{padding:8px 0;border-bottom:1px solid var(--line)}
.facts .r:first-child{padding-top:0}
.facts .r:last-child{border-bottom:0}
.facts dt{font-size:13px;line-height:18px;color:var(--ink2)}
.facts dd{margin:2px 0 0;font-size:14px;line-height:20px;font-weight:500}
.facts .btn{display:flex;width:100%;height:38px;margin-top:12px}
.main{min-width:0}
.skick{font-size:12.5px;line-height:18px;font-weight:500;color:var(--ink2)}
h1{margin:6px 0 14px;font-size:48px;line-height:1.05;font-weight:700;letter-spacing:-.025em}
.lead{max-width:720px;font-size:17.5px;line-height:1.6}
.lead p{margin:0}
.lead .portrait-m{display:none}
.tabs{position:sticky;top:56px;z-index:20;display:flex;gap:28px;height:44px;margin-top:28px;background:#fff;
  border-bottom:1px solid var(--line)}
.tabs a{display:flex;align-items:center;height:44px;margin-bottom:-1px;border-bottom:2px solid transparent;font-size:14px;font-weight:600;color:var(--ink2)}
.tabs a.on{color:var(--ink);border-color:var(--ink)}
h2{display:flex;align-items:baseline;justify-content:space-between;margin:48px 0 14px;padding-bottom:10px;border-bottom:1px solid var(--line);
  font-size:26px;line-height:1.2;font-weight:600;letter-spacing:-.015em;scroll-margin-top:110px}
h2 a{font-size:14px;font-weight:600;letter-spacing:0;text-decoration:underline;text-underline-offset:3px;text-decoration-thickness:1px}
.list2{display:grid;grid-template-columns:1fr 1fr;column-gap:48px;margin:0;padding:0;list-style:none}
.list2.chap{grid-template-rows:repeat(6,auto);grid-auto-flow:column}
.list2.teach{grid-template-rows:repeat(3,auto);grid-auto-flow:column}
.list2 li{display:flex;align-items:center;gap:14px;min-height:38px;border-bottom:1px solid var(--line);font-size:15px;font-weight:500}
.list2 li b{width:20px;flex:none;font-size:12.5px;font-weight:500;color:var(--mute);font-variant-numeric:tabular-nums}
.quotes{display:grid;grid-template-columns:1fr 1fr;gap:48px;margin:0 0 24px}
.quotes blockquote{margin:0;font-size:20px;line-height:1.4;font-weight:400;letter-spacing:-.01em}
.body{max-width:720px;margin:0;font-size:17.5px;line-height:1.6}
.place{margin:0 0 6px;font-size:15px;font-weight:600}
.mrow{display:flex;align-items:center;justify-content:space-between;height:48px;margin-top:48px;border-top:1px solid var(--line);
  border-bottom:1px solid var(--line);font-size:15px;color:var(--mute)}
.photo-credit{position:fixed;top:72px;right:24px;z-index:5;width:140px;font-size:11.5px;line-height:16px;color:rgba(255,255,255,.85);
  text-shadow:0 1px 2px rgba(0,0,0,.5)}
.photo-credit::before{content:"";position:absolute;z-index:-1;left:-8px;right:-24px;top:-22px;bottom:-22px;
  background:radial-gradient(closest-side,rgba(0,0,0,.6),rgba(0,0,0,.3) 60%,rgba(0,0,0,0))}
.photo-credit b{display:block;font-size:13px;line-height:18px;font-weight:600;color:#fff}
.photo-credit span{display:block}
.photo-credit .sep{display:none;font-style:normal}
@media (min-width:760px) and (max-width:1399px){.page{margin:40px 24px 24px}
  .photo-credit{position:absolute;top:56px;right:24px;width:auto;height:40px;display:flex;align-items:center;gap:6px}
  .photo-credit b{font-size:12px}.photo-credit span{display:inline}.photo-credit .sep{display:none}}
.photo-credit a:hover{text-decoration:underline}
.bbar{display:none}

/* ---------------- phone ---------------- */
@media (max-width:759px){
  body{background:#fff;font-size:15px}
  .photo{position:absolute;inset:auto 0;top:52px;height:88px;z-index:0;background-position:center 52%}
  .hdr{height:52px;background:#fff;box-shadow:0 1px 0 var(--line)}
  .hdr .in{padding:0 16px;gap:10px}
  .nav,.hdr .btn,.sx{display:none}
  .logo{flex:none;margin-right:0;font-size:16px;letter-spacing:-.02em}
  .search{flex:1;width:auto;min-width:0;margin-left:2px;overflow:hidden;white-space:nowrap;background:var(--chip);border-color:transparent;font-size:15px}
  .menu{display:flex}
  .ft{flex-direction:column;align-items:flex-start;gap:14px;height:auto;padding:20px 16px 28px}
  .ft nav{flex-wrap:wrap;gap:8px 20px}

  .home{display:block;padding:0;position:relative;z-index:1;margin-top:72px}
  .side{display:none}
  .credit-m{display:block;position:absolute;z-index:2;left:16px;right:16px;top:104px;height:16px;font-size:11.5px;line-height:16px;
    color:rgba(255,255,255,.85);text-shadow:0 1px 2px rgba(0,0,0,.6);white-space:nowrap}
  .credit-m::before{content:"";position:absolute;z-index:-1;left:-16px;right:-16px;top:-12px;bottom:-6px;
    background:linear-gradient(rgba(0,0,0,0),rgba(0,0,0,.34))}
  .wall{display:block;min-height:0;background:#fff;padding:0 16px}
  .frow{display:flex;align-items:center;height:40px;margin:0;padding:0 16px;background:#fff;border-radius:16px 16px 0 0;
    font-size:14px;font-weight:600;white-space:nowrap}
  .frow a{display:flex;align-items:center;gap:4px;height:40px}
  .frow i{font-style:normal;color:var(--mute);margin:0 9px;font-weight:400}
  .frow-line{display:block;height:1px;background:var(--line);margin:0 16px}
  .card{border-radius:0;box-shadow:none;padding:20px 0;border-bottom:1px solid var(--line)}
  .card:last-child{border-bottom:0}
  .card .im{height:104px;border-radius:8px}
  .card .bd{padding:0}
  .kick{margin-top:12px}
  .card h3{margin:3px 0 6px;font-size:19px}
  .card p{font-size:15px}
  .meta{height:auto;margin-top:10px;border-top:0}

  .photo.saint{height:48px}
  .photo-credit{position:absolute;top:61px;left:16px;right:16px;width:auto;height:16px;text-align:left;white-space:nowrap}
  .photo-credit b{display:inline;font-size:11.5px;line-height:16px;font-weight:500;color:inherit}
  .photo-credit span,.photo-credit .sep{display:inline}
  .photo-credit::before{left:-16px;right:-16px;top:-9px;bottom:-12px;background:linear-gradient(rgba(0,0,0,.08),rgba(0,0,0,.3))}
  .page{position:relative;z-index:1;margin:32px 0 0;border-radius:16px 16px 0 0;padding:20px 16px 8px;box-shadow:none}
  .sgrid,.idcol,.main{display:contents}
  .sgrid-wrap{display:flex;flex-direction:column;gap:0}
  .portrait.d{display:none}
  .skick{order:1}
  h1{order:2;margin:4px 0 14px;font-size:36px;line-height:1.08}
  .lead{order:3;font-size:17px}
  .lead .portrait-m{display:block;float:left;width:104px;margin:5px 14px 6px 0}
  .lead .portrait-m img{width:104px;height:162px;object-fit:contain;filter:grayscale(1)}
  .lead .portrait-m figcaption{margin-top:6px;font-size:11.5px;line-height:1.35;color:var(--mute)}
  .facts{order:4;position:static;margin:20px 0 0;padding:0;background:none;border-radius:0;border-top:1px solid var(--line)}
  .facts .r,.facts .r:first-child{display:grid;grid-template-columns:96px 1fr;gap:8px;padding:10px 0}
  .facts .r:last-child{border-bottom:1px solid var(--line)}
  .facts dd{margin:0}
  .facts .btn{display:none}
  .tabs{order:5;top:52px;height:40px;margin:24px -16px 0;padding:0 16px;gap:24px}
  .tabs a{height:40px}
  .sec{order:6}
  h2{margin:36px 0 12px;font-size:24px;flex-wrap:wrap;gap:4px 12px}
  .list2,.list2.chap,.list2.teach{grid-template-columns:1fr;grid-template-rows:none;grid-auto-flow:row}
  .quotes{grid-template-columns:1fr;gap:20px}
  .body{font-size:17px}
  .mrow{order:7;height:auto;min-height:48px;margin-top:36px;padding:12px 0;gap:12px;font-size:15px}
  .bbar{display:flex;position:fixed;left:0;right:0;bottom:0;z-index:30;height:52px;align-items:center;justify-content:space-between;
    padding:0 16px;background:#fff;border-top:1px solid var(--line);visibility:hidden;opacity:0;transition:opacity .2s,visibility .2s}
  .bbar.show{visibility:visible;opacity:1}
  .bbar b{font-size:15px;font-weight:600}
  .bbar .btn{height:36px}
}
""".replace('PHOTO', PHOTO)


def head(title, extra_css=''):
    return ('<!doctype html><html lang="en"><head><meta charset="utf-8">'
            '<meta name="viewport" content="width=device-width,initial-scale=1">'
            f'<title>{E(title)}</title>'
            '<link rel="preconnect" href="https://fonts.googleapis.com">'
            '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>'
            '<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">'
            f'<style>{CSS}{extra_css}</style></head>')


def header(menu_href='#menu'):
    nav = ''.join(f'<a class="{"on" if n == "Saints" else ""}" href="#">{n}</a>' for n in NAV)
    return ('<header class="hdr" data-n="1"><div class="in">'
            '<a class="logo" href="home.html">Discover the Saints</a>'
            f'<nav class="nav">{nav}</nav>'
            f'<a class="search" href="#" role="search">{ICON_SEARCH}<span>Search<span class="sx"> saints</span></span></a>'
            '<a class="btn" href="#">Get the app</a>'
            f'<a class="menu" href="{menu_href}" aria-label="Menu">{ICON_MENU}</a>'
            '</div></header>')


def footer(n):
    nav = ''.join(f'<a href="#">{x}</a>' for x in NAV)
    return (f'<footer class="ft" data-n="{n}"><div class="seg" role="radiogroup" aria-label="Tradition">'
            '<a href="#" role="radio">Catholic</a><a href="#" role="radio">Orthodox</a>'
            '<a class="on" href="#" role="radio" aria-checked="true">Both</a></div>'
            f'<nav>{nav}</nav></footer>')


def credit_two_lines():
    return (f'<div class="credit" data-n="5"><b><a href="#">{CREDIT_PLACE}</a></b>'
            f'<span><a href="#">{CREDIT_BY}</a> · <a href="{LIC_URL}">{CREDIT_LIC}</a></span></div>')


def credit_one_line(cls):
    return (f'<div class="{cls}" data-n="5m"><a href="#">{CREDIT_PLACE}</a> · <a href="#">{CREDIT_BY}</a> · '
            f'<a href="{LIC_URL}">{CREDIT_LIC}</a></div>')


def credit_saint():
    return (f'<div class="photo-credit" data-n="5m"><b><a href="#">{CREDIT_PLACE}</a></b><i class="sep"> · </i>'
            f'<span><a href="#">{CREDIT_BY}</a> · <a href="{LIC_URL}">{CREDIT_LIC}</a></span></div>')


def card(i, slug):
    s, m = B.BY[slug], B.META[slug]
    name = m['short']
    fl, show_place = feast_line(s)
    place = f'<span>{E(m["place"])}</span>' if show_place else ''
    extra = ' data-n="7"' if i == 0 else ''
    if slug == 'augustine-of-hippo':
        extra = ' data-n="8"'
    return (f'<a class="card" href="#" data-i="{i}"{extra}>'
            f'<img class="im" src="{ASSETS}/{os.path.basename(s["file"])}" alt="{E(name)}" style="object-position:{FOCUS.get(slug, m["focus"])}" loading="eager">'
            f'<div class="bd"><div class="kick">{E(m["role"])} · {m["years"]}</div>'
            f'<h3>{E(name)}</h3><p>{E(B.st(s["summary"]))}</p>'
            f'<div class="meta"><span>{fl}</span>{place}</div></div></a>')


def rail():
    cats = ''.join(f'<a href="#"><span>{c}</span><small>{n}</small></a>' for c, n in CATS)
    months = ''
    for i, mo in enumerate(MON):
        cls = []
        if i not in ACTIVE_MONTHS:
            cls.append('off')
        if i == CURRENT_MONTH:
            cls.append('now')
        months += f'<a class="{" ".join(cls)}" href="#">{mo}</a>'
    return ('<aside class="side"><div class="rail" data-n="2">'
            f'<section class="cats"><h4>Categories</h4>{cats}</section>'
            f'<section data-n="3"><h4>Feast month</h4><div class="months">{months}</div></section>'
            '<section data-n="4"><h4>Sort</h4><div class="sorts"><a href="#">Feast date</a><a href="#">A–Z</a></div></section>'
            f'</div>{credit_two_lines()}</aside>')


def menu_sheet():
    nav = ''.join(f'<a class="{"on" if n == "Saints" else ""}" href="#">{n}</a>' for n in NAV)
    cats = ''.join(f'<a href="#"><span>{c}</span><span class="n">{n}</span></a>' for c, n in CATS)
    months = ''
    for i, mo in enumerate(MON):
        cls = []
        if i not in ACTIVE_MONTHS:
            cls.append('off')
        if i == CURRENT_MONTH:
            cls.append('now')
        months += f'<a class="{" ".join(cls)}" href="#">{mo}</a>'
    def sheet(id_, title, inner):
        return (f'<div class="fsheet" id="{id_}" role="dialog" aria-label="{title}">'
                f'<div class="sm-top"><b>{title}</b><a class="menu" style="display:flex" href="#" aria-label="Close">{ICON_X}</a></div>'
                f'{inner}</div>')
    return ('<div class="sheet-menu" id="menu" role="dialog" aria-label="Menu">'
            f'<div class="sm-top"><b>Discover the Saints</b><a class="menu" style="display:flex" href="#" aria-label="Close">{ICON_X}</a></div>'
            f'<nav class="sm-nav">{nav}</nav>'
            '<a class="btn" href="#">Get the app</a></div>'
            + sheet('f-cat', 'Category', f'<div class="sm-cats">{cats}</div>')
            + sheet('f-month', 'Feast month', f'<div class="sm-months" style="border-top:0">{months}</div>')
            + sheet('f-sort', 'Sort', '<div class="sm-cats"><a href="#">Feast date</a><a href="#">A–Z</a></div>'))


MASONRY_JS = r"""
<script>
(function(){
  var wall=document.querySelector('.wall');
  var cards=[].slice.call(wall.querySelectorAll('.card'));
  var COL=278,GAP=12,last='';
  function layout(){
    var phone=matchMedia('(max-width:759px)').matches;
    var n=phone?1:Math.max(1,Math.floor((wall.clientWidth+GAP)/(COL+GAP)));
    if((phone?'p':n)+''===last)return; last=(phone?'p':n)+'';
    wall.innerHTML='';
    if(phone){cards.forEach(function(c){wall.appendChild(c)});return}
    var cols=[],h=[];
    for(var i=0;i<n;i++){var d=document.createElement('div');d.className='col';wall.appendChild(d);cols.push(d);h.push(0)}
    cards.forEach(function(c){var k=h.indexOf(Math.min.apply(null,h));cols[k].appendChild(c);h[k]+=c.offsetHeight+GAP});
  }
  layout();
  (document.fonts?document.fonts.ready:Promise.resolve()).then(function(){last='';layout()});
  addEventListener('resize',function(){layout()});
})();
</script>"""


def build_home():
    cards = ''.join(card(i, s) for i, s in enumerate(ORDER))
    body = ('<body class="pg-home"><div class="photo" role="img" aria-label="Sea of Galilee at sunset"></div>'
            + header()
            + credit_one_line('credit-m')
            + '<main class="home">' + rail()
            + f'<nav class="frow" data-n="3m"><a href="#f-cat">Category {CHEV}</a><i>·</i><a href="#f-month">Feast month {CHEV}</a><i>·</i><a href="#f-sort">Sort {CHEV}</a></nav>'
            + f'<div class="frow-line mobile-hair"></div><div class="wall" data-n="6">{cards}</div></main>'
            + footer(9) + menu_sheet() + MASONRY_JS + '</body></html>')
    return head('Discover the Saints · W2 Side index') + body


# ------------------------------------------------------------- saint page
TH_FACTS_W = [
    ('Feast', 'October 1'),
    ('Born', '1873, Alençon, France'),
    ('Died', '1897, Lisieux, France'),
    ('Patron of', 'Missions, with St. Francis Xavier; France, with St. Joan of Arc'),
    ('Venerated', 'Catholic'),
]
TH_KICKER = 'Carmelite nun · France · 1873–1897'
TH_CAPTION = 'Holy card, 1916 · Public domain'
TH_NAME = 'St. Thérèse of Lisieux'
QUOTES = [B.TH['quotes'][0]['text'], B.TH['quotes'][4]['text']]
RELIC_PLACE = 'Carmel of Lisieux, Lisieux, France'

BBAR_JS = r"""
<script>
(function(){
  var facts=document.querySelector('.facts'),bar=document.querySelector('.bbar');
  function upd(){
    if(!matchMedia('(max-width:759px)').matches){bar.classList.remove('show');return}
    var r=facts.getBoundingClientRect();
    var foot=document.querySelector('.ft').getBoundingClientRect();
    bar.classList.toggle('show', r.bottom<52 && foot.top>innerHeight);
  }
  addEventListener('scroll',upd,{passive:true});addEventListener('resize',upd);upd();
})();
</script>"""


def build_saint():
    s = B.BY['therese-of-lisieux']
    img = f'{ASSETS}/{os.path.basename(s["file"])}'
    facts = ''.join(f'<div class="r"><dt>{k}</dt><dd>{E(v)}</dd></div>' for k, v in TH_FACTS_W)
    chap = ''.join(f'<li><b>{i + 1:02d}</b><span>{E(c)}</span></li>' for i, c in enumerate(B.CHAPTERS))
    teach = ''.join(f'<li><a href="#">{E(t)}</a></li>' for t in B.TEACHINGS)
    quotes = ''.join(f'<blockquote>“{E(q)}”</blockquote>' for q in QUOTES)
    portrait_d = (f'<figure class="portrait d" data-n="2"><img src="{img}" alt="{TH_NAME}, holy card portrait">'
                  f'<figcaption>{TH_CAPTION}</figcaption></figure>')
    portrait_m = (f'<figure class="portrait-m"><img src="{img}" alt="{TH_NAME}, holy card portrait">'
                  f'<figcaption>{TH_CAPTION}</figcaption></figure>')
    main = (f'<div class="skick" data-n="4">{TH_KICKER}</div>'
            f'<h1>{TH_NAME}</h1>'
            f'<div class="lead">{portrait_m}<p>{E(B.TH_SUMMARY.strip())}</p></div>'
            '<nav class="tabs" data-n="5"><a class="on" href="#life">Life</a><a href="#teachings">Teachings</a><a href="#relics">Relics</a></nav>'
            '<div class="sec">'
            f'<h2 id="life" data-n="6">Life <a href="#">Read the full life →</a></h2><ol class="list2 chap">{chap}</ol>'
            f'<h2 id="teachings">Words and teachings</h2><div class="quotes">{quotes}</div><ul class="list2 teach">{teach}</ul>'
            f'<h2 id="relics">Relics</h2><p class="place">{RELIC_PLACE}</p><p class="body">{E(B.RELIC_SHORT)}</p>'
            '</div>'
            f'<a class="mrow" href="#" data-n="7"><span>Miracles and answered prayers · <span style="white-space:nowrap">{B.N_MIRACLES} accounts</span></span><span aria-hidden="true">→</span></a>')
    page = ('<main class="page"><div class="sgrid sgrid-wrap">'
            f'<aside class="idcol">{portrait_d}<div class="facts" data-n="3"><dl>{facts}</dl>'
            '<a class="btn" href="#">Pray in the app</a></div></aside>'
            f'<article class="main">{main}</article></div></main>')
    body = ('<body class="pg-saint"><div class="photo saint" role="img" aria-label="Sea of Galilee at sunset"></div>'
            + header('home.html#menu')
            + credit_saint()
            + page + footer(8)
            + '<div class="bbar"><b>Feast Oct 1</b><a class="btn" href="#">Pray in the app</a></div>'
            + BBAR_JS + '</body></html>')
    return head(f'{TH_NAME} · W2 Side index') + body


def main():
    for name, content in (('home.html', build_home()), ('saint.html', build_saint())):
        p = os.path.join(HERE, name)
        content = re.sub(r'\b(St\.|Saint) (?=[A-ZÀ-Ý])', r'\1&nbsp;', content)
        open(p, 'w').write(content)
        print('wrote', p, len(content) // 1024, 'KB')


if __name__ == '__main__':
    main()
