# B3 "Versal": brand board report (rev 2, after review 08)

**Answer first.** The versal is now the given name's own first letter, inline, 1.5× the name's size, in one of three way-of-life colours. The board passes checklist D and the review's five fixes, with two documented deviations (ink header on a light veil; credit as a white pill), both for contrast on the real photo.

## Files
- `board.html` (1440 × 5726), made by `build_b3.py` (imports `build.py`; `build.py` is not changed).
- Screenshots: `prototypes/shots/round1/b3-board.png` and `b3-board-full.png`.

## Review fixes
1. **No doubled initial.** "St. **T**hérèse of Lisieux": the T is the versal, 1.5× the name size (cards 22 → 33; saint page 48 → 72; phone 36 → 54; phone rows 19 → 28.5). The name stays the largest element.
2. **Three ways of life** that every saint has: Monastic (monks, nuns, friars, hermits, abbots) = Magenta #C2186B; Clergy (bishops, priests without a religious vow) = Teal #0F8B8D (text #0B7476); Lay = Moss #3E7D2C. Rule: Monastic before Clergy before Lay. Of the 12: 9 Monastic, 3 Clergy (St. John Maximovitch, St. Augustine, St. Nicholas), 0 Lay. Lay is shown on St. Thomas More (text only, "Layman · 1478–1535"). "Doctors", "Martyrs" and Scarlet are removed. The key is no longer in the filter row.
3. **Card names on one line** where they fit.
4. **Facts in Host Grotesk** with tabular numerals.
5. **"St." never breaks from the name** (`St.&nbsp;`).
- "St." inside names is ink 500, so the name block has two voices (ink + versal colour).

## What the board shows
1. Wordmark "Discover the Saints" (Big Shoulders Display 800 at 72; "the" 500 ink-2). Compact mark: white "S" on Cobalt at 64/32/16. Lockups at 28 px.
2. The versal on all 12 saints; names without "of" (St. Thomas Aquinas with image; St. Bernadette Soubirous, St. Maximilian Kolbe, St. Thomas More text only); the way-of-life key; A–Z sort with letter headers; the active tab in the way colour; the saint-page top (48 px name with 72 px versal, whole portrait, full summary, tabs, Life, facts card, "Pray in the app").
3. Type specimen.
4. Ten swatches with hex, role and measured contrast.
5. Header strip on the real Galilee photo (ink wordmark on a light veil, nav, search, Cobalt "Get the app", chips with counts, credit pill) and five real cards.
6. Two 375×812 phone frames.

## Contrast
On the real photo: wordmark 12:1, nav 13.6–16.8:1, credit 5.6:1. Palette: ink 17.0, ink-2 8.9, ink-3 4.7, magenta 5.8, teal-text 5.6, moss 5.0, cobalt 6.6; teal 4.1 (versal only, ≥ 33 px bold); ink on butter 11.8; white on cobalt 6.6.

## Deviations
- **Header text is ink on a light veil**, not white on a dark gradient: the pale Galilee sky cannot carry white nav at 4.5:1 without heavy black.
- **The credit is a white pill** with ink-2 text, for the same reason.

## Known issues
- Two magenta T's can sit side by side (St. Thérèse, St. Teresa): the device marks the way of life, not the person.
- Lay has no saint among the 12.
- The phones are static frames; scroll at 375 is proven in the wireframes.
