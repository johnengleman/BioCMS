# W1 "One bar": build report (rev 2, after review 07)

**Answer first.** W1 home and saint pages are built, one responsive file each, with a CSS break at 720 px. The site name is "Discover the Saints". Review 07's six fixes are in. All 15 checklist items pass at 1440 and 375.

## 1. Files
- Pages: `home.html`, `saint.html`.
- `gen.py` writes the pages from `data/saints.json` and `data/therese-of-lisieux.json`, using the `build.py` helpers. `build.py` was not edited.
- `measure.mjs` takes the measurements and runs the checks. `artboards.py` writes the legend artboards.
- Screenshots in `prototypes/shots/round1/`:
  - `w1-{home,saint}-{1440,375}.png` (first screen) and `-full.png` (full page).
  - `w1-saint-{1440,375}-scrolled.png`: sticky facts, sticky tabs, phone bottom bar, header search icon.
  - `w1-{home,saint}-{1440,375}-legend.png`: legend artboards (page, 40 px gap with numbered dots, 280 px legend, on #EDEDED). Nothing is drawn on the page.

## 2. What is built
- **Home 1440:**
  - Galilee photo fixed behind the page (grayscale).
  - Glass header 0–56, sticky: wordmark at x 48, 6 nav links, search 320×36, "Get the app".
  - Facet row 56–100 on the photo: All 12 · Bishops 3 · Hermits 3 · Ascetics 3 · Nuns 2 · Holy Women 2 · Missionaries 2 · More ▾; month strip 12 × 31 (October dot; Feb, Apr, May, Nov muted); credit on a dark gradient at the right end.
  - Masonry: 5 × 256 columns, gap 16, gutters 48, from y 112. The lake shows between and around the cards. `saints.json` order, shortest column first.
- **Card:** crop 256×112 at corrected focus points; kicker, name 20, full summary 14.5/1.5, meta row 30. Different feasts: "Feast Aug 28 · Orth. Jun 15" and the place drops.
- **Home 375:**
  - Header 52: full name at 18 px and the menu; a search icon appears after the photo search scrolls away.
  - Photo strip: search pill 343×40 (y 62), credit below (y 108). White sheet from y 128, radius 16.
  - Filter row "Category ▾ · Feast month ▾ · Sort ▾". Plain rows from y 168 (thumbnail 72×90, kicker, name, feast, full summary, hairlines).
- **Saint 1440:** credit on the photo in a 28 px strip (20 px line). White sheet x 48–1392 from y 84; grid 916 | 48 | 300. Whole portrait 200×312 with caption, name 48, full summary 17.5/1.6, tabs Life · Teachings · Relics sticky at 56, facts card sticky at 72, 12 chapters in 2 columns, 6 themes and 2 quotes, Relics, one quiet miracles row.
- **Saint 375:** same photo strip with search and credit; name 36 with whole portrait 96×150; facts as plain rows before the story; tabs sticky at 52; bottom bar ("Oct 1" + "Pray in the app") only after the facts scroll away.
- **Footer on every page:** Catholic · Orthodox · Both (Both active) and the nav.

## 3. Checklist D
| # | Item | Result | Evidence |
|---|---|---|---|
| 1 | "St." before every name, never broken | PASS | 0 names without "St."; 0 "St." with a normal space; non-breaking "St.": 35 on home, 6 on saint. "St. Francis Xavier" and "St. Joan of Arc" kept whole. |
| 2 | Image ≤ 1/3 of the card; no clamp | PASS | ≤ 0.202 at 1440, ≤ 0.25 at 375. |
| 3 | No sideways scroll at 375 | PASS | `scrollWidth` 375; name on 1 line (161 px). |
| 4 | Phone: plain rows, hairlines, underline tabs | PASS | |
| 5 | Minimal copy | PASS | |
| 6 | Footer switch, Both active, Galilee | PASS | |
| 7 | Credit on the photo, horizontal, first screen | PASS | Contrast 8.3, 7.4, 6.3, 6.3:1. |
| 8 | Saint page order; no Miracles tab | PASS | |
| 9 | Facts sticky; phone facts first; bar never repeats a visible feast | PASS | Facts at y 72 and tabs at y 56 after scroll. |
| 10 | Cards start at y ≤ 130 | PASS | y 112. |
| 11 | Feast in one click; search on every page | PASS | |
| 12 | Real, credited images; no cut faces | PASS | Focus: St. Augustine 9 %, St. Benedict 6 %, St. Nicholas 17 %, St. Thérèse 16 %; St. Sergius shows the centre panel. Checked visually. |
| 13 | Grayscale and Inter | PASS | |
| 14 | Contrast ≥ 4.5:1 | PASS | |
| 15 | Name is the largest text; no third column or colour panel | PASS | Name 48 (phone 36); next largest H2 26. |

## 4. Known issues and deviations
- **Month strip 12 × 31 = 372, not 408**, to fit "More ▾" and the credit inside the 48 px gutters.
- **"More ▾" is only a chip** (no popover). It is meant to hold Converts, Fathers of the Church, Confessors and Sort.
- **Saint sheet** runs x 48–1392 and starts at y 84 (room for the credit strip).
- **Phone footer is 2 rows.**
- **Credit scrims are dark in grayscale;** retest in colour.
- **Full-page screenshots:** the fixed photo covers only the first screen; below it the page is gray #808080.
- **The masonry needs JavaScript;** the phone list works without it.
- **For the owner:** St. Seraphim (Jan 2) and St. Sergius (Sep 25) show stored dates that look like Old Style.
