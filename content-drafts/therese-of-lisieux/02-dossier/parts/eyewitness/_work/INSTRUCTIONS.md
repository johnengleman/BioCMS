# Extraction instructions (St. Thérèse of Lisieux — eyewitness and process testimony)

You extract facts for a biography dossier. A later writer sees ONLY your output, never the source. Be complete, exact, and honest.

Base folder: /private/tmp/claude-501/-Users-nicholas-Desktop-saints-website/e5f47d61-2316-4712-8219-d4c1aba2c8b7/scratchpad/ew/

## Sources
- `wit/PO-NN-*.txt` = one witness's full deposition at the Ordinary (diocesan) Process, Bayeux/Lisieux 1910–1911. Web page: https://archives.carmeldelisieux.fr/naissance-dune-sainte/les-proces-la-sainte-de-therese/le-proces-ordinaire/les-temoignages-du-proces-ordinaire/
- `wit/PA-NN-*.txt` = one witness's full deposition at the Apostolic Process, 1915–1917. Web page: https://archives.carmeldelisieux.fr/naissance-dune-sainte/les-proces-la-sainte-de-therese/le-proces-apostolique/les-temoignages-du-proces-apostolique/
- `sub/<person>__<page>.txt` = community pages (biographies, obituary circulars, "notes préparatoires" = drafts nuns wrote before testifying, "témoignage" pages, souvenirs). URL = https://archives.carmeldelisieux.fr/au-carmel-du-temps-de-therese/la-communaute/<person>/<page>/ (replace `__` by `/`). Exception: `sub/leonie-et-les-siens-ou-la-grace-de-la-derniere-place.txt` = https://archives.carmeldelisieux.fr/leonie-et-les-siens-ou-la-grace-de-la-derniere-place/
- The depositions contain folio markers like `[135r]` and session headers like `[Session 5: - 12 août 1910 ...]`. Use them as locators. Each file begins with a short editorial introduction by the modern editors (Teresianum 1973/1976); mark facts from that introduction as "editors' note", not as testimony.

Read your files COMPLETELY with the Read tool (use offset/limit; lines can be long — if a Read fails for size, use smaller limits, or `fold -s -w 1500 file > /tmp/...` in the scratchpad first). Do not skim. Do not use web tools; the files are already local.

## What to hunt for (priority order)
1. Small, surprising, human details about Thérèse: body, voice, face, health, symptoms, food, clothes, handwriting, objects, rooms; habits; work (laundry, refectory, sacristy, painting, portress aid, assistant novice mistress); humor, jokes, mimicry, games; temper, faults, tears, scruples, struggles; tastes and dislikes.
2. How she treated difficult sisters (and who they were, if named); relations with Mère Marie de Gonzague, with her own sisters, with novices.
3. Cool, critical, or dissenting opinions of her (nuns who found her ordinary, who disliked her, who criticized the Martin sisters, "what will we say in her circular"). These are VERY valuable. Also any sign a witness was coached, repeated another's words, or disagreed with another witness.
4. Her illness and death (1896–30 Sept 1897): symptoms, treatments, doctors (Dr de Cornière, Dr La Néele), what she said, who was present, the last day, the body after death, burial 4 Oct 1897.
5. Scenes: moments with enough detail to tell as a small story (who, where, what said, what next).
6. Her own words as quoted by a witness (give the French exactly, max ~25 words per quote).
7. Extraordinary events: in life, at death, after death (perfumes, lights, cures, apparitions, predictions). Each = a miracle entry.
8. Facts about the process itself (dates, who testified, pressures, disputes) only briefly.

Skip pure pious generalities and long doctrinal praise unless they contain a concrete fact. Skip what is only a paraphrase of Histoire d'une âme unless the witness ADDS or CONTRADICTS something (then note that).

## Rights (strict)
The Carmel web text and the 1973/1976 printed editions are "facts-only". So: state facts in YOUR OWN English words. A French quotation must be under ~25 words and only when the exact wording matters. Every English rendering must be YOUR OWN translation, never copied from an existing English translation.

## Output format
Write ONE markdown file to `out/<BATCH>.md` (BATCH name is given in your task). Use exactly these block types. Number within your batch: `<BATCH>-F01`, `<BATCH>-F02` …, miracles `<BATCH>-M01` …, scenes `<BATCH>-S01` …, quotes `<BATCH>-Q01` ….

```
### <BATCH>-F01 — short title
- Claim: one claim, in plain English, own words
- When / where: date or period (best estimate, say "undated" if none), place
- People: full names and roles
- Witness: who says it (e.g. "Sr Geneviève (Céline Martin), sister and novice") and whether she SAW it, HEARD Thérèse say it, or heard it from someone else
- Source: PO or PA, witness number and name, folio [NNNr/v], session and date — or the sub-page URL and section
- Original words: « … » (≤25 words, only if useful)
- Translation: our English
- New to English readers: yes | no | partial (the English baseline knows only the standard Story of a Soul life: childhood, Pauline, cure by the Virgin's smile, Christmas 1886, Pranzini, Rome and Leo XIII, entry at 15, Gonzague prioress, Pauline prioress 1893, novices, Joan of Arc plays, Act of Oblation 1895, missionaries Bellière and Roulland, Little Way, trial of faith, death 30 Sept 1897 with "My God, I love you", shower of roses)
- Confidence: high | medium | low — one-line reason
- Notes: conflicts with other witnesses, what the source does not say
```

```
### <BATCH>-M01 — title (person helped, place, date)
- Period: during life | at death | after death
- What was reported:
- The person helped:
- Witnesses and reporter:
- Status: (e.g. "sworn testimony at the Ordinary Process; not an approved miracle")
- Source:
- Medical or natural facts mentioned:
- Doubts / other versions:
```

```
### <BATCH>-S01 — scene title
- Card(s): <BATCH>-F..
- Why it matters: one sentence
```

```
### <BATCH>-Q01 — short title
- Speaker: Thérèse (as reported by X) | or the witness herself
- Original: « … » (≤25 words)
- English (ours): …
- Locator:
- Rights: facts-only (short quotation)
- Context: one line
```

At the end of your file add a section `## Gaps and conflicts` (bullets: contradictions between witnesses, suspicious or coached passages, things expected but absent) and `## Batch summary` (counts; the 5 best finds).

Aim for completeness: a long deposition should usually give 30–80 fact cards. Prefer many specific cards over few general ones. One claim per card. Chronological order is NOT required (the merger will sort). Write in plain English, short sentences. Do not invent motives, feelings, or scenery.

When done, reply with only: the output path, the counts, and the 5 best finds (one line each).

## ADDENDUM (scope addition — apply to your whole file)
Also card, from your files only:
1. Family and social world: parents' work and social standing, siblings, schooling, servants, early mentors and teachers.
2. Reactions and opposition: how family, community, and Church authorities reacted to her choices; for EACH opponent or doubter give name, role, type of conflict, and their documented reasons. Put "Opposition:" at the start of the Claim.
3. What set her apart: anything a witness says was unusual or new compared with others of her time (Claim starts "Distinctive:").
4. Her last words and final acts: exactly as recorded, with who recorded or heard them, and the time.
5. Liturgy: feasts, hymns, prayers, devotions, and their origins (e.g. prayers she composed, hymns sung at her deathbed, feasts she kept).
