# Saint field completeness: audit and plan

Written 2026-10-01 from the live Directus schema, the two published saints, and the 10 saved drafts.
Goal: every saint leaves the pipeline with every field filled, or marked on purpose as "not applicable".

## 1. Every field a saint can have

Source: Directus schema (`saints` and its child collections). The site reads them in `queries/getSaint.ts`.

### Fields on the saint

| Field | Type | Needed? | Notes |
|---|---|---|---|
| `name`, `slug` | text | required | |
| `summary` | text | yes | Used on cards and in search. |
| `biography` | HTML | yes | |
| `birth_year`, `death_year` | integer | yes if supportable | Null only when the year is disputed or unknown. See decision D2. |
| `birth_location`, `death_location` | text, max 255 | yes | |
| `feast_day_orthodox`, `feast_day_catholic` | date | one or both | Stored with the anchor year 2000. Null only if the church does not keep the saint. |
| `categories` | tags | yes | Allowed values are listed in `directus.md`. |
| `venerated_in` | tags | yes | `roman-catholic`, `orthodox`, or both. |
| `patron` | text | if sourced | |
| `relic_description` | HTML | yes | |
| `relic_location` | text, max 255 | yes | |
| `profile_image` | file | **yes** | Shown on the saint page, cards, the teachings page, and the miracles page. |
| `relic_image` | file | if a rights-clear image exists | |
| `other_images` | files (many) | optional | Gallery. |

### Child collections (each row points to the saint)

| Collection | Fields | Notes |
|---|---|---|
| `teachings` | `teachings` (HTML, required), `time_period` | The saint page uses the first row. |
| `miracles` | `miracles` (HTML, required), `time_period` | Same. |
| `quotes` | `text` (required), `topics`, `source` (max 255) | One row per quote. Used by the quotes page. |
| `prayers` | `prayer_title`, `prayer_slug` (unique, both required), `prayers` (list of sections), `topics`, `prayer_image` | The saint page shows the sections as novena days. |
| `books` | `title` (required), `author`, `type`, `genre`, `description`, `year`, `publisher`, `pages`, `store_link`, `amazon_book_cover`, `best_sellers_rank` | Shown on the books page. |

## 2. What the drafts actually contain (10 saints)

| Field or section | Filled | Missing |
|---|---|---|
| name, slug, summary, biography | 10/10 | none |
| birth_location, death_location, categories, venerated_in, patron, relic_description, relic_location | 10/10 | none |
| birth_year | 5/10 | Seraphim, Sergius, Nicholas, Anthony, Benedict (all left null as disputed) |
| death_year | 8/10 | Nicholas, Benedict |
| feast_day_orthodox | 5/10 | five Catholic-only saints (correct) |
| feast_day_catholic | 8/10 | Seraphim, Sergius (correct) |
| **profile_image** | **0/10** | all |
| **relic_image** | **0/10** | all |
| **other_images** | **0/10** | all |
| **prayers** | **0/10 saved** | Francis (4), Aquinas (4), Teresa (1) are in the packet but never reached Directus |
| **books** | **0/10** | all |
| teachings | 10/10 as one row | see section 4 |
| miracles | 10/10 as one row | |
| quotes | 10/10 | thin for Sergius (3) and Nicholas (2) |

For comparison, the two published saints: both have a profile image, both have one teachings row and one miracles row, neither has prayers, books, or a relic image.

## 3. Why fields are missing

1. **The draft flow cannot write images, prayers, books, or `other_images`.** Its validator accepts only the saint text fields, `profile_image`, `relic_image`, and the `miracles`, `teachings`, and `quotes` arrays. `upload.mjs` also never uploads an image file.
2. **No stage owns images.** The prompts say "do not upload unless rights are verified", so every agent stopped at "candidate". Nobody downloads, checks, and uploads one.
3. **Prayers and books are optional in the prompts**, so the agents skipped them, and the script would drop them anyway.
4. **Year fields are left null whenever a year is disputed**, even when the site would show "c. 1195" better than nothing (decision D2).

## 4. Teachings: what is wrong now (proposal, see decision D1)

What the drafts do: one row of 3,300 to 11,600 characters, with 6 to 8 themes, each with one to three block quotes. The published John Maximovitch row has 2 themes in 1,300 characters. The published Thérèse row has 6 themes in about 8,000 characters.

Problems I can see:
- The row repeats the Quotes section (same quotes, twice).
- It reads like a second biography: scenes from the life, not the teaching.
- It is long for the teachings page, which lists one row per saint across all saints.

Proposed design for every saint:
- 4 to 6 themes. Each theme is an `<h2 id>` heading and 80 to 150 words.
- Each theme states one idea the saint taught, in plain words, then one line on where it comes from.
- At most one short quote per theme, and only if it is not already in the quotes list.
- No biography scenes. Link to the biography section instead.
- Total length 600 to 1,000 words.
- Set `time_period` with the five allowed values.

## 5. Instructions: what "fully filled" means

Add one step after the check and before the save: **Stage 7, complete the record.** An entry is not ready until every item below is either done or marked `not_applicable` with a reason in `field_review`.

### 5.1 Images (required)

1. Find a portrait or icon on Wikimedia Commons or the Met Open Access collection. Open the **file page**, not the thumbnail.
2. Rights: public domain or CC0 first. CC BY and CC BY-SA only if the site can show the credit (it cannot yet, see decision D3).
3. Minimum size about 900 by 1,200, portrait. Do not upscale and do not alter.
4. Download the original. Upload it with `POST /files`.
5. Set these on the file: `title`, `description` (this becomes the alt text), and `metadata` with `attribution`, `license`, `license_url`, `source_url`, `changes`, `rights_checked` (date). The two published saints already follow this shape.
6. Put the file ID in `saint.profile_image`. Never a URL.
7. Optional: one `relic_image` (the shrine or relic) and up to 3 `other_images`.
8. If no rights-clear image exists, write the reason in `field_review.profile_image` and list the best candidate. Do not leave it empty without saying why.

### 5.2 Core fields

- **Years:** fill every year a source supports. For a disputed year, follow decision D2.
- **Feast days:** fill the principal fixed feast for each church that keeps the saint. Use the anchor year 2000. State Julian or civil in `field_review`.
- **Categories and venerated_in:** use the allowed values only.
- **Patron:** only sourced patronage, with the source in `field_review`.
- **Relic fields:** description and location are both required. If there are no relics, say so in the text and use the best-known shrine for the location.

### 5.3 Quotes

- At least 10 quotes where the sources allow it. If fewer, explain in `gaps`.
- Each has `text`, one to three `topics` from the allowed list, and a `source` of 255 characters or fewer.

### 5.4 Prayers

- Add one prayer for every saint who has an authentic prayer or a traditional prayer to them: title, unique slug, ordered sections, topics.
- The slug is `<saint-slug>-<short-name>`.
- If none exists, mark `not_applicable`.

### 5.5 Books

- Add 2 to 5 real books: the saint's own works first, then one good modern life. Fill title, author, year, publisher, type, genre. Add `store_link` and a cover only if you verified them. Never invent a link, a page count, or a rank.

### 5.6 Teachings and miracles

- Teachings follow section 4 (after the owner confirms D1).
- Miracles: one row. Keep each account's status label.

## 6. How to save the fields the draft flow cannot take

| Item | Route |
|---|---|
| Image upload | `POST /files` with the admin token, before the draft is saved. |
| `profile_image`, `relic_image` | Already accepted by the draft flow. Put the file ID in the packet. |
| `other_images` | Not accepted by the flow. Add after publish with `POST /items/saints_other_images`. |
| Prayers and books | Not accepted by the flow. Add after publish with `POST /items/prayers` and `POST /items/books`, each with `saint` set to the new saint ID. |

Alternative to avoid the second step: extend the Directus draft flow to take prayers, books, and `other_images`. That is a change to shared system configuration, so it needs the owner's decision (D4).

## 7. Plan for the 10 existing drafts

1. **Images first.** One agent per saint finds, checks, and uploads the profile image (and a relic image where one exists). Save the file IDs into each `entry.json`. About 10 minutes each, run in parallel.
2. **Core-field pass.** Script an audit of each `entry.json` against section 5.2 and list the fixes. Apply them (years, feast days) after the owner answers D2.
3. **Teachings rewrite**, after D1. One writer per saint, reading its existing teachings and quotes.
4. **Prayers and books.** One agent per saint adds them to `entry.json`.
5. **Re-save** each draft with `upload.mjs` (it updates the existing draft).
6. **After publish:** add prayers, books, and `other_images` with the REST calls in section 6.

## 8. Decisions for the owner

- **D1 Teachings design.** Confirm or change the proposal in section 4. What do you dislike most: length, repeated quotes, retold stories, or the layout?
- **D2 Disputed years.** Null (current rule), or the traditional year (for example Benedict c. 480, Anthony 1195) with "c." in the biography? The site shows the year range on cards.
- **D3 Image credits.** The site shows no visible credit line. Allow only public-domain and CC0 images, or add a credit line to the page?
- **D4 Draft flow.** Extend the Directus flow to take prayers, books, and `other_images`, or add them after publish?
- **D5 Image style.** Icons for Orthodox saints and paintings for Catholic saints, or one style for all? The design notes say ornate religious styling looks cartoonish.

## 9. Decisions and progress (2026-10-02)

Owner decisions:
- D1 Teachings: to be decided in a later conversation. Do not rewrite teachings yet.
- D2 Years: use the traditional year. Done for the 5 saints that had none (Seraphim 1754, Sergius 1314, Nicholas c. 270 to 343, Anthony 1195, Benedict 480 to 547).
- D3 Image credits: show a credit line on the site. Done in code (see below); not yet pushed.
- D4 Draft flow: extend it. Done (see below).
- D5 Image style: agent's choice. Public-domain paintings and icons chosen.

Done:
- **Draft flow extended** (live in Directus and in `scripts/directus-saint-drafts/`): it now accepts `prayers`, `books`, and `other_images`. `validate.cjs` and `plan.cjs` carry the new rules; 9 tests pass. `upload.mjs` sends them; it skips any prayer not in the Directus shape (or marked `"upload": false`) and strips extra keys.
- **Images:** `upload-images.mjs <slug>` uploads the files in `content-drafts/<slug>/images/` and writes the file IDs into `entry.json`. All 10 drafts now have a `profile_image`. Relic or gallery images were added for Padre Pio, Sergius, Nicholas, Augustine, Teresa, Aquinas, Benedict, and Francis.
- **Credit line on the site:** new `components/candle/ImageCredit`; the saint page shows a credit under the portrait, the relic image, and each gallery image. `getSaint.ts` now reads `title` and `metadata` for each image. Checked in the browser on John Maximovitch. Not pushed.

Still open:
- Prayers (real prayers or novenas) and books for every saint.
- Quotes for Sergius (3) and Nicholas (2).
- Teachings rewrite (D1).
- Push the site code, then promote the drafts to published.
