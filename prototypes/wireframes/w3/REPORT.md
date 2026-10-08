# W3 "Photo search": build report (rev 2, after review 07)

**Answer first.** W3 home and saint page are built as one responsive file each (phone ≤ 700 px). All 15 checklist D items pass. The committee's 5 review fixes are applied. The site name is "Discover the Saints".

## Review fixes
1. **No index tile.** The wall is saints only. A "Browse ▾" button sits beside the search pill on the photo (and stays in the 56 px header after scroll). It opens a panel: categories with counts, the month grid (October dot, empty months muted), Sort.
2. **Saint page 1440:** the 56 px glass header from the start (no search band); whole portrait 200×312 beside the 48 px name and summary; tabs in the first screen (y ≈ 545); right column = sticky facts card and "Pray in the app".
3. **"St." never breaks** (`St.&nbsp;`: 35 on home, 8 on the saint page).
4. **Softer credit chip:** 18 px high, rgb(0 0 0/.4) with a 6 px blur. Contrast 5.8, 6.3, 8.5:1.
5. **No "D" badge.** The phone home header shows the full name; where search shares the bar, a neutral gray square marked "logo".
- Also: dead "0" rows removed from the phone Feasts sheet; header gradient lightened (header text ≥ 4.67:1).

## Files
- `home.html`, `saint.html`; `gen.py` (imports `build.py` read-only); `shoot.sh` (screenshots); `board.mjs` (artboards).
- Screenshots in `prototypes/shots/round1/`: `w3-{home,saint}-{1440,375}.png` and `-full.png`; artboards `-board.png`; states `w3-home-1440-browse`, `w3-home-1440-scrolled`, `w3-saint-1440-scrolled`, `w3-home-375-scrolled`, `w3-home-375-feasts`, `w3-saint-375-scrolled`.

## What was built
- **Home 1440:** photo fixed. Row 1 (0–48) on the photo: logo at x 48, nav, "Get the app". Row 2 (52–100): search pill 560×48 + "Browse ▾". Credit bottom right. After 104 px of scroll, a 56 px glass header. Masonry saints only from y 124: gutters 48, gap 16, 5 × 256, images 256×104. First screen: 5 whole cards and 5 tops.
- **Home 375:** header 52 with the full name and menu; photo y 52–164 with a search pill 343×44; white sheet from y 152 with plain rows; fixed bottom bar Saints · Feasts · Categories · Sort, each a full-height sheet.
- **Saint 1440:** glass header 56 (after the in-page tabs scroll away it shows the name and the tabs); credit strip y 63–81; sheet x 48–1392 from y 88; main column 896 (portrait + name + summary + tabs, Life, Words and teachings, Relics, one quiet miracles row); right column 320 (facts, sticky at 72).
- **Saint 375:** header with logo square, search, menu; name 36 with whole portrait 96×150; summary 17; facts as plain rows; bottom bar Life · Teachings · Relics + "Pray".

## Checklist D
| # | Item | Result |
|---|---|---|
| 1 | "St." before every saint name, never broken | PASS |
| 2 | Image ≤ 1/3 of the card (0.15–0.21), no clamp | PASS |
| 3 | No sideways scroll at 375 | PASS |
| 4 | Phone: no stacked boxes | PASS |
| 5 | Minimal copy | PASS |
| 6 | Footer switch, Both active, Galilee | PASS |
| 7 | Credit on the photo, first screen (phone saint page has no photo) | PASS |
| 8 | Saint order, no Miracles tab | PASS |
| 9 | Sticky facts; phone facts first; no repeated feast | PASS |
| 10 | Cards start at y ≤ 130 (y 124) | PASS |
| 11 | Feast reachable; search on every page | PASS, but desktop feast month is 2 clicks (behind "Browse ▾") |
| 12 | Real, credited images only | PASS |
| 13 | Grayscale and Inter | PASS |
| 14 | Contrast ≥ 4.5:1 on the real photo | PASS (gradient darker than the spec) |
| 15 | Name is the largest text; no third column or colour panel | PASS |

## Known issues
- **Feast month takes 2 clicks on desktop** because of fix 1. Option: a month row in the Browse trigger, or accept 2 clicks.
- **The saint page now matches W1's** (portrait beside the name, tabs under the summary); it differs only in the glass header, credit strip and facts card.
- **Crops:** St. Augustine 9 %, St. Benedict 6 %, St. Nicholas 17 %; St. Sergius shows the centre panel.
- **Sort shows no active option** (curated order).
- **Desktop full-page images:** the fixed photo fades to #646464 below 900 px.
- **For the owner:** St. Seraphim and St. Sergius show stored Old Style dates.
