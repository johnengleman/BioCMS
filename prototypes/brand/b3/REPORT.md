# B3 "Versal": brand board report

## Files
- `board.html` (1440 × 5746), made by `build_b3.py` (imports `build.py`; `build.py` is not changed).
- Screenshots: `prototypes/shots/round1/b3-board.png` and `b3-board-full.png`.

## Owner updates applied
- The site name is **Discover the Saints** everywhere: 72 px wordmark, 28 px light and dark lockups, header strip, phone, board head, `<title>`. "the" is set 500 in ink-2, the same rule as "St." in names.
- Compact mark: a white versal "S" on Cobalt at 64 / 32 / 16.
- The device needs only a given name, so it works for every saint. Shown on names without "of": St. Thomas Aquinas (with image), St. Bernadette Soubirous and St. Maximilian Kolbe (text only; no image invented).
- Brand purpose (hopeful, daylight, curious) is shown by choices only: the sun and bright sky in the header strip, a white page, flat role colours. No copy added; no glow or rays.

## Sections
1. Wordmark.
2. The versal: all 12 saints as card heads (46 px versal, real role · years); a row of names without "of"; a six-colour role key with the real saints in each group (Martyrs: none of the 12); the active tab in the role colour; the top of a saint page (120 px versal beside the 48 px name, whole 200×312 portrait, full summary, tabs, Life H2, 6 real chapters, facts card, "Pray in the app").
3. Type specimen: 48 name, card names at 22, 75 words of the real summary at 17.5/1.6, summary 14.5, kicker, tabs, chips, buttons, links, facts.
4. Twelve 160×96 swatches with hex, role and computed contrast.
5. Header strip 180 on the real Galilee photo (search, nav, "Get the app", chips with counts, colour key once in the filter row, credit pill) and five real 268 cards, gap 16, Both-mode feast rule.
6. Two 375×812 phones: home rows with a 40 px versal; saint page with a 36 px name, 78 px versal, floated portrait, facts rows, underline tabs.

## Checklist
| Item | Result |
|---|---|
| "St." before every saint name | PASS ("St. Pio of Pietrelcina"; no "Padre Pio" or "Find a Saint" left) |
| Image ≤ 1/3 of card, summary never clamped | PASS (0.16–0.20) |
| Minimal copy | PASS (labels ≤ 3 words, captions ≤ 6) |
| Galilee for Both; credit on the photo, horizontal, first screen | PASS |
| No Miracles tab; search in every header | PASS |
| Saint images untouched (object-fit and inset hairline only) | PASS |
| Fonts: Big Shoulders Display, Libre Caslon Text, Host Grotesk (none banned) | PASS |
| Name is the largest text; no third column or colour panel | PASS, with risk below |

Contrast on white: ink 17.0, ink-2 8.9, ink-3 4.7, magenta 5.8, teal-text 5.6, moss 5.0, cobalt 6.6. Teal 4.1 and scarlet 4.9 are used only for versals (≥ 46 px, 3:1 applies). Ink on butter 11.8; white on cobalt 6.6. On the real photo: wordmark 12:1, nav 13.5–17:1, credit pill 6.2:1.

## Deliberate deviations
- **Header text is ink on a light veil**, not white on a dark gradient. The pale Galilee sky cannot carry white 14 px nav at 4.5:1 without heavy black, which made the strip muddy and works against "fresh means daylight".
- **The credit is a white pill with ink-2 text**, for the same reason.
- **The kicker is ink-2**, so role colour stays on the versal and the active tab only.

## Known risks
- **Versal size:** the 120 px versal beside the 48 px name is a taller single glyph. If the owner reads it as the largest element, 96 px keeps the idea (one number in the generator).
- **Role colours:** St. Thomas Aquinas is "Doctors" (Ink) per the chair, but St. Thérèse, St. Teresa and St. Augustine are also Doctors of the Church. The owner may want to confirm the role rules.
- **Scarlet (Martyrs)** has no saint among the 12; it is shown with St. Maximilian Kolbe as text only.
- **The phones are static frames;** sideways scroll at 375 is proven only in the wireframes.
