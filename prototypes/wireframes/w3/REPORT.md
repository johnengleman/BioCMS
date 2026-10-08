# W3 "Photo search": build report

All 15 checklist D items pass. Item 14 passes only after a change to the spec (see the table). The site name is **Discover the Saints**.

## Files
- Pages: `home.html`, `saint.html` (one file each, real media queries, phone ≤ 700 px).
- Generator: `gen.py` (imports `build.py` read-only).
- Shot scripts: `shoot.sh` (runs `proto.mjs`), `board.mjs` (artboards).
- Screenshots in `prototypes/shots/round1/`:
  - Required: `w3-{home,saint}-{1440,375}.png` and `-full.png`.
  - Artboards: `w3-{home,saint}-{1440,375}-board.png` and `-full-board.png`.
  - States: `w3-home-1440-scrolled`, `w3-saint-1440-scrolled`, `w3-home-375-scrolled`, `w3-home-375-feasts`, `w3-saint-375-scrolled`.
- Phone full-page shots use a viewport as tall as the page, so the fixed bottom bar sits at the bottom.

## What is built
- **Home 1440:** header on the photo, search pill 560×48, credit at bottom right, glass header after scroll. Cards start at y 124 in 5 columns of 256, images 256×104.
- **Index tile:** first in column 1, not sticky: October · 3 (with the 3 names), 9 categories, the month grid, Sort. First screen: the index, 4 whole cards and 5 tops.
- **Home 375:** search 343×44 on the photo, credit on the photo, white sheet from y 152, plain rows with a 343×96 crop. Fixed bottom bar: Saints · Feasts · Categories · Sort.
- **Saint 1440:** name 48 across the full width; main column 944 and infobox 320 (whole portrait 154×240, caption, facts sticky at 72, "Pray in the app"). After scroll, the compact header shows the name and Life · Teachings · Relics.
- **Saint 375:** name 36 with the whole portrait 96×150; facts as plain rows before the story; bottom bar with Life · Teachings · Relics + Pray.
- **Legend:** page screenshots untouched at the exact width; separate `-board.png` artboards on #EDEDED with a 40 px gap of numbered dots and a 280 px legend.

## Checklist D
| # | Item | Result | Evidence |
|---|---|---|---|
| 1 | "St." before every saint name | PASS | 0 violations in visible text, `alt` and `aria-label`. Patron: "Missions, with St. Francis Xavier; France, with St. Joan of Arc". |
| 2 | Image ≤ 1/3 of the card; no clamp | PASS | 0.15–0.19 at 1440, 0.17–0.21 at 375. |
| 3 | No sideways scroll at 375 | PASS | `scrollWidth` 375 on both pages. |
| 4 | Phone: no stacked boxes | PASS | Hairline rows, `dl` facts, underline tabs. |
| 5 | Minimal copy | PASS | Labels only "Categories", "Feast month", "Sort". |
| 6 | Footer switch, Both active, Galilee | PASS | Both pages, both widths. |
| 7 | Credit on the photo, first screen | PASS | The phone saint page has no photo, so it has no credit. |
| 8 | Saint order; no Miracles tab | PASS | |
| 9 | Sticky facts; phone facts first; no repeated feast | PASS | The phone bar has no date. |
| 10 | Cards start at y ≤ 130 at 1440 | PASS | y 124. |
| 11 | Feast in one click; search on every page | PASS | |
| 12 | Real, credited images only | PASS | |
| 13 | Grayscale and Inter | PASS | |
| 14 | Contrast ≥ 4.5:1 on the real photo | PASS after a change | The spec's .35 gradient gave about 3:1 for nav text. The gradient is now .58 → .55 (48 px) → .36 (100 px) → 0 (140 px); worst case 4.74:1. The credit has a small dark backing chip (6.1–6.8:1). |
| 15 | Name is the largest text; no third column or colour panel | PASS | |

## Known issues and choices
- **Index tile** is about 440 high (spec 420), because of the 3 October names.
- **Sort has no active option** (curated `saints.json` order).
- **Crop focus** changed for this crop size only: St. Augustine 9 %, St. Benedict 6 %, St. Nicholas 17 %; St. Sergius uses `object-view-box` to show the centre panel of his icon.
- **Phone search:** after scroll, a search pill replaces the site name in the header.
- **Desktop full-page shots:** the fixed photo is one viewport tall; below 900 px it fades to #646464.
- **Not built:** the "Browse ▾" popover (described in the legend only).
- **For the owner:** St. Seraphim and St. Sergius show their stored Old Style dates (decision A9).
