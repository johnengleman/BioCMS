# Find a Saint design system: "Light in a quiet room" (v4)

Approved direction (2026-10-22): the site should feel like stepping into a sacred space, read like a modern editorial product, and show a saint's whole life at a glance. The brief, with the Mobbin references and a mock of the saint page: https://claude.ai/artifact/SeN2VxvK3AQ1ohX9ofJ2Ze.

Sacred comes from light, stillness and inscription, never from ornament. No drawn halos, gilt frames, candle illustrations or crosses as decoration. Atmosphere comes from:

- **One light source.** Dark warm "night" surfaces with one soft candle-gold glow behind the portrait or the title (`--glow`, `night-band`). Gold is the light: a gradient, a hairline, an inscription. Never a filled button or a badge.
- **Night for presence, paper for reading.** Heroes, today's feast, quotes and the saint card sit on night. Biographies, teachings and miracle accounts stay on paper. The handoff between the two is the rhythm of a page.
- **Inscription, not labels.** Small letterspaced capitals for fact lines ("FEAST DAY · 2 JULY · ORTHODOX", the `inscription` mixin). Italic Cormorant for a saint's epithet and for quotations. Lining figures everywhere.
- **The liturgical pulse.** The saints list opens on today: the date, the saints of the day, a week strip.
- **The whole life in one screen.** Name, feast, lived, born, died, patron, venerated, relics and a six-moment timeline before any prose.
- **Stillness.** Fewer boxes and chips, more space. One slow fade of the glow on load (`--duration-slow`). Nothing lifts or floats on hover; only color changes. No glass.

The v3 "Travel" look (photo heroes, glass chips, the hover lift, the sticky facts card) is being replaced page by page. The build order is in the brief: tokens, the saint hero and fact strip, Today on the saints list, the cards, the reading pages. Until a page moves over, its v3 components stay as documented below.

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
- **Controls:** `pill`, `pill-selected`, `button-primary`, `button-dark`, `button-outline`, `link-chevron`. `glass` is v3 only and leaves with the photo heroes.
- **Surfaces:** `night-band($glow)`, `portrait-lit`, `card`, `card-hover` (ring darkens, no lift), `portrait`, `menu-panel`, `menu-item`.
- **Helpers:** `focus-ring`, `transition`.

## Components

### Site frame

- **`SiteHeader`:**
  - A frosted bar with the logo, pill navigation, "Get the app", and search.
  - With `overlay`, it floats over a photo hero with glass controls. It turns into the frosted bar once the page scrolls (`ScrollState` sets `<html data-scrolled>`).
- **`SiteFooter`:**
  - A dark footer with the **Catholic / Orthodox choice for the whole site** (`TraditionControl`), the links, and the app button.
  - Pages pass `church`. Otherwise the footer reads the cookie.
- **`Logo`, `ScrollUp`, `ShareButton`.**

### Heroes

- **`HomeHero`:** the photo hero of the list pages, with the title, the search, and glass filter chips along the bottom.
  - The photo follows the tradition: Both is the Sea of Galilee, Catholic is Assisi, Orthodox is Meteora.
  - `HeroPhoto` crossfades when the tradition changes.
  - The credit line is shown on the photo, at the bottom right.
  - `size="short"` is for the list pages.
  - `size="split"` is the saints list: a 300 px photo band with the title and a one-line subtitle at the bottom left and a one-line search at the bottom right. The header has no search icon on that page. Below the photo there is ONE filter bar, then the cards. Do not add bands.
  - `size="short"` (list pages) is about 260 px.
- **Saints filter bar (`SaintsFilterBar`):** quick pills (All, Feast today, 20th Century, Patron Saints), the chosen category or month as a dark pill with ✕ that clears it, and "More filters". That button opens one panel with every category (icon, name, count; empty ones muted) and twelve "Feast day in" month buttons. Pills wrap; nothing scrolls sideways or hides. "Sort by: Newest ⌄" is plain text on the right (`PillMenu variant="text"`) so it does not look like a filter. The tradition choice is only in the footer.
- **Feast today:** a pill in the saints filter row (`?feast=today`) with the number of saints whose feast is today in the visitor's tradition. It shows those saints in the waterfall. Hidden on days with none.
- **Copy:** keep UI text minimal. No helper text when a control explains itself (no label above the search, no "Showing … · Change" sentence).
- **`PhotoHero`:** despite its name, a calm beige banner for the simple pages (about, updates, not found).

### Saints

- **`SaintSummary`:** the dark story card.
  - It has a fixed 16:10 image, so photographs and icons look like one set.
  - Below the image: the role and country, the name, the full `summary` (written when the entry is created), and Feast, Lived, and Church.
- **`SaintsListClient`:** the masonic waterfall, with up to 4 columns and 22px gaps (14px on phones). It inserts `AppCard` as the seventh item.
  - **The waterfall stays in v4 (decided 2026-10-22).** Cards of varying height are the point: the list should feel organic, like a wall of icons, not a grid. The variation comes from the summary. Show the first two to three sentences, cut at a sentence end inside a word window (about 40 to 70 words), never mid-sentence, so each card's height follows its own text. The full summary stays on the saint page. The v4 card is portrait-first with the feast date as an inscription above the name.
- **`SaintHero`:** the top of a saint page. Always one layout (decided 2026-10-02): the profile portrait (280 px high, 220 on phones) shown whole on a beige panel (padding 32 × 40), with the name, summary and actions beside it. Other images never change the top; they appear in the Images tab and section further down.
  - The line above the name is role · place · years. One button, "Read the life", plus share. No stats bar under the hero.
- **Saint page body (2026-10-02, revised):** hierarchy and order follow the person, not the miracles: the name is always the largest element, then the story, then words and teachings, then relics and images, and miracles last as one quiet link row ("Miracles and answered prayers · N accounts"), never a large number. Type follows a Wikipedia-like scale, a step larger: hero name 48 px (phones 36), summary 17.5 px, section titles 30 px with a hairline under them, chapter rows 17 px in the reading serif in two columns, reading text 17.5 px, facts and tabs 14 px. Tabs are text with an underline at every width, without counts. The side card (300 px) sits beside every section and is sticky: feast day, born, died, patron, venerated, novenas, "Pray in the app". "Teachings and quotes" shows one quote and the teachings as a line of links. Below 1100 px the card comes before the story and drops the feast and app button, which are in the phone's bottom bar. Mockup: design-mockups/wiki-scale/hero-a2.html.
- **`StatusPill`:** the miracle labels. The kind comes from `statusKind()` in `utils/saintContent.ts`:
  - approved: wine
  - sworn at a Church process: gold
  - reported: grey

### Lists and reading pages

- **Lists:**
  - `ListPage` and `ListHero` give the short photo hero and the line "Showing … · Change".
  - `ContentList` has the collection cards, the quote waterfall, and the novena rows.
  - `FilterPills` has `tone="glass"`, counts, and icons (`CategoryIcon`).
- **Reading:**
  - `ReadingParts`: `ReadingHeader` (the saint banner), `ReadingLayout` (contents rail and phone chips), `NextCards`, and `NotesCard`.
  - `Contents` has a `rail` variant and a `chips` variant.
  - Also: `MiracleSearch`, `GroupMore`, `ReadingProgress`, and `NovenaDays`.
- **Type scale (2026-10-02):** lists, reading pages and Books use the same scale as the saint page. Page titles 40 px (phones 28), section and chapter titles 30 to 32 px with a hairline, reading text 17.5 px, quotes 20 to 21 px, card titles 30 px. Numbers are small gold labels in the UI font (12 px), never large serif figures. Cards use `--radius-lg` or `--radius-xl`, not the larger radii.
- **Hierarchy rules (2026-10-02):** helper text is one line with a "How to read this list" disclosure for the rest. Status labels are soft tints, never filled. Miracle accounts show the title, the label and two lines, and open on click (`MiracleEntries`; the full text shows without JavaScript). Quotes inside reading text are indented italic with a gold rule, not cards; "In their own words" leaves out quotes the page already quotes. Index cards (`ContentList`) are one link (the name's link covers the card), start with the saint's summary, and end with a text link, not a button.

## Contracts to keep

- **Tradition storage:** the cookie `findasaint.com` holds `{church}`, and `?church=` overrides it (`hooks/getChurch.ts`).
- **Content:** the h2 and h3 `id`s; the `Status:` and `Source:` paragraphs (`utils/saintContent.ts`).
- **Miracle search:** `#miracle-list`, `[data-group]`, and `[data-miracle]` (used by `MiracleSearch`).
- **Other ids:** `#life-text`, `#own-words`, and `#day-N`.
- **Hero photos:** they must keep their credit lines (CC BY and CC BY-SA).
