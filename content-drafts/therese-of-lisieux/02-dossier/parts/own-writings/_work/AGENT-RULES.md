# Rules for sub-agents: St. Thérèse of Lisieux, "own writings" dossier (stage 2)

You are helping build a research dossier for Find a Saint. A later writer will build a biography ONLY from the dossier. If a fact, detail or quotation is not in the cards, it will not be in the biography. Be complete, exact and honest.

Scratch directory: /private/tmp/claude-501/-Users-nicholas-Desktop-saints-website/e5f47d61-2316-4712-8219-d4c1aba2c8b7/scratchpad/ow/
Do NOT fetch anything from the web. Do NOT download files. Read only the local files named in your task. Write only your own output file(s) in the scratch directory. Do not write anywhere else.

## What to look for (priority order)
1. Concrete, personal details in her own words: family life, illnesses and symptoms, food, clothes, objects, rooms, daily schedule, work in the Carmel (offices/jobs), money, travel.
2. Character: humor, temper, faults, fears, tastes, what she admits about herself, how she changed.
3. Relationships: family members, nuns, priests, missionaries (Bellière, Roulland), novices. Full names and roles. Specific exchanges.
4. Scenes that can be told as a small story (who, where, what was done and said, what happened next).
5. Reactions and opposition: how family, community and Church authorities reacted to her choices; each opponent/doubter, the type of conflict, and their reasons as documented.
6. What set her apart: anything said to be unusual or new compared with others of her time.
7. Her illness, her trial of faith (1896–97), her last months, her last words and final acts, exactly as recorded and BY WHOM.
8. Liturgy/prayer: prayers, hymns, feasts she wrote for or celebrated, and their origins.
9. Extraordinary events she herself reports (dreams, answered prayers, signs, cures): these also go in a miracle list.
10. Details that do not fit the usual pious picture.

## Fact card format (one claim per card)
Put a sort line before each card so the cards can be merged in date order. Use ISO dates; use -01 for unknown day.

```
<!-- sort: 1890-08-30 -->
### <short title>
- Claim: ...
- When / where: ...
- People: full names and roles
- Source: LT 110 (to Sr Agnès de Jésus, 30–31 Aug 1890), https://archives.carmeldelisieux.fr/correspondance/<slug>/
- Source type: own-writing   (for Carnet jaune/last words use: eyewitness record of her words (Mère Agnès))
- Rights: public-domain (her words); Carmel transcription/notes: unknown
- Original words: « ... »  (keep the French; short is fine; exact wording from the file)
- Translation: our own plain English translation (NEVER copy an existing English translation)
- Other sources: ...
- New to English readers: yes | partial | no — with a short reason (see scheme below)
- Confidence: high | medium | low — one line of reason
- Notes: conflicts, doubts, what the source does NOT say
```

Locators must be exact: LT number + recipient + date + URL slug from the file header (the header line shows the title and the html file name; the URL is https://archives.carmeldelisieux.fr/correspondance/<file name without .html>/ for letters; for poems/plays/prayers it is https://archives.carmeldelisieux.fr/archive/<file name without .html>/; for Carnet jaune months it is https://archives.carmeldelisieux.fr/archive/cj-<month>-1897/). For Carnet jaune give the date and the saying number, e.g. "CJ 5.7.2" (5 July, no. 2). For other last-words lists give the collection and date.

Say who is speaking. "Thérèse wrote", "Mère Agnès recorded that Thérèse said", "the Carmel's editorial note says" are different evidence. The Carmel site's own notes, headings and "La santé de Thérèse" summaries are MODERN editorial text: rights "unknown", source type "scholarship (Carmel editors)". Use them for facts only, in your own words, and label them as editor notes.

No invention. Do not add feelings, motives, weather or scenery the source does not state.

## Rights
- Her own words (letters, poems, plays, prayers, manuscripts): public-domain.
- Words recorded by her sisters in 1897 (Carnet jaune etc.): public-domain as 19th-century text; the Carmel's transcription and notes: unknown.
- All English must be OUR translation.

## "New to English readers" scheme
Baseline = the English pages read in stage 1 (Wikipedia EN, Vatican 1997 biography, Divini amoris scientia, EWTN/Crawley, Franciscan Media). The baseline already has: birth 2 Jan 1873, Alençon, parents Louis (watchmaker) and Zélie (lacemaker), mother's death when she was 4, move to Lisieux, Pauline and Marie entering Carmel, 1883 illness and smile of the Virgin, Christmas 1886 conversion, Pranzini, Rome trip and Leo XIII, entry 9 Apr 1888, clothing, profession 8 Sep 1890, Mère Marie de Gonzague, Pauline prioress 1893, helping with novices, Joan of Arc plays, Act of Oblation 9–11 Jun 1895, spiritual brothers Bellière and Roulland (names only), the little way and the elevator image, the three manuscripts, tuberculosis from Good Friday 1896, trial of faith (named only), death 30 Sep 1897, last words "My God, I love you", "I want to spend my heaven doing good on earth", the shower of roses, wet nurse Rose Taillé, bullying at school, Céline's photographs, Fr Pichon, Fr Prou's 1891 retreat.
- no = in the baseline.
- partial = not in the baseline but already available in an old public-domain English book (Taylor 1912, which translated Pauline's edited text and some letters/poems; or the Novissima Verba English edition), or only summarised in the baseline.
- yes = not in the baseline and not in those old English books (so English readers only have it via modern copyrighted translations, if at all).
To test whether something is in the old edited French text (which Taylor translated), you may run:
  python3 /private/tmp/claude-501/-Users-nicholas-Desktop-saints-website/e5f47d61-2316-4712-8219-d4c1aba2c8b7/scratchpad/ow/chk.py "short exact French phrase" "another phrase"
It searches the 1911 French "Histoire d'une âme" with letters and poems (Gutenberg #36708). "ABSENT" means the phrase is not in that edition (use short phrases of 3–6 words; spelling may differ). You may also search the local English books with:
  python3 /Users/nicholas/Desktop/saints-website/source-library/find.py "<term>" --in therese-of-lisieux
(files: D5-taylor-little-flower-1912-complete = Taylor 1912 with letters and poems; novissima-verba-1927 = English last conversations, 1952 edition). Use these checks for the important cards; do not spend long on every card.
If the edited 1911 text changes her wording in a way that matters (softens, cuts, adds, changes names), make a card about the difference and quote both versions briefly. These edit-differences are valuable.

## Other outputs in the same file (after the cards)
Add these sections at the end of your output file:

### QUOTATIONS
10–25 of the best candidate quotations from your texts that SHOW the person (vivid, funny, tender, hard), not only doctrine. For each:
- French original (exact)
- Our plain English translation
- Exact locator
- Rights label
- One line of context

### MIRACLES
Any extraordinary event she (or the recorder) reports, as entries:
```
### M-? — <title>
- Period: during life | after death — era
- What was reported: ...
- The person helped: ...
- Witnesses and reporter: who saw it, who wrote it down, and when
- Status: her own report / recorded by her sisters (not investigated) / etc.
- Source: locator; rights label
- Other sources, conflicts, and doubts
- Medical or natural facts the source mentions
```
Report each as a report. Do not present it as proven and do not dismiss it.

### WORKS
For poems/plays/prayers: one line per work: number, title, date, occasion, for whom, length/notes, URL. (Letters agents: skip this section, but list any letters that are missing, fragmentary, or only known from copies.)

### SCENES
3–8 strongest scenes in your texts, each with the card titles and one sentence on why the scene matters.

### GAPS AND CONFLICTS
Where your texts are silent on something expected; where they disagree with Ms A/B/C or with each other; where the Carmel transcription is incomplete; date problems.

## Style
Plain, simple English. Short sentences. No idioms. Be concrete. Aim for completeness over polish: 40–90 cards for a letters part, as many as the material supports. Every card must have an exact locator.

When done, reply with a short summary: number of cards, number marked yes/partial/no, number of miracles, and your 3 best finds.
