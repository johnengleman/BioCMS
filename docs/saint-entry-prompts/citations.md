# Sources, citations, and honesty

Every writer, checker, and copy editor reads this file. It sets the standard of a good college history paper: every fact comes from a source the reader can find, every borrowed word is marked, and nothing is made up.

The owner (2026-10-06): "We're creating writing errors that would get you an F in any college writing course." A biography that adds a detail no source gives, or that copies a writer's sentences without marking them, fails that standard, however well it reads.

## 1. Nothing without a source

- **Every fact comes from a source you or the research read in this project:** the notes, the scene cards, `facts.md`, or a source text you open yourself. If no source gives it, it is not in the text.
- **Nothing from memory.** You may know the popular version of a story. Do not use it, even when you are sure. The popular version is often wrong: this week the "memory" versions gave a medical board that voted "five to five" (it was unanimous) and a Gospel book that Saint Francis opened himself (his companion opened it). If a fact you remember is missing from the notes, list it under "to check" in your notes file. Do not write it.
- **When a detail is missing, write less.** A short, true scene is better than a full, partly invented one. Writers most often invent these details. Never add one that the source does not give:
  - the room or place inside a building ("in the parlour", "down to the crypt")
  - the time of day, the weather, the light
  - who did an action, when the source says only "they" or uses the passive
  - a title, a job, or a family tie ("a priest", "her brother")
  - tears, looks, gestures, silences, feelings
  - numbers, distances, and lengths of time
  - a reason or a cause ("because…", "so that…") that the source does not state
  - "no one", "only", "first", "never", "always"
- **Uncertain readings stay uncertain.** If the notes mark a word as unclear (a damaged page, an OCR guess), say only what is clear.

## 1b. Keep it in proportion

The owner (2026-10-06): "Those tiny little phrases… I wouldn't really call those lying or making things up." Good retelling uses its own words. The standard is about facts, not about every word.

**These are errors. Fix them always:**
- a wrong person, place, date, number, or amount (gold for silver, "none" for "many", 10 for 18)
- the wrong person doing an action, or a reversed meaning (the companion opened the book, not the saint; the fleece was wet, not dry)
- an added fact that changes the story or the reader's picture of a person: a title, a job, a family tie, a rank ("a priest", "counselor of the king", "a noble lady")
- an added cause, motive, feeling, or result that the source does not give
- a changed quotation, or words in quotation marks that the source does not have
- a claim stronger than the source ("never", "no one", "the first", "unanimous" for a split vote)

**These are not errors. Leave them alone:**
- a different but fair verb or word: "went" or "travelled" for "came", "prayed" for "made a prayer", "a short prayer" when the source shows it was brief
- a plain, safe inference that any reader would make from the source: that a man who "came to Rome" from far away travelled there
- joining, splitting, or reordering the source's sentences, when the meaning stays the same
- a small descriptive word that adds no new fact and no new picture

When you are not sure which kind a change is, ask: would a reader who checked the source feel misled? If not, leave it.

## 2. Notes in the text

The reader must be able to check any story, quotation, or number. The biography and the teachings essay carry numbered notes, as a history book does. The miracle list keeps its "Source:" line under each account.

**Where a note goes:**

- after every quotation, block quote, or quoted phrase
- after every story or scene: one note at the end of its paragraph, listing every source the paragraph uses
- after a number, a date, or a claim that a reader might doubt
- one note can name two or three sources: "Celano, *Second Life* §52; Bonaventure, *Major Legend* VIII.6."

Notes follow the story: shape each paragraph for the reader, never around one source or to fit a note. Not every sentence needs a note. Every paragraph of 25 words or more needs at least one, except the closing back-matter sections.

**How a note looks in the HTML.** The marker goes after the punctuation at the end of the sentence or paragraph:

```html
<p>… and the friar went on his way.<sup><a href="#note-12" id="ref-12">12</a></sup></p>
```

Number the notes 1, 2, 3 … in the order they appear. Each number is used once.

**The notes list** goes at the very end, after the `Sources` list, under its own heading:

```html
<h2 id="sources">Sources</h2>
<ul>… the full works, as now …</ul>
<h2 id="notes">Sources: Notes</h2>
<ol>
  <li id="note-12">Celano, <em>Second Life</em> §52 (our translation). <a href="#ref-12">↑</a></li>
</ol>
```

The heading must start with "Sources", so the site treats it as back matter (not a chapter), and it must come after the main `Sources` list, so the site's source count stays right.

**What a note says:** the author's short name, a short title, and the exact place: page, chapter, section, letter number, or the witness and the process page ("Procesos I, p. 170, Ana de San Bartolomé"). Add "(our translation)" when we translated it. The full title, edition, and link stay in the `Sources` list. Every source a note names must be in that list.

**The miracle list.** Each account keeps its own "Source:" line, now with the exact place in the source (page, chapter, number), as the notes above.

## 3. Quotation and plagiarism

- **Borrowed words are always marked.** Any phrase taken from a source, even three words, goes in quotation marks with a note. Without the marks it is plagiarism.
- **Retell in your own words and your own sentence shape.** Do not follow a source's sentences in order with a few words changed. That is plagiarism too, even with a note.
- **Modern authors** (twentieth century and later, such as a modern biography or a website): give their facts in your own words with a note, and quote at most one short sentence. Never copy their scenes or their sentence order.
- **Translations:** a quotation that we translated or modernized says "(our translation)" in its note or `<cite>` line, and the original is kept in the writer's notes file.
- **A quotation is the source's words.** Do not change a word inside quotation marks to avoid a rule or to make it read better. Translate the original again instead.

## 4. Research must make this possible

- Each fact in the notes and on the scene cards has its source key **and its exact place** (page, chapter, section, or witness).
- For each key detail (a name, a number, an action, a quoted word), the card keeps the **original words** in the source language, short, next to the English: `"izdaleka" (indirectly, in a roundabout way)`. Translation errors then show at once. This week's errors included a Russian word read as "from a distance" that means "indirectly", and "covering up" read as "covered the losses".
- Save every source text you fetch in `content-drafts/<slug>/sources/` with `fetch_text.py <url> --save content-drafts/<slug>/sources/<key>-<short-name>.txt`. A later call with the same path reads the file and does not fetch again.

## 5. The fact sheet

After the biography's fact check, the checker writes `content-drafts/<slug>/facts.md`: the approved names, spellings, dates, numbers, and places, and the one approved wording of each quotation that more than one text may use, each with its note. The miracle list and the teachings essay must use these exactly. If a later writer finds a source that disagrees, it lists the conflict for the checker and does not change the fact on its own.
