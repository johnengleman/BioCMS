# Find a Saint design system: Candlelight

Approved direction (2026-09-30): Apple-level structure and clarity, with warmth. Mockups: `design-mockups/warm/2-*.png` and `cl-*.png`.

## Files

- `styles/variables.css`: tokens. Candlelight adds `--cream`, `--cream-card`, `--cream-deep`, `--taupe`, `--gilt`, `--shadow-card`, `--shadow-lift`, `--radius-xl`, `--font-display`, `--font-reading`, `--content-width`. It reuses `--wine`, `--ink` and the space scale.
- `styles/candle.scss`: mixins: `container`, `page-title`, `eyebrow`, `pill`, `pill-selected`, `button-primary`, `link-chevron`, `card`, `gilt-frame`, `menu-panel`, `menu-item`, `focus-ring`.
- `components/candle/`: `SiteHeader` (frosted bar, phone search and menu), `PhotoHero` (candlelight photo behind the page top; it never reaches past the hero), `TraditionControl` (segmented control), `FilterPills` (scrolling pill row), `PillMenu` (pill drop-down), `Section` (heading with an optional link), `SiteFooter`.
- List pages: `ListPage` (header, hero, list, footer), `ListHero` (title, tradition control and the filter pills that have items), `ContentList` (teachings and miracles cards, the quote wall, novena cards, "Show more" through the server actions in `app/actions.ts`), `BookCard`.
- Reading pages: `Reading/ReadingParts.tsx` (`ReadingHeader`, `ReadingLayout`, `NextCards`, `NotesCard`), `ReadingProgress`, `Contents`, `MiracleSearch`, `NovenaDays`.
- `utils/listPreview.ts` builds the teachings and miracles card text on the server, so the browser never gets the full HTML.

## Rules

- Type: Newsreader (`--font-display`) for headings, names, controls. Long reading text uses `--font-reading` (Apple's New York on Apple devices, then Newsreader). Titles are large and tight (Apple large-title proportions).
- Color: cream page, warm brown text, taupe secondary text. Wine is the only accent (selected pills, segmented control, buttons, small-caps labels). Gold appears only as the thin frame around saint images. Keep gold rare; too much gold reads as yellow.
- Shape: large soft corners (cards 20px, pills fully round), warm soft shadows, almost no borders.
- Atmosphere: one soft, blurred church-candlelight photo behind the top of each page, fading into cream. `public/images/candlelight-church.webp` is a PLACEHOLDER; replace it with a licensed photograph.
- Saints first: on list pages the saints start on the first screen.

## Status

Built (2026-10-01): every page is in Candlelight.

- Saints list, saint card and saint page.
- Each saint's reading pages: biography, miracles, teachings and novenas.
- Site-wide lists: teachings, miracles, quotes and novenas.
- Books, About, Recent updates and the "not found" page.

The older "Parchment & Wine" section below is history. The old components were removed on 2026-10-01. A backup is in `../backups/removed-old-components-2026-10-01.tar.gz` (outside `BioCMS`), which also holds the "stone" design archive. Five unused hooks, queries and utils are in `../backups/removed-dead-files-2026-10-01.tar.gz`. Four older parts are still in use: `components/page/Search` (search in `SiteHeader`), `components/saint/SaintSummary` and `components/saint/SaintsList` (the saints waterfall), and `components/global/ScrollUp`.

---

# Find a Saint design system

This guide keeps every page uniform. The values live in two files:

- `styles/variables.css`: the tokens, as CSS variables (colors, space, corners, type, shadows, motion).
- `styles/tokens.scss`: shared component styles (mixins) that use those tokens.

Use a token or a mixin for every value. Do not add new hex colors, pixel spaces or radii in a component. If a value is missing, add it to the tokens first.

## The look: "Parchment & Wine"

A warm, unified palette taken from the gilded saint cards: a parchment page, deep brown text, one primary color (wine), and gold for accents only. The painted landscape stays, with a gentle warm grade. One serif, Lora, is used throughout.

## Color

| Token | Use |
| --- | --- |
| `--parchment` | Page background |
| `--parchment-light` | Raised surfaces: chips, menus, fields, cards |
| `--parchment-deep` | Hover fills, quiet bands |
| `--wine`, `--wine-700` | The one primary color: main buttons, selected chips; hover |
| `--gold`, `--gold-light` | Rare accent: card frames and rules, selected rings, icons on wine |
| `--wine-tint` | Soft wine fill: count badges, subheader labels |
| `--ink`, `--ink-soft` | Text; secondary text |
| `--walnut` | Footer, frames, dark bars |
| `--line`, `--line-strong` | Hairlines; chip outlines |
| `--on-dark`, `--on-dark-soft` | Text on wine and walnut |

Rules:

- One primary color. Do not add violet, maroon, green or blue controls.
- Keep gold rare: card frames, rules and selected rings. Counts use `--wine-tint`, not gold. Too much gold reads as yellow.
- The page is a quiet ivory (`--parchment`), not cream.
- Text on wine or walnut uses `--on-dark`.
- `--violet` still exists for older pages that have not moved to the palette yet. Do not use it in new work.

## Space

A 4px scale: `--space-1` (4px) to `--space-16` (64px). Every margin, padding and gap uses one of these steps.

## Corners

- `--radius-sm` (6px): menu items, small inner corners.
- `--radius-md` (10px): buttons and controls.
- `--radius-lg` (14px): cards, menus, panels.
- `--radius-pill`: count badges and the sort button.

## Type

The site font is Lora (regular and italic), set in `app/layout.tsx`. Nunito is no longer used.

| Token | Size | Use |
| --- | --- | --- |
| `--text-xs` | 11px | Labels, count badges |
| `--text-sm` | 13px | Controls, secondary text |
| `--text-md` | 15px | Navigation, menus |
| `--text-lg` | 17px | Large controls, desktop navigation |
| `--text-xl` | 20px | Small headings |

Labels above a group of controls use the `label-on-dark` mixin: small, uppercase, letter-spaced. Do not use outlined text.

## Elevation

- `--shadow-sm`: resting controls.
- `--shadow-md`: selected controls, floating buttons.
- `--shadow-lg`: menus and pop-overs.

## Motion

Use `--duration` (0.18s) and `--ease` for hover and open/close changes. Animate color, background, border, shadow, opacity and transform only.

## Components (mixins in `styles/tokens.scss`)

| Mixin | What it is |
| --- | --- |
| `control-primary` | Main action: wine with cream text (presets, sort) |
| `control-primary-selected` | Selected main action: a gold ring |
| `chip` | Light parchment chip with a thin brown outline (organize, filters) |
| `chip-selected` | Selected chip: filled wine |
| `control-disabled` | A control with no results: dimmed, not clickable |
| `count-badge` | The small count inside a control (soft wine) |
| `count-badge-on-dark` | The count on a wine control (cream with wine text) |
| `label` | Small uppercase label above a group of controls |
| `menu-panel`, `menu-item` | Drop-down menus (for example, the sort menu) |
| `field` | A rounded text field |
| `focus-ring` | Keyboard focus outline, gold |
| `transition(...)` | Standard motion |

Where they are used now:

- Presets (`components/global/ButtonPreset`): `control-primary`.
- Organize and category filters (`ButttonOrganize`, `ButtonFilter`): `chip`.
- Sort (`components/global/Toggle`): `control-primary` pill with a `menu-panel` drop-down.
- Saint cards (`components/saint/SaintSummary`): the gilded card.
- Content boxes on saint pages (biography and teachings previews, relics, novenas, quotes): `--parchment-light` surface, `--line` border, `--radius-lg`, `--shadow-sm`.
- Section menu and next-page links (`components/saint/PageButton`): one style for every section, wine-tint icon tile, wine-tint active row. No per-section colors.
- Quotations in reading text: brown italic with a 2px wine bar, never colored text.

## Accessibility rules

- Every control is a real `<button>` or `<a>`, never a clickable `<div>` or `<li>`.
- Every control shows the gold focus ring for keyboard users.
- Menus: the button has `aria-expanded`; the menu closes with Escape; the arrow keys move between items.
- Text contrast: at least 4.5:1. Dim disabled controls with opacity; keep their text readable.

## Empty lists

Use the global `.emptyState` class (in `styles/globals.css`) for any list with no items: a calm sentence in a dashed, rounded box. No sad-face icons.

## Status

Every page is on the palette: the saints list, saint pages (overview, biography, miracles, teachings, novenas), the Quotes, Teachings, Miracles and Novenas lists, Books, About and Updates, plus the header, search, tradition toggle, phone menu and footer.

Not converted (not used by any page): `saint/TextSection`, `saint/ButtonAction`, `saint/ChurchSummary`, `saint/Categories` with `global/Buttons/ButtonCategory`, `global/BigLink`, and `saint/Books` (only referenced in commented-out code). Convert them if they come back into use.
