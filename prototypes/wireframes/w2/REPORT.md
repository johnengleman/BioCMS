# W2 "Side index": report (rev 2, after review 07)

The site name is **Discover the Saints**. The committee ranks W2 third: its sticky rail with a month grid is close to the rejected Daybook rail. It is shown last, as the rail option.

**Review fixes applied:**
1. "St." and "Saint" never break from the name (`&nbsp;` in all text, alt text and titles).
2. The header is white at 98 % with a 24 px blur; text no longer shows through on scroll.
3. The phone has a filter row "Category ▾ · Feast month ▾ · Sort ▾" under the photo; each item opens a full-height sheet.
4. Saint page 1440: no empty block beside the summary. The sheet is 1088 wide and centred (240 | 48 | 720).
5. Saint page credit: a two-line block on the photo in the right margin (not a 16 px strip).

## What I built
- `home.html` and `saint.html`: one responsive file per page (`@media (max-width:759px)`), from `gen.py` (imports `build.py` for data only). Grayscale, Inter only, Both mode.
- **Home 1440:** photo fixed behind the page; 56 px header with a 400×36 search field.
  - **Rail:** x 24, width 232, sticky at 68: 9 categories, a 4 × 3 month grid, Sort (Feast date · A–Z). The credit sits 12 px below it.
  - **Masonry:** x 268–1416, 4 columns of 278, gap 12, top 68, images 278×124.
- **Home 375:** header 52 (wordmark 16/700, "Search" pill, menu with nav + "Get the app"); photo y 52–140 with the credit; white sheet from y 124 with the filter row on top; rows with a 343×104 crop, full summary and hairlines.
- **Saint 1440:** left column 240 (whole portrait 205×320, caption, facts card sticky at 72); main column 720 (kicker, name 48, summary 17.5, tabs sticky at 56, 12 chapters in 2 columns, 2 quotes and 6 themes, Relics, one quiet miracles row). Credit on the photo to the right of the sheet.
- **Saint 375:** name 36 full width; portrait 104×162 floated in the summary; facts as plain rows; tabs sticky at 52; bottom bar only after the facts scroll away; 48 px photo strip with the credit.
- **Legend:** page screenshots at exact width, plus `*-board.png` artboards.

### Files (`prototypes/shots/round1/`)
- Required: `w2-{home,saint}-{1440,375}.png` and `-full.png`; artboards with `-board`.
- States: `w2-home-375-menu`, `w2-home-375-month`, `w2-home-1440-scrolled`, `w2-saint-1440-scrolled`, `w2-saint-375-scrolled`.

## Checklist D
| # | Item | Result | Evidence |
|---|---|---|---|
| 1 | "St." before every saint name, never broken | PASS | Only "San Francisco" / "Franciscan" flagged (not names). 34 `&nbsp;` on home. |
| 2 | Image ≤ 1/3 of card, no clamp | PASS | 0.18–0.24. |
| 3 | No sideways scroll at 375 | PASS | `scrollWidth` 375. |
| 4 | Phone: no stacked boxes | PASS | |
| 5 | Minimal copy | PASS | |
| 6 | Footer switch, Both active, Galilee | PASS | |
| 7 | Credit on the photo, first screen | PASS | Median 5.5–10.4:1; brightest point 4.6–5.7:1. |
| 8 | Saint order, no Miracles tab | PASS | |
| 9 | Sticky facts; phone facts first; bar never repeats the feast | PASS | |
| 10 | Cards start at y ≤ 130 | PASS | y 68. |
| 11 | Feast in one click; search on every page | PASS | Desktop 1 click; phone 2 taps. |
| 12 | Real credited images, no kitsch | PASS | |
| 13 | Grayscale + Inter | PASS | |
| 14 | Contrast ≥ 4.5:1 | PASS | |
| 15 | Name is the largest text | PASS | 48 (36 phone). |

## Known issues and deviations
- **Resembles Daybook** (committee ranks it third).
- **Saint sheet** is 1088 wide and centred, not x 24–1416.
- **Phone header:** full wordmark at 16 px; search pill reads "Search".
- **Crop focus** overridden for St. Augustine 8 %, St. Benedict 11 %, St. Sergius 16 %.
- **Phone photo strips** carry only the credit.
- **Full-page captures:** the fixed photo shows only behind the first screen.
- **Sort** shows no active option; the rail has no "All" row.
- **Old Style dates:** St. Seraphim (Jan 2) and St. Sergius (Sep 25) need the owner's check.
