# W2 "Side index": report

The site name is **Discover the Saints** (owner update). It replaces every "Find a Saint": the header wordmark, the phone menu sheet and the `<title>`.

## What I built
- `home.html` and `saint.html`: one responsive file per page, with a real `@media (max-width:759px)` phone layout. Both come from `gen.py`, which imports `build.py` for data only.
- Grayscale with Inter only. Real Galilee photo and real saint images with `grayscale(1)`. Mode is Both.
- **Home 1440:** photo fixed behind the page, under a 56 px glass header with a 400×36 search field.
  - **Rail:** x 24, width 232, sticky at 68, ends at y 586: 9 categories (28 px rows), a 4 × 3 month grid (50×28 cells), Sort (Feast date · A–Z).
  - **Credit:** 12 px below the rail, sticky with it.
  - **Masonry:** x 268–1416, 4 columns of 278, gap 12, top 68, images 278×124, `saints.json` order, shortest column first.
- **Home 375:** header 52 (wordmark 16/700, search pill, menu); photo y 52–140 with the credit at y 104–120; white sheet from y 124; rows with a 343×104 crop, kicker, name, full summary, meta, hairlines. Menu sheet (`home.html#menu`): nav, categories, month grid, Sort, "Get the app".
- **Saint 1440 (S2):** white sheet x 24–1416 from y 72, radius 16, padding 40.
  - **Left column 240:** whole portrait 205×320, caption, then the #F5F5F5 facts card, sticky at 72.
  - **Main column 1024:** kicker, name 48, summary 17.5 (measure 680), tabs Life · Teachings · Relics (44 px, sticky at 56), 12 chapters in 2 columns, 2 quotes + 6 themes, Relics, one quiet miracles row.
- **Saint 375:** kicker, name 36 full width, portrait 104×162 floated left in the summary, facts as plain `dl` rows (Feast first), tabs 40 px sticky at 52, bottom bar ("Feast Oct 1" + "Pray in the app") only after the facts scroll away.
- **Legend:** page screenshots at the exact width plus separate `*-board.png` artboards (`board.mjs`): #EDEDED, 40 px gap with numbered dots, 280 px legend.

### Files (`prototypes/shots/round1/`)
- Required: `w2-{home,saint}-{1440,375}.png` and `-full.png`.
- Artboards: the same names with `-board`.
- States: `w2-home-375-menu`, `w2-home-1440-scrolled`, `w2-saint-1440-scrolled`, `w2-saint-375-scrolled`.

## Checklist D
| # | Item | Result | Evidence |
|---|---|---|---|
| 1 | "St." before every saint name | PASS | Only "San Francisco" / "Franciscan" flagged (not names). Patron reads "St. Francis Xavier", "St. Joan of Arc". |
| 2 | Image ≤ 1/3 of card, no clamp | PASS | 0.19–0.24 at 1440, 0.18–0.23 at 375. |
| 3 | No sideways scroll at 375 | PASS | `scrollWidth` 375 on both pages. |
| 4 | Phone: no stacked boxes | PASS | Hairline rows, `dl` facts, underline tabs. |
| 5 | Minimal copy | PASS | Only 3 section labels in the rail. |
| 6 | Footer switch, Both active, Galilee | PASS | Both pages, both widths. |
| 7 | Credit on the photo, first screen | PASS | Contrast 5.4–10.4:1. |
| 8 | Saint order, no Miracles tab | PASS | Name + portrait → facts → Life → Words → Relics → miracles row. |
| 9 | Sticky facts; phone facts first; bar never repeats the feast | PASS | See the scrolled shots. |
| 10 | Cards start at y ≤ 130 at 1440 | PASS | y 68. |
| 11 | Feast in one click; search on every page | PASS | Rail month grid 1 click (2 on the phone, via menu). |
| 12 | Real credited images, no kitsch | PASS | |
| 13 | Grayscale + Inter | PASS | |
| 14 | Contrast ≥ 4.5:1 | PASS | Lightest text #767676 on white, 4.54:1. |
| 15 | Name is the largest text; no third column or colour panel | PASS | 48 px (36 phone). |

Feasts (A8): St. Augustine "Feast Aug 28 · Orth. Jun 15", St. Benedict "Feast Jul 11 · Orth. Mar 14"; the place drops. Empty months muted; October has a dot. No pop-up, no app tile.

## Known issues and deviations
- **Phone header:** full wordmark at 16 px instead of the 32 px mark; the phone search pill reads "Search".
- **Crop focus overridden** for 3 saints (faces were cut at 278×124): St. Augustine 8 %, St. Benedict 11 %, St. Sergius 16 %.
- **Saint page phone:** added a 48 px photo strip (y 52–100) that carries the credit.
- **Full-page captures:** the fixed photo shows only behind the first screen; below it #666 fills in.
- **Sort:** no option shown active (curated order).
- **No "All" row in the rail;** clearing needs a "Clear" link after a selection.
- **Portrait** (205 wide) leaves 35 px empty in the 240 column.
- **Glass header:** text shows faintly through it on scroll; check readability.
- **Old Style dates:** St. Seraphim (Jan 2) and St. Sergius (Sep 25) need the owner's check.
