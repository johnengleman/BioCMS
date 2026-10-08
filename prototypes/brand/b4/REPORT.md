# B4 "Ascent" · brand board report (round 2)

**Answer first.** B4 replaces the rejected B1 "Of". After the committee review (08), the 45° arrow is gone. The device is now the **turn**: a level line that bends upward in one curve, open head, in Azure #0E63CF. It says the owner's purpose, a life that changes direction toward daylight, and nobody owns it. It works for every saint name, because it never touches the name. Board: `prototypes/brand/b4/board.html`. Shots: `prototypes/shots/round1/b4-board.png`, `b4-board-full.png` (1440 × 5185).

## Review fixes (all six)
1. **Glyph.** ↗ replaced by the turn. Wordmark: the turn is the baseline rule, level under "Discover the Saints", rising after the last letter. Badge: the turn alone, white on Azure, 64 / 32 / 16. Cards and names: no mark at rest. The mark appears on hover or focus only (name turns Azure, the turn appears) and always on "Read the full life". The board shows the hover state once (St. Pio of Pietrelcina card). The miracles row keeps a plain → in Ink-3.
2. **Facts.** St. Joan of Arc is now "Virgin · 1412–1431". Re-checked: St. Bernadette Soubirous (Nun · 1844–1879), St. Maximilian Kolbe (Franciscan friar, martyr · 1894–1941), St. Teresa Benedicta of the Cross (Carmelite nun, martyr · 1891–1942), St. Thomas Aquinas (Dominican friar · 1225–1274; feast January 28; born Roccasecca, died Fossanova), St. Pio of Pietrelcina (Capuchin friar · 1887–1968), St. Seraphim of Sarov (Hermit monk · 1754–1833), St. Thérèse facts unchanged.
3. **Cross-link demo removed.** St. Thomas Aquinas shows only his own facts. Saints named in St. Thérèse's "Patron of" row are plain Azure links, no glyph.
4. **Butter, not Lime.** "Get the app" on the Galilee header is Butter #F6D55C (ink on it 12.1:1). Lime is dropped from the palette. The month dot is Butter.
5. **Reading weight.** Card summaries are Brygada 1918 500 at 15/1.5; phone rows 15.5/1.5. Long text stays 400 at 17.5/1.6.
6. **"St." never breaks.** Every "St." is followed by a non-breaking space in names, summaries and facts (`st()` and `nb()` in the builder).

## What the board shows
1. Wordmark at 72, 32, 20 with the turn as the baseline rule; badge 64 / 32 / 16; the glyph at 72 to 14 with its stroke scale.
2. Device: St. Thomas Aquinas card at rest; St. Pio of Pietrelcina card in the hover state; four text-only names (no invented images); the 48 px page name with no mark; "Read the full life" with the turn; footer with Both active; the three-places rule.
3. Type: St. Thérèse of Lisieux at 48, 56 words of her summary at 17.5, card names at 20, tabs, chips, facts, button.
4. Palette: 8 swatches with hex, role and contrast.
5. Header: 1440 × 180 strip and a 716 px first screen on the real Galilee photo, glass header, search, Butter button, credit on the photo "Sea of Galilee · Grant Barclay · CC BY 2.0", five real cards with no mark at rest.
6. Phone 375 × 812: badge 32 is the only mark; search, photo strip with credit, filter row, three rows.

## Fonts (Google, none banned, none shared with B2 or B3)
Funnel Display 700 (wordmark 72, page name 48/1.05, card name 20/1.2, H2 26 at 600) · Funnel Sans 500/600 (kicker 12.5, facts 13/14, tabs 14, chips 13, meta 12.5, nav 14) · Brygada 1918 (body 400 17.5/1.6; summaries 500 15/1.5; quote 20/1.4).

## Palette and contrast
Page #FFFFFF · Ink #141A24 (17.5:1) · Ink-2 #4B5563 (7.6:1) · Ink-3 #66707F (5.0:1) · Line #E5E8EE · **Azure #0E63CF** (5.7:1 both ways) · Sky #E3F0FF (selected chip; ink 15.1:1) · Butter #F6D55C (fill only; ink 12.1:1).

## Checklist D
1 "St." everywhere, non-breaking, "St. Pio of Pietrelcina". 2 Card image 0.16–0.21 of card height; summaries in full. 3 No sideways scroll (scrollWidth 1440; phone frame 375). 4 Phone rows, hairlines, no boxes. 5 No taglines or helper text. 6 Footer switch, Both active. 7 Credit on the photo, horizontal, strip and phone. 12 Real credited images, no filters, no gold. 14 All text ≥ 4.5:1. 15 The name is the largest element; the turn is small.

## Risks that remain
- The turn at 20 px is an underline with a hook. It reads, but it is quiet; the badge carries the mark on small screens.
- White plus blue still needs the warm serif, the full-colour photo and the Butter fill to stay off "sterile".

## Build
`python3 prototypes/brand/b4/build_b4.py` writes `board.html`. Helpers from `prototypes/build.py` (not edited). Screenshots: `node scratchpad/pw/proto.mjs <board.html> <prefix> 1440 900`.
