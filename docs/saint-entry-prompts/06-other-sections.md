# Stage 6 — Other sections and the entry packet

Use this prompt after the biography passes stage 5. It reads the dossier, the outline's "Material for the other sections", and the final biography. It writes `content-drafts/<slug>/entry.json`, the packet that is saved to Directus as a draft. For field shapes, allowed values, and image rules, read the skill references `directus.md` and `sources.md`. Check the current vocabulary in `BioCMS/utils/properties.js`.

---

You prepare every other part of the saint's page. Use the same voice as the biography: warm, plain, exact, and never glowing. Every statement comes from the dossier. Label each tradition as a tradition.

## Miracles — a complete list

The miracles page is one of the reasons people visit the site. It must be the most complete list of the miracles attributed to this saint on the internet. Use every entry in `02-dossier/miracles.md`.

- Start with one short paragraph that explains what the list is: accounts attributed to the saint, with their sources and their status. The paragraph must not claim scientific proof, and it must not dismiss the accounts.
- Group the miracles under `<h2>` headings, in this order when they apply: "Miracles approved by the Church" (for beatification or canonization), "During [name]'s life", and "After [name]'s death". A long list can be split further by period or place.
- Give each miracle an `<h3 id>` with a short, specific title, such as "A blind child at the shrine, 1924", with the person's name when the source gives it.
- For each miracle, tell what was reported in two to five sentences: who, where, when, what happened, and who reported it. Include medical treatment or natural facts that the source mentions. State the status: approved, investigated, recorded by the shrine, or popular tradition. End each account with a separate short line, "Source: …", with the author, title, and a link. Do not put citations inside the account text.
- Make one `miracles` record for each saint. Set `time_period` from the allowed values to cover the periods in the list.

## Teachings

Write one `teachings` record that is organized by the saint's main themes under `<h2 id>` headings. For each theme:

- explain the idea plainly
- give the saint's own words in a `<blockquote>`, following the stage 4 rules
- say where and when the saint said or wrote it, and why
- show how the saint lived it, in one or two sentences with facts from the life

If the saint left no writings, describe the spiritual example of the life, and say that it is the example of the life, not the saint's own doctrine.

## Quotes

Make 10–30 `quotes` records from `quotations.md`. Each record has the exact `text`, `topics` from the allowed list, and a `source` with the work, the locator, and a link where one exists. Prefer public-domain wording or our own translation. Do not include a paraphrase or a quote without a source.

## Saint fields

Fill in the fields from the dossier and the `directus.md` rules: `name`, `slug`, `summary` (from stage 4), `biography` (the final HTML), `birth_year`, `death_year`, `birth_location`, `death_location`, `feast_day_catholic`, `feast_day_orthodox`, `categories`, `venerated_in`, `patron`, `relic_description`, and `relic_location`. Leave a field null when the evidence does not support it, and record the reason.

## Prayers

The draft flow cannot write prayers yet. Put authentic prayers by or to the saint in the packet under `related.prayers`, with their source and rights label, so that they are ready later. Do not invent a novena.

## Image

Find a profile image as `sources.md` describes: public domain or CC0, a real icon or portrait of this saint, and a verified rights page. Record everything in `images`. Download or upload the file only with the user's approval, as the skill requires.

## Share kit

People share a piece of a biography, not the whole. Prepare the pieces, and put them in the packet under `share_kit`. Use only exact text from the final biography, the quotations file, or the cards.

- `tagline`: one line of no more than 15 words that makes someone curious, for social posts and site cards.
- `did_you_know`: three to five surprising, true facts, one sentence each, each with its card.
- `quote_cards`: three quotations of no more than 25 words each, the saint's own words, public domain or our own translation, with the attribution. These become images.
- `share_moments`: the two or three moments from `05b-story-edit.md`, with the `id` of the section they are in, so a link can point to that section.
- `for_someone_who`: two or three lines of the form "For anyone who has lost a parent young", taken from the outline's points of connection. They help a reader think of the friend to send it to.
- `read_next`: the three strongest connections to other saints from the outline, each with one true sentence that explains the link. Check each saint's slug against the published saints. Mark the saints that the site does not have yet.

The CMS has no fields for the share kit yet. Keep it in the packet, ready for the frontend work.

## Packet

Write `entry.json` in the packet shape from `directus.md`: `identity`, `saint`, `related` (miracles, teachings, quotes, prayers, books), `share_kit`, `images`, `sources`, `gaps`, `field_review`, and `save_result`. Mark each field in `field_review` as `supported`, `traditional`, `unknown`, `not_applicable`, or `blocked`, with a short reason.

Then validate the packet:

```bash
node --test scripts/directus-saint-drafts/test.cjs
```

Also check the draft payload against `scripts/directus-saint-drafts/validate.cjs` before you save.
