# B2 "Two Lungs" brand board · report

Board: `prototypes/brand/b2/board.html` (1440 wide, 5650 tall). Generator: `build_board.py` (imports `prototypes/build.py`, not edited). Run `python3 build_board.py`.
Screenshots: `prototypes/shots/round1/b2-board.png` (first 1440×900) and `b2-board-full.png`.

## What is on the board
1. **Wordmark** "Discover the Saints": Familjen Grotesk, "Discover" 500 (light, open, curious) + "the Saints" 700 (firm), 72 px, two-tone stripe 120×4 under it. Compact mark 64/32/16: white tile, ink "D", stripe on the bottom edge (daylight, not a dark tile).
2. **Device** (4 px tradition stripe: Coral Catholic, Teal Orthodox, half each for both) in real uses:
   - Card top edge: St. Francis of Assisi (coral), St. Seraphim of Sarov (teal), St. Nicholas of Myra (half each), St. Augustine of Hippo (half each; meta "Feast Aug 28 · Orth. Jun 15", place dropped per A8).
   - "Every name" row (device works without "of"): St. Thomas Aquinas card (real image) + St. Bernadette Soubirous and St. Maximilian Kolbe as name-only uses (48 px name, 120×4 stripe, "Venerated · Catholic"). No image, no added facts.
   - Three header strips: Catholic/Assisi (coral edge), Orthodox/Meteora (teal edge), Both/Galilee (half each), each with glass header, search, "Get the app", credit on the photo.
   - Saint-page use: "St. Nicholas of Myra" at 48 with the half stripe and the Venerated mark in the facts.
   - Footer switch in three states; the stripe sits under the active choice and follows it.
3. **Type**: "St. Thérèse of Lisieux" 48/1.05; 56 words of her real summary (nearest sentence end to 60) in Vollkorn 17.5/1.6; "St. Pio of Pietrelcina" and "St. Seraphim of Sarov" at card size 20/1.2 with kickers; tabs Life · Teachings · Relics; chips with real counts (Mist); facts 13/14 with the Venerated mark and "Pray in the app" 38 h; Life H2 with "Read the full life →"; one real quote; the quiet miracles row "322 accounts".
4. **Palette**: 9 swatches 160×96 with hex, role and computed contrast: Ink 17.2:1, Ink-2 8.5:1, Ink-3 5.1:1, Teal-text 5.7:1 both ways, ink on Mist 15.4:1; Coral and Teal "mark only, no text". Rules: action colour is cool; marks 4 px only; never red with blue.
5. **Header**: full-bleed Galilee photo, glass header (white 86 %) with the Both stripe, gap 12, five whole real cards (St. Thérèse, St. John Maximovitch, St. Teresa of Ávila, St. Benedict of Nursia "Feast Jul 11 · Orth. Mar 14", St. Pio). Credit "Sea of Galilee · Grant Barclay · CC BY 2.0" on the photo, horizontal, 11.5 px white 85 % on a local gradient, measured 6.5:1 against the rendered photo.
6. **Phone** 375×812: header 52 (compact mark, search pill, menu), photo band with credit, sheet from y 132, "Category ▾ · Feast month ▾ · Sort ▾", rows with the 24×4 stripe, 72×90 thumb (St. Thérèse thumb shows the oval only), name 19, full summary 15/1.5, hairlines, no boxes.

Mood (brand purpose, shown not told): white page, full-colour daylight photos, white compact mark, light "Discover", coral + teal as the only colour, real faces first, the hopeful quote, no gold, halos, rays or textures.

## Checklist D results
1. "St." before every saint name: pass. Audited the visible text by regex; `build.st()` fixes summaries ("Padre Pio" → "St. Pio"); patron row reads "with St. Francis Xavier; France, with St. Joan of Arc".
2. Card image ≤ 1/3 of the card: pass, measured 0.18–0.22 on all 10 cards; summaries in full, never clamped.
3–4. Phone: plain rows, hairlines, no stacked boxes, no scrolling chip row. (A board is not a page; no 375 scrollWidth test applies.)
5. Minimal copy: section labels 1 word, captions ≤ 6 words, one idea line, no taglines or helper text.
6. Footer switch shown in three states; Both active for the Both state; photo for Both is Galilee.
7. Credit on the photo, horizontal, readable, in every photo use (3 strips, header panel, phone).
11. Search visible in every header.
12. Real credited images only; no filters or tints (only `object-fit` crops; the glass header uses `backdrop-filter`, never on images).
13. Google Fonts Familjen Grotesk + Vollkorn (unbanned).
14. Contrast ≥ 4.5:1 for every text colour (ink-3 5.1:1, teal-text 5.7:1, chip counts on Mist 4.7:1, credit 6.5:1 on the photo). Coral and Teal never carry text.
15. The saint name is the largest text in every page fragment.

## Known issues / notes for the owner
- The footer carries no wordmark (chair spec: switch left, nav right); the name appears in the wordmark, headers, phone, board title and page `<title>`.
- The compact mark uses "D"; "S" is the alternative if the owner prefers the noun.
- Section 5 is a true first screen (header + five whole cards, 716 tall) rather than a 180 px strip, so the St. Thérèse card shows in full.
- The Galilee glass header reads warm (white over an orange sunset). A cool multiply, as in B1, would neutralise it if wanted; the photo itself is untouched.
- Name-only saints (St. Bernadette Soubirous, St. Maximilian Kolbe) show only the name and the tradition given by the owner.
- The summary specimen is 56 words (the nearest sentence end to 60).
