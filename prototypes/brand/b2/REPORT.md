# B2 "Two Lungs" brand board · report

Board: `prototypes/brand/b2/board.html` (1440 wide, 5661 tall). Revision 3 after the committee brand review (08-review-brand.md). Generator: `build_board.py` (imports `prototypes/build.py`, not edited). Run `python3 build_board.py`.
Screenshots: `prototypes/shots/round1/b2-board.png` (first 1440×900) and `b2-board-full.png`.

## What is on the board
1. **Wordmark** "Discover *the* Saints": Familjen Grotesk 700 at 72, tracking −0.045em, "the" in Vollkorn italic ink-2; two-tone stripe 120×4 under it. Compact mark 64/32/16: white tile with the stripe itself as a rounded two-colour bar (40×12, 20×6, 10×3). No letter avatar.
2. **Device** (4 px tradition stripe: Brick Catholic, Teal Orthodox, half each for both) in real uses. It is NOT on the header edge any more (review: it read as a loading bar); it lives under the wordmark, on card edges, in the footer switch and the Venerated fact only.
   - Card top edge: St. Francis of Assisi (brick), St. Seraphim of Sarov (teal), St. Nicholas of Myra (half each), St. Augustine of Hippo (half each; meta "Feast Aug 28 · Orth. Jun 15", place dropped per A8).
   - "Every name" row (device works without "of"): St. Thomas Aquinas card (real image) + St. Bernadette Soubirous and St. Maximilian Kolbe as name-only uses (48 px name, 120×4 stripe, "Venerated · Catholic"). No image, no added facts.
   - Three header strips: Catholic/Assisi, Orthodox/Meteora, Both/Galilee, each with the cool glass header (white 90 %, slight cool tint), search, "Get the app", credit on the photo. The mode shows in the photo and the footer switch, not in a header line.
   - Saint-page use: "St. Nicholas of Myra" at 48 with the half stripe and the Venerated mark in the facts.
   - Footer switch in three states; the stripe sits under the active choice and follows it.
3. **Type**: "St. Thérèse of Lisieux" 48/1.05; 56 words of her real summary (nearest sentence end to 60) in Vollkorn 17.5/1.6; "St. Pio of Pietrelcina" and "St. Seraphim of Sarov" at card size 20/1.2 with kickers; tabs Life · Teachings · Relics; chips with real counts (Mist); facts 13/14 with the Venerated mark and "Pray in the app" 38 h; Life H2 with "Read the full life →"; one real quote; the quiet miracles row "322 accounts".
4. **Palette**: 9 swatches 160×96 with hex, role and computed contrast: Ink 17.2:1, Ink-2 8.5:1, Ink-3 5.1:1, Teal-text 5.7:1 both ways, ink on Mist 15.4:1. Coral #E8503A was replaced by **Brick #C8452B** (cooler, deeper, 4.8:1 on white, clearly apart from Airbnb red and from the ochre images); Brick and Teal are marks only. Rules: action colour is cool; marks 4 px only; never red with blue.
5. **Header**: full-bleed Galilee photo with the cool multiply `rgb(20 30 60/.18)` (Galilee only; the saint images are untouched), cool glass header, no header line, gap 12, five whole real cards (St. Thérèse, St. John Maximovitch, St. Teresa of Ávila, St. Benedict of Nursia "Feast Jul 11 · Orth. Mar 14", St. Pio). Credit "Sea of Galilee · Grant Barclay · CC BY 2.0" on the photo, horizontal, 11.5 px white 85 % on a local gradient, measured 6.5:1 against the rendered photo.
6. **Phone** 375×812: header 52 (compact mark, search pill, menu), photo band with credit, sheet from y 132, "Category ▾ · Feast month ▾ · Sort ▾", rows with the 24×4 stripe, 72×90 thumb (St. Thérèse thumb shows the oval only), name 19, full summary 15/1.5, hairlines, no boxes.

Mood (brand purpose, shown not told): white page, daylight photos, white mark, the human italic "the", brick + teal as the only colour, real faces first, the hopeful quote, no gold, halos, rays or textures.

"St." never breaks from the name: every "St. " in the visible text is "St.&nbsp;" (applied in the generator).

## Checklist D results
1. "St." before every saint name: pass, and non-breaking. Audited the visible text by regex; `build.st()` fixes summaries ("Padre Pio" → "St. Pio"); patron row reads "with St. Francis Xavier; France, with St. Joan of Arc".
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
- The compact mark is the stripe as a two-colour bar; at 16 px it is a 10×3 dash, readable as colour only.
- Section 5 is a true first screen (header + five whole cards, 716 tall) rather than a 180 px strip, so the St. Thérèse card shows in full.
- Galilee carries a cool multiply so the glass stays white; Assisi and Meteora have none.
- Review items not changed on purpose: the phone row stripe stays 24×4 (chair spec); tradition colour remains insider knowledge, which the quiet option accepts.
- Name-only saints (St. Bernadette Soubirous, St. Maximilian Kolbe) show only the name and the tradition given by the owner.
- The summary specimen is 56 words (the nearest sentence end to 60).
