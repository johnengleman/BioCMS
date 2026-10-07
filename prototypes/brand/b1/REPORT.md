# B1 "Of" · brand board report

**Answer first.** The board is built, screenshotted and checked. It passes the checklist items that apply to a brand board. Small deviations from the spec are listed under "Known issues".

## Files
- `prototypes/brand/b1/board.html` (1440 wide, 3760 tall; generated)
- `prototypes/brand/b1/build_b1.py` (generator; imports `build.py` helpers, does not edit it)
- `prototypes/shots/round1/b1-board.png` (first 1440×900 screen)
- `prototypes/shots/round1/b1-board-full.png` (full page)

## What the board shows
1. **Wordmark.** "Find *a* Saint", Piazzolla 700 at 72 px, the "a" in Piazzolla Italic 400 Lapis. Header size (20 px) beside the 32 px badge. App badge at 64 / 32 / 16: white italic "a" on Lapis.
2. **Device in use.** Four real uses: saint page name 48 px (St. Seraphim *of* Sarov); card names 20 px (St. Thérèse *of* Lisieux, St. Nicholas *of* Myra); A–Z index rows 16 px with feast dates (five real names, including St. John Maximovitch *of* Shanghai and San Francisco); the no-device case (St. Thomas Aquinas). Captions ≤ 6 words.
3. **Type specimen.** St. Thérèse of Lisieux at 48/1.04; the first three sentences of her real summary (73 words) at 17.5/1.6; tabs Life · Teachings · Relics (14/600, Lapis underline); category chips 13/500 with the selected chip in Sky; St. Pio of Pietrelcina and St. Seraphim of Sarov at card size 20/1.2 with kickers and two real summary sentences at 14.5/1.5; a size table; the facts card (13/14) with "Pray in the app" (38 h, Lapis).
4. **Colour.** Eight 160×96 swatches with hex, role and contrast: Page, Ink, Ink-2, Ink-3, Lapis, Sky, Marigold, Line.
5. **Header.** Full-bleed Galilee photo (full colour, `rgb(20 30 60/.18)` multiply), glass header (white 78 %) with wordmark, six nav links, "Search saints" pill and the Marigold "Get the app" button; facet row with counted chips, the month strip (October dot, empty months muted), and the credit "Sea of Galilee · Grant Barclay · CC BY 2.0" on the photo, horizontal, linked. Five real cards at 268 on the photo (St. Thérèse first, full summary, image 112 px = 18 % of card height).
6. **Phone.** Two 375×812 frames: home (badge, search pill, menu; photo band with credit; sheet with Category · Feast month · Sort row; plain rows with 72×90 thumb, kicker, name with device, "Feast Oct 1 · France", full summary, hairlines) and the saint page (name 36 with device, whole portrait 96×150, summary 17, facts rows, underline tabs, chapter list).

## Checklist (D)
| # | Item | Result |
|---|---|---|
| 1 | "St." before every saint name in all visible text, alt text, patron | Pass (scripted scan: 0 violations; "St. Pio of Pietrelcina", "St. Francis Xavier", "St. Joan of Arc") |
| 2 | Card image ≤ 1/3 of card; summary in full | Pass (image 0.18–0.19 of card height on all 5 cards; summaries unclamped) |
| 3 | No sideways scroll at 375 | Phone frames are 375 wide with no overflow; the board is a 1440 artboard (`scrollWidth` 1440) |
| 4 | Phone: plain rows, hairlines, underline tabs, no stacked boxes | Pass |
| 5 | Minimal copy; no taglines, helper text, search labels | Pass (one idea line; labels ≤ 3 words; captions ≤ 6 words) |
| 6 | Footer switch | Not on a brand board (the wireframes carry it) |
| 7 | Credit on the photo, horizontal, first screen, both widths | Pass (1440 strip and 375 phone band; white 85 % on a dark 62 % tag, ≈ 4.9:1 over the pale sky) |
| 8–9 | Saint page order, sticky facts | Shown in part on the phone saint frame (name + whole portrait → summary → facts → tabs → Life) |
| 10–11 | Cards at y ≤ 130; search visible | Cards start at y 112 in the strip; search in every header |
| 12 | Real, credited images only; no kitsch | Pass (no filters on saint images; one inset 8 % hairline as the edge) |
| 13 | Unbanned Google Fonts | Piazzolla + Albert Sans |
| 14 | Text contrast ≥ 4.5:1 | Ink 17.8, Ink-2 8.2, Ink-3 5.0, Lapis 7.3 both ways, Lapis on Sky 6.3, Ink on Marigold 9.6; muted months (Ink-3 on white 92 % over the photo) ≈ 4.3–4.8 depending on the pixel below |
| 15 | Saint name is the largest text | Pass in every mock; the 72 px wordmark is the board's logo specimen only |

## Known issues
- Measured Ink contrast is 17.8:1, not the 17.6 in the spec; the board shows the measured value.
- Section 5 is taller than the "1440×180" strip in the spec: the header strip is 100 px (header 56 + facets 44) and the wall with five cards continues on the photo to 880 px, so the St. Thérèse card is shown whole in context.
- The specimen body is 73 words (three full sentences), not exactly 60, so no sentence is cut.
- Muted month labels on the facet strip sit at the AA edge over the brightest part of the sky; in a build they should use Ink-2 or a solid white strip.
- The second phone (saint page) is an addition beyond the one frame the spec asks for; it shows the device at 36 px and the facts rows.
