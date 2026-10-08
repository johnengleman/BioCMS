#!/usr/bin/env python3
"""Brand board B2 "Two Lungs" for Discover the Saints. Writes board.html next to this file.

Run: python3 build_board.py
Data and helpers come from prototypes/build.py (not edited here).
"""
import html
import os
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.abspath(os.path.join(HERE, '..', '..')))
import build  # noqa: E402

E = html.escape
BY, META = build.BY, build.META
st, feast = build.st, build.feast

ASSETS = '../../assets'
HERO = '../../../public/images/hero'

NAV = ['Saints', 'Miracles', 'Novenas', 'Teachings', 'Quotes', 'Books']
PHOTOS = {
    'galilee': ('galilee.webp', 'Sea of Galilee · Grant Barclay · CC BY 2.0', 'center 58%'),
    'assisi': ('assisi.webp', 'Assisi · Roberto Berti © FAI · CC BY-SA 4.0', 'center 38%'),
    'meteora': ('meteora.webp', 'Meteora · Dimitris9444 · CC BY-SA 4.0', 'center 42%'),
}
SEARCH_SVG = ('<svg width="15" height="15" viewBox="0 0 20 20" fill="none" stroke="currentColor" '
              'stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="9" cy="9" r="6"/><path d="m14 14 4 4"/></svg>')
MONTHS = build.MONTHS


# ------------------------------------------------------------ helpers
def venerated(s):
    v = s['venerated']
    if isinstance(v, str):
        import json
        v = json.loads(v)
    c, o = 'roman-catholic' in v, 'orthodox' in v
    return 'b' if c and o else ('c' if c else 'o')


def mode_name(m):
    return {'c': 'Catholic', 'o': 'Orthodox', 'b': 'Catholic · Orthodox'}[m]


def fmt(d):
    m, day = int(d[5:7]), int(d[8:10])
    return f'{MONTHS[m - 1]} {day}'


def card_meta(s, m):
    """Feast line per chair decision A8 (Both mode)."""
    if m == 'b' and s['feast_c'] != s['feast_o']:
        return f'<span>Feast {fmt(s["feast_c"])} · Orth. {fmt(s["feast_o"])}</span>'
    return f'<span>Feast {feast(s)}</span><span>{E(META[s["slug"]]["place"])}</span>'


def stripe(m, cls=''):
    return f'<i class="stripe {m} {cls}" aria-hidden="true"></i>'


def card(slug):
    s, m = BY[slug], META[slug]
    v = venerated(s)
    return (f'<article class="card">{stripe(v, "edge")}'
            f'<img class="im" src="{ASSETS}/{slug}.jpg" alt="{E(m["short"])}" style="object-position:{m["focus"]}">'
            f'<div class="bd"><div class="kick">{E(m["role"])} · {m["years"]}</div>'
            f'<h3>{E(m["short"])}</h3><p lang="en">{E(st(s["summary"]).strip())}</p>'
            f'<div class="meta">{card_meta(s, v)}</div></div></article>')


def header(mode, cls=''):
    nav = ''.join(f'<a href="#" class="{"on" if n == "Saints" else ""}">{n}</a>' for n in NAV)
    return (f'<header class="hdr {cls}"><a class="wm" href="#">Discover <em>the</em> Saints</a><nav>{nav}</nav>'
            f'<div class="search">{SEARCH_SVG}<span>Search saints</span></div>'
            f'<a class="btn" href="#">Get the app</a></header>')


def credit(key, cls=''):
    return f'<a class="credit {cls}" href="#">{E(PHOTOS[key][1])}</a>'


def photo_style(key):
    f, _, pos = PHOTOS[key]
    return f'background-image:url({HERO}/{f});background-position:{pos}'


def footer(mode, width=''):
    opts = ''.join(
        f'<a href="#" class="{"on" if k == mode else ""}">{n}{stripe(k) if k == mode else ""}</a>'
        for k, n in (('c', 'Catholic'), ('o', 'Orthodox'), ('b', 'Both')))
    nav = ''.join(f'<a href="#">{n}</a>' for n in NAV)
    return f'<footer class="foot"><div class="sw">{opts}</div><nav>{nav}</nav></footer>'


def badge(size):
    return f'<span class="badge s{size}" aria-label="Discover the Saints app"><i class="lung" aria-hidden="true"></i></span>'


# ------------------------------------------------------------ contrast
def lum(hexc):
    r, g, b = (int(hexc[i:i + 2], 16) / 255 for i in (1, 3, 5))
    f = lambda c: c / 12.92 if c <= 0.03928 else ((c + 0.055) / 1.055) ** 2.4
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b)


def contrast(a, b):
    la, lb = lum(a), lum(b)
    hi, lo = max(la, lb), min(la, lb)
    return (hi + 0.05) / (lo + 0.05)


def cr(a, b='#FFFFFF'):
    return f'{contrast(a, b):.1f}:1'


SWATCHES = [
    ('#FFFFFF', 'Page', 'page, cards', ''),
    ('#1B1B1F', 'Ink', 'names, body', cr('#1B1B1F') + ' on page'),
    ('#4A4D55', 'Ink-2', 'kicker, facts', cr('#4A4D55') + ' on page'),
    ('#6B6E76', 'Ink-3', 'meta, captions', cr('#6B6E76') + ' on page'),
    ('#E4E6E8', 'Line', 'hairlines', ''),
    ('#C8452B', 'Brick', 'Catholic mark', 'mark only · ' + cr('#C8452B') + ' on page'),
    ('#1B8A8F', 'Teal', 'Orthodox mark', 'mark only, no text'),
    ('#157277', 'Teal-text', 'links, tab, button', cr('#157277') + ' both ways'),
    ('#EEF4F4', 'Mist', 'chip fill', cr('#1B1B1F', '#EEF4F4') + ' ink on it'),
]


def swatch(hexc, name, role, con):
    dark = lum(hexc) < 0.3
    return (f'<div class="sw-item"><div class="sw-box" style="background:{hexc}">'
            f'<span class="{"lt" if dark else ""}">{hexc}</span></div>'
            f'<b>{name}</b><span>{role}</span>{f"<em>{con}</em>" if con else "<em>&nbsp;</em>"}</div>')


# ------------------------------------------------------------ content
def first_words(text, n):
    """Cut at the sentence end nearest to n words."""
    words = text.split()
    best = None
    for i, w in enumerate(words):
        if w in ('St.', 'c.'):
            continue
        if w.endswith(('.', '!', '?', '.”', '!”', '."', '!"', '?"')):
            if best is None or abs(i + 1 - n) < abs(best - n):
                best = i + 1
    return ' '.join(words[:best])


SUMMARY_60 = first_words(build.TH_SUMMARY, 60)
TH_FACTS = [
    ('Feast', 'October 1'),
    ('Born', '1873, Alençon, France'),
    ('Died', '1897, Lisieux, France'),
    ('Patron of', 'Missions, with St. Francis Xavier; France, with St. Joan of Arc'),
    ('Venerated', f'{stripe("c", "mark")}Catholic'),
]
NIC_FACTS = [
    ('Feast', 'December 6'),
    ('Born', 'c. 270, Patara, Lycia'),
    ('Died', 'c. 343, Myra, Lycia'),
    ('Venerated', f'{stripe("b", "mark")}Catholic · Orthodox'),
]


def facts(rows):
    return '<dl class="facts">' + ''.join(f'<div><dt>{k}</dt><dd>{v}</dd></div>' for k, v in rows) + '</dl>'


THUMB = {'therese-of-lisieux': 'width:125px;height:auto;max-width:none;margin:-24px 0 0 -32px'}


def phone_row(slug):
    s, m = BY[slug], META[slug]
    v = venerated(s)
    # Thumb crop: the holy card of St. Thérèse shows the oval only (type guide §3).
    thumb = THUMB.get(slug, f'object-position:{m["focus"]}')
    return (f'<div class="prow">{stripe(v, "row")}<div class="ptop">'
            f'<span class="th"><img src="{ASSETS}/{slug}.jpg" alt="{E(m["short"])}" style="{thumb}"></span>'
            f'<div><div class="kick">{E(m["role"])} · {m["years"]}</div><h3>{E(m["short"])}</h3>'
            f'<div class="pmeta">Feast {feast(s)} · {E(m["place"])}</div></div></div>'
            f'<p lang="en">{E(st(s["summary"]).strip())}</p></div>')


CSS = """
:root{--ink:#1B1B1F;--ink2:#4A4D55;--ink3:#6B6E76;--coral:#C8452B;--teal:#1B8A8F;--tt:#157277;--mist:#EEF4F4;--line:#E4E6E8;
--ui:'Familjen Grotesk',system-ui,sans-serif;--rd:'Vollkorn',Georgia,serif;
--shadow:0 1px 0 rgb(0 0 0/.04),0 10px 28px -14px rgb(0 0 0/.32)}
*{box-sizing:border-box}
html{background:#fff}
body{margin:0;width:1440px;background:#fff;color:var(--ink);font-family:var(--ui);font-size:14px;line-height:1.4;
-webkit-font-smoothing:antialiased;font-feature-settings:"tnum"}
a{color:inherit;text-decoration:none}
h1,h2,h3,p,dl,dd{margin:0}
img{display:block}
.stripe{display:block;height:4px;flex:none}
.stripe.c{background:var(--coral)}
.stripe.o{background:var(--teal)}
.stripe.b{background:linear-gradient(90deg,var(--coral) 50%,var(--teal) 50%)}
.stripe.mark{display:inline-block;width:24px;vertical-align:middle;margin:0 8px 2px 0}

/* board chrome */
.sec{padding:0 64px;margin-top:64px}
.sec.bleed{padding:0}
.lbl{display:flex;align-items:center;gap:14px;font-size:12.5px;font-weight:600;letter-spacing:.09em;text-transform:uppercase;color:var(--ink3);margin-bottom:28px}
.lbl::after{content:'';flex:1;height:1px;background:var(--line)}
.cap{font-size:12.5px;font-weight:500;color:var(--ink3);line-height:1.35}
.cap b{font-weight:600;color:var(--ink2)}
.top{padding:44px 64px 0;display:flex;align-items:baseline;justify-content:space-between;gap:40px}
.top .id{font-size:12.5px;font-weight:600;letter-spacing:.09em;text-transform:uppercase;color:var(--ink3)}
.top .idea{font-family:var(--rd);font-size:18px;line-height:1.5;color:var(--ink2);text-align:right}

/* 1 wordmark */
.mark-row{display:grid;grid-template-columns:1fr 420px;gap:48px;align-items:end}
.wm72{font-size:72px;font-weight:700;letter-spacing:-.045em;line-height:1;margin-bottom:16px}
.wm72 em,.wm em{font-family:var(--rd);font-style:italic;font-weight:400;color:var(--ink2);letter-spacing:0;font-size:.94em}
.wm72 + .stripe{width:120px}
.badges{display:flex;align-items:flex-end;gap:28px}
.badge{position:relative;display:inline-grid;place-items:center;background:#fff;color:var(--ink);font-weight:700;overflow:hidden;line-height:1;flex:none;box-shadow:inset 0 0 0 1px var(--line),0 6px 16px -10px rgb(0 0 0/.35)}
.lung{display:block;border-radius:999px;background:linear-gradient(90deg,var(--coral) 50%,var(--teal) 50%)}
.badge.s64{width:64px;height:64px;border-radius:14px}
.badge.s64 .lung{width:40px;height:12px}
.badge.s32{width:32px;height:32px;border-radius:7px}
.badge.s32 .lung{width:20px;height:6px}
.badge.s16{width:16px;height:16px;border-radius:4px}
.badge.s16 .lung{width:10px;height:3px}
.mark-row .cap{margin-top:16px}

/* header strip on photo */
.shot{position:relative;background-size:cover;overflow:hidden;width:100%}
.shot.cool::before,.ph-photo.cool::before{content:"";position:absolute;inset:0;background:rgb(20 30 60/.18);mix-blend-mode:multiply;pointer-events:none}
.hdr{position:relative;display:flex;align-items:center;gap:28px;height:60px;padding:0 64px 4px;background:rgb(247 250 252/.9);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px)}
.hdr::after{content:"";position:absolute;left:0;right:0;bottom:0;height:1px;background:rgb(27 27 31/.1)}
.wm{font-size:20px;font-weight:700;letter-spacing:-.03em;white-space:nowrap}
.hdr nav{display:flex;gap:4px;margin-left:8px}
.hdr nav a{padding:6px 10px;font-size:14px;font-weight:500;color:var(--ink2);border-radius:6px}
.hdr nav a.on{color:var(--ink);font-weight:600}
.search{display:flex;align-items:center;gap:9px;width:320px;height:36px;padding:0 13px;border-radius:999px;background:#fff;box-shadow:inset 0 0 0 1px var(--line);color:var(--ink3);font-size:14px;margin-left:auto}
.btn{display:inline-flex;align-items:center;justify-content:center;height:36px;padding:0 15px;border-radius:8px;background:var(--tt);color:#fff;font-size:14px;font-weight:600;white-space:nowrap}
.credit{position:absolute;right:0;bottom:12px;font-size:11.5px;font-weight:500;color:rgb(255 255 255/.85);line-height:1;padding:7px 64px 7px 40px;letter-spacing:.01em;
background:linear-gradient(90deg,rgb(27 27 31/0),rgb(27 27 31/.55) 36px,rgb(27 27 31/.55))}
.strips{display:grid;gap:20px}
.strip-wrap .cap{margin-bottom:8px}
.strips .shot{height:104px;border-radius:10px}
.strips .hdr{padding-left:24px;padding-right:24px}
.strips .credit{padding-right:24px}

/* cards */
.card{width:268px;background:#fff;border-radius:10px;overflow:hidden;box-shadow:var(--shadow);flex:none}
.card .im{width:268px;height:112px;object-fit:cover}
.card .bd{padding:12px 14px 0}
.kick{font-size:12.5px;font-weight:500;color:var(--ink2);line-height:1.3}
.card h3{font-size:20px;line-height:1.2;font-weight:700;letter-spacing:-.012em;margin:3px 0 8px;text-wrap:balance}
.card p{font-family:var(--rd);font-size:14.5px;line-height:1.5;color:var(--ink);hyphens:auto;text-wrap:pretty;font-variant-numeric:oldstyle-nums}
.meta{display:flex;justify-content:space-between;align-items:center;height:30px;margin-top:10px;border-top:1px solid var(--line);font-size:12.5px;font-weight:500;color:var(--ink3);white-space:nowrap;gap:8px}
.cards-row{display:grid;grid-template-columns:192px repeat(4,268px);gap:12px;align-items:start;margin-bottom:56px}
.cards-row .cap{padding-top:4px;display:grid;gap:14px}
.cards-row .cap div{display:flex;align-items:center;gap:10px}
.cards-row .cap .stripe{width:24px}
.every-row{display:grid;grid-template-columns:192px 268px 1fr;gap:12px 32px;align-items:start;margin-bottom:56px}
.every-row .cap{padding-top:4px;display:grid;gap:10px}
.every{display:grid;gap:36px;padding-top:4px}
.every .facts{margin-top:4px;max-width:360px}
.every .facts div:first-child{border-top:0}

/* name use + footer */
.use-row{display:grid;grid-template-columns:600px 1fr;gap:64px;margin-top:56px;align-items:start}
.name48{font-size:48px;line-height:1.05;font-weight:700;letter-spacing:-.025em;text-wrap:balance}
.name48 + .stripe{width:120px;margin:14px 0 14px}
.facts{display:grid;gap:0;margin-top:20px;max-width:420px}
.facts div{display:grid;grid-template-columns:88px 1fr;gap:12px;padding:8px 0;border-top:1px solid var(--line);align-items:baseline}
.facts div:last-child{border-bottom:1px solid var(--line)}
.facts dt{font-size:13px;color:var(--ink3);font-weight:500}
.facts dd{font-size:14px;color:var(--ink);font-weight:500;line-height:1.45}
.facts .btn{height:38px;margin-top:14px;width:100%}
.foots{display:grid;gap:16px}
.foot{display:flex;align-items:center;justify-content:space-between;height:64px;padding:0 20px;border-top:1px solid var(--line);border-bottom:1px solid var(--line);background:#fff}
.foot .sw{display:flex;gap:22px;height:100%;align-items:center}
.foot .sw a{position:relative;font-size:14px;font-weight:500;color:var(--ink2);height:100%;display:flex;align-items:center}
.foot .sw a.on{color:var(--ink);font-weight:600}
.foot .sw a .stripe{position:absolute;left:0;right:0;bottom:0}
.foot nav{display:flex;gap:18px}
.foot nav a{font-size:13px;font-weight:500;color:var(--ink3)}
.foots .cap{margin-bottom:-6px}

/* 3 type */
.type{display:grid;grid-template-columns:680px 1fr;gap:64px;align-items:start}
.spec{display:grid;gap:6px}
.spec .cap{margin-top:14px}
.kick-p{font-size:12.5px;font-weight:500;color:var(--ink2);margin-bottom:8px}
.body{font-family:var(--rd);font-size:17.5px;line-height:1.6;color:var(--ink);max-width:680px;margin-top:8px;font-variant-numeric:oldstyle-nums}
.names{display:grid;gap:18px}
.names h3{font-size:20px;line-height:1.2;font-weight:700;letter-spacing:-.012em;margin-top:2px}
.tabs{display:flex;gap:26px;height:44px;border-bottom:1px solid var(--line);margin-top:4px}
.tabs a{display:flex;align-items:center;font-size:14px;font-weight:600;color:var(--ink3);border-bottom:2px solid transparent;margin-bottom:-1px}
.tabs a.on{color:var(--tt);border-color:var(--tt)}
.chips{display:flex;gap:8px;flex-wrap:wrap;margin-top:4px}
.chip{display:inline-flex;align-items:center;gap:6px;height:30px;padding:0 12px;border-radius:999px;background:var(--mist);font-size:13px;font-weight:500;color:var(--ink)}
.chip small{font-size:12px;color:var(--ink3);font-weight:500}
.chip.on{background:var(--tt);color:#fff}
.chip.on small{color:rgb(255 255 255/.9)}
.quote{font-family:var(--rd);font-size:20px;line-height:1.4;color:var(--ink);hanging-punctuation:first;max-width:520px}
.h2{font-size:26px;line-height:1.2;font-weight:600;letter-spacing:-.015em;padding-bottom:14px;border-bottom:1px solid var(--line);display:flex;justify-content:space-between;align-items:baseline}
.h2 a{font-size:14px;font-weight:600;color:var(--tt);letter-spacing:0}
.mrow{display:flex;justify-content:space-between;align-items:center;height:48px;border-top:1px solid var(--line);border-bottom:1px solid var(--line);font-size:15px;color:var(--ink3);font-weight:500}

/* 4 palette */
.swatches{display:grid;grid-template-columns:repeat(5,160px);gap:24px 32px}
.sw-box{width:160px;height:96px;border-radius:8px;box-shadow:inset 0 0 0 1px rgb(0 0 0/.06);display:flex;align-items:flex-end;padding:10px 12px;font-size:12.5px;font-weight:600;color:var(--ink);letter-spacing:.02em}
.sw-box .lt{color:#fff}
.sw-item b{display:block;margin-top:10px;font-size:14px;font-weight:600}
.sw-item span{display:block;font-size:12.5px;color:var(--ink2);margin-top:2px}
.sw-item em{display:block;font-style:normal;font-size:12.5px;color:var(--ink3);margin-top:2px}
.rules{margin-top:28px;display:flex;gap:40px}

/* 5 home on photo */
.home{height:716px}
.home .hdr{padding-left:26px;padding-right:26px}
.home .credit{bottom:16px;padding-right:26px}
.home .wall{position:relative;display:flex;gap:12px;padding:12px 26px 0;align-items:flex-start}
.home-cap{padding:14px 64px 0}

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
.prow .stripe.row{width:24px;margin-bottom:8px}
.ptop{display:flex;gap:12px;align-items:flex-start}
.ptop .th{display:block;width:72px;height:90px;overflow:hidden;border-radius:4px;flex:none;box-shadow:inset 0 0 0 1px rgb(0 0 0/.08)}
.ptop img{width:72px;height:90px;object-fit:cover}
.ptop h3{font-size:19px;line-height:1.2;font-weight:700;letter-spacing:-.012em;margin:3px 0 4px}
.pmeta{font-size:12.5px;font-weight:500;color:var(--ink3)}
.prow p{font-family:var(--rd);font-size:15px;line-height:1.5;margin-top:10px;hyphens:auto;font-variant-numeric:oldstyle-nums}
.phone-notes{display:grid;gap:20px;padding-top:8px;max-width:420px}
.phone-notes .cap div{display:flex;align-items:center;gap:10px;margin-top:8px}
.phone-notes .stripe{width:24px}
.end{height:72px}
"""


def main():
    strips = ''
    for mode, key in (('c', 'assisi'), ('o', 'meteora'), ('b', 'galilee')):
        name = {'c': 'Catholic', 'o': 'Orthodox', 'b': 'Both'}[mode]
        place = PHOTOS[key][1].split(' · ')[0]
        strips += (f'<div class="strip-wrap"><div class="cap"><b>{name}</b> · {place}</div>'
                   f'<div class="shot{" cool" if key == "galilee" else ""}" style="{photo_style(key)}">{header(mode)}{credit(key)}</div></div>')

    cards = ''.join(card(s) for s in ('francis-of-assisi', 'seraphim-of-sarov', 'nicholas-of-myra', 'augustine-of-hippo'))
    cards_cap = ('<div class="cap"><b>Card edge</b>'
                 f'<div>{stripe("c")}Brick · Catholic</div><div>{stripe("o")}Teal · Orthodox</div>'
                 f'<div>{stripe("b")}Half each · both</div>'
                 '<div>No text on colour</div></div>')

    every = ''.join(
        f'<div><h1 class="name48">{E(n)}</h1>{stripe("c")}'
        f'<dl class="facts"><div><dt>Venerated</dt><dd>{stripe("c", "mark")}Catholic</dd></div></dl></div>'
        for n in ('St. Bernadette Soubirous', 'St. Maximilian Kolbe'))
    every_cap = ('<div class="cap"><b>Every name</b><div>With or without “of”</div>'
                 '<div>No image yet: name only</div></div>')

    foots = ''.join(f'<div><div class="cap"><b>{n}</b> active</div>{footer(m)}</div>'
                    for m, n in (('c', 'Catholic'), ('o', 'Orthodox'), ('b', 'Both')))

    home_cards = ''.join(card(s) for s in ('therese-of-lisieux', 'john-maximovitch', 'teresa-of-avila', 'benedict-of-nursia', 'padre-pio'))

    phone_rows = ''.join(phone_row(s) for s in ('therese-of-lisieux', 'nicholas-of-myra', 'seraphim-of-sarov'))

    swatches = ''.join(swatch(*s) for s in SWATCHES)

    chips = ('<div class="chips"><span class="chip on">All <small>12</small></span>'
             '<span class="chip">Bishops <small>3</small></span><span class="chip">Hermits <small>3</small></span>'
             '<span class="chip">Ascetics <small>3</small></span><span class="chip">Nuns <small>2</small></span></div>')

    page = f'''<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=1440">
<title>Discover the Saints · B2 Two Lungs · brand board</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Familjen+Grotesk:wght@400;500;600;700&family=Vollkorn:ital,wght@0,400;0,600;1,400&display=swap" rel="stylesheet">
<style>{CSS}</style></head>
<body>
<div class="top"><div class="id">Discover the Saints · B2 · Two Lungs</div>
<div class="idea">The Church breathes with two lungs, East and West. The site wears the colour of the reader’s tradition.</div></div>

<section class="sec"><div class="lbl">Wordmark</div>
<div class="mark-row"><div><div class="wm72">Discover <em>the</em> Saints</div>{stripe("b")}<div class="cap">Familjen Grotesk 700 · Vollkorn italic “the”</div></div>
<div><div class="badges">{badge(64)}{badge(32)}{badge(16)}</div><div class="cap">Mark from the stripe · 64 · 32 · 16</div></div></div>
</section>

<section class="sec"><div class="lbl">Device</div>
<div class="cards-row">{cards_cap}{cards}</div>
<div class="every-row">{every_cap}{card("thomas-aquinas")}<div class="every">{every}</div></div>
<div class="strips">{strips}</div>
<div class="use-row"><div><div class="kick-p">Bishop · Asia Minor · c. 270–343</div><h1 class="name48">St. Nicholas of Myra</h1>{stripe("b")}
<div class="cap">Under the name · Venerated fact</div>{facts(NIC_FACTS)}</div>
<div class="foots">{foots}</div></div>
</section>

<section class="sec"><div class="lbl">Type</div>
<div class="type">
<div><div class="kick-p">Carmelite nun · France · 1873–1897</div><h1 class="name48">St. Thérèse of Lisieux</h1>{stripe("c")}
<p class="body">{E(SUMMARY_60)}</p><div class="cap" style="margin-top:14px">Familjen Grotesk 700 · 48/1.05 &nbsp;·&nbsp; Vollkorn 400 · 17.5/1.6</div>
<div class="h2" style="margin-top:40px">Life<a href="#">Read the full life →</a></div>
<p class="quote" style="margin-top:20px">“{E(build.QUOTE)}”</p>
<div class="mrow" style="margin-top:28px"><span>Miracles and answered prayers · {build.N_MIRACLES} accounts</span><span>→</span></div>
</div>
<div class="spec">
<div class="names"><div><div class="kick">Capuchin friar · 1887–1968</div><h3>St. Pio of Pietrelcina</h3></div>
<div><div class="kick">Hermit monk · 1754–1833</div><h3>St. Seraphim of Sarov</h3></div></div>
<div class="cap">Card name 20/1.2 · kicker 12.5</div>
<div class="tabs"><a class="on" href="#">Life</a><a href="#">Teachings</a><a href="#">Relics</a></div>
<div class="cap">Tabs 14 · Teal-text</div>
{chips}<div class="cap">Chips 13 · Mist</div>
{facts(TH_FACTS)}<a class="btn" href="#" style="margin-top:14px;height:38px">Pray in the app</a>
<div class="cap">Facts 13 / 14 · button 38</div>
</div></div>
</section>

<section class="sec"><div class="lbl">Palette</div>
<div class="swatches">{swatches}</div>
<div class="rules"><div class="cap">Action colour is cool: Teal-text.</div><div class="cap">Brick and Teal: 4 px marks only.</div><div class="cap">Never red with blue.</div></div>
</section>

<section class="sec bleed"><div class="lbl" style="padding:0 64px">Header</div>
<div class="shot home cool" style="{photo_style('galilee')}">{header('b')}<div class="wall">{home_cards}</div>{credit('galilee')}</div>
<div class="cap home-cap"><b>Both</b> · cool glass · credit on photo</div>
</section>

<section class="sec"><div class="lbl">Phone</div>
<div class="phone-sec">
<div class="phone"><div class="ph-hdr">{badge(32)}<div class="ph-search">{SEARCH_SVG}<span>Search saints</span></div>
<span class="menu"><svg width="18" height="14" viewBox="0 0 18 14" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M1 1h16M1 7h16M1 13h16"/></svg></span></div>
<div class="ph-photo cool" style="background-image:url({HERO}/galilee.webp)">{credit('galilee')}</div>
<div class="ph-sheet"><div class="ph-filters"><span>Category ▾</span><span>Feast month ▾</span><span>Sort ▾</span></div>{phone_rows}</div></div>
<div class="phone-notes"><div class="cap"><b>375 × 812</b> · rows, hairlines, no boxes</div>
<div class="cap"><b>Row stripe 24×4</b><div>{stripe("c")}St. Thérèse · Catholic</div><div>{stripe("b")}St. Nicholas · both</div><div>{stripe("o")}St. Seraphim · Orthodox</div></div>
<div class="cap"><b>Thumb 72×90</b> · summary in full</div></div>
</div>
</section>
<div class="end"></div>
</body></html>'''
    page = page.replace('St. ', 'St.\u00a0')
    out = os.path.join(HERE, 'board.html')
    open(out, 'w').write(page)
    print('wrote', out, len(page) // 1024, 'KB')
    print('summary words:', len(SUMMARY_60.split()))
    for hexc, name, role, con in SWATCHES:
        print(name, hexc, con)


if __name__ == '__main__':
    main()
