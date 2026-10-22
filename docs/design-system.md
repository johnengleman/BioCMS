# Find a Saint design system: "Light in a quiet room" (v4)

Approved direction (2026-10-22): the site should feel like stepping into a sacred space, read like a modern editorial product, and show a saint's whole life at a glance. The brief, with the Mobbin references and a mock of the saint page: https://claude.ai/artifact/SeN2VxvK3AQ1ohX9ofJ2Ze.

Sacred comes from light, stillness and inscription, never from ornament. No drawn halos, gilt frames, candle illustrations or crosses as decoration. Atmosphere comes from:

- **One light source.** Dark warm "night" surfaces with one soft candle-gold glow behind the portrait or the title (`--glow`, `night-band`). Gold is the light: a gradient, a hairline, an inscription. Never a filled button or a badge.
- **Night for presence, paper for reading.** Heroes, today's feast, quotes and the saint card sit on night. Biographies, teachings and miracle accounts stay on paper. The handoff between the two is the rhythm of a page.
- **Inscription, not labels.** Small letterspaced capitals for fact lines ("FEAST DAY · 2 JULY · ORTHODOX", the `inscription` mixin). Italic Cormorant for a saint's epithet and for quotations. Lining figures everywhere.
- **The liturgical pulse.** The saints list opens on today: the date, the saints of the day, a week strip.
- **The whole life in one screen.** Name, feast, lived, born, died, patron, venerated, relics and a six-moment timeline before any prose.
- **Stillness.** Fewer boxes and chips, more space. One slow fade of the glow on load (`--duration-slow`). Nothing lifts or floats on hover; only color changes. No glass.

The v3 "Travel" look (photo heroes, glass chips, the hover lift, the sticky facts card) was replaced on every page on 2026-10-22, in the order the brief set: tokens, the saint hero and fact strip, Today on the saints list, the cards, the reading pages.

The v3 mockups are in `design-mockups/airbnb/`. The history of the v3 decisions is in `docs/redesign-plan.md`.

## Files

- `styles/variables.css`: every token, as CSS variables.
- `styles/candle.scss`: the shared mixins. The file kept its old name so that existing `@use` lines keep working.
- `styles/globals.css`: the reset, page defaults (background, Manrope, lining numerals), `[hidden]`, `.visually-hidden`, and `.emptyState`.
- `utils/site.ts`: `APP_URL`, the tradition labels, and the hero photos with their credits.

Use a token or a mixin for every value. Do not add new hex colors, spaces, or radii in a component. If a value is missing, add it to the tokens first.

## Color

| Token | Use |
| --- | --- |
| `--bg` | The page: warm paper. Never pure white. |
| `--surface` | Cards, search, menus, the side card |
| `--panel` | The beige panel behind a whole portrait or a page banner |
| `--muted` | Chips, hover fills, quiet bands |
| `--hairline`, `--line-soft` | Lines; the inset ring on cards |
| `--ink`, `--ink-2`, `--ink-3` | Text; secondary text; labels and captions |
| `--reading-ink` | Long reading text |
| `--wine`, `--wine-hover`, `--wine-tint` | The one action color: buttons, the active item, the "approved" label |
| `--gold`, `--gold-soft`, `--gold-tint` | Small details only: chapter numbers, quote marks, the "sworn" label |
| `--espresso`, `--espresso-2` | Dark buttons, the active tab, the footer |
| `--on-dark`, `--on-dark-2`, `--on-dark-3` | Text on wine, espresso, and photos |
| `--card-dark*` | The dark saint story cards (v3; night replaces them) |
| `--night`, `--night-2`, `--night-line` | The sacred surfaces: heroes, today, quotes, the saint card; cards and sheets on night; hairlines on night |
| `--on-night`, `--on-night-2`, `--on-night-3` | Text on night |
| `--candle`, `--candle-soft` | The light on night: glow stops, inscriptions, timeline ticks, italic epithets. Too light for small text on paper; use `--gold` there |
| `--glow`, `--glow-top` | The one soft light behind a portrait (left) or a title (top) |

Ink is for reading. Wine is for actions. Candle gold is the light on night; `--gold` stays for small details on paper.

## Type

| Font | Token | Use |
| --- | --- | --- |
| Cormorant Garamond | `--font-title` | Titles, names, numbers in titles, quotations |
| Newsreader | `--font-reading` | Long reading text: summaries, biographies, teachings, miracle accounts |
| Manrope | `--font-ui` | Everything else: menus, buttons, labels, facts |

- Cormorant Garamond uses old-style numbers by default, so "1" looks like "I". The `title` mixin and the page defaults set `font-feature-settings: 'lnum'`.
- Do not use the CSS `font` shorthand in components. It resets `font-feature-settings`.
- The fonts load through `next/font/google` in `app/layout.tsx`.

## Shape and depth

- Corners: 8, 12, 16, 20, 24, and 28px (`--radius-sm` to `--radius-3xl`). Pills are fully round.
- Cards have a soft warm shadow (`--shadow-card`) and an inset hairline (`--line-soft`), not a border. On hover they lift 3px (`--shadow-hover`).
- **Phones:** do not stack bordered boxes. Use plain rows with thin lines, underline tabs, and sideways scrolling.

## Mixins (`styles/candle.scss`)

- **Layout:** `container`.
- **Type:** `title($size, $weight)`, `page-title`, `reading($size)`, `eyebrow`, `inscription($color)`, `lining`.
- **Controls:** `pill`, `pill-selected`, `button-primary`, `button-dark`, `button-outline`, `link-chevron`.
- **Surfaces:** `night-band($glow)`, `portrait-lit`, `card`, `card-hover` (ring darkens, no lift), `portrait`, `menu-panel`, `menu-item`.
- **Helpers:** `focus-ring`, `transition`.

## Components

### Site frame

- **`SiteHeader`:** a frosted paper bar with the logo, text links (an underline under the current page), a quiet outline "Get the app" button, and the search and menu buttons. It never floats over a band.
- **`SiteFooter`:** the night footer with the **Catholic / Orthodox choice for the whole site** (`TraditionControl` tone "dark": three words on one hairline, the chosen one with a candle rule), the links, and the app button.
- **`Logo`, `ScrollUp`, `ShareButton`.**

### Night bands (the sacred surfaces)

- **`TodayBand`:** the top of the saints list. The date in large serif ("22 October"), the tagline, the search, a strip of the coming week with the number of feasts per day (choosing a day shows its saints), and the saints of the chosen day as small portrait rows. The static page shows the day it was built; the browser switches to the visitor's date and tradition. Its data is `getTodaysFeast` (yesterday to eight days ahead).
- **`NightHero`:** the top of the other list pages and Books: title, one line, filters (`FilterPills` tone "night").
- **`SaintHero`:** the top of a saint page. The portrait lit from above (`portrait-lit`), the inscription line (feast · tradition · years), the name with its "of …" epithet in italic (`splitSaintName`), the summary, one candle-gold button ("Read the life · 18 chapters") and quiet outline buttons. Under it the **fact strip** (feast when the calendars differ, born, died, patron, relics, "on this site" counts) and **the life in moments**: six chapters spread across the biography with roman numerals, linking to their anchors. A dated key-moments field can replace the chapter sampling later.
- **`ReadingHeader`:** the night banner of the reading pages: the portrait, dimmed and blurred, behind the page kind in candle gold, the name, and one line of figures ("18 chapters · 24 min read · 10 sources").
- **`PhotoHero`:** despite its name, a calm beige banner for the simple pages (about, updates, not found).

### Saints

- **`SaintSummary`:** the night card in the waterfall. A 3:4 portrait (4:3 on phones), the feast day in candle gold above the name, one line of years, role and place, and `cardSummary()` (two or three sentences inside a 40 to 70 word window). Hairline only; on hover the hairline lights.
- **`SaintsListClient`:** the masonic waterfall, with up to 4 columns and 22px gaps (14px on phones). It inserts `AppCard` as the seventh item.
  - **The waterfall stays in v4 (decided 2026-10-22).** Cards of varying height are the point: the list should feel organic, like a wall of icons, not a grid. The variation comes from the summary length. The full summary stays on the saint page.
- **`SaintsFilterBar`:** one row of text links (All, Feast today, 20th Century, Patron Saints, the chosen category or month with ✕), counts as small gold figures, an underline on the chosen one, and "More", which opens the panel with every category and the twelve months. "Sort by: Newest ⌄" is plain text on the right. The tradition choice is only in the footer.
- **Saint page body:** after the night panel, paper. A contents rail on the left (`Contents`, roman numerals, a gold rule beside the section being read; underline tabs on phones), then the story (chapter rows with roman numerals, two columns), the first quotation set large between gold hairlines with the saint's name as its inscription, prayers, teachings, relics, images on night, and miracles last as one quiet row. No side card: the facts are in the strip. The phone's bottom bar keeps the feast day and the app button.
- **`StatusPill`:** the miracle labels. The kind comes from `statusKind()` in `utils/saintContent.ts`: approved wine, sworn gold, reported grey.

### Lists and reading pages

- **Lists:** `ListPage` and `ListHero` give the night band with the filters. `ContentList` has the collection cards (paper, a hairline on hover), the quote wall (night cards with a candle quotation mark and the saint's name as an inscription), and the novena rows.
- **Reading:** `ReadingParts`: `ReadingHeader` (night banner), `ReadingLayout` (contents rail and phone tabs), `NextCards` (quiet rows), `NotesCard` (under a rule). Chapter openers: a gold roman numeral with a hairline, the title at 40px, a wine drop cap on the opening.
- **Type scale:** page and saint names 40 to 60px (phones 28 to 36), section titles 32px with a hairline, chapter titles 40px, reading text 17.5px, quotations 22 to 30px in italic Cormorant, inscriptions 11 to 12px Manrope capitals with 0.16em tracking. Numbers in the interface are small gold figures or roman numerals, never large sans figures.

## Contracts to keep

- **Tradition storage:** the cookie `findasaint.com` holds `{church}`, and `?church=` overrides it (`hooks/getChurch.ts`).
- **Content:** the h2 and h3 `id`s; the `Status:` and `Source:` paragraphs (`utils/saintContent.ts`).
- **Miracle search:** `#miracle-list`, `[data-group]`, and `[data-miracle]` (used by `MiracleSearch`).
- **Other ids:** `#life-text`, `#own-words`, and `#day-N`.
- **Hero photos:** they must keep their credit lines (CC BY and CC BY-SA).
