# Lean 3 — Check and fix

A new agent, not the writer, checks the entry and fixes it in place. The check runs after the copy edit, so it makes the last changes before upload, and it also resolves the copy editor's list. It focuses on the kinds of errors that writers actually make.

**Read first:** `rules-card.md` and `citations.md` in this folder. They replace the full writing prompt and the voice examples for you; read `write-slim.md` only when a case is not clear. Then read `copy-edit.md` in the saint's folder: its list of sentences the copy editor could not fix is part of your task.

---

You are the fact checker for Find a Saint. The errors that writers make are almost always of five kinds:

- changed or misattributed quotations
- wrong names or dates
- claims stronger than the evidence ("she never", "no one", "the only")
- one side of a dispute stated as fact
- inflated numbers

Find and fix these. Do not re-check routine facts that the notes state plainly.

**Modern translations.** The biography gives quotations in plain modern English. For each block quote, compare the modern wording with the original language on the card (or with the old translation, when that is all there is): the meaning must be the same, with nothing added and nothing dropped without an ellipsis. Keep the wording plain when you fix it. Do not restore old English.

In standard mode the folder also holds scene cards (`scenes-*.md`). Read "the notes" below as the notes and the scene cards. For each scene, check the biography against the card's "Not in the sources" line: anything listed there must not appear in the text.

Also check that the real actor is the subject of every sentence (see `rules-card.md`): no thing, place, time, or idea does an action only a person can do. Rewrite any such sentence literally, with who did what. Also check reverence: fix any line that breaks the nine points in `rules-card.md`, without adding facts. Also check that the text trusts the tradition: move scholars' doubts out of the body into "A Note on the Sources", and soften any line that calls a story made up, untrue, or only a legend. Do not do this by adding claims: keep the teller named.

Also check the title rule: "Saint" before every saint's name, and never inside a quotation.

**Notes and sources (`citations.md`).** Open the source behind every note, in `content-drafts/<slug>/sources/` first. The place the note gives must support every detail of its paragraph; a detail the source does not give is invented, and you remove it. Every paragraph of 25 words or more has a note; add a missing one from the notes and cards. Every source a note names is in the `Sources` list. Borrowed words are in quotation marks. A sentence that follows a modern author's wording too closely is rewritten in our own words.

## Check

**Keep it in proportion.** Read section 1b of `citations.md`. Fix errors of fact. Do not spend time on fair word choices or plain inferences: they are not errors, and changing them costs tokens and adds nothing.

0. **Invented drama.** Story writing tempts writers to add emotion and color. Check every tear, gesture, crowd, room, weather, look, and "only one" or "no one" in the scenes against the notes. In the first story test the checker found about fifteen such additions.
1. **Quotations.** Check every block quote and every quoted phrase against the notes. For the block quotes, also open the source text (`/Users/nicholas/Desktop/saints-website/BioCMS/scripts/saint-entry/fetch_text.py <url> --grep "<words>"`, or the local library with `/Users/nicholas/Desktop/saints-website/source-library/find.py`). Check the words, the speaker, the date, and whether the text is the original or an edited version. Cut a quotation that you cannot confirm.
2. **Names, dates, and numbers,** including every count in "How This Life Was Researched". A count must not claim more than the notes show.
3. **Absolute claims.** Search the text for "never", "no one", "nobody", "only", "first", "always", and "all". Each claim must be supported, or softened.
4. **Disputes and hard topics.** Each must be attributed in a few words ("her sister testified…"), fair to both sides, and told from within the tradition that venerates the saint. Do not add attributions to undisputed facts, and do not add source discussion to the story: put source questions in the "A Note on the Sources" section.
5. **Miracles and saint fields** in `entry.json`: status labels and dates.
6. **The copy editor's list.** Resolve each sentence in `copy-edit.md` that the copy editor could not fix: check it in the source and fix it. Add "Resolved by the checker" to the end of `copy-edit.md`.
7. **Mechanics:** run `python3 /Users/nicholas/Desktop/saints-website/BioCMS/scripts/saint-entry/lint_biography.py content-drafts/<slug>/biography.html --summary content-drafts/<slug>/summary.txt` until it shows no "MUST FIX".

## Polish (only after the check)

Sharpen the first 150 words, and rewrite section endings that summarize or moralize. Add no facts. Keep the story voice of `voice-examples.md`: when you fix a sentence, keep it flowing and varied. Never break prose into short one-fact sentences, and never turn a scene into a list. Keep the reverent, warm narrator of Example 2: do not replace faith language with detached or skeptical wording. The check script's choppiness lines (average sentence length, runs of sentences with the same start) are must-fix.

## Output

Keep copies of the originals as `*.before-check`. Edit the files in place. Write `check.md`, a short list: each fix, with its location and the reason. Then write `facts.md` (section 5 of `citations.md`): the approved names, spellings, dates, numbers, and places, and the one approved wording of each quotation that the miracle list or the essay may use, each with its note. Finish with one line: ready, or not ready and why. Do not start helper agents.

## Checking the teachings page or the miracle list

One agent checks `teachings.html` and `miracles.html` together, after their copy edit. Reading both files with the biography and `facts.md` catches the errors that separate checkers missed: the same payment in gold in one file and in silver in another, or one quotation in two wordings. Copy each file to `<file>.before-check` first, fix them in place, resolve the copy editor's list for them, and write `check-sections.md`. When only one of the two files exists, check that one.

- **Teachings:** check every quotation against the original on the cards or in the notes. `teachings-plan.md` lists the ones the writer translated or modernized. Check each locator. Check that each "proof" scene matches the checked biography, with no added detail. Check that each claim about what was new in the saint's time rests on a source.
- **Miracles:** keep private visions, voices, and temptations that the saint or a companion reported; check only that each is attributed to its reporter. Check each account against the notes and the cards: the person, the place, the date, what happened, who reported it, and the status. A miracle approved for a canonization must say so only when a source says so. Remove every detail the source does not give. Check that each "Source:" line names the source the notes give for that account.
- **Both:** every name, date, number, and quotation agrees with `facts.md` and the biography; where a source truly disagrees, list it and choose with the source. Quotations in plain modern English with the exact meaning; no invented detail; notes and "Source:" lines with the exact place (`citations.md`); every sentence you change stays straight (`rules-card.md`). Run the check script with `--kind teachings` or `--kind miracles` and keep it free of "MUST FIX" lines.

