# Find a Saint design system: "Travel" (v3)

Approved direction (2026-10-01): calm, professional, and modern, like a top travel site, with Apple-style clarity. Airbnb gives the structure. The user's other examples add detail: Propel (cards, filter chips with counts), a travel app (title on the photo, glass buttons), Indotravi (photo hero, stats bar), and The Books (beige panel, whole portrait). The palette is the prayer app's palette, made warmer.

There is no church atmosphere: no candles, halos, gilt frames, or ornament.

The mockups are in `design-mockups/airbnb/`. The build plan and the history of the decisions are in `docs/redesign-plan.md`.

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
| `--card-dark*` | The dark saint story cards |

Ink is for reading. Wine is for actions. Gold is for small details. Keep gold rare.

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
- **Type:** `title($size, $weight)`, `page-title`, `reading($size)`, `eyebrow`, `lining`.
- **Controls:** `pill`, `pill-selected`, `glass` (on a photo), `button-primary`, `button-dark`, `button-outline`, `link-chevron`.
- **Surfaces:** `card`, `card-hover`, `portrait`, `menu-panel`, `menu-item`.
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

## Contracts to keep

- **Tradition storage:** the cookie `findasaint.com` holds `{church}`, and `?church=` overrides it (`hooks/getChurch.ts`).
- **Content:** the h2 and h3 `id`s; the `Status:` and `Source:` paragraphs (`utils/saintContent.ts`).
- **Miracle search:** `#miracle-list`, `[data-group]`, and `[data-miracle]` (used by `MiracleSearch`).
- **Other ids:** `#life-text`, `#own-words`, and `#day-N`.
- **Hero photos:** they must keep their credit lines (CC BY and CC BY-SA).
