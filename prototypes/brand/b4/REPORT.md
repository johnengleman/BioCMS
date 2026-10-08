# B4 "Ascent" · brand board report

**Answer first.** B4 replaces the rejected B1 "Of". Its device is a rising arrow, ↗, in Azure #0E63CF. It states the owner's purpose: a life turned the other way, upward, toward daylight. It works for every saint name, because it never touches the name. It also navigates: the arrow means "opens a life". Board: `prototypes/brand/b4/board.html`. Shots: `prototypes/shots/round1/b4-board.png`, `b4-board-full.png` (1440 × 5022).

## What the board shows
1. **Wordmark** "Discover the Saints", Funnel Display 700 at 72, 32 and 20. The i-dot of "Discover" is the arrow. App badge 64 / 32 / 16: the arrow alone, white on Azure.
2. **Device** on real saints: St. Thomas Aquinas and St. Pio of Pietrelcina as full cards (no "of" in the first). Four names as text only, no images: St. Bernadette Soubirous, St. Maximilian Kolbe, St. Teresa Benedicta of the Cross, St. Joan of Arc. The 48 px page name has no arrow. "Read the full life ↗" has one. The miracles row keeps it in Ink-3. Cross-links in facts: "with St. Francis Xavier ↗". Footer with Both active.
3. **Type**: St. Thérèse of Lisieux at 48, 56 words of her summary at 17.5, two card names at 20, tabs, chips, facts, button.
4. **Palette**: 8 swatches with hex, role and contrast.
5. **Header**: a 1440 × 180 strip and a 716 px first screen on the real Galilee photo, glass header, search, "Get the app" in Lime, credit on the photo: "Sea of Galilee · Grant Barclay · CC BY 2.0". Five real cards, St. Thérèse first.
6. **Phone** 375 × 812: badge, search, photo strip with credit, filter row, three rows with the arrow after each name.

## Fonts (Google, none banned, none shared with B2 or B3)
- Funnel Display 700: wordmark 72, page name 48/1.05, card name 20/1.2 (phone 19), H2 26 at 600.
- Funnel Sans 500/600: kicker 12.5, facts 13/14, tabs 14, chips 13, meta 12.5, nav 14.
- Brygada 1918 400: body 17.5/1.6, summary 14.5/1.5 (phone 15), quote 20/1.4.

## Palette and contrast
Page #FFFFFF · Ink #141A24 (17.5:1) · Ink-2 #4B5563 (7.6:1) · Ink-3 #66707F (5.0:1) · Line #E5E8EE · **Azure #0E63CF** (5.7:1 both ways; arrow, links, tab, button) · Sky #E3F0FF (selected chip; ink 15.1:1) · Lime #D6F26F (fill only; ink 14.0:1). Azure is the complement of the ochre portraits. Lime is the one warm note and never sits near an image.

## Checklist D
1. "St." before every name, including "St. Pio of Pietrelcina" and the cross-links. Pass.
2. Card image 112 px of 268 wide; measured 0.17–0.22 of card height. Summaries in full. Pass.
3. Phone frame is 375 wide; no row scrolls sideways. Pass.
4. Phone rows with hairlines, no boxes. Pass.
5. No taglines or helper text on any UI element. Board captions are ≤ 6 words. Pass.
6. Footer switch shown, Both active. Pass.
7. Credit on the photo, horizontal, in both the strip and the phone. Pass.
12. Real credited images only; no filters, no frames, no gold. Pass.
14. All text colours ≥ 4.5:1 on white; credit is white 85 % on a 55 % ink gradient. Pass.

## Risks the owner should weigh
- ↗ is also the common "external link" sign. Here it appears only on saint names, so the meaning stays single.
- White plus blue can slide toward "sterile". The warm serif body, the full-colour photo and the Lime button hold it back.
- The device is small. Its strength comes from strict use, the wordmark and the badge, not from size.

## Build
`python3 prototypes/brand/b4/build_b4.py` writes `board.html`. Data and helpers come from `prototypes/build.py` (not edited). Screenshots: `node scratchpad/pw/proto.mjs <board.html> <prefix> 1440 900`.
