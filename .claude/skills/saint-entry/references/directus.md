# Find a Saint: content mapping

This is a recovery-schema baseline inspected on 2026-09-01, not a claim that the live schema never changes.

- Frontend checkout: `/Users/nicholas/Desktop/saints-website/BioCMS`.
- CMS: `https://directus-production-2664.up.railway.app`.
- Public site: `https://www.findasaint.com`.
- Permanent recovery source: [saints-server bootstrap](https://github.com/johnengleman/saints-server/blob/main/scripts/bootstrap-content-model.mjs) and [schema snapshot](https://github.com/johnengleman/saints-server/blob/main/snapshots/saints-schema.yaml).
- Local mapping evidence: `queries/getSaint.ts`, `queries/getSayings.ts`, `utils/properties.js`, and the saint presentation components. If the checkout is unavailable, inspect the live schema instead of guessing.

Versioning was enabled for `saints`; do not assume it is enabled for its children. There is no editorial `status` column in this baseline. Current public permissions include child content and files. Draft is a version, not a privacy guarantee for every separately created object. Consult [Directus content versioning](https://directus.com/docs/guides/content/content-versioning) and the current UI/API before writes. A new draft may not yet have a regular saint item ID; do not publish it just to create relationships.

## Saint fields

| Field | Stored shape | Editorial rule |
| --- | --- | --- |
| `name` | Required string | Distinct, recognizable saint name; include a disambiguating place/title when necessary. |
| `slug` | Required unique string | Stable lowercase hyphenated slug. Exact-match check before create; do not rely on the frontend's substring lookup for deduplication. |
| `summary` | Text | Short standalone original introduction, normally plain text. |
| `biography` | Rich HTML | Chronological, sectioned life with linked sources and clearly attributed traditions. |
| `birth_year`, `death_year` | Nullable integers | Only precise supported years fit honestly. For “circa,” century-only, disputed, or unsupported dates, leave null and give the qualified chronology in prose. Do not store zero or invent a birth year from a supposed age. |
| `birth_location`, `death_location` | Nullable strings | Supported historical location; optionally explain its modern equivalent. |
| `feast_day_orthodox`, `feast_day_catholic` | Nullable ISO dates (`YYYY-MM-DD`) | The schema requires a year although the content is usually an annual month/day. Follow the established live convention; if none exists, use 2000 as a documented storage-only anchor year, never as an event date. See calendar limits below. |
| `categories` | CSV-special field, normally array of strings through Directus | Use existing site vocabulary below and verify the current API representation. |
| `venerated_in` | CSV-special field | Allowed values: `roman-catholic`, `orthodox`. Select only traditions independently supported for this person. |
| `patron` | Nullable text | Specific sourced patronage, not inference from occupation or a modern inspirational association. |
| `profile_image` | File UUID relation | Approved portrait/icon uploaded to Directus; never a remote URL in this field. |
| `other_images` | Many-to-many file relation | Junction is `saints_other_images` with `saints_id` and `directus_files_id`. |
| `relic_description` | Nullable rich HTML | What is reported to survive and relevant provenance/uncertainty. |
| `relic_location` | Nullable string | Verify the current shrine/institution and distinguish major relics from distributed fragments. |
| `relic_image` | Nullable file UUID | Actual relic/shrine image with verified identity and reusable rights. |
| `books`, `quotes`, `miracles`, `teachings`, `prayers` | One-to-many aliases | Child records reference their parent through `saint`. These are not text fields on the saint. |
| `id`, `date_created`, `date_updated` | System-managed | Do not invent identifiers or timestamps. |

### Existing vocabulary

Categories: `Ascetics`, `Bishops`, `Confessors`, `Converts`, `Fathers_of_the_Church`, `Fools_for_Christ`, `Hermits`, `Holy_Women`, `Married`, `Martyrs`, `Miracle_Workers`, `Missionaries`, `Monastics`, `Mothers`, `Nuns`, `Warriors`. The current frontend also searches for the literal tag `Patron Saints`; use it only alongside sourced patronage. Do not send prettier labels or add taxonomy terms that the current filters cannot handle.

Teaching/miracle periods: `apostolic_era`, `patristic_age`, `medieval_period`, `renaissance`, `modern_era`. Use existing editorial precedent for boundary cases; the frontend labels do not define exact year ranges. Do not treat Renaissance as a universal period of Orthodox history.

Prayer topics: `healing`, `family`, `finance`, `peace`, `guidance`, `protection`, `hope`, `grief`, `love`, `strength`, `wisdom`, `forgiveness`.

Quote topics additionally include `faith`, `charity`, `suffering`, `humility`, `joy`, `patience`, `courage`, `gratitude`, `justice`, `truth`, `mercy`, `devotion`, `unity`, `passions`, `mary`, `saints`, `sin`. Check the exact current list in `utils/properties.js` rather than treating this combined description as a new vocabulary.

### Calendar limits

Each church has room for only one feast date. Use the principal fixed commemoration in the cited church's calendar, and explain additional/local feasts in the biography. Preserve the source's liturgical calendar date; record Julian/Revised Julian/Gregorian context separately. Do not automatically add 13 days or overwrite a Catholic date with an Orthodox observance. For movable feasts, do not encode this year's occurrence as a fixed annual day—leave the scalar date null and explain the observance.

The frontend currently parses date-only strings with JavaScript `Date` and local date getters. If the displayed day shifts in a particular timezone, flag the display issue; do not corrupt the stored feast date to compensate. Correcting that component is outside this content skill.

## Related records

All five child collections have a `saint` integer foreign key. Handle draft relationship edits through the parent version where possible. The shapes below describe fields, not permission to directly POST published child rows.

| Collection | Content fields | Guidelines |
| --- | --- | --- |
| `miracles` | Required `miracles` HTML; `time_period` tag array | Prefer one curated record per saint, organized into sourced accounts under H2 headings. The saint detail query/view uses the first record. Leave empty when nothing supportable is found. |
| `teachings` | Required `teachings` HTML; `time_period` tag array | Prefer one coherent record per saint, organized by supported themes and sources, not one row per paragraph. The saint detail view uses the first record. |
| `quotes` | Required `text`; `topics` tag array; optional `source` string | Each short authentic quotation is a record. Put author/work/chapter and a direct link in `source` where it fits. `author` in the frontend is an alias for the `saint` relation, not a child field. |
| `prayers` | Required `prayer_title`, unique `prayer_slug`; `prayers` JSON; `topics`; `prayer_image` file UUID | JSON is an ordered array of objects with `prayer_section` HTML. Include actual sections of an authentic, reusable prayer/novena, not invented days. The current saint view labels these sections as novena days: retain incompatible liturgical material in the packet instead of misrepresenting it to fit the UI. |
| `books` | Required `title`; `author`, `store_link`, `pages`, `type`, `description`, `amazon_book_cover`, `genre`, `best_sellers_rank`, `year`, `publisher` | Optional enrichment, only if genuinely supported. Do not invent editions, purchase links, page counts, prices, or rankings. Book `author` is a real text field, unlike the quote query alias. |

Use ordinary sanitized HTML: paragraphs, H2/H3 headings, lists, emphasis, and HTTPS citation links. No page-wide H1, scripts, styles, event handlers, or copied site chrome. Give content headings stable IDs when appropriate for the existing table of contents.

The baseline has no general `sources`, `confidence`, or `image_license` collection field. Preserve evidence in the packet and include reader-facing citations in existing rich-text sections. Do not create new CMS fields implicitly.

## Images and readback

Upload to the existing Directus File Library/storage destination, then use its returned UUID. `profile-image1` produces a 900 × 1,200 crop; `summary`, `search`, and `other-images1` are existing presets. Check the subject still reads well in portrait and thumbnail crops.

File `description` is used for alt text in the frontend. Write an accurate description such as an icon's subject and medium, not an unsupported claim that it is a portrait from life. Keep licensing/provenance in supported file metadata and the packet; comply with visible attribution requirements described in the source guide.

After saving, verify selected version, core text, tags, feast dates, file ID, and each linked collection. Keep new records' IDs/version IDs in the packet. If publishing was requested, also check the public saint page, image URL/preset, and relevant child links. CMS save success alone does not prove that every frontend section renders.

## Minimal review packet

Use one `entry.json` plus concise research notes per saint in the user's chosen output folder, or a task-local `content-drafts/<slug>/` folder when working in the frontend checkout. Do not commit or push packets unless asked. This is an editorial envelope, **not** a raw Directus create payload:

```json
{
  "identity": { "requested_name": "", "resolved_name": "", "aliases": [] },
  "saint": {},
  "related": { "miracles": [], "teachings": [], "quotes": [], "prayers": [], "books": [] },
  "images": [],
  "sources": [],
  "gaps": [],
  "field_review": {},
  "save_result": { "state": "prepared", "item_id": null, "version_id": null, "cms_url": null }
}
```

Populate `saint` with the mapped fields, not the envelope keys. For each source, record its URL/title, institution or author, access date, evidence type, and supported fields/claims. For each image, record source/rights pages, artist, license, attribution, local file if downloaded, and Directus UUID only after upload. In `field_review`, mark each researched field or relation `supported`, `traditional`, `unknown`, `not_applicable`, or `blocked`, with a brief reason for gaps. Keep the packet's prepared/uploaded/published state truthful and do not put credentials in it.
