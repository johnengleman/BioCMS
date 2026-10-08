#!/usr/bin/env python3
"""Legend artboards: page shot (exact width) | 40 gap with numbered dots | 280 legend, on #EDEDED.
usage: python3 artboards.py <notes.json>   (notes.json comes from measure.mjs)
Writes artboard-<page>-<w>.html here; shoot each with proto.mjs at width 40+W+40+280+40."""
import html
import json
import os
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
E = html.escape

LEGEND = {
    'home-1440': [
        ('hdr', 'Header 56, sticky, white 80 % glass. Search 320 × 36 always visible.'),
        ('chips', 'Category chips with counts, 30 h. One click.'),
        ('months', 'Feast month strip 12 × 34. One click. Dot = this month; empty months muted.'),
        ('credit', 'Credit on the photo, linked. Photo fixed, full viewport (Both = Galilee).'),
        ('card', 'Masonry 5 × 268, gap 12, from y 112. Crop 268 × 112 (≤ 1/3). Full summary.'),
        ('card2', 'Two feasts differ: "Feast Aug 28 · Orth. Jun 15"; place drops.'),
        ('foot', 'Footer 64: Catholic · Orthodox · Both (Both active), nav right.'),
    ],
    'home-375': [
        ('hdr', 'Header 52, sticky: mark, search pill, menu.'),
        ('credit', 'Photo strip 52–148 with credit. Sheet from y 132, radius 16.'),
        ('pfilters', 'Category ▾ · Feast month ▾ · Sort ▾. Each opens a full-height sheet.'),
        ('card', 'Plain rows from y 172: thumb 72 × 90, kicker, name, feast. Full summary. Hairlines.'),
        ('card2', 'Two feasts differ: "Feast Aug 28 · Orth. Jun 15"; place drops.'),
        ('foot', 'Footer: tradition switch; nav in 2 rows.'),
    ],
    'saint-1440': [
        ('hdr', 'Header 56, sticky glass. Search on every page.'),
        ('credit', 'Credit on the photo, in the strip above the sheet.'),
        ('portrait', 'Portrait whole, 200 × 312, caption.'),
        ('name', 'Name 48 (largest text), kicker, full summary 17.5 / 1.6.'),
        ('facts', 'Facts card 300, sticky at 72; all in the first screen.'),
        ('tabs', 'Tabs 44, sticky at 56: Life · Teachings · Relics. No Miracles tab.'),
        ('life', 'Life: 12 chapters, 2 columns, 38 h rows. "Read the full life →" in the H2 row.'),
        ('teach', 'Words and teachings: 6 themes + 2 quotes at 20 / 1.4.'),
        ('relics', 'Relics: place + 2 sentences.'),
        ('mrow', 'Miracles last: one quiet 48 h row, 15 px, muted.'),
        ('foot', 'Footer: tradition switch, Both active.'),
    ],
    'saint-375': [
        ('hdr', 'Header 52, sticky, search visible.'),
        ('credit', 'Photo strip with credit. Sheet radius 16.'),
        ('name', 'Name 36 with whole portrait 96 × 150 at right. Summary 17.'),
        ('facts', 'Facts as plain rows (label 96), Feast first, before the story.'),
        ('tabs', 'Underline tabs 40, sticky at 52.'),
        ('life', 'Chapters as plain rows.'),
        ('teach', 'Themes as rows; quotes.'),
        ('relics', 'Relics.'),
        ('mrow', 'One quiet miracles row.'),
        ('foot', 'Footer: tradition switch, Both active.'),
        (None, 'Bottom bar 52 ("Oct 1" + "Pray in the app") appears only after the facts scroll away. See w1-saint-375-scrolled.png.'),
    ],
}

CSS = """*{box-sizing:border-box}body{margin:0;background:#EDEDED;font-family:Inter,system-ui,sans-serif;color:#111;-webkit-font-smoothing:antialiased}
.ab{display:flex;padding:40px;align-items:flex-start}
.pg{flex:none;display:block;box-shadow:0 0 0 1px #D4D4D4}
.gap{flex:none;width:40px;position:relative;align-self:stretch}
.dot{position:absolute;left:8px;width:24px;height:24px;border-radius:12px;background:#111;color:#fff;font-size:12px;font-weight:600;display:flex;align-items:center;justify-content:center}
.fold{position:absolute;left:0;right:0;border-top:1px dashed #9A9A9A}
.fold span{position:absolute;left:4px;top:3px;font-size:10px;color:#767676}
.lg{flex:none;width:280px;position:sticky;top:40px}
.lg h1{font-size:15px;font-weight:700;margin:0 0 4px}
.lg p.s{font-size:12.5px;color:#555;margin:0 0 16px}
.lg ol{list-style:none;margin:0;padding:0}
.lg li{display:flex;gap:10px;font-size:13px;line-height:1.4;padding:8px 0;border-top:1px solid #D9D9D9}
.lg li b{flex:none;width:20px;height:20px;border-radius:10px;background:#111;color:#fff;font-size:11px;font-weight:600;display:flex;align-items:center;justify-content:center}
.lg li.n b{background:#767676}"""


def main(path):
    notes = json.load(open(path))
    for key, items in LEGEND.items():
        page, w = key.split('-')
        w = int(w)
        vh = 900 if w == 1440 else 812
        n = notes[key]['notes']
        # synthetic notes: first card and the first two-feast card
        n.setdefault('card', {'y': notes[key]['firstCardY']})
        if page == 'home':
            n['card2'] = {'y': notes[key].get('card2Y')}
        dots, lis, last, i = [], [], -99, 0
        for k, text in items:
            if k is None or k not in n or n[k].get('y') is None:
                lis.append(f'<li class="n"><b>–</b><span>{E(text)}</span></li>')
                continue
            i += 1
            y = max(n[k]['y'] + 4, last + 28)
            last = y
            dots.append(f'<div class="dot" style="top:{y}px">{i}</div>')
            lis.append(f'<li><b>{i}</b><span>{E(text)}</span></li>')
        title = {'home': 'W1 One bar · Home', 'saint': 'W1 One bar · St. Thérèse of Lisieux'}[page]
        out = (f'<!doctype html><html lang="en"><head><meta charset="utf-8"><title>{E(title)} {w}</title>'
               '<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">'
               f'<style>{CSS}</style></head><body><div class="ab">'
               f'<img class="pg" src="../../shots/round1/w1-{page}-{w}-full.png" width="{w}" alt="">'
               f'<div class="gap"><div class="fold" style="top:{vh}px"><span>{vh}</span></div>{"".join(dots)}</div>'
               f'<aside class="lg"><h1>{E(title)}</h1><p class="s">{w} px · first screen ends at the dashed line</p><ol>{"".join(lis)}</ol></aside>'
               '</div></body></html>')
        open(os.path.join(HERE, f'artboard-{page}-{w}.html'), 'w').write(out)
        print('artboard', key)


if __name__ == '__main__':
    main(sys.argv[1])
