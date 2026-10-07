# Stage 6 — Other sections and the entry packet

Use this prompt after the biography passes its check. In lean and standard mode it reads the notes files, the scene cards when they exist, and the checked biography. In deep mode it reads the dossier and the outline's "Material for the other sections". It writes `content-drafts/<slug>/entry.json`, the packet that is saved to Directus as a draft. For field shapes, allowed values, and image rules, read the skill references `directus.md` and `sources.md`. Check the current vocabulary in `BioCMS/utils/properties.js`.

---

You prepare every other part of the saint's page. Use the same voice as the biography: warm, plain, exact, and never glowing. Use the same reading rules too: read `write-slim.md` (the slim prompt the owner chose on 2026-10-06) and follow it in every text you write here. The owner rejected text that was too advanced, with sentences full of commas, headings like riddles, and quotations in Victorian English. Every statement comes from the notes, the cards, or the checked biography. Label each tradition as a tradition. Write "Saint" before every saint's name, as `titles-pass.md` says.

## Miracles — a complete list

The miracles page is one of the reasons people visit the site. It must be the most complete list of the miracles attributed to this saint on the internet. Use every miracle in the notes (section 7, "Miracles", of each notes file) and in the scene cards; in deep mode, use every entry in `02-dossier/miracles.md`.

Write the list first as `content-drafts/<slug>/miracles.html`, check it with the script below, and then put it into the packet. A separate fact check reads that file.

- Start with one short paragraph that presents the list as the Church's memory of God's works through the saint, gathered from the oldest witnesses, with each account's teller and status. Do not write about "scientific proof" or about not dismissing the accounts. Read `reverence-pass.md`: a miracle is God's work through the saint's prayers, and the faith, prayer, and thanksgiving of the people in the story are part of each account when the source gives them.
- Group the miracles under `<h2>` headings, in this order when they apply: "Miracles approved by the Church" (for beatification or canonization), "During [name]'s life", and "After [name]'s death". A long list can be split further by period or place.
- Give each miracle an `<h3 id>` with a short, plain title that says what happened, where, and when, such as "A blind child sees at the shrine, 1924". No riddles. Use the person's name in the title only when the source gives it and it helps the reader.
- For each miracle, tell what was reported in two to five straight sentences: who, where, when, what happened, and who reported it. Start each sentence with who acts. Put the reporter at the start of the account ("The friar Thomas of Celano recorded…") or at the end, not in the middle of a sentence. Include medical treatment or natural facts that the source mentions.
- **Private visions and struggles belong in the list.** Visions, voices, temptations, and other inner experiences that the saint or a companion reported are part of the record. The owner trusts the saints' own accounts, and these moments help a reader know the saint as a person. Put them in their own group, such as "Visions Francis told his companions", and tell each one as reported, with the reporter named ("Teresa wrote that…", "Celano says the brothers learned…").
- **Trust the tradition in the list too.** Group headings never say "doubted" or "legends": use "Stories told of Saint Nicholas after his death" or "Later accounts", not "Doubted stories". A status line names the teller and the century ("told in the ninth-century Life by Michael the Archimandrite"); it does not argue with the story. Scholarly doubts go only in a short closing note.
- **Tell only what the source reports.** Add no feelings, crowds, gestures, sounds, weather, or medical detail that the source does not give. The fact checks removed ten to thirty such additions from every biography, and a miracle account invites them even more.
- **Quotations in plain modern English,** translated from the original or put into modern words with the same meaning. No "thee", "thou", or "behold".
- State the status in plain words: approved by the Church for a beatification or canonization, investigated, recorded by the shrine, or popular tradition. Explain a Church word such as "beatification" once, in a short sentence of its own.
- End each account with a separate short line, "Source: …", with the author, title, the exact place (page, chapter, number, or witness), and a link. Do not put citations inside the account text. Read `citations.md`: every detail comes from a source, nothing from memory, and when a detail is missing, write less. Use the names, dates, numbers, and quotation wordings in `facts.md` exactly, so the miracle list agrees with the biography.
- Then run the check script and fix every "MUST FIX" line and every "bent sentence" line that is not a false alarm:

```bash
python3 /Users/nicholas/Desktop/saints-website/BioCMS/scripts/saint-entry/lint_biography.py content-drafts/<slug>/miracles.html --kind miracles
```
- Make one `miracles` record for each saint. Set `time_period` from the allowed values to cover the periods in the list.

## Teachings

Write one `teachings` record from `content-drafts/<slug>/teachings.html`, which the teachings writer prepares with `06b-teachings.md` and the fact checker checks. Do not rewrite it. Set `time_period` from the allowed values to cover the periods of the teachings.

## Quotes

Make 10–30 `quotes` records from the quotations in the notes and the cards (`quotations.md` in deep mode). Each record has the `text`, `topics` from the allowed list, and a `source` with the work, the locator, and a link where one exists. Give the `text` in plain modern English with the exact meaning: translate it from the original, or put an old translation into modern words, and write "our translation" in the `source` when it is ours. Where the biography or the teachings page already gives the quotation in modern English, use the same wording, so the page agrees with itself. Do not include a paraphrase or a quote without a source.

## Saint fields

Fill in the fields from the dossier and the `directus.md` rules: `name`, `slug`, `summary` (from stage 4), `biography` (the final HTML), `birth_year`, `death_year`, `birth_location`, `death_location`, `feast_day_catholic`, `feast_day_orthodox`, `categories`, `venerated_in`, `patron`, `relic_description`, and `relic_location`. Leave a field null when the evidence does not support it, and record the reason.

## Prayers

The draft flow cannot write prayers yet. Put authentic prayers by or to the saint in the packet under `related.prayers`, with their source and rights label, so that they are ready later. Do not invent a novena.

## Image

Find a profile image as `sources.md` describes: public domain or CC0, a real icon or portrait of this saint, and a verified rights page. Record everything in `images`. Download or upload the file only with the user's approval, as the skill requires.

## Share kit

People share a piece of a biography, not the whole. Prepare the pieces, and put them in the packet under `share_kit`. Use only exact text from the final biography, the quotations file, or the cards.

- `tagline`: one line of no more than 15 words that makes someone curious, for social posts and site cards.
- `did_you_know`: three to five surprising, true facts, one straight sentence each, each with its card.
- `quote_cards`: three quotations of no more than 25 words each, the saint's own words in plain modern English, with the attribution. These become images.
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
