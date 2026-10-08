#!/usr/bin/env python3
"""Brand board B4 "Ascent" for Discover the Saints. Writes board.html (1440 wide).

Run: python3 build_b4.py
Reads the real data through ../../build.py (META, BY, st, feast, TH_SUMMARY, QUOTE).

Round 2 (committee review 08): the 45° arrow is replaced by the "turn-up" stroke,
a level line that bends upward in one curve. It lives in the wordmark and the badge.
On cards it shows only on hover/focus and on "Read the full life".
"""
import html
import os
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(HERE, '..', '..'))
import build  # noqa: E402

E = html.escape
BY, feast = build.BY, build.feast
MONTHS = build.MONTHS
NBSP = ' '

ASSETS = '../../assets'
HERO = '../../../public/images/hero'
CREDIT = 'Sea of Galilee · Grant Barclay · CC BY 2.0'
SITE = 'Discover the Saints'
NAV = ['Saints', 'Miracles', 'Novenas', 'Teachings', 'Quotes', 'Books']

# Chair decision A6: "St. Pio of Pietrelcina", never "Padre Pio".
META = dict(build.META)
META['padre-pio'] = dict(META['padre-pio'], short='St. Pio of Pietrelcina')

# Names without "of". Text only: the site has no image for these.
# Roles follow the canonization titles: St. Joan of Arc was canonized (1920) as a virgin.
TEXT_ONLY = [
    dict(short='St. Bernadette Soubirous', role='Nun', years='1844–1879'),
    dict(short='St. Maximilian Kolbe', role='Franciscan friar, martyr', years='1894–1941'),
    dict(short='St. Teresa Benedicta of the Cross', role='Carmelite nun, martyr', years='1891–1942'),
    dict(short='St. Joan of Arc', role='Virgin', years='1412–1431'),
]

PAL = [
    ('#FFFFFF', 'Page', 'page, cards'),
    ('#141A24', 'Ink', 'names, body'),
    ('#4B5563', 'Ink-2', 'kicker, facts labels'),
    ('#66707F', 'Ink-3', 'meta, captions'),
    ('#E5E8EE', 'Line', 'hairlines'),
    ('#0E63CF', 'Azure', 'turn, links, tab, button'),
    ('#E3F0FF', 'Sky', 'selected chip'),
    ('#F6D55C', 'Butter', 'fill only: app button, month dot'),
]


# ------------------------------------------------------------ text
def st(text):
    """build.st() plus a non-breaking space after every "St."."""
    return build.st(text).replace('St. ', 'St.' + NBSP)


def nb(name):
    return name.replace('St. ', 'St.' + NBSP)


# ------------------------------------------------------------ contrast
def lum(h):
    r, g, b = (int(h[i:i + 2], 16) / 255 for i in (1, 3, 5))

    def f(c):
        return c / 12.92 if c <= 0.03928 else ((c + 0.055) / 1.055) ** 2.4
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b)


def contrast(a, b):
    la, lb = lum(a), lum(b)
    hi, lo = max(la, lb), min(la, lb)
    return (hi + 0.05) / (lo + 0.05)


def cr(a, b='#FFFFFF'):
    return f'{contrast(a, b):.1f}:1'


def swatch(hexc, name, role):
    dark = lum(hexc) < 0.3
    if name in ('Page', 'Line'):
        con = ''
    elif name == 'Sky':
        con = f'{cr("#141A24", hexc)} ink · {cr("#0E63CF", hexc)} Azure'
    elif name == 'Butter':
        con = f'{cr("#141A24", hexc)} ink on it'
    elif name == 'Azure':
        con = f'{cr(hexc)} both ways'
    else:
        con = f'{cr(hexc)} on page'
    return (f'<div class="sw-item"><div class="sw-box" style="background:{hexc}">'
            f'<span class="{"lt" if dark else ""}">{hexc}</span></div>'
            f'<b>{name}</b><span>{role}</span><em>{con or "&nbsp;"}</em></div>')


# ------------------------------------------------------------ device
def turn(size=18, cls='', sw=2):
    """The turn-up: a level stroke that bends upward in one curve, open head."""
    h = round(size * 0.8)
    return (f'<svg class="tn {cls}" width="{size}" height="{h}" viewBox="0 0 20 16" fill="none" stroke="currentColor" '
            f'stroke-width="{sw}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'
            f'<path d="M2 13.5h7a6 6 0 0 0 6-6V3"/><path d="M11.5 6.5 15 3l3.5 3.5"/></svg>')


def wordmark(size, cls=''):
    """'Discover the Saints' with the turn-up as its baseline rule: level under the words, then up."""
    return (f'<span class="wm {cls}" style="font-size:{size}px" role="img" aria-label="{SITE}">'
            f'<span class="wt">{SITE}</span>'
            f'<svg class="wl" viewBox="0 0 12 20" preserveAspectRatio="xMaxYMax meet" fill="none" stroke="currentColor" '
            f'stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'
            f'<path d="M-4000 19.25H3a6 6 0 0 0 6-6V3.5M6 6.5 9 3.5l3 3"/></svg></span>')


def badge(size):
    g = {64: 38, 32: 19, 16: 11}[size]
    sw = {64: 2, 32: 2.2, 16: 2.6}[size]
    return f'<span class="badge s{size}" aria-label="{SITE} app">{turn(g, "", sw)}</span>'


def name_link(short, size=20, cls=''):
    """A saint name as a link. The turn shows on hover/focus only (class .hover on the board)."""
    return f'<a class="nm {cls}" href="#">{E(nb(short))}{turn(round(size * 0.85), "hv")}</a>'


def feast_line(s):
    c, o = s['feast_c'], s['feast_o']
    if c and o and c[5:] != o[5:]:
        return f'Feast {feast(dict(feast_c=c, feast_o=None))} · Orth. {feast(dict(feast_c=None, feast_o=o))}', False
    return f'Feast {feast(s)}', True


def card(slug, cls=''):
    s, m = BY[slug], META[slug]
    fl, show_place = feast_line(s)
    place = f'<span>{E(m["place"])}</span>' if show_place else ''
    return (f'<article class="card {cls}"><img class="im" src="{ASSETS}/{slug}.jpg" alt="{E(m["short"])}" style="object-position:{m["focus"]}">'
            f'<div class="bd"><div class="kick">{E(m["role"])} · {m["years"]}</div>'
            f'<h3>{name_link(m["short"])}</h3><p lang="en">{E(st(s["summary"]).strip())}</p>'
            f'<div class="meta"><span>{fl}</span>{place}</div></div></article>')


def name_row(short, role, years, cls=''):
    return (f'<div class="nrow {cls}"><div class="kick">{E(role)} · {years}</div><h3>{name_link(short)}</h3></div>')


SEARCH_SVG = ('<svg width="15" height="15" viewBox="0 0 20 20" fill="none" stroke="currentColor" '
              'stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="9" cy="9" r="6"/><path d="m14 14 4 4"/></svg>')
MENU_SVG = ('<svg width="18" height="14" viewBox="0 0 18 14" stroke="currentColor" stroke-width="2" '
            'stroke-linecap="round" aria-hidden="true"><path d="M1 1h16M1 7h16M1 13h16"/></svg>')


def header():
    nav = ''.join(f'<a href="#" class="{"on" if n == "Saints" else ""}">{n}</a>' for n in NAV)
    return (f'<header class="hdr">{wordmark(20, "hwm")}<nav>{nav}</nav>'
            f'<div class="search">{SEARCH_SVG}<span>Search saints</span></div>'
            f'<a class="btn butter" href="#">Get the app</a></header>')


def credit(cls=''):
    return f'<a class="credit {cls}" href="#">{CREDIT}</a>'


def footer():
    opts = ''.join(f'<a href="#" class="{"on" if n == "Both" else ""}">{n}</a>' for n in ('Catholic', 'Orthodox', 'Both'))
    nav = ''.join(f'<a href="#">{n}</a>' for n in NAV)
    return f'<footer class="foot"><div class="sw">{opts}</div><nav>{nav}</nav></footer>'


# ------------------------------------------------------------ content
def first_words(text, n):
    words = text.split()
    best = None
    for i, w in enumerate(words):
        if w in ('St.', 'c.'):
            continue
        if w.endswith(('.', '!', '?', '.”', '!”', '."', '!"', '?"')):
            if best is None or abs(i + 1 - n) < abs(best - n):
                best = i + 1
    return ' '.join(words[:best])


SUMMARY_60 = first_words(st(build.TH_SUMMARY), 60)
LINK = '<a class="xl" href="#">{}</a>'
TH_FACTS = [
    ('Feast', 'October 1'),
    ('Born', '1873, Alençon, France'),
    ('Died', '1897, Lisieux, France'),
    ('Patron of', f'Missions, with {LINK.format(nb("St. Francis Xavier"))}; France, with {LINK.format(nb("St. Joan of Arc"))}'),
    ('Venerated', 'Catholic'),
]
TA_FACTS = [
    ('Feast', 'January 28'),
    ('Born', '1225, Roccasecca, Italy'),
    ('Died', '1274, Fossanova, Italy'),
    ('Venerated', 'Catholic'),
]


def facts(rows):
    return '<dl class="facts">' + ''.join(f'<div><dt>{k}</dt><dd>{v}</dd></div>' for k, v in rows) + '</dl>'


THUMB = {'therese-of-lisieux': 'width:125px;height:auto;max-width:none;margin:-24px 0 0 -32px'}


def phone_row(slug):
    s, m = BY[slug], META[slug]
    thumb = THUMB.get(slug, f'object-position:{m["focus"]}')
    fl, show_place = feast_line(s)
    place = f' · {E(m["place"])}' if show_place else ''
    return (f'<div class="prow"><div class="ptop">'
            f'<span class="th"><img src="{ASSETS}/{slug}.jpg" alt="{E(m["short"])}" style="{thumb}"></span>'
            f'<div><div class="kick">{E(m["role"])} · {m["years"]}</div><h3>{name_link(m["short"], 19)}</h3>'
            f'<div class="pmeta">{fl}{place}</div></div></div>'
            f'<p lang="en">{E(st(s["summary"]).strip())}</p></div>')


CSS = """
:root{--ink:#141A24;--ink2:#4B5563;--ink3:#66707F;--line:#E5E8EE;--azure:#0E63CF;--sky:#E3F0FF;--butter:#F6D55C;
--dsp:'Funnel Display',system-ui,sans-serif;--ui:'Funnel Sans',system-ui,sans-serif;--rd:'Brygada 1918',Georgia,serif;
--shadow:0 1px 0 rgb(0 0 0/.04),0 10px 28px -14px rgb(0 0 0/.32)}
*{box-sizing:border-box}
html{background:#fff}
body{margin:0;width:1440px;background:#fff;color:var(--ink);font-family:var(--ui);font-size:14px;line-height:1.4;-webkit-font-smoothing:antialiased;font-feature-settings:"tnum"}
a{color:inherit;text-decoration:none}
h1,h2,h3,p,dl,dd{margin:0}
img{display:block}
svg.tn{flex:none;color:var(--azure)}

/* wordmark: the turn-up is the baseline rule */
.wm{font-family:var(--dsp);font-weight:700;letter-spacing:-.03em;line-height:1;white-space:nowrap;display:inline-block;position:relative;padding:0 .62em .3em 0;color:var(--ink)}
.wm .wl{position:absolute;left:0;bottom:0;width:100%;height:1em;color:var(--azure);overflow:visible;display:block}
.wm{overflow:hidden}
.badge{display:inline-grid;place-items:center;background:var(--azure);color:#fff;flex:none}
.badge svg{color:#fff}
.badge.s64{width:64px;height:64px;border-radius:14px}
.badge.s32{width:32px;height:32px;border-radius:7px}
.badge.s16{width:16px;height:16px;border-radius:4px}

/* names: plain ink at rest; the turn appears on hover/focus */
.nm{display:inline-flex;align-items:flex-start;gap:.3em;font-family:var(--dsp);font-weight:700;letter-spacing:-.012em;line-height:1.2;color:var(--ink)}
.nm svg.hv{display:none;margin-top:.3em}
.nm:hover svg.hv,.nm:focus-visible svg.hv,.hover .nm svg.hv{display:block}
.hover .nm,.nm:hover{color:var(--azure)}
.xl{color:var(--azure);font-weight:500;white-space:nowrap}

/* board chrome */
.sec{padding:0 64px;margin-top:64px}
.sec.bleed{padding:0}
.lbl{display:flex;align-items:center;gap:14px;font-size:12.5px;font-weight:600;letter-spacing:.09em;text-transform:uppercase;color:var(--ink3);margin-bottom:28px}
.lbl::after{content:'';flex:1;height:1px;background:var(--line)}
.cap{font-size:12.5px;font-weight:500;color:var(--ink3);line-height:1.35}
.cap b{font-weight:600;color:var(--ink2)}
.top{padding:44px 64px 0;display:flex;align-items:baseline;justify-content:space-between;gap:40px}
.top .id{font-size:12.5px;font-weight:600;letter-spacing:.09em;text-transform:uppercase;color:var(--ink3)}
.top .idea{font-family:var(--rd);font-size:18px;line-height:1.5;color:var(--ink2);text-align:right;max-width:800px}

/* 1 wordmark */
.mark-row{display:grid;grid-template-columns:1fr 420px;gap:48px;align-items:end}
.mark-row .cap{margin-top:18px}
.badges{display:flex;align-items:flex-end;gap:28px}
.wmset{display:flex;align-items:baseline;gap:40px;margin-top:28px}
.glyphs{display:flex;align-items:flex-end;gap:36px;margin-top:28px}
.glyphs .g{display:grid;gap:10px;justify-items:center}
.glyphs svg{color:var(--azure)}

/* 2 device */
.dev{display:grid;grid-template-columns:192px 268px 268px 1fr;gap:12px 28px;align-items:start}
.dev .cap{display:grid;gap:12px;padding-top:4px}
.nrows{display:grid;gap:0}
.nrow{padding:10px 0 12px;border-top:1px solid var(--line)}
.nrow:last-child{border-bottom:1px solid var(--line)}
.nrow h3{font-size:20px;margin-top:3px}
.use-row{display:grid;grid-template-columns:600px 1fr;gap:64px;margin-top:56px;align-items:start}
.name48{font-family:var(--dsp);font-size:48px;line-height:1.05;font-weight:700;letter-spacing:-.025em;text-wrap:balance}
.kick{font-size:12.5px;font-weight:500;color:var(--ink2);line-height:1.3}
.kick-p{font-size:12.5px;font-weight:500;color:var(--ink2);margin-bottom:8px}
.facts{display:grid;gap:0;margin-top:20px;max-width:440px}
.facts div{display:grid;grid-template-columns:88px 1fr;gap:12px;padding:8px 0;border-top:1px solid var(--line);align-items:baseline}
.facts div:last-child{border-bottom:1px solid var(--line)}
.facts dt{font-size:13px;color:var(--ink3);font-weight:500}
.facts dd{font-size:14px;color:var(--ink);font-weight:500;line-height:1.45}
.h2{font-family:var(--dsp);font-size:26px;line-height:1.2;font-weight:600;letter-spacing:-.015em;padding-bottom:14px;border-bottom:1px solid var(--line);display:flex;justify-content:space-between;align-items:baseline}
.h2 a{font-family:var(--ui);font-size:14px;font-weight:600;color:var(--azure);letter-spacing:0;display:inline-flex;align-items:center;gap:6px}
.mrow{display:flex;justify-content:space-between;align-items:center;height:48px;border-top:1px solid var(--line);border-bottom:1px solid var(--line);font-size:15px;color:var(--ink3);font-weight:500}
.foot{display:flex;align-items:center;justify-content:space-between;height:64px;padding:0 20px;border-top:1px solid var(--line);border-bottom:1px solid var(--line);background:#fff}
.foot .sw{display:flex;gap:22px;height:100%;align-items:center}
.foot .sw a{position:relative;font-size:14px;font-weight:500;color:var(--ink2);height:100%;display:flex;align-items:center}
.foot .sw a.on{color:var(--ink);font-weight:600;box-shadow:inset 0 -2px 0 var(--azure)}
.foot nav{display:flex;gap:18px}
.foot nav a{font-size:13px;font-weight:500;color:var(--ink3)}

/* cards */
.card{width:268px;background:#fff;border-radius:10px;overflow:hidden;box-shadow:var(--shadow);flex:none}
.card .im{width:268px;height:112px;object-fit:cover}
.card .bd{padding:12px 14px 0}
.card h3{font-size:20px;line-height:1.2;margin:3px 0 8px}
.card h3 .nm{text-wrap:balance}
.card p{font-family:var(--rd);font-weight:500;font-size:15px;line-height:1.5;color:var(--ink);hyphens:auto;text-wrap:pretty}
.meta{display:flex;justify-content:space-between;align-items:center;height:30px;margin-top:10px;border-top:1px solid var(--line);font-size:12.5px;font-weight:500;color:var(--ink3);white-space:nowrap;gap:8px}
.card.hover{box-shadow:0 1px 0 rgb(0 0 0/.04),0 16px 36px -14px rgb(14 99 207/.45)}

/* 3 type */
.type{display:grid;grid-template-columns:680px 1fr;gap:64px;align-items:start}
.spec{display:grid;gap:6px}
.spec .cap{margin-top:14px}
.body{font-family:var(--rd);font-size:17.5px;line-height:1.6;color:var(--ink);max-width:680px;margin-top:10px}
.names{display:grid;gap:18px}
.names h3{font-size:20px;margin-top:2px}
.tabs{display:flex;gap:26px;height:44px;border-bottom:1px solid var(--line);margin-top:4px}
.tabs a{display:flex;align-items:center;font-size:14px;font-weight:600;color:var(--ink3);border-bottom:2px solid transparent;margin-bottom:-1px}
.tabs a.on{color:var(--azure);border-color:var(--azure)}
.chips{display:flex;gap:8px;flex-wrap:wrap;margin-top:4px;align-items:center}
.chip{display:inline-flex;align-items:center;gap:6px;height:30px;padding:0 12px;border-radius:999px;background:#fff;box-shadow:inset 0 0 0 1px var(--line);font-size:13px;font-weight:500;color:var(--ink)}
.chip small{font-size:12px;color:var(--ink3);font-weight:500}
.chip.on{background:var(--sky);box-shadow:none;color:var(--ink)}
.chip.m{white-space:nowrap}
.chip.m i{display:inline-block;width:7px;height:7px;border-radius:50%;background:var(--butter);box-shadow:inset 0 0 0 1px rgb(20 26 36/.25)}
.quote{font-family:var(--rd);font-size:20px;line-height:1.4;color:var(--ink);hanging-punctuation:first;max-width:520px}
.btn{display:inline-flex;align-items:center;justify-content:center;height:36px;padding:0 15px;border-radius:8px;background:var(--azure);color:#fff;font-size:14px;font-weight:600;white-space:nowrap}
.btn.butter{background:var(--butter);color:var(--ink)}
.facts + .btn{height:38px;margin-top:14px;width:100%}

/* 4 palette */
.swatches{display:grid;grid-template-columns:repeat(4,160px);gap:24px 32px}
.sw-box{width:160px;height:96px;border-radius:8px;box-shadow:inset 0 0 0 1px rgb(0 0 0/.06);display:flex;align-items:flex-end;padding:10px 12px;font-size:12.5px;font-weight:600;color:var(--ink);letter-spacing:.02em}
.sw-box .lt{color:#fff}
.sw-item b{display:block;margin-top:10px;font-size:14px;font-weight:600}
.sw-item span{display:block;font-size:12.5px;color:var(--ink2);margin-top:2px}
.sw-item em{display:block;font-style:normal;font-size:12.5px;color:var(--ink3);margin-top:2px}
.rules{margin-top:28px;display:flex;gap:40px}

/* 5 header strip on photo */
.shot{position:relative;background-size:cover;overflow:hidden;width:100%}
.hdr{position:relative;display:flex;align-items:center;gap:28px;height:56px;padding:0 26px;background:rgb(255 255 255/.8);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px)}
.hdr .hwm{margin-right:4px}
.hdr nav{display:flex;gap:4px;margin-left:8px}
.hdr nav a{padding:6px 10px;font-size:14px;font-weight:500;color:var(--ink2);border-radius:6px}
.hdr nav a.on{color:var(--azure);font-weight:600}
.search{display:flex;align-items:center;gap:9px;width:320px;height:36px;padding:0 13px;border-radius:999px;background:#fff;box-shadow:inset 0 0 0 1px var(--line);color:var(--ink3);font-size:14px;margin-left:auto}
.credit{position:absolute;right:0;bottom:16px;font-size:11.5px;font-weight:500;color:rgb(255 255 255/.85);line-height:1;padding:7px 26px 7px 40px;letter-spacing:.01em;
background:linear-gradient(90deg,rgb(20 26 36/0),rgb(20 26 36/.55) 36px,rgb(20 26 36/.55))}
.home{height:716px}
.home .wall{display:flex;gap:12px;padding:12px 26px 0;align-items:flex-start}
.home-cap{padding:14px 64px 0}
.strip{height:180px;border-radius:10px;margin-bottom:28px}
.strip .credit{padding-right:26px}

/* 6 phone */
.phone-sec{display:grid;grid-template-columns:375px 1fr;gap:64px;align-items:start}
.phone{width:375px;height:812px;border-radius:40px;overflow:hidden;position:relative;background:#fff;box-shadow:0 0 0 1px var(--line),0 0 0 9px #fff,0 0 0 10px var(--line),0 30px 60px -30px rgb(0 0 0/.35)}
.phone .ph-hdr{position:absolute;z-index:2;top:0;left:0;right:0;height:52px;display:flex;align-items:center;gap:10px;padding:0 12px;background:#fff}
.ph-search{flex:1;display:flex;align-items:center;gap:8px;height:36px;padding:0 12px;border-radius:999px;background:#fff;box-shadow:inset 0 0 0 1px var(--line);color:var(--ink3);font-size:14px}
.menu{width:40px;height:40px;display:grid;place-items:center;color:var(--ink)}
.ph-photo{position:absolute;top:52px;left:0;right:0;height:96px;background-size:cover;background-position:center 55%}
.ph-photo .credit{bottom:16px;padding-right:16px}
.ph-sheet{position:absolute;top:132px;left:0;right:0;bottom:0;background:#fff;border-radius:16px 16px 0 0;overflow:hidden}
.ph-filters{display:flex;align-items:center;gap:18px;height:40px;padding:0 16px;font-size:13px;font-weight:500;color:var(--ink2);border-bottom:1px solid var(--line)}
.prow{padding:14px 16px 16px;border-bottom:1px solid var(--line)}
.ptop{display:flex;gap:12px;align-items:flex-start}
.ptop .th{display:block;width:72px;height:90px;overflow:hidden;border-radius:4px;flex:none;box-shadow:inset 0 0 0 1px rgb(0 0 0/.08)}
.ptop img{width:72px;height:90px;object-fit:cover}
.ptop h3{font-size:19px;line-height:1.2;margin:3px 0 4px}
.pmeta{font-size:12.5px;font-weight:500;color:var(--ink3)}
.prow p{font-family:var(--rd);font-weight:500;font-size:15.5px;line-height:1.5;margin-top:10px;hyphens:auto}
.phone-notes{display:grid;gap:20px;padding-top:8px;max-width:420px}
.end{height:72px}
"""


def main():
    dev_cap = ('<div class="cap"><b>The turn</b>'
               '<div>Level, then up. One curve.</div>'
               '<div>Wordmark and badge: always.</div>'
               '<div>Names: on hover or focus only.</div>'
               '<div>"Read the full life": always.</div>'
               '<div>Never on an image.</div></div>')
    dev_cards = card('thomas-aquinas') + card('padre-pio', 'hover')
    nrows = ''.join(name_row(**n) for n in TEXT_ONLY)
    nrows_block = (f'<div><div class="nrows">{nrows}</div>'
                   f'<div class="cap" style="margin-top:12px">Names without an image · text only · at rest</div></div>')

    chips = ('<div class="chips"><span class="chip on">All <small>12</small></span>'
             '<span class="chip">Bishops <small>3</small></span><span class="chip">Hermits <small>3</small></span>'
             '<span class="chip">Ascetics <small>3</small></span><span class="chip">Nuns <small>2</small></span>'
             '<span class="chip m">Oct<i></i></span></div>')

    home_cards = ''.join(card(s) for s in ('therese-of-lisieux', 'john-maximovitch', 'teresa-of-avila', 'benedict-of-nursia', 'padre-pio'))
    phone_rows = ''.join(phone_row(s) for s in ('therese-of-lisieux', 'thomas-aquinas', 'seraphim-of-sarov'))
    swatches = ''.join(swatch(*s) for s in PAL)

    glyphs = ''.join(f'<div class="g">{turn(n, "", w)}<span class="cap">{n}</span></div>'
                     for n, w in ((72, 1.6), (36, 1.8), (24, 2), (18, 2), (14, 2.2)))

    page = f'''<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=1440">
<title>B4 · Ascent · Discover the Saints brand board</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Funnel+Display:wght@500;600;700&family=Funnel+Sans:wght@400;500;600&family=Brygada+1918:ital,wght@0,400;0,500;0,600;1,400&display=swap" rel="stylesheet">
<style>{CSS}</style></head>
<body>
<div class="top"><div class="id">B4 · Ascent</div>
<div class="idea">We know where the downward road ends. Every saint shows what happens when a life turns the other way. The brand is that turn: a level line that bends upward, in daylight blue.</div></div>

<section class="sec"><div class="lbl">Wordmark</div>
<div class="mark-row"><div>{wordmark(72)}<div class="cap">Funnel Display 700 · 72 · the baseline rule turns up</div>
<div class="wmset">{wordmark(32)}{wordmark(20)}<span class="cap">32 · 20</span></div></div>
<div><div class="badges">{badge(64)}{badge(32)}{badge(16)}</div><div class="cap">App badge · 64 · 32 · 16 · the turn alone</div>
<div class="glyphs">{glyphs}</div><div class="cap">The turn · 72 to 14 · stroke 1.6 to 2.2</div></div></div>
</section>

<section class="sec"><div class="lbl">Device</div>
<div class="dev">{dev_cap}<div>{card('thomas-aquinas')}<div class="cap" style="margin-top:10px">At rest · no mark</div></div>
<div>{card('padre-pio', 'hover')}<div class="cap" style="margin-top:10px">Hover or focus · name turns Azure, the turn appears</div></div>{nrows_block}</div>
<div class="use-row"><div><div class="kick-p">Dominican friar · Italy · 1225–1274</div><h1 class="name48">{nb("St. Thomas Aquinas")}</h1>
<div class="cap" style="margin-top:10px">Page name: no mark. You are there.</div>{facts(TA_FACTS)}
<div class="h2" style="margin-top:40px">Life<a href="#">Read the full life{turn(16)}</a></div>
<div class="cap" style="margin-top:12px">Into the life: the turn, always</div>
<div class="mrow" style="margin-top:28px"><span>Miracles and answered prayers · {build.N_MIRACLES} accounts</span><span>→</span></div>
<div class="cap" style="margin-top:12px">Miracles row: Ink-3, plain arrow, quiet</div></div>
<div><div class="cap" style="margin-bottom:8px"><b>Footer</b> · Both active · Azure underline</div>{footer()}
<div class="cap" style="margin-top:28px"><b>Rule</b> · the turn is never a bullet, a divider or an icon in nav. Three places only.</div></div></div>
</section>

<section class="sec"><div class="lbl">Type</div>
<div class="type">
<div><div class="kick-p">Carmelite nun · France · 1873–1897</div><h1 class="name48">{nb("St. Thérèse of Lisieux")}</h1>
<p class="body">{E(SUMMARY_60)}</p><div class="cap" style="margin-top:14px">Funnel Display 700 · 48/1.05 &nbsp;·&nbsp; Brygada 1918 400 · 17.5/1.6</div>
<div class="h2" style="margin-top:40px">Life<a href="#">Read the full life{turn(16)}</a></div>
<p class="quote" style="margin-top:20px">“{E(build.QUOTE)}”</p>
<div class="cap" style="margin-top:12px">H2 Funnel Display 600 · 26 &nbsp;·&nbsp; quote Brygada 20/1.4</div>
</div>
<div class="spec">
<div class="names"><div><div class="kick">Capuchin friar · 1887–1968</div><h3>{name_link("St. Pio of Pietrelcina")}</h3></div>
<div><div class="kick">Hermit monk · 1754–1833</div><h3>{name_link("St. Seraphim of Sarov")}</h3></div></div>
<div class="cap">Card name 20/1.2 · kicker Funnel Sans 12.5 · summary Brygada 500 · 15/1.5</div>
<div class="tabs"><a class="on" href="#">Life</a><a href="#">Teachings</a><a href="#">Relics</a></div>
<div class="cap">Tabs 14 · Azure</div>
{chips}<div class="cap">Chips 13 · Sky selected · Butter month dot</div>
{facts(TH_FACTS)}<a class="btn" href="#">Pray in the app</a>
<div class="cap">Facts 13 / 14 · saints named in text are Azure links · button 38</div>
</div></div>
</section>

<section class="sec"><div class="lbl">Palette</div>
<div class="swatches">{swatches}</div>
<div class="rules"><div class="cap">Action colour is cool: Azure.</div><div class="cap">Butter is a fill. Never text, never near a portrait.</div><div class="cap">No gold, no glow, no tint on the photo.</div></div>
</section>

<section class="sec bleed"><div class="lbl" style="padding:0 64px">Header</div>
<div style="padding:0 64px"><div class="shot strip" style="background-image:url({HERO}/galilee.webp);background-position:center 58%">{header()}{credit()}</div></div>
<div class="shot home" style="background-image:url({HERO}/galilee.webp);background-position:center 58%">{header()}<div class="wall">{home_cards}</div>{credit()}</div>
<div class="cap home-cap"><b>Both</b> · Galilee, full colour · glass header · Butter button · credit on the photo · cards 268, gap 12 · no mark at rest</div>
</section>

<section class="sec"><div class="lbl">Phone</div>
<div class="phone-sec">
<div class="phone"><div class="ph-hdr">{badge(32)}<div class="ph-search">{SEARCH_SVG}<span>Search saints</span></div>
<span class="menu">{MENU_SVG}</span></div>
<div class="ph-photo" style="background-image:url({HERO}/galilee.webp)">{credit()}</div>
<div class="ph-sheet"><div class="ph-filters"><span>Category ▾</span><span>Feast month ▾</span><span>Sort ▾</span></div>{phone_rows}</div></div>
<div class="phone-notes"><div class="cap"><b>375 × 812</b> · rows, hairlines, no boxes</div>
<div class="cap"><b>Badge 32</b> is the only mark on the phone · the row is the link</div>
<div class="cap"><b>Thumb 72×90</b> · summary in full · Brygada 500 · 15.5/1.5</div></div>
</div>
</section>
<div class="end"></div>
</body></html>'''
    out = os.path.join(HERE, 'board.html')
    open(out, 'w').write(page)
    print('wrote', out, len(page) // 1024, 'KB')
    print('summary words:', len(SUMMARY_60.split()))
    for hexc, name, role in PAL:
        print(name, hexc, cr(hexc), 'on white')


if __name__ == '__main__':
    main()
