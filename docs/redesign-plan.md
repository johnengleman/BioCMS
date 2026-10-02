# Redesign plan: "Travel" look (v3)

Goal: rebuild the site in the v3 mockup style. The style is calm and modern, like a top travel site, with the warm app palette.

The mockups are in `design-mockups/airbnb/`. Start the `airbnb-mockup` server in `.claude/launch.json` to view them.

| Page | Mockup |
|---|---|
| Home (`/saints`) | `index.html` |
| Saint overview | `saint.html` (use `?photos=1`, `2`, `3`, or `5` for the photo layouts) |
| Miracles list (`/miracles`) | `miracles.html` |
| A saint's miracles | `saint-miracles.html` |
| A saint's teachings | `saint-teachings.html` |

## Decisions

- **Look:** Airbnb structure, with parts from the user's Dribbble references:
  - Propel: bordered cards, filter chips with counts.
  - The travel app: title on the photo, round glass buttons, pill tabs.
  - Indotravi: the photo hero, the stats bar that overlaps the photo.
  - The Books: the beige panel with a whole, uncropped portrait.
- **No church atmosphere.** No candles, halos, or ornament.
- **Palette:** the prayer app palette, made warmer.
  - Page `#F8F3EB`, cards `#FFFCF7`, panel `#EFE6D8`.
  - Ink `#2F2622`, secondary text `#6F6055`.
  - Wine `#8C3D47` is the only action color.
  - Gold `#A97E3E` and `#C9A66B` are for small details only.
  - Espresso `#2A2220` is for dark buttons and dark cards.
- **Fonts:**
  - Cormorant Garamond for titles and quotations.
  - Newsreader (a reading serif, already in the code base) for long reading text: card stories, biographies, teachings, miracle accounts, and intros.
  - Manrope for interface text: menus, buttons, labels, and numbers.
  - Cormorant needs `font-feature-settings: "lnum"`, or "1" looks like "I". The CSS `font` shorthand resets this setting, so set it last.
- **The tradition switch is in the footer on every page.**
  - It reads "Show saints from: Both traditions / Catholic / Orthodox".
  - The choice applies to the whole site.
  - The list pages show a small line, "Showing Catholic saints · Change", that links to the footer.
- **The hero photo follows the tradition choice:**
  - Both: Sea of Galilee.
  - Catholic: Assisi.
  - Orthodox: Meteora.
  - The photo crossfades when the choice changes.
  - Each photo shows its credit line, because CC BY and CC BY-SA require one.
- **Saint cards on the home page:**
  - A fixed 16:10 image at the top. The image is about a quarter of the card.
  - Then a short line with the role and place, the name, the saint's `summary` field, and three facts: Feast, Lived, Church.
  - The `summary` is written when the saint entry is created. The pipeline rule is 70–120 words (`docs/saint-entry-prompts/04-write-biography.md:116`).
  - The cards have a dark espresso background. The app card is cream, so it stands out.
- **Saint page photo layouts:**
  - 1 photo: the portrait is shown whole on a beige panel, with the title beside it.
  - 2 or 3 photos: a large photo plus 1 or 2 beside it.
  - 5 or more photos: a large photo plus 4 small ones.
  - On phones, there is one full-width photo, except in the 1-photo layout.
- **Phones:** no stacks of bordered boxes. Use plain rows with thin lines, underline tabs, and sideways scroll.

## Keep these (do not break)

- **URLs and query parameters** are part of SEO:
  - `/saints/<slug>/{biography,miracles,teachings,novenas/<id>}`
  - `?filter=`, `?preset=`, `?sort=`, `?church=`
- **Tradition storage:**
  - The cookie `findasaint.com` holds `{church}`, and `?church=` overrides it.
  - `hooks/getChurch.ts` reads both on the server.
  - The hero must render the right photo on the server, with no flash.
- **Content contract** in `utils/saintContent.ts`:
  - h2 and h3 `id`s.
  - The `Status:` and `Source:` paragraphs.
  - `#miracle-list`, `data-group`, `data-miracle` (used by `MiracleSearch`).
  - `#life-text`, `#own-words`, `#day-N`.
- **Other:**
  - JSON-LD and metadata in `utils/saintMetadata.ts`.
  - `next-sitemap`, GA4, and the header search (Fuse.js).
  - The ARIA roles that exist now.
- **Browser code:** it must not call Directus. "Load more" stays on server actions.

## Phases

Each phase ends with these checks:
- `npm run lint`
- a desktop and a phone check in the dev server
- screenshots for the user

Each phase is one commit on a branch `redesign-travel`, not on `main`.

### Phase 0 — Foundations

1. **Fonts in `app/layout.tsx`:** replace Lora and Newsreader with Cormorant Garamond (500–700) and Manrope (400–800) through `next/font/google`.
2. **Tokens in `styles/variables.css`:** add the v3 tokens:
   - colors, the card shadows, radii (16, 20, 24, 28), `--ease`
   - `--header-h: 68px`, so the 64px values hard-coded in 3 places can use it
   - Remove legacy tokens only in Phase 5.
3. **Mixins in `styles/candle.scss`:** update `card`, `pill`, `eyebrow`, `button-primary`, and `page-title` to the v3 look. Add `glass`, `chip`, and `stat`.
4. **`SiteHeader`:**
   - a pill nav, the dark "Get the app" button, and a search button
   - a `variant="hero"` with glass styling, for use on the photo
   - the compact header that slides in after the hero
5. **`SiteFooter`:**
   - a dark footer with link columns and the app button
   - the `TraditionControl` ("Show saints from"), which writes the same cookie and `?church=` as now
   - the hero photo credit line

### Phase 1 — Home (`/saints`)

1. **New `HomeHero` (replaces `PhotoHero` on `/saints`):**
   - photo, title, line under the title, search bar, glass filter chips
   - no tradition switch on the hero, because the switch is in the footer
2. **Hero photos:**
   - Put licensed copies in `public/images/hero/{galilee,assisi,meteora}.webp`, about 2400px wide, with credits in one config file.
   - The server picks the photo from `getChurch()`. The client crossfades on change.
3. **`FilterPills`:** add a glass variant with counts. Keep the `<Link>` hrefs.
4. **Results bar:** the count, the line "Showing … · Change", and the sort menu (the `PillMenu` restyled).
5. **`SaintSummary` becomes a dark story card:**
   - the fixed-crop image, the role and place line, the name, the full `summary`, and the facts row
   - The image focus point comes from Directus image metadata if it exists. If it does not, use center 20%.
6. **`SaintsListClient`:**
   - `masonic` with 4 columns from 1240px, 3 from 960px, 2 from 640px, and 1 below
   - gaps of 22px on desktop and 14px on phones
   - The app card is inserted at position 7.

### Phase 2 — Saint overview (`/saints/[slug]`)

1. **Photo hero:**
   - It chooses the layout from `profile_image` plus `other_images` (1, 2, 3, or 5+).
   - Use the 1-photo panel when there is only one image.
2. **Stats bar** over the photo: feast day, lifetime, miracles, and sources. These are the "At a glance" figures that exist now.
3. **Tabs:** Life, Miracles, Prayers, Teachings, Quotes, Relics. They link to the subpages or to anchors.
4. **Side card:**
   - the feast day (with "Today" when it is today)
   - prayers from `prayers`
   - "Pray in the app"
   - patron, canonized, relics
   - On phones, it becomes a bar at the bottom of the screen.
5. **Sections:**
   - highlights as icon rows
   - "Her story"
   - a timeline (only if the data exists)
   - miracles as an editorial list, with status pills
   - places as photo cards (from `other_images` with a place caption)
   - related saints as story cards
   - Keep JSON-LD and ImageCredit.

### Phase 3 — Reading pages (biography, miracles, teachings, novenas)

1. **`ReadingHeader` becomes a saint banner:** a beige panel, the portrait, the "The miracles of" line, the name, the numbers, and the "Her life" and Share buttons.
2. **`ReadingLayout`:**
   - a contents rail with numbers, counts, a progress bar, and scroll-spy (reuse `Contents`)
   - On phones, a sticky chip bar replaces the `<details>` menu.
3. **Miracles:**
   - The "How to read this list" note.
   - A search field (keep `MiracleSearch`).
   - Group headers with counts.
   - Show 6 accounts in each group, then "Show all N".
   - Three status kinds:
     - approved: wine
     - sworn at a Church process: gold
     - reported: neutral
   - A label legend in the rail.
   - The key to the sources in two columns.
   - Status rules go in one helper in `utils/saintContent.ts`. Remove the duplicate test in `page.tsx:84-88`.
4. **Teachings:** a drop-cap lead, numbered chapters (01, 02 …), quotation cards with copy and share buttons, and a gold rule on phones.
5. **Biography and novenas:** the same banner, rail, and type.

### Phase 4 — List and other pages

1. **`ListHero`:** a short photo hero with the search and the filter chips. It follows the tradition photo rule. Remove `TraditionControl` from `ListHero`, `/saints`, and `/books`.
2. **`/miracles`:** collection cards. Each has a whole portrait on a beige panel, the counts, the intro, the first 4 accounts, the group chips, and a "Read all" link.
3. **`/teachings`, `/quotes`, `/novenas`:** the same cards and chips, adapted to each content type.
4. **`/books`, `/about`, `/updates`, 404:** move them to the new hero, cards, and type.

### Phase 5 — Cleanup and handover

- **Delete dead code:**
  - SCSS modules without importers
  - legacy tokens
  - `.my-masonry-grid*`
  - `SiteContext`
  - the unused `public/*.webp` files
  - `churchBackground()`
- **Docs:** rewrite `docs/design-system.md` for v3.
- **Sitemap:** fix the broken `/prayers/<slug>` URLs in `next-sitemap.config.js`. They point to a route that does not exist.
- **Final check:** test every route at 390px, 768px, and 1440px. Run `npm run build`. Then the user reviews.

## Answered by the user (2026-10-01)

- **Cards:** dark.
- **Long reading text:** a serif (Newsreader).
- **Tradition switch:** in the footer on every page.
- **Card text:** the `summary` field, written when the saint entry is created.

## Still open

- **Branch:** build on `redesign-travel` and merge when the user approves?
