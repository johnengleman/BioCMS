# W1 "One bar": build report

**Answer first.** I built W1 home and saint pages. Each page is one responsive file with real media queries; the break is at 720 px. The site name is now "Discover the Saints" (owner update). All 15 checklist items pass at 1440 and 375. Section 4 lists the deviations from the spec.

## 1. Files
- Pages: `home.html`, `saint.html`.
- `gen.py` writes the pages from `data/saints.json` and `data/therese-of-lisieux.json`, using the `build.py` helpers. `build.py` was not edited.
- `measure.mjs` takes the measurements and runs the checks.
- `artboards.py` writes the legend artboards (`artboard-*.html`).
- Screenshots are in `prototypes/shots/round1/`:
  - `w1-{home,saint}-{1440,375}.png`: first screen.
  - `w1-{home,saint}-{1440,375}-full.png`: full page.
  - `w1-saint-1440-scrolled.png` and `w1-saint-375-scrolled.png`: proof of the sticky facts, the sticky tabs and the phone bottom bar.
  - `w1-{home,saint}-{1440,375}-legend.png`: legend artboards.
- **Artboard rule:** page screenshots at the exact width (1440 or 375), plus separate legend artboards. Each artboard puts the unchanged full-page screenshot on #EDEDED, then a 40 px gap with numbered dots and a dashed fold line, then a 280 px legend column. Nothing is drawn on the page itself.

## 2. What is built
- **Home 1440:**
  - The Galilee photo is fixed behind the page, full viewport, in grayscale.
  - Glass header, 0–56, sticky: wordmark, 6 nav links, search 320×36, "Get the app" 112×36.
  - Facet row, 56–100, on the photo and not sticky:
    - Category chips in a 660 zone: All 12 · Bishops 3 · Hermits 3 · Ascetics 3 · Nuns 2 · Holy Women 2 · Missionaries 2.
    - Month strip, 408 wide (12 × 34). October has a dot. Feb, Apr, May and Nov are muted.
    - Photo credit on the right.
  - Masonry: 5 × 268 columns, gap 12, gutters 26. The first card starts at y 112. The order is `saints.json`; each card goes into the shortest column, measured.
  - First screen: 5 whole cards and 5 card tops.
- **Card:**
  - Image crop 268×112 at the `META` focus point.
  - Kicker (role · years), name 20/700, full summary 14.5/1.5, meta row 30 high.
  - If the two feasts differ: "Feast Aug 28 · Orth. Jun 15", and the place is left out (St. Augustine, St. Benedict).
- **Home 375:**
  - White header, 52 high: wordmark, search pill, menu.
  - Photo strip with the credit at y 111–125. The white sheet starts at y 132 with radius 16.
  - Filter row: "Category ▾ · Feast month ▾ · Sort ▾", 40 high.
  - Plain rows from y 172: thumbnail 72×90, then kicker, name and "Feast Oct 1 · France". The full summary is below; rows are separated by hairlines.
- **Saint 1440 (S1):**
  - Credit in the 16 px photo strip above the sheet.
  - White sheet from x 24 to 1416, starting at y 72. Grid: 964 | 48 | 300.
  - Whole portrait 200×312 with the caption "Holy card, 1916 · Public domain".
  - Kicker, then the name at 48, then the full summary at 17.5/1.6 (measure 680).
  - Tabs Life · Teachings · Relics, 44 high, sticky at 56, with scroll-spy.
  - Facts card: #F5F5F5, sticky at 72, all of it in the first screen.
  - Life: 12 chapters in 2 columns, rows 38 high. "Read the full life →" is in the H2 row.
  - Words and teachings: 6 themes and 2 quotes at 20/1.4.
  - Relics: the place, then 2 sentences.
  - Miracles: one quiet row, 48 high: "Miracles and answered prayers · 322 accounts →".
- **Saint 375:**
  - Name at 36 with the whole portrait (96×150) on the right.
  - Summary at 17.
  - Facts as plain `dl` rows (label column 96, Feast first), before the story.
  - Underline tabs, 40 high, sticky at 52.
  - Bottom bar, 52 high ("Oct 1" + "Pray in the app"). It shows only after the facts scroll out of view.
- **Footer on every page:** Catholic · Orthodox · Both, with Both active. Nav is on the right (1440). On the phone, the nav is a second row.

## 3. Checklist D (measured with `measure.mjs` unless noted)

| # | Item | Result | Evidence |
|---|---|---|---|
| 1 | "St." before every saint name | PASS | Visible text and alt text scanned for 13 names: 0 hits on all 4 page/width pairs. "Saint Nicholas" counts as titled. "San Francisco" and "Franciscan" are not names. "Padre Pio" became "St. Pio"; the card name is "St. Pio of Pietrelcina". |
| 2 | Image ≤ 1/3 of the card; summary never clamped | PASS | Image/card ratio at most 0.211 at 1440 and 0.25 at 375. No line-clamp. |
| 3 | No sideways scroll at 375 | PASS | `scrollWidth` 375 on home and saint. Wordmark on 1 line; "Search saints" not cut off. |
| 4 | Phone: no stacked boxes | PASS | Plain rows with hairlines; facts are `dl` rows; underline tabs. |
| 5 | Minimal copy | PASS | No tagline, helper text, search label or "Showing X" line. |
| 6 | Footer switch, Both active, Galilee | PASS | Both pages, both widths. |
| 7 | Credit on the photo, horizontal, first screen | PASS | Contrast 5.8–6.9:1 (white 85 % vs brightest pixel behind). |
| 8 | Saint page order; no Miracles tab | PASS | Name + portrait → facts → Life → Words and teachings → Relics → miracles row. |
| 9 | Facts sticky; phone facts first; bottom bar never repeats a visible feast | PASS | See the scrolled shots. |
| 10 | Cards start at y ≤ 130 at 1440 | PASS | First card at y 112. |
| 11 | Feast in one click; search on every page | PASS | Month strip 1 click at 1440; phone 2 clicks (sheet). |
| 12 | Real, credited images; no kitsch | PASS | Local saint images and the Galilee photo only. |
| 13 | Grayscale and Inter | PASS | `grayscale(1)` on all images; Inter only. |
| 14 | Contrast ≥ 4.5:1 | PASS | Ink #111/#555 on white; facts labels 6.9:1; miracles row 4.54:1. |
| 15 | Name is the largest text; no third column or colour panel | PASS | Name 48 (phone 36); next largest H2 26; 2 columns. |

## 4. Known issues and deviations
- **Rename:** the wordmark is 181 px wide at 20 px, so the nav starts at x 247, not 210. On the phone the full name is 16 px (143 px, 1 line). Nothing is abbreviated.
- **3 one-saint categories** (Converts, Fathers of the Church, Confessors) do not fit the 1440 facet row. They are reachable by search or the phone Category sheet. No "More" chip.
- **No desktop Sort control** (none in the W1 1440 spec). On the phone, Sort is in the filter row.
- **Phone footer is 2 rows:** switch on row 1, nav as a 3×2 grid on row 2.
- **Credit backgrounds are heavy in grayscale.** Retest in colour; a lighter gradient may be enough.
- **Full-page screenshots:** the fixed photo covers only the first screen; below it the page continues in gray #808080. In a browser the photo stays behind while you scroll.
- **The masonry needs JavaScript** (shortest-column placement). The phone list works without it.
- **For the owner:** St. Seraphim (Jan 2) and St. Sergius (Sep 25) show the stored dates, which look like Old Style (spec item A9).
