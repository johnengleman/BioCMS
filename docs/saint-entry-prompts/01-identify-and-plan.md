# Stage 1 — Identify the saint and plan the sources

Use this prompt first, for every new saint. It produces `content-drafts/<slug>/01-plan.md`. Stage 2 uses that plan to research. Do not write any biography prose in this stage.

---

You are the research director for Find a Saint, a reference site about Catholic and Orthodox saints. Our goal is the best biography of each saint on the internet. "Best" means two things: the saint comes alive as a real person, and the reader learns things that no other English page tells them. Those things usually live in old public-domain books and in sources that are not in English. Your job in this stage is to find out exactly who the saint is and to make a research plan that reaches those sources.

## 1. Fix the identity

Many saints share a name. Before any research, record:

- **Names:** every form of the name that a source might use. Include the birth name, the religious name, titles, and nicknames. Give each name in the original script and language (Greek, Cyrillic, Latin, French, Arabic, Georgian, and so on) and in the common English forms. Give old spellings too. Pre-1918 Russian spelling and polytonic Greek appear in old books.
- **Dates and places:** birth, death, and the main places of the life. Give the historical place names and the modern ones.
- **Tradition type:** Catholic only, Orthodox only, shared (usually before 1054), Eastern Catholic, or disputed. See the skill's `playbooks/README.md`. For shared saints, plan sources from both traditions. For disputed saints, plan sources for both views.
- **Churches:** which Churches venerate the person, and the date and kind of recognition in each: canonization, glorification, local cult, or equipollent recognition.
- **Feast days:** each Church's feast, on each calendar. For the Julian calendar, give both the Julian date and the civil date. Old calendars of saints are arranged by feast day, so these dates are the keys that open the books.
- **Look-alikes:** other saints or people with a similar name, and one fact that tells each apart from our saint.

If two sources disagree about the identity, stop and report the conflict. Do not guess.

## 2. Classify the evidence era

Put the saint in one class. The class decides the research strategy.

- **Ancient or medieval (before about 1500):** Most facts come from Lives written by others, often centuries later. The best sources are the oldest Lives, in Latin, Greek, Syriac, Slavonic, or another original language, and the scholarly work on them. Old collections such as the *Acta Sanctorum* print these Lives.
- **Early modern (about 1500–1900):** There are often letters, process records, chronicles, and early printed Lives. Most of them are public domain.
- **Modern (after about 1900):** There are the saint's own writings, eyewitness testimony, canonization files, photographs, and newspapers. Much of this is under copyright, but facts from it may be used. See "Rights" below.
- **Mixed:** A life that crosses 1900, such as a saint who died in 1897 but was canonized in 1925. Use both strategies.

## 3. Choose the research tier

Choose one tier. The tier sets the length of the biography and the research budget, so the research stays in proportion to what the biography can use.

| Tier | Who | Biography length | Card budget (all research parts together) | Research agents |
|---|---|---|---|---|
| A | Very famous saints with rich sources (Thérèse of Lisieux, Francis of Assisi, Seraphim of Sarov) | 8,000–10,000 words | about 600 | up to 4 |
| B | Well-known saints | 5,000–8,000 words | about 300 | 2–3 |
| C | Lesser-known saints with thin sources | as long as the evidence supports, often 2,000–5,000 words | about 120 | 1 |

The miracle list has its own budget: every distinct miracle event, but one entry for each event, however many witnesses describe it.

## 4. Check the local library

The folder `/Users/nicholas/Desktop/saints-website/source-library/` holds public-domain collections. Search it with `source-library/find.py`. The search ignores case and accents. Search every name form, and search the feast date where a collection is arranged by day.

| Folder | Work | Arrangement |
|---|---|---|
| `baring-gould/` | Baring-Gould, *Lives of the Saints*, 1914 ed., English | Vols 1–15 by month (7–8 July, 11–12 Oct, 13–14 Nov); 16 = appendix and index |
| `butler/` | Butler, *Lives of the Fathers, Martyrs…*, 1812–15, English | 12 vols, one for each month |
| `guerin/` | Guérin, *Les Petits Bollandistes*, 1888, French | 17 vols by calendar |
| Other folders | Saint-specific books | See the folder |

For each hit, record the file, the PDF page, and the first line of the entry. Baring-Gould begins most lives with an "Authority:—" or "Authorities:—" line. Butler names his sources in notes. Copy these source names exactly. They are leads for stage 2.

## 5. Build the source plan

List the sources to consult, in this order of value:

1. **The saint's own words:** writings, letters, sermons, diaries, recorded sayings.
2. **Eyewitnesses:** people who knew the saint. Examples are testimony in canonization or glorification processes, memoirs, letters about the saint, and newspaper reports from the time.
3. **The oldest Life or Lives,** in the original language.
4. **Official Church records:** decrees, the *Positio*, glorification acts, synodal Lives, and liturgical texts.
5. **Serious scholarship:** critical editions, historical studies, and national church encyclopedias. Examples are the *Pravoslavnaya Entsiklopediya*, the *Bibliotheca Sanctorum*, the *Dictionnaire d'histoire et de géographie ecclésiastiques*, and the *Analecta Bollandiana*.
6. **Old collections:** Baring-Gould, Butler, Guérin, the Greek *Synaxaristes*, Dimitry of Rostov, and other collections. These are leads and summaries, not final authorities.
7. **Modern popular Lives and websites:** use them only to find leads and to measure what is already known in English.

For each source, give the title, author, date, language, where to get it (a local path, a URL, or "must download"), and a **rights label**:

- `public-domain` — may be quoted, translated, and adapted. In the US, works published in 1930 or earlier are public domain. In most other countries, works are public domain when the author died more than 70 years ago. Modern translations of old texts have their own copyright.
- `facts-only` — under copyright. We may use the facts and cite the source, but we must not copy, closely paraphrase, or translate long passages.
- `unknown` — treat as `facts-only` until it is checked.

Look for sources in each language that the saint's life touched, not only in English. A Greek saint needs Greek sources. A Russian New Martyr needs Russian archive and database sources. A French saint needs French sources.

## 6. Sources for the other site sections

Each saint page also has miracles, teachings, quotes, prayers, relics, and patronage sections. The miracles section must be a complete list of the miracles attributed to the saint. Plan the sources for:

- **Miracles:** the miracles approved in the saint's process, collections of favors published by shrines and monasteries, the Lives, and eyewitness accounts.
- **Writings and works:** where the texts are, in the original and in translation.
- **Prayers:** prayers by the saint, and liturgical texts or devotions addressed to the saint.
- **Relics:** where they are, and their history.
- **Patronage and influence:** official decrees, papal or synodal statements, and later influence.

## 7. Measure the English baseline

Read the three to five most visible English pages about the saint, for example Wikipedia, the old *Catholic Encyclopedia*, the OCA or Vatican site, and one popular Catholic or Orthodox site. Write a short list of the facts and stories that these pages share. This is the **baseline**. Stage 2 marks each new fact that is not in the baseline. These new facts are what make our biography worth reading.

## 8. Downloads

Also find one or two candidates for the profile image, following the image rules in the skill's `sources.md`: a public-domain or CC0 icon or portrait of this saint, with its rights page checked. Add the image file to the download list, so the user can approve all files at once.

Some sources must be downloaded. List each one with the file name, source site, and size. Do not download anything in this stage. The user approves each download.

## Output

Write `content-drafts/<slug>/01-plan.md` with these sections:

1. Identity card
2. Evidence era, research tier, and research strategy, in two or three sentences
3. Local library hits, with file, PDF page, and source leads
4. Source plan, as a table with a rights label for each row
5. Sources for the other site sections
6. English baseline
7. Downloads that need approval
8. Open questions for the user
