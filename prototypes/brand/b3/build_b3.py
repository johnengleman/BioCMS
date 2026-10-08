#!/usr/bin/env python3
"""Brand board B3 "Versal" for Find a Saint. Writes board.html (1440 wide).

Run: python3 build_b3.py
Reads the real data through ../../build.py (META, st, feast, TH_SUMMARY, TH_FACTS).
"""
import html
import os
import re
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(HERE, '..', '..'))
import build  # noqa: E402

E = html.escape
META, BY, st, feast = build.META, build.BY, build.st, build.feast
SAINTS = build.SAINTS

ASSETS = '../../assets'
GALILEE = '../../../public/images/hero/galilee.webp'
CREDIT = 'Sea of Galilee · Grant Barclay · CC BY 2.0'

# ------------------------------------------------------------ palette
PAL = dict(
    white='#FFFFFF', ink='#1C1C1E', ink2='#4A4A46', ink3='#74746E',
    magenta='#C2186B', teal='#0F8B8D', tealtext='#0B7476', moss='#3E7D2C',
    cobalt='#1F4FD8', scarlet='#D9271E', butter='#F6D55C', line='#DDDDD6',
    surface='#F4F4F1',
)

# Role colour (the chair's key, decision C/B3).
ROLE = {
    'therese-of-lisieux': ('magenta', 'Nuns'),
    'teresa-of-avila': ('magenta', 'Nuns'),
    'francis-of-assisi': ('teal', 'Friars'),
    'anthony-of-padua': ('teal', 'Friars'),
    'padre-pio': ('teal', 'Friars'),
    'benedict-of-nursia': ('moss', 'Monks and hermits'),
    'seraphim-of-sarov': ('moss', 'Monks and hermits'),
    'sergius-of-radonezh': ('moss', 'Monks and hermits'),
    'john-maximovitch': ('cobalt', 'Bishops'),
    'augustine-of-hippo': ('cobalt', 'Bishops'),
    'nicholas-of-myra': ('cobalt', 'Bishops'),
    'thomas-aquinas': ('ink', 'Doctors'),
}
KEY = [('magenta', 'Nuns'), ('teal', 'Friars'), ('moss', 'Monks and hermits'),
       ('cobalt', 'Bishops'), ('ink', 'Doctors'), ('scarlet', 'Martyrs')]
ORDER = [s['slug'] for s in SAINTS]
SITE = 'Discover the Saints'

# Names without "of". Text only: the site has no image for the last two.
# Role and years are plain, well-known facts (nun of Nevers; Franciscan friar killed at Auschwitz).
NO_OF = [
    dict(short='St. Thomas Aquinas', role='Dominican friar', years='1225–1274', col='ink'),
    dict(short='St. Bernadette Soubirous', role='Nun', years='1844–1879', col='magenta'),
    dict(short='St. Maximilian Kolbe', role='Franciscan friar, martyr', years='1894–1941', col='scarlet'),
]


def lum(hexcol):
    r, g, b = (int(hexcol[i:i + 2], 16) / 255 for i in (1, 3, 5))

    def f(c):
        return c / 12.92 if c <= 0.03928 else ((c + 0.055) / 1.055) ** 2.4
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b)


def contrast(a, b):
    la, lb = lum(a), lum(b)
    hi, lo = max(la, lb), min(la, lb)
    return (hi + 0.05) / (lo + 0.05)


def cr(a, b='#FFFFFF'):
    return f'{contrast(a, b):.1f}:1'


# ------------------------------------------------------------ names
def split_name(short):
    """'St. Thérèse of Lisieux' -> ('Thérèse', 'of Lisieux'). Given name first."""
    rest = short.replace('St. ', '', 1)
    given, _, tail = rest.partition(' ')
    return given, tail


def versal(slug):
    given, _ = split_name(META[slug]['short'])
    return given[0]


def name_block(slug=None, cls='nm', short=None, col=None):
    """Versal + two-line name. The versal is decorative (aria-hidden)."""
    if slug:
        short, col = META[slug]['short'], ROLE[slug][0]
    given, tail = split_name(short)
    return (f'<div class="{cls}"><span class="vs" style="color:var(--{col})" aria-hidden="true">{given[0]}</span>'
            f'<h3><span class="st">St.</span> {E(given)}<br>{E(tail)}</h3></div>')


def wordmark(size, cls=''):
    """'Discover the Saints': the small word 'the' takes the "St." treatment (500, ink-2)."""
    return (f'<span class="wm {cls}" style="font-size:{size}px">Discover <span class="the">the</span> Saints</span>')


def feast_line(s):
    """Both mode: one date if one tradition or the same date; else both, place drops."""
    c, o = s['feast_c'], s['feast_o']
    if c and o and c[5:] != o[5:]:
        return f'Feast {feast(dict(feast_c=c, feast_o=None))} · Orth. {feast(dict(feast_c=None, feast_o=o))}', False
    return f'Feast {feast(s)}', True


def card(slug, w=268, img_h=112):
    s, m = BY[slug], META[slug]
    fl, show_place = feast_line(s)
    place = f'<span>{E(m["place"])}</span>' if show_place else ''
    return (f'<article class="card" style="width:{w}px">'
            f'<div class="imw" style="height:{img_h}px"><img class="im" src="{ASSETS}/{slug}.jpg" alt="{E(m["short"])}" style="object-position:{m["focus"]}"></div>'
            f'<div class="bd"><div class="kick">{E(m["role"])} · {m["years"]}</div>{name_block(slug)}'
            f'<p lang="en">{E(st(s["summary"]).strip())}</p>'
            f'<div class="meta"><span>{fl}</span>{place}</div></div></article>')


def words(text, n):
    """First whole sentences until at least n words."""
    out, count = [], 0
    for sent in re.split(r'(?<=[.!?"])\s+', text.strip()):
        out.append(sent)
        count += len(sent.split())
        if count >= n:
            break
    return ' '.join(out)


SEARCH = ('<svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">'
          '<circle cx="9" cy="9" r="6"/><path d="m14 14 4 4"/></svg>')
MENU = ('<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">'
        '<path d="M3 6h14M3 10h14M3 14h14"/></svg>')
CHEV = ('<svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">'
        '<path d="m2 3.5 3 3 3-3"/></svg>')

NAV = build.NAV
FACTS = [('Feast', 'October 1'), ('Born', '1873, Alençon, France'), ('Died', '1897, Lisieux, France'),
         ('Patron of', 'Missions, with St. Francis Xavier; France, with St. Joan of Arc'), ('Venerated', 'Catholic')]
TH_CREDIT = 'Holy card, 1916 · Public domain'

# ------------------------------------------------------------ CSS
CSS = f"""
:root{{--white:{PAL['white']};--ink:{PAL['ink']};--ink2:{PAL['ink2']};--ink3:{PAL['ink3']};--magenta:{PAL['magenta']};
--teal:{PAL['teal']};--tealtext:{PAL['tealtext']};--moss:{PAL['moss']};--cobalt:{PAL['cobalt']};--scarlet:{PAL['scarlet']};
--butter:{PAL['butter']};--line:{PAL['line']};--surface:{PAL['surface']};
--disp:'Big Shoulders Display',Impact,sans-serif;--body:'Libre Caslon Text',Georgia,serif;--ui:'Host Grotesk','Work Sans',system-ui,sans-serif;
--shadow:0 1px 0 rgb(0 0 0/.04),0 10px 28px -14px rgb(0 0 0/.32)}}
*{{box-sizing:border-box}}
html,body{{margin:0;background:#fff}}
body{{width:1440px;margin:0 auto;font-family:var(--ui);font-size:14px;line-height:1.4;color:var(--ink);-webkit-font-smoothing:antialiased}}
a{{color:inherit;text-decoration:none}}
h1,h2,h3,p{{margin:0}}
img{{display:block}}
.sec{{padding:0 64px;margin-top:64px}}
.sec.bleed{{padding:0}}
.lab{{display:flex;align-items:center;gap:14px;margin-bottom:28px;font-size:12px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:var(--ink3)}}
.lab b{{font-family:var(--disp);font-weight:800;font-size:16px;letter-spacing:0;color:var(--ink)}}
.lab i{{flex:1;height:1px;background:var(--line)}}
.bleed .lab{{margin:0 64px 28px}}
.cap{{font-size:12.5px;line-height:1.4;color:var(--ink3);font-weight:500}}
.cap b{{color:var(--ink2);font-weight:600}}
.st{{font-weight:500;color:var(--ink2)}}

/* board head */
.head{{display:flex;align-items:baseline;justify-content:space-between;padding:40px 64px 0;border-bottom:1px solid var(--line);padding-bottom:20px}}
.head .id{{font-size:12px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:var(--ink3)}}
.head .id b{{color:var(--ink);margin-right:10px}}
.head .idea{{font-family:var(--body);font-size:18px;color:var(--ink2);font-style:italic}}

/* 01 wordmark */
.wm{{font-family:var(--disp);font-weight:800;letter-spacing:-.005em;line-height:1;color:var(--ink);white-space:nowrap}}
.wm .the{{font-weight:500;color:var(--ink2)}}
.lock.dark .the,.hdr .the{{color:rgb(255 255 255/.8)}}
.badge{{display:inline-grid;place-items:center;background:var(--cobalt);color:#fff;font-family:var(--disp);font-weight:800;line-height:1;flex:none}}
.s1{{display:grid;grid-template-columns:1fr auto;gap:48px;align-items:end}}
.s1 .big{{display:flex;flex-direction:column;gap:18px}}
.s1 .badges{{display:flex;align-items:flex-end;gap:24px}}
.s1 .badges div{{display:flex;flex-direction:column;align-items:center;gap:10px}}
.lock{{display:flex;align-items:center;gap:10px;height:56px;padding:0 20px;border-radius:10px}}
.lock.dark{{background:var(--ink);color:#fff}}
.lock.dark .wm{{color:#fff}}
.lock.light{{box-shadow:inset 0 0 0 1px var(--line)}}
.lockups{{display:flex;gap:16px;margin-top:28px;align-items:center}}

/* device */
.kick{{font-size:12px;line-height:1.3;font-weight:500;letter-spacing:.1em;text-transform:uppercase;color:var(--ink2)}}
.nm{{display:flex;align-items:flex-start;gap:7px;margin-top:5px}}
.nm .vs{{font-family:var(--disp);font-weight:800;font-size:46px;line-height:46px;flex:none;margin-top:-1px}}
.nm h3{{font-family:var(--disp);font-weight:800;font-size:22px;line-height:1.05;letter-spacing:0;color:var(--ink);text-wrap:balance}}
.heads{{display:grid;grid-template-columns:repeat(4,1fr);gap:24px 32px;padding:0 0 4px}}
.heads > div{{padding:14px 0 14px;border-top:1px solid var(--line)}}
.uses{{display:grid;grid-template-columns:1fr 1fr;gap:48px;margin-top:40px}}
.use{{display:flex;flex-direction:column;gap:14px}}
.key{{display:flex;flex-direction:column;border-top:1px solid var(--line)}}
.key div{{display:grid;grid-template-columns:40px 170px 1fr;align-items:center;gap:14px;height:44px;border-bottom:1px solid var(--line);font-size:14px}}
.key .sw{{font-family:var(--disp);font-weight:800;font-size:30px;line-height:1}}
.key b{{font-weight:600}}
.key span{{color:var(--ink2)}}
.tabs{{display:flex;gap:24px;height:44px;border-bottom:1px solid var(--line);font-size:14px;font-weight:600;color:var(--ink2)}}
.tabs a{{display:flex;align-items:center;height:44px;border-bottom:2px solid transparent;margin-bottom:-1px}}
.tabs a.on{{color:var(--ink);border-color:var(--role,var(--cobalt))}}

/* saint page block */
.page{{display:grid;grid-template-columns:964px 48px 300px;margin-top:40px}}
.page .top{{display:grid;grid-template-columns:200px 32px 1fr;align-items:start}}
.portrait img{{width:200px;height:312px;object-fit:contain;box-shadow:inset 0 0 0 1px rgb(0 0 0/.08)}}
.portrait .cap{{margin-top:8px;font-size:11.5px}}
.hd{{display:flex;align-items:last baseline;gap:14px}}
.hd .vs{{font-family:var(--disp);font-weight:800;font-size:120px;line-height:.78;flex:none;color:var(--magenta)}}
h1.name{{font-family:var(--disp);font-weight:800;font-size:48px;line-height:1;letter-spacing:0;color:var(--ink);margin-top:8px;text-wrap:balance}}
.lead{{font-family:var(--body);font-size:17.5px;line-height:1.6;color:var(--ink);max-width:680px;margin-top:18px}}
.page .tabs{{margin-top:28px}}
h2.h2{{display:flex;align-items:baseline;justify-content:space-between;font-family:var(--disp);font-weight:800;font-size:26px;line-height:1.2;margin-top:48px;padding-bottom:14px;border-bottom:1px solid var(--line)}}
h2.h2 a{{font-family:var(--ui);font-size:14px;font-weight:600;color:var(--cobalt)}}
.chap{{columns:2;column-gap:36px;margin:0;padding:0;list-style:none;font-family:var(--body);font-size:16px}}
.chap li{{display:flex;gap:12px;align-items:baseline;height:38px;border-bottom:1px solid var(--line);break-inside:avoid}}
.chap b{{font-family:var(--ui);font-size:12.5px;font-weight:600;color:var(--ink3);font-variant-numeric:tabular-nums}}
.facts{{background:var(--surface);border-radius:10px;padding:8px 20px 20px}}
.facts .r{{display:grid;grid-template-columns:84px 1fr;gap:12px;padding:10px 0;border-bottom:1px solid var(--line);line-height:1.45}}
.facts .r:last-of-type{{border:0}}
.facts dt{{font-size:13px;color:var(--ink3)}}
.facts dd{{margin:0;font-size:14px;color:var(--ink)}}
.facts .r.first dd{{font-family:var(--disp);font-weight:800;font-size:22px;line-height:1}}
.btn{{display:inline-flex;align-items:center;justify-content:center;height:38px;padding:0 16px;border-radius:8px;background:var(--cobalt);color:#fff;font-size:14px;font-weight:600;white-space:nowrap}}
.facts .btn{{width:100%;margin-top:12px}}

/* 03 type */
.spec{{display:grid;grid-template-columns:1fr 360px;gap:64px}}
.spec .row{{display:grid;grid-template-columns:220px 1fr;gap:24px;padding:20px 0;border-top:1px solid var(--line);align-items:baseline}}
.spec .row:first-child{{border-top:0;padding-top:0}}
.spec .cap{{line-height:1.5}}
.cardname{{font-family:var(--disp);font-weight:800;font-size:22px;line-height:1.05}}
.body{{font-family:var(--body);font-size:17.5px;line-height:1.6;max-width:680px;color:var(--ink)}}
.summ{{font-family:var(--body);font-size:14.5px;line-height:1.5;max-width:240px}}
.ui-row{{display:flex;align-items:center;gap:24px;flex-wrap:wrap}}
.chip{{display:inline-flex;align-items:center;gap:6px;height:30px;padding:0 11px;border-radius:15px;background:var(--surface);font-size:13px;font-weight:500;color:var(--ink)}}
.chip small{{font-size:12px;color:var(--ink3);font-variant-numeric:tabular-nums}}
.chip.on{{background:var(--ink);color:#fff}}
.chip.on small{{color:rgb(255 255 255/.7)}}
.chip.butter{{background:var(--butter)}}
.chip.butter small{{color:var(--ink2)}}
.link{{color:var(--cobalt);font-weight:600;font-size:14px}}
.spec .side .facts{{margin-top:0}}

/* 04 swatches */
.sw-grid{{display:grid;grid-template-columns:repeat(6,160px);gap:28px 16px}}
.sw-grid .s{{display:flex;flex-direction:column;gap:8px}}
.sw-grid .b{{height:96px;border-radius:8px}}
.sw-grid .b.edge{{box-shadow:inset 0 0 0 1px var(--line)}}
.sw-grid .t{{font-size:12.5px;line-height:1.45;color:var(--ink3)}}
.sw-grid .t b{{display:block;font-size:14px;font-weight:600;color:var(--ink)}}
.sw-grid .t code{{font-family:var(--ui);font-variant-numeric:tabular-nums;color:var(--ink2)}}

/* 05 photo */
.photo{{position:relative;width:1440px;overflow:hidden;background:#d9a060 url({GALILEE}) no-repeat;background-size:1736px auto;background-position:-180px -230px}}
.photo::before{{content:'';position:absolute;inset:0 0 auto 0;height:230px;background:linear-gradient(rgb(12 10 8/.66),rgb(12 10 8/.52) 72px,rgb(12 10 8/.18) 150px,rgb(12 10 8/0) 230px);pointer-events:none}}
.photo > *{{position:relative}}
.hdr{{display:flex;align-items:center;gap:28px;height:72px;padding:0 26px;color:#fff}}
.hdr .wm{{color:#fff;font-size:32px}}
.hdr nav{{display:flex;gap:4px;margin-left:8px}}
.hdr nav a{{padding:8px 10px;font-size:14px;font-weight:500;color:#fff}}
.hdr nav a.on{{box-shadow:inset 0 -2px 0 #fff}}
.hdr .sp{{flex:1}}
.search{{display:flex;align-items:center;gap:10px;width:360px;height:40px;padding:0 16px;border-radius:20px;background:#fff;color:var(--ink3);font-size:14px}}
.hdr .btn{{height:36px}}
.facet{{display:flex;align-items:center;gap:8px;height:30px;margin:12px 26px 0;color:#fff}}
.facet .chip{{background:rgb(255 255 255/.92)}}
.facet .chip.on{{background:var(--ink)}}
.keypill{{display:inline-flex;align-items:center;gap:12px;height:30px;padding:0 12px;border-radius:15px;background:rgb(255 255 255/.92);font-size:12.5px;font-weight:500;color:var(--ink);margin-left:8px}}
.keypill i{{display:inline-block;width:10px;height:10px;border-radius:3px;margin-right:6px;vertical-align:-1px}}
.credit{{margin-left:auto;display:inline-flex;align-items:center;height:24px;padding:0 10px;border-radius:12px;background:rgb(255 255 255/.92);font-size:11.5px;font-weight:500;color:var(--ink2);letter-spacing:.01em}}
.wall{{display:flex;gap:16px;align-items:flex-start;padding:0 18px 16px;margin-top:40px}}
.card{{background:#fff;border-radius:10px;overflow:hidden;box-shadow:var(--shadow);flex:none}}
.card .imw{{position:relative}}
.card .imw::after{{content:'';position:absolute;inset:0;box-shadow:inset 0 0 0 1px rgb(0 0 0/.08)}}
.card .im{{width:100%;height:100%;object-fit:cover}}
.card .bd{{padding:14px}}
.card p{{font-family:var(--body);font-size:14.5px;line-height:1.5;color:var(--ink);margin-top:9px;hyphens:auto;text-wrap:pretty}}
.card .meta{{display:flex;justify-content:space-between;align-items:center;height:30px;margin-top:10px;border-top:1px solid var(--line);font-size:12.5px;font-weight:500;color:var(--ink3);font-variant-numeric:tabular-nums}}

/* 06 phone */
.phones{{display:flex;gap:64px;align-items:flex-start}}
.phone{{width:375px;height:812px;border-radius:40px;box-shadow:0 0 0 10px var(--ink),0 30px 60px -30px rgb(0 0 0/.5);overflow:hidden;background:#fff;position:relative;flex:none;margin:10px}}
.phone .ph-h{{display:flex;align-items:center;gap:10px;height:52px;padding:0 16px;background:#fff}}
.phone .search{{flex:1;width:auto;height:36px;font-size:14px}}
.phone .pphoto{{height:96px;background:url({GALILEE}) no-repeat;background-size:720px auto;background-position:-140px -70px;position:relative}}
.phone .pphoto .credit{{position:absolute;right:12px;bottom:26px;height:22px;font-size:11px;margin:0}}
.phone .sheet{{position:relative;margin-top:-16px;background:#fff;border-radius:16px 16px 0 0;padding:0 16px}}
.phone .drops{{display:flex;align-items:center;gap:18px;height:40px;font-size:13px;font-weight:600;color:var(--ink2);border-bottom:1px solid var(--line)}}
.phone .drops span{{display:inline-flex;align-items:center;gap:5px}}
.prow{{padding:14px 0 14px;border-bottom:1px solid var(--line)}}
.prow .top{{display:flex;gap:12px}}
.prow .thumb{{width:72px;height:90px;flex:none;position:relative}}
.prow .thumb img{{width:100%;height:100%;object-fit:cover}}
.prow .thumb::after{{content:'';position:absolute;inset:0;box-shadow:inset 0 0 0 1px rgb(0 0 0/.08)}}
.prow .nm{{margin-top:4px;gap:6px}}
.prow .nm .vs{{font-size:40px;line-height:40px}}
.prow .nm h3{{font-size:19px}}
.prow .meta{{font-size:12.5px;color:var(--ink3);margin-top:6px;font-weight:500}}
.prow p{{font-family:var(--body);font-size:15px;line-height:1.5;margin-top:10px;hyphens:auto}}
.psaint{{padding:0 16px}}
.psaint .hd{{gap:10px;margin-top:4px}}
.psaint .hd .vs{{font-size:78px;line-height:.78}}
.psaint h1.name{{font-size:36px;line-height:1.08;margin:0}}
.psaint .head2{{display:flex;gap:12px;align-items:flex-start;margin-top:12px}}
.psaint .head2 img{{width:96px;height:150px;object-fit:contain;flex:none;box-shadow:inset 0 0 0 1px rgb(0 0 0/.08)}}
.psaint .lead{{font-size:17px;line-height:1.55;margin-top:0}}
.psaint dl{{margin:16px 0 0}}
.psaint .r{{display:grid;grid-template-columns:96px 1fr;gap:8px;padding:9px 0;border-top:1px solid var(--line);font-size:14px;line-height:1.4}}
.psaint dt{{font-size:13px;color:var(--ink3)}}
.psaint dd{{margin:0}}
.psaint .tabs{{height:40px;margin-top:8px}}
.psaint .tabs a{{height:40px}}
.foot{{display:flex;justify-content:space-between;padding:24px 64px 40px;margin-top:64px;border-top:1px solid var(--line);font-size:12px;color:var(--ink3);letter-spacing:.06em;text-transform:uppercase;font-weight:500}}
"""


# ------------------------------------------------------------ sections
def sec(num, title, body, bleed=False):
    return (f'<section class="sec{" bleed" if bleed else ""}"><div class="lab"><b>{num}</b>{E(title)}<i></i></div>{body}</section>')


def s_wordmark():
    badges = ''.join(f'<div><span class="badge" style="width:{w}px;height:{w}px;border-radius:{round(w * .22)}px;font-size:{round(w * .68)}px">S</span>'
                     f'<span class="cap">{w}</span></div>' for w in (64, 32, 16))
    lock = (f'<div class="lockups"><div class="lock light"><span class="badge" style="width:28px;height:28px;border-radius:6px;font-size:19px">S</span>'
            f'{wordmark(28)}</div>'
            f'<div class="lock dark"><span class="badge" style="width:28px;height:28px;border-radius:6px;font-size:19px;background:#fff;color:var(--cobalt)">S</span>'
            f'{wordmark(28)}</div>'
            f'<span class="cap">Lockup · 28 px</span></div>')
    return (f'<div class="s1"><div class="big">{wordmark(72)}'
            f'<span class="cap">Big Shoulders Display 800 · 72 px · “the” 500</span></div>'
            f'<div><div class="badges">{badges}</div><div class="cap" style="margin-top:10px;text-align:right">Compact mark · app icon, favicon</div></div></div>{lock}')


def s_device():
    heads = ''
    for slug in ORDER:
        m = META[slug]
        heads += f'<div><div class="kick">{E(m["role"])} · {m["years"]}</div>{name_block(slug)}</div>'
    grid = f'<div class="heads">{heads}</div><div class="cap" style="margin-top:12px">Card name · 46 px versal · all 12 saints</div>'
    noof = ''.join(f'<div><div class="kick">{E(x["role"])} · {x["years"]}</div>{name_block(short=x["short"], col=x["col"])}</div>' for x in NO_OF)
    grid += (f'<div class="heads" style="margin-top:40px;grid-template-columns:repeat(4,1fr)">{noof}</div>'
             f'<div class="cap" style="margin-top:12px">Names without “of” · the given name leads · text only</div>')

    key = ''
    for col, role in KEY:
        who = [META[s]['short'] for s in ORDER if ROLE[s][1] == role]
        who_t = ', '.join(who) if who else 'none of the 12'
        letter = who[0].replace('St. ', '')[0] if who else 'M'
        key += f'<div><span class="sw" style="color:var(--{col})">{letter}</span><b>{E(role)}</b><span>{E(who_t)}</span></div>'
    key_use = f'<div class="use"><div class="key">{key}</div><span class="cap">Role colour key · six colours</span></div>'

    tabs = ''
    for col, name in (('magenta', 'St. Thérèse of Lisieux'), ('teal', 'St. Francis of Assisi'), ('cobalt', 'St. Nicholas of Myra')):
        tabs += (f'<div style="margin-bottom:22px"><div class="cap" style="margin-bottom:6px"><b>{E(name)}</b></div>'
                 f'<div class="tabs" style="--role:var(--{col})"><a class="on" href="#">Life</a><a href="#">Teachings</a><a href="#">Relics</a></div></div>')
    tab_use = f'<div class="use"><div>{tabs}</div><span class="cap">Active tab in role colour</span></div>'

    # saint page block
    t = BY['therese-of-lisieux']
    chap = ''.join(f'<li><b>{i + 1:02d}</b><span>{E(c)}</span></li>' for i, c in enumerate(build.CHAPTERS[:6]))
    facts = ''.join(f'<div class="r{" first" if i == 0 else ""}"><dt>{k}</dt><dd>{E(v)}</dd></div>' for i, (k, v) in enumerate(FACTS))
    page = (f'<div class="page"><div><div class="top">'
            f'<div class="portrait"><img src="{ASSETS}/therese-of-lisieux.jpg" alt="St. Thérèse of Lisieux, holy card, 1916"><div class="cap">{E(TH_CREDIT)}</div></div><div></div>'
            f'<div><div class="hd"><span class="vs" aria-hidden="true">T</span><div><div class="kick">Carmelite nun · France · 1873–1897</div>'
            f'<h1 class="name"><span class="st">St.</span> Thérèse of Lisieux</h1></div></div>'
            f'<p class="lead">{E(build.TH_SUMMARY.strip())}</p></div></div>'
            f'<div class="tabs" style="--role:var(--magenta)"><a class="on" href="#">Life</a><a href="#">Teachings</a><a href="#">Relics</a></div>'
            f'<h2 class="h2"><span>Life</span><a href="#">Read the full life →</a></h2><ol class="chap">{chap}</ol></div><div></div>'
            f'<aside class="facts"><dl style="margin:0">{facts}</dl><a class="btn" href="#">Pray in the app</a></aside></div>'
            f'<div class="cap" style="margin-top:14px">Page name · 120 px versal · name 48 px</div>')
    return grid + f'<div class="uses">{key_use}{tab_use}</div>' + page


def s_type():
    sample = words(build.TH_SUMMARY, 60)
    rows = [
        ('Big Shoulders Display 800<br>48 / 1.0', '<h1 class="name" style="margin:0"><span class="st">St.</span> Thérèse of Lisieux</h1>'),
        ('Big Shoulders Display 800<br>22 / 1.05 · card name',
         '<div class="cardname"><span class="st">St.</span> Pio of Pietrelcina</div><div class="cardname" style="margin-top:6px"><span class="st">St.</span> Seraphim of Sarov</div>'),
        ('Libre Caslon Text 400<br>17.5 / 1.6 · body', f'<p class="body">{E(sample)}</p>'),
        ('Libre Caslon Text 400<br>14.5 / 1.5 · summary', f'<p class="summ">{E(words(st(BY["padre-pio"]["summary"]), 40))}</p>'),
        ('Host Grotesk 500<br>12 caps +0.1em · kicker', '<div class="kick">Capuchin friar · 1887–1968</div>'),
        ('Host Grotesk 600<br>14 · tabs', '<div class="tabs" style="--role:var(--teal);max-width:320px"><a class="on" href="#">Life</a><a href="#">Teachings</a><a href="#">Relics</a></div>'),
        ('Host Grotesk 500<br>13 · chips', '<div class="ui-row"><span class="chip on">All <small>12</small></span><span class="chip">Bishops <small>3</small></span>'
         '<span class="chip">Hermits <small>3</small></span><span class="chip">Nuns <small>2</small></span><span class="chip butter">October <small>3</small></span></div>'),
        ('Host Grotesk 600<br>14 · action', '<div class="ui-row"><a class="btn" href="#">Get the app</a><a class="link" href="#">Read the full life →</a><a class="link" href="#" style="color:var(--tealtext)">St. Francis of Assisi</a></div>'),
    ]
    left = ''.join(f'<div class="row"><span class="cap">{lab}</span><div>{body}</div></div>' for lab, body in rows)
    facts = ''.join(f'<div class="r{" first" if i == 0 else ""}"><dt>{k}</dt><dd>{E(v)}</dd></div>' for i, (k, v) in enumerate(FACTS))
    side = f'<div class="side"><aside class="facts"><dl style="margin:0">{facts}</dl></aside><div class="cap" style="margin-top:10px">Facts · label 13 · value 14</div></div>'
    return f'<div class="spec"><div>{left}</div>{side}</div>'


def s_colour():
    sw = [
        ('magenta', 'Magenta', 'Nuns · versal, tab', cr(PAL['magenta']) + ' on white'),
        ('teal', 'Teal', 'Friars · versal only', cr(PAL['teal']) + ' on white'),
        ('moss', 'Moss', 'Monks and hermits', cr(PAL['moss']) + ' on white'),
        ('cobalt', 'Cobalt', 'Bishops · links, action', cr(PAL['cobalt']) + ' on white'),
        ('ink', 'Ink', 'Doctors · text', cr(PAL['ink']) + ' on white'),
        ('scarlet', 'Scarlet', 'Martyrs · versal only', cr(PAL['scarlet']) + ' on white'),
        ('white', 'White', 'Page, cards', '—'),
        ('ink2', 'Ink 2', '"St.", kicker', cr(PAL['ink2']) + ' on white'),
        ('ink3', 'Ink 3', 'Labels, meta', cr(PAL['ink3']) + ' on white'),
        ('tealtext', 'Teal text', 'Friars · links', cr(PAL['tealtext']) + ' on white'),
        ('butter', 'Butter', 'Chip fill', cr(PAL['ink'], PAL['butter']) + ' ink on it'),
        ('line', 'Line', 'Hairlines', '—'),
    ]
    out = ''
    for k, name, role, c in sw:
        edge = ' edge' if k in ('white', 'line', 'butter') else ''
        out += (f'<div class="s"><div class="b{edge}" style="background:var(--{k})"></div>'
                f'<div class="t"><b>{name}</b><code>{PAL[k]}</code> · {E(role)}<br>{E(c)}</div></div>')
    return f'<div class="sw-grid">{out}</div>'


def s_photo():
    nav = ''.join(f'<a href="#"{" class=on" if n == "Saints" else ""}>{n}</a>' for n in NAV)
    hdr = (f'<div class="hdr">{wordmark(32)}<nav>{nav}</nav><span class="sp"></span>'
           f'<div class="search">{SEARCH}<span>Search saints</span></div><a class="btn" href="#">Get the app</a></div>')
    chips = '<span class="chip on">All <small>12</small></span>' + ''.join(
        f'<span class="chip">{k} <small>{n}</small></span>' for k, n in (('Bishops', 3), ('Hermits', 3), ('Ascetics', 3), ('Nuns', 2), ('Holy Women', 2)))
    key = '<span class="keypill">' + ''.join(f'<span><i style="background:var(--{c})"></i>{r.split(" ")[0]}</span>' for c, r in KEY) + '</span>'
    facet = f'<div class="facet">{chips}{key}<span class="credit">{E(CREDIT)}</span></div>'
    wall = '<div class="wall">' + ''.join(card(s) for s in ORDER[:5]) + '</div>'
    return (f'<div class="photo">{hdr}{facet}{wall}</div>'
            f'<div class="cap" style="margin:14px 64px 0">Header strip 180 · gap 16 · card 268</div>')


def s_phone():
    t = BY['therese-of-lisieux']
    f_ = BY['francis-of-assisi']

    def prow(slug):
        s, m = BY[slug], META[slug]
        fl, _ = feast_line(s)
        return (f'<div class="prow"><div class="top"><div class="thumb"><img src="{ASSETS}/{slug}.jpg" alt="{E(m["short"])}" style="object-position:{m["focus"]}"></div>'
                f'<div><div class="kick">{E(m["role"])} · {m["years"]}</div>{name_block(slug)}<div class="meta">{fl} · {E(m["place"])}</div></div></div>'
                f'<p lang="en">{E(st(s["summary"]).strip())}</p></div>')
    home = (f'<div class="phone"><div class="ph-h"><span class="badge" style="width:32px;height:32px;border-radius:7px;font-size:22px">S</span>'
            f'<div class="search">{SEARCH}<span>Search saints</span></div><span style="color:var(--ink)">{MENU}</span></div>'
            f'<div class="pphoto"><span class="credit">{E(CREDIT)}</span></div><div class="sheet">'
            f'<div class="drops"><span>Category {CHEV}</span><span>Feast month {CHEV}</span><span>Sort {CHEV}</span></div>'
            f'{prow("therese-of-lisieux")}{prow("francis-of-assisi")}</div></div>')
    facts = ''.join(f'<div class="r"><dt>{k}</dt><dd>{E(v)}</dd></div>' for k, v in FACTS)
    saint = (f'<div class="phone"><div class="ph-h"><span class="badge" style="width:32px;height:32px;border-radius:7px;font-size:22px">S</span>'
             f'<div class="search">{SEARCH}<span>Search saints</span></div><span style="color:var(--ink)">{MENU}</span></div>'
             f'<div class="psaint"><div class="kick" style="margin-top:12px">Carmelite nun · France · 1873–1897</div>'
             f'<div class="hd"><span class="vs" aria-hidden="true">T</span><h1 class="name"><span class="st">St.</span> Thérèse<br>of Lisieux</h1></div>'
             f'<div class="head2"><p class="lead">{E(build.TH_SUMMARY.strip())}</p>'
             f'<img src="{ASSETS}/therese-of-lisieux.jpg" alt="St. Thérèse of Lisieux, holy card, 1916"></div>'
             f'<dl>{facts}</dl><div class="tabs" style="--role:var(--magenta)"><a class="on" href="#">Life</a><a href="#">Teachings</a><a href="#">Relics</a></div></div></div>')
    caps = ('<div style="display:flex;gap:64px;margin-top:22px"><span class="cap" style="width:395px">Home · 375 · 40 px versal</span>'
            '<span class="cap" style="width:395px">Saint page · name 36 · 78 px versal</span></div>')
    return f'<div class="phones">{home}{saint}</div>{caps}'


def main():
    fonts = ('https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@500;800&'
             'family=Libre+Caslon+Text:ital,wght@0,400;1,400&family=Host+Grotesk:wght@400;500;600&display=swap')
    page = (f'<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=1440">'
            f'<title>B3 Versal · {SITE} brand board</title>'
            f'<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>'
            f'<link href="{fonts}" rel="stylesheet"><style>{CSS}</style></head><body>'
            f'<div class="head"><span class="id"><b>B3 · Versal</b> {SITE} · brand board</span>'
            f'<span class="idea">The big initial of old books, made flat and modern. Its colour shows the saint\'s way of life.</span></div>'
            + sec('01', 'Wordmark', s_wordmark())
            + sec('02', 'The versal', s_device())
            + sec('03', 'Type', s_type())
            + sec('04', 'Colour', s_colour())
            + sec('05', 'On the photo', s_photo(), bleed=True)
            + sec('06', 'Phone', s_phone())
            + '<div class="foot"><span>B3 · Versal</span><span>Round 2 · 1440</span></div></body></html>')
    out = os.path.join(HERE, 'board.html')
    open(out, 'w').write(page)
    print('wrote', out, len(page) // 1024, 'KB')
    for k in ('ink', 'ink2', 'ink3', 'magenta', 'teal', 'tealtext', 'moss', 'cobalt', 'scarlet'):
        print(f'{k:9s} {PAL[k]} {cr(PAL[k])}')
    print('ink on butter', cr(PAL['ink'], PAL['butter']), '· white on cobalt', cr('#FFFFFF', PAL['cobalt']))


if __name__ == '__main__':
    main()
