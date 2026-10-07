#!/usr/bin/env python3
"""Brand board B1 "Of" for Find a Saint. Writes board.html next to this file.
Run: python3 build_b1.py
"""
import html
import os
import re
import sys

sys.path.insert(0, '/home/user/BioCMS/prototypes')
import build  # noqa: E402  (data helpers; never edited here)

HERE = os.path.dirname(os.path.abspath(__file__))
E = html.escape
ASSETS = '../../assets/'
GALILEE = '../../../public/images/hero/galilee.webp'
CREDIT = 'Sea of Galilee · Grant Barclay · CC BY 2.0'
CREDIT_URL = 'https://www.flickr.com/photos/grantbarclay/'

BY = build.BY
META = build.META
NAV = build.NAV


# ------------------------------------------------------------ the device
def of(name, cls='of'):
    """Set the word "of" in a saint name as the device. Names only; no "of" = no device."""
    name = E(name)
    return re.sub(r'\bof\b', f'<i class="{cls}">of</i>', name, count=1)


def wordmark(size, cls=''):
    return (f'<span class="wm {cls}" style="font-size:{size}px">Find&nbsp;<i>a</i>&nbsp;Saint</span>')


def badge(size):
    r = round(size * 0.22)
    fs = round(size * 0.78)
    return (f'<span class="badge" style="width:{size}px;height:{size}px;border-radius:{r}px;font-size:{fs}px">'
            f'<i>a</i></span>')


SEARCH = build.SEARCH_SVG
CHEV = build.CHEV_SVG
MENU = '<svg width="20" height="20" viewBox="0 0 20 20" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 6h14M3 10h14M3 14h14"/></svg>'


def kicker(slug):
    m = META[slug]
    return f'{E(m["role"])} · {m["years"]}'


def card(slug, w=268, img_h=112):
    s, m = BY[slug], META[slug]
    return (f'<article class="card" style="width:{w}px">'
            f'<div class="im" role="img" aria-label="{E(s["title"])}" style="height:{img_h}px;background-image:url({ASSETS}{slug}.jpg);background-position:{m["focus"]}"></div>'
            f'<div class="bd"><div class="kick">{kicker(slug)}</div>'
            f'<h3 class="nm">{of(m["short"])}</h3>'
            f'<p class="sum" lang="en">{E(build.st(s["summary"]).strip())}</p>'
            f'<div class="meta"><span>Feast {build.feast(s)}</span><span>{E(m["place"])}</span></div></div></article>')


def phone_row(slug, size='150%'):
    s, m = BY[slug], META[slug]
    return (f'<div class="prow"><div class="ptop">'
            f'<div class="pthumb" role="img" aria-label="{E(s["title"])}" style="background-image:url({ASSETS}{slug}.jpg);background-size:{size} auto;background-position:{m["focus"]}"></div>'
            f'<div class="pt"><div class="kick">{kicker(slug)}</div><h3 class="nm">{of(m["short"])}</h3>'
            f'<div class="pmeta">Feast {build.feast(s)} · {E(m["place"])}</div></div></div>'
            f'<p class="sum" lang="en">{E(build.st(s["summary"]).strip())}</p></div>')


# ---------------------------------------------------------- facts, tabs
FACTS = [
    ('Feast day', 'October 1'),
    ('Born', '1873, Alençon, France'),
    ('Died', '1897, Lisieux, France'),
    ('Patron of', 'Missions, with St. Francis Xavier; France, with St. Joan of Arc'),
    ('Venerated', 'Catholic'),
]
TABS = ['Life', 'Teachings', 'Relics']

# first three sentences of the real summary (73 words), with "St."
def sentences(text, n):
    parts = re.split(r'(?<!St)(?<=[.!?])\s+', text.strip())
    return ' '.join(parts[:n]).strip()


SPEC_BODY = sentences(build.TH_SUMMARY, 3)

CHIPS = [('All', 12), ('Bishops', 3), ('Hermits', 3), ('Ascetics', 3), ('Nuns', 2), ('Holy Women', 2), ('Missionaries', 2)]
MONTHS = build.MONTHS
EMPTY_MONTHS = {'Feb', 'Apr', 'May', 'Nov'}


def chips_html(on_photo=True):
    out = ''
    for i, (k, n) in enumerate(CHIPS):
        out += f'<span class="chip{" on" if i == 0 else ""}">{k} <b>{n}</b></span>'
    return out


def months_html():
    out = '<div class="months">'
    for m in MONTHS:
        cls = ' mute' if m in EMPTY_MONTHS else ''
        dot = '<u></u>' if m == 'Oct' else ''
        out += f'<span class="{cls.strip()}">{m}{dot}</span>'
    return out + '</div>'


def header_strip():
    nav = ''.join(f'<a class="{"on" if n == "Saints" else ""}" href="#">{n}</a>' for n in NAV)
    return (f'<div class="strip">'
            f'<div class="photo"></div>'
            f'<header class="hdr">{wordmark(20, "hwm")}<nav>{nav}</nav>'
            f'<div class="search">{SEARCH}<span>Search saints</span></div><a class="app" href="#">Get the app</a></header>'
            f'<div class="facets">{chips_html()}{months_html()}'
            f'<a class="credit" href="{CREDIT_URL}">{CREDIT}</a></div>'
            f'<div class="wall">{card("therese-of-lisieux")}{card("francis-of-assisi")}{card("seraphim-of-sarov")}{card("padre-pio")}{card("augustine-of-hippo")}</div>'
            f'</div>')


def swatch(hexv, role, contrast, dark=False, ring=False):
    return (f'<div class="sw{" dark" if dark else ""}{" ring" if ring else ""}" style="background:{hexv}">'
            f'<b>{hexv}</b><span>{E(role)}</span><em>{E(contrast)}</em></div>')


SWATCHES = [
    ('#FFFFFF', 'Page', 'base', False, True),
    ('#16181D', 'Ink · text', '17.8 on page', True, False),
    ('#4A4F5A', 'Ink-2 · kicker', '8.2 on page', True, False),
    ('#6B7078', 'Ink-3 · labels', '5.0 on page', True, False),
    ('#2743D9', 'Lapis · device, action', '7.3 both ways', True, False),
    ('#E8EEFF', 'Sky · selected chip', 'Lapis on it 6.3', False, False),
    ('#F2B50C', 'Marigold · fill only', 'Ink on it 9.6', False, False),
    ('#E3E5EA', 'Line · hairlines', '1 px', False, False),
]


def phone_home():
    return (f'<div class="phone"><div class="screen">'
            f'<div class="ph">{badge(32)}<div class="search ps">{SEARCH}<span>Search saints</span></div><span class="menu">{MENU}</span></div>'
            f'<div class="pphoto"><a class="credit" href="{CREDIT_URL}">{CREDIT}</a></div>'
            f'<div class="sheet"><div class="sorts"><span>Category {CHEV}</span><span>Feast month {CHEV}</span><span>Sort {CHEV}</span></div>'
            f'{phone_row("therese-of-lisieux")}{phone_row("francis-of-assisi")}'
            f'</div></div></div>')


def phone_saint():
    facts = ''.join(f'<div class="fr"><dt>{k}</dt><dd>{E(v)}</dd></div>' for k, v in FACTS)
    tabs = ''.join(f'<a class="{"on" if t == "Life" else ""}" href="#">{t}</a>' for t in TABS)
    chapters = ''.join(f'<li><b>{i + 1:02d}</b><span>{E(c)}</span></li>' for i, c in enumerate(build.CHAPTERS[:3]))
    return (f'<div class="phone"><div class="screen saint">'
            f'<div class="ph">{badge(32)}<div class="search ps">{SEARCH}<span>Search saints</span></div><span class="menu">{MENU}</span></div>'
            f'<div class="stop"><div><div class="kick">Carmelite nun · France · 1873–1897</div>'
            f'<h1 class="pname">{of("St. Thérèse of Lisieux")}</h1></div>'
            f'<img class="portrait" src="{ASSETS}therese-of-lisieux.jpg" alt="St. Thérèse of Lisieux, holy card, 1916"></div>'
            f'<p class="lead">{E(build.TH_SUMMARY.strip())}</p>'
            f'<dl class="facts">{facts}</dl>'
            f'<div class="tabs">{tabs}</div>'
            f'<ol class="chap">{chapters}</ol>'
            f'</div></div>')


# ------------------------------------------------------------------ CSS
CSS = """
:root{--page:#FFFFFF;--ink:#16181D;--ink2:#4A4F5A;--ink3:#6B7078;--lapis:#2743D9;--sky:#E8EEFF;--mari:#F2B50C;--line:#E3E5EA;
--serif:'Piazzolla',Georgia,serif;--sans:'Albert Sans',system-ui,sans-serif;
--shadow:0 1px 0 rgb(0 0 0/.04),0 10px 28px -14px rgb(0 0 0/.32)}
*{box-sizing:border-box}
html{background:#F4F5F7}
body{margin:0;width:1440px;background:var(--page);color:var(--ink);font-family:var(--sans);font-size:14px;line-height:1.4;-webkit-font-smoothing:antialiased}
a{color:inherit;text-decoration:none}
i.of,.wm i,.badge i{font-family:var(--serif);font-style:italic;font-weight:400;color:var(--lapis)}
.wm{font-family:var(--serif);font-weight:700;letter-spacing:-.02em;line-height:1;white-space:nowrap;color:var(--ink)}
.badge{display:inline-flex;align-items:center;justify-content:center;background:var(--lapis);color:#fff;flex:none}
.badge i{color:#fff;line-height:1;position:relative;top:-.04em}

/* board chrome */
.board{padding:56px 48px 72px}
.top{display:flex;align-items:baseline;justify-content:space-between;border-bottom:1px solid var(--ink);padding-bottom:14px}
.top .lab{font-size:12.5px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:var(--ink3)}
.idea{font-family:var(--serif);font-size:26px;line-height:1.3;margin:22px 0 0;letter-spacing:-.005em}
.idea i{font-style:italic;color:var(--lapis)}
section{margin-top:64px}
.sec{display:flex;align-items:baseline;gap:14px;border-top:1px solid var(--line);padding-top:12px;margin-bottom:28px}
.sec b{font-size:12.5px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:var(--ink3)}
.sec b:first-child{color:var(--lapis);font-variant-numeric:tabular-nums}
.cap{font-size:12.5px;color:var(--ink3);margin-top:10px;font-weight:500}

/* 01 wordmark */
.s1{display:grid;grid-template-columns:1fr auto;align-items:end;gap:48px}
.s1 .badges{display:flex;align-items:flex-end;gap:28px}
.s1 .badges div{display:flex;flex-direction:column;align-items:center;gap:10px}
.s1 .small{display:flex;align-items:center;gap:12px;margin-top:40px}

/* 02 device */
.s2{display:grid;grid-template-columns:1.2fr 1fr 1fr .9fr;gap:40px;align-items:start}
.use{border-top:1px solid var(--line);padding-top:16px;min-height:180px}
.page-name{font-family:var(--serif);font-weight:700;font-size:48px;line-height:1.04;letter-spacing:-.015em;margin:0;text-wrap:balance}
.nm{font-family:var(--serif);font-weight:700;font-size:20px;line-height:1.2;letter-spacing:-.01em;margin:0;text-wrap:balance}
.kick{font-size:12.5px;font-weight:500;color:var(--ink2)}
.idx{list-style:none;margin:0;padding:0}
.idx li{display:flex;justify-content:space-between;align-items:baseline;gap:12px;min-height:36px;padding:7px 0 6px;border-bottom:1px solid var(--line);font-family:var(--serif);font-size:16px;font-weight:700;letter-spacing:-.005em}
.idx li:first-child{border-top:0}
.idx li .n{font-family:var(--serif);font-size:16px;font-weight:700;color:var(--ink);white-space:normal;text-wrap:balance}
.idx li span{font-family:var(--sans);font-size:12.5px;font-weight:500;color:var(--ink3);white-space:nowrap}
.idx li.h{font-family:var(--sans);font-size:12.5px;font-weight:600;color:var(--ink3);min-height:28px;padding:0;border-bottom:0;align-items:end;letter-spacing:.04em}

/* 03 type */
.s3{display:grid;grid-template-columns:680px 1fr 300px;gap:48px;align-items:start}
.lead{font-family:var(--serif);font-weight:400;font-size:17.5px;line-height:1.6;margin:14px 0 0;color:var(--ink);font-variant-numeric:oldstyle-nums}
.tabs{display:flex;gap:28px;height:44px;align-items:stretch;border-bottom:1px solid var(--line);margin-top:28px}
.tabs a{display:flex;align-items:center;font-size:14px;font-weight:600;color:var(--ink2);border-bottom:2px solid transparent;margin-bottom:-1px}
.tabs a.on{color:var(--lapis);border-color:var(--lapis)}
.spec-cards{display:flex;flex-direction:column;gap:22px}
.spec-cards .kick{margin-bottom:3px}
.spec-cards .sum{margin-top:8px}
.scale{list-style:none;margin:0;padding:0;font-size:12.5px;color:var(--ink3);font-weight:500}
.scale li{display:flex;justify-content:space-between;gap:12px;padding:7px 0;border-bottom:1px solid var(--line)}
.scale li span{color:var(--ink2)}
.facts{margin:0;border-top:1px solid var(--line)}
.fr{display:grid;grid-template-columns:78px 1fr;gap:10px;padding:9px 0;border-bottom:1px solid var(--line);line-height:1.45}
.fr dt{font-size:13px;color:var(--ink3);font-weight:500}
.fr dd{margin:0;font-size:14px;font-weight:500;color:var(--ink);font-variant-numeric:tabular-nums lining-nums}
.btn{display:inline-flex;align-items:center;justify-content:center;height:38px;padding:0 14px;border-radius:8px;background:var(--lapis);color:#fff;font-weight:600;font-size:14px;margin-top:14px;width:100%}
.chips{display:flex;gap:8px;flex-wrap:wrap}
.chip{display:inline-flex;align-items:center;gap:6px;height:30px;padding:0 11px;border-radius:8px;background:#F1F2F5;font-size:13px;font-weight:500;color:var(--ink)}
.chip b{font-weight:500;color:var(--ink3)}
.chip.on{background:var(--sky);color:var(--lapis)}
.chip.on b{color:var(--lapis)}

/* 04 colour */
.s4{display:grid;grid-template-columns:repeat(8,160px);gap:9px}
.sw{height:96px;border-radius:8px;padding:10px 12px;display:flex;flex-direction:column;justify-content:flex-end;color:var(--ink);font-size:12.5px;line-height:1.3}
.sw.ring{box-shadow:inset 0 0 0 1px var(--line)}
.sw.dark{color:#fff}
.sw b{font-weight:600;font-variant-numeric:tabular-nums;font-size:13px}
.sw span{font-weight:500;opacity:.92;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.sw em{font-style:normal;opacity:.78}

/* 05 header strip + wall on the photo */
.strip{position:relative;width:1440px;margin-left:-48px;height:880px;overflow:hidden;background:#D9A070}
.photo{position:absolute;inset:0;background:url(GALILEE) center 40%/cover}
.photo::after{content:'';position:absolute;inset:0;background:rgb(20 30 60/.18);mix-blend-mode:multiply}
.hdr{position:absolute;left:0;right:0;top:0;height:56px;background:rgb(255 255 255/.78);backdrop-filter:blur(14px);display:flex;align-items:center;padding:0 26px;gap:12px;z-index:3}
.hdr nav{display:flex;gap:4px;margin-left:36px}
.hdr nav a{font-size:14px;font-weight:500;padding:8px 10px;color:var(--ink2);border-radius:6px}
.hdr nav a.on{color:var(--lapis);font-weight:600}
.hdr .search{margin-left:auto;width:320px}
.search{display:flex;align-items:center;gap:9px;height:36px;padding:0 12px;border-radius:18px;background:#fff;box-shadow:inset 0 0 0 1px var(--line);color:var(--ink3);font-size:14px;font-weight:500}
.app{display:inline-flex;align-items:center;justify-content:center;height:36px;width:112px;border-radius:8px;background:var(--mari);color:var(--ink);font-weight:600;font-size:14px}
.facets{position:absolute;left:26px;right:26px;top:56px;height:44px;display:flex;align-items:center;gap:8px;z-index:2}
.facets .chip{background:rgb(255 255 255/.92);box-shadow:0 1px 0 rgb(0 0 0/.04)}
.facets .chip.on{background:var(--sky)}
.months{display:flex;margin-left:16px;background:rgb(255 255 255/.92);border-radius:8px;height:30px;align-items:center;padding:0 2px}
.months span{position:relative;width:34px;text-align:center;font-size:12.5px;font-weight:500;color:var(--ink)}
.months span.mute{color:var(--ink3)}
.months span u{position:absolute;left:50%;bottom:-6px;width:4px;height:4px;margin-left:-2px;border-radius:2px;background:var(--mari);text-decoration:none}
.credit{margin-left:auto;font-size:11.5px;color:rgb(255 255 255/.85);background:rgb(16 22 40/.62);border-radius:6px;padding:4px 8px;line-height:1.3;font-weight:500;white-space:nowrap}
.wall{position:absolute;left:26px;top:112px;display:flex;gap:12px;align-items:flex-start;z-index:1}
.card{background:#fff;border-radius:10px;overflow:hidden;box-shadow:var(--shadow);flex:none}
.card .im{background-size:cover;box-shadow:inset 0 0 0 1px rgb(0 0 0/.08)}
.card .bd{padding:14px}
.card .nm{margin-top:3px}
.sum{font-family:var(--serif);font-size:14.5px;line-height:1.5;margin:8px 0 0;color:var(--ink);hyphens:auto;text-wrap:pretty;font-variant-numeric:oldstyle-nums}
.meta{display:flex;justify-content:space-between;align-items:center;height:30px;margin-top:12px;border-top:1px solid var(--line);font-size:12.5px;font-weight:500;color:var(--ink2);padding-top:1px}

/* 06 phone */
.s6{display:flex;gap:64px;justify-content:center;align-items:flex-start}
.s6 > div{display:flex;flex-direction:column;align-items:center;gap:16px}
.phone{width:375px;height:812px;border-radius:40px;padding:0;box-shadow:0 0 0 10px #16181D,0 0 0 11px #4A4F5A,0 34px 60px -24px rgb(0 0 0/.45);overflow:hidden;background:#fff;position:relative}
.screen{width:375px;height:812px;overflow:hidden;position:relative;background:#fff}
.ph{height:52px;display:flex;align-items:center;gap:10px;padding:0 12px 0 16px;background:#fff;position:relative;z-index:2}
.ph .ps{flex:1;height:36px}
.ph .menu{width:40px;height:40px;display:flex;align-items:center;justify-content:center;color:var(--ink)}
.pphoto{position:relative;height:112px;background:url(GALILEE) center 42%/cover}
.pphoto::after{content:'';position:absolute;inset:0;background:rgb(20 30 60/.18);mix-blend-mode:multiply}
.pphoto .credit{position:absolute;right:16px;top:60px;margin:0;z-index:1}
.sheet{position:relative;margin-top:-16px;background:#fff;border-radius:16px 16px 0 0;padding:0 16px;z-index:1}
.sorts{display:flex;gap:18px;height:40px;align-items:center;font-size:13px;font-weight:500;color:var(--ink2);border-bottom:1px solid var(--line)}
.sorts span{display:inline-flex;align-items:center;gap:5px}
.prow{padding:14px 0 16px;border-bottom:1px solid var(--line)}
.ptop{display:flex;gap:12px;align-items:flex-start}
.pthumb{width:72px;height:90px;border-radius:6px;flex:none;background-repeat:no-repeat;box-shadow:inset 0 0 0 1px rgb(0 0 0/.08)}
.pt .nm{font-size:19px;margin-top:3px}
.pmeta{font-size:12.5px;font-weight:500;color:var(--ink2);margin-top:6px}
.prow .sum{font-size:15px;margin-top:10px}
.screen.saint{padding:0 16px}
.screen.saint .ph{margin:0 -16px}
.stop{display:flex;gap:16px;align-items:flex-start;margin-top:12px}
.pname{font-family:var(--serif);font-weight:700;font-size:36px;line-height:1.08;letter-spacing:-.015em;margin:6px 0 0;text-wrap:balance}
.portrait{width:96px;height:150px;object-fit:contain;flex:none;display:block;box-shadow:inset 0 0 0 1px rgb(0 0 0/.08)}
.screen.saint .lead{font-size:17px;line-height:1.55;margin-top:14px}
.screen.saint .facts{margin-top:18px}
.screen.saint .tabs{margin-top:16px;height:40px;gap:24px}
.chap{list-style:none;margin:10px 0 0;padding:0;font-family:var(--serif);font-size:16px;line-height:1.3}
.chap li{display:flex;gap:12px;padding:9px 0;border-bottom:1px solid var(--line)}
.chap b{font-family:var(--sans);font-size:12.5px;font-weight:600;color:var(--lapis);padding-top:3px;min-width:18px;font-variant-numeric:tabular-nums}
""".replace('GALILEE', GALILEE)

FONTS = ('https://fonts.googleapis.com/css2?family=Piazzolla:ital,opsz,wght@0,8..30,400;0,8..30,700;1,8..30,400'
         '&family=Albert+Sans:wght@400;500;600&display=swap')


def section(n, label, inner, cls=''):
    return f'<section class="{cls}"><div class="sec"><b>{n:02d}</b><b>{E(label)}</b></div>{inner}</section>'


def main():
    # 01 wordmark
    s1 = (f'<div class="s1"><div>{wordmark(72)}<div class="cap">Piazzolla 700 · the “a” italic 400 Lapis</div>'
          f'<div class="small">{badge(32)}{wordmark(20)}<span class="cap" style="margin:0 0 0 12px">Header, 20 px</span></div></div>'
          f'<div class="badges">' + ''.join(f'<div>{badge(s)}<span class="cap" style="margin:0">{s}</span></div>' for s in (64, 32, 16)) + '</div></div>')

    # 02 device in use
    idx_names = ['St. Anthony of Padua', 'St. Augustine of Hippo', 'St. Benedict of Nursia', 'St. Francis of Assisi',
                 'St. John Maximovitch of Shanghai and San Francisco']
    idx = '<ol class="idx"><li class="h">A–Z</li>' + ''.join(
        f'<li><span class="n">{of(n)}</span><span>Feast {build.feast(BY[s])}</span></li>' for n, s in zip(idx_names, [
            'anthony-of-padua', 'augustine-of-hippo', 'benedict-of-nursia', 'francis-of-assisi', 'john-maximovitch'])) + '</ol>'
    s2 = (f'<div class="s2">'
          f'<div class="use"><div class="kick">Hermit monk · Russia · 1754–1833</div><h1 class="page-name" style="margin-top:6px">{of("St. Seraphim of Sarov")}</h1><div class="cap">Saint page, 48 px</div></div>'
          f'<div class="use"><div class="kick">Carmelite nun · 1873–1897</div><h3 class="nm" style="margin-top:3px">{of("St. Thérèse of Lisieux")}</h3>'
          f'<h3 class="nm" style="margin-top:18px">{of("St. Nicholas of Myra")}</h3><div class="cap">Card name, 20 px</div></div>'
          f'<div class="use">{idx}<div class="cap">Index rows, 16 px</div></div>'
          f'<div class="use"><div class="kick">Dominican friar · 1225–1274</div><h3 class="nm" style="margin-top:3px">{of("St. Thomas Aquinas")}</h3><div class="cap">No “of”: no device</div></div>'
          f'</div>')

    # 03 type specimen
    facts = ''.join(f'<div class="fr"><dt>{k}</dt><dd>{E(v)}</dd></div>' for k, v in FACTS)
    tabs = ''.join(f'<a class="{"on" if t == "Life" else ""}" href="#">{t}</a>' for t in TABS)
    scale = ''.join(f'<li>{a}<span>{b}</span></li>' for a, b in [
        ('Name', 'Piazzolla 700 · 48/1.04'), ('“of”', 'Piazzolla Italic 400'), ('Card name', 'Piazzolla 700 · 20/1.2'),
        ('Body', 'Piazzolla 400 · 17.5/1.6'), ('Summary', 'Piazzolla 400 · 14.5/1.5'), ('Kicker', 'Albert Sans 500 · 12.5'),
        ('Facts', 'Albert Sans · 13 / 14'), ('Tabs', 'Albert Sans 600 · 14'), ('Chips', 'Albert Sans 500 · 13')])
    s3 = (f'<div class="s3"><div><div class="kick">Carmelite nun · France · 1873–1897</div>'
          f'<h1 class="page-name" style="margin-top:6px">{of("St. Thérèse of Lisieux")}</h1>'
          f'<p class="lead">{E(SPEC_BODY)}</p><div class="tabs">{tabs}</div>'
          f'<div class="chips" style="margin-top:24px">{chips_html()}</div></div>'
          f'<div class="spec-cards">'
          f'<div><div class="kick">{kicker("padre-pio")}</div><h3 class="nm">{of("St. Pio of Pietrelcina")}</h3></div>'
          f'<div><div class="kick">{kicker("seraphim-of-sarov")}</div><h3 class="nm">{of("St. Seraphim of Sarov")}</h3>'
          f'<p class="sum" lang="en">{E(sentences(build.st(BY["seraphim-of-sarov"]["summary"]), 2))}</p></div>'
          f'<ul class="scale" style="margin-top:8px">{scale}</ul></div>'
          f'<div><dl class="facts">{facts}</dl><a class="btn" href="#">Pray in the app</a></div></div>')

    # 04 colour
    s4 = '<div class="s4">' + ''.join(swatch(*s) for s in SWATCHES) + '</div>'

    # 05 header strip
    s5 = header_strip()

    # 06 phone
    s6 = (f'<div class="s6"><div>{phone_home()}<span class="cap">Home, 375</span></div>'
          f'<div>{phone_saint()}<span class="cap">Saint page, 375</span></div></div>')

    page = (f'<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=1440">'
            f'<title>B1 Of · Find a Saint brand board</title>'
            f'<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>'
            f'<link href="{FONTS}" rel="stylesheet"><style>{CSS}</style></head><body><div class="board">'
            f'<div class="top"><span class="lab">Find a Saint · Brand board</span><span class="lab">B1 · Of</span></div>'
            f'<p class="idea">Saints carry the name of a place. The small word <i>of</i> is the brand.</p>'
            + section(1, 'Wordmark', s1)
            + section(2, 'Device', s2)
            + section(3, 'Type', s3)
            + section(4, 'Colour', s4)
            + section(5, 'Header', s5)
            + section(6, 'Phone', s6)
            + '</div></body></html>')
    out = os.path.join(HERE, 'board.html')
    open(out, 'w').write(page)
    print('wrote', out, len(page) // 1024, 'KB')


if __name__ == '__main__':
    main()
