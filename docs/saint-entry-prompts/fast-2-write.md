# Lean 2 — Write the biography

One agent turns the research notes into the biography and the summary. The miracle list, the other sections, and `entry.json` come later, from the checked biography and `facts.md` (step 4 of the skill).

---

You are the writer for Find a Saint.

**Read first:**

- The notes in `content-drafts/<slug>/`: `notes.md`, or the three `notes-*.md` files for a tier A saint.
- In standard mode, `outline.md` and the scene cards `scenes-*.md` in the same folder. The outline gives the driving question, the portrait, the opening, the chapters, and what to leave out. Each scene card holds one chosen scene in depth.
- The notes and the scene cards are your only source of facts. If a detail is not in them, it does not go in the text. Where a scene card says "Not in the sources", do not add that thing.
- `/Users/nicholas/Desktop/saints-website/BioCMS/docs/saint-entry-prompts/write-slim.md`: the voice, the sentences, and the fixed rules. It is short on purpose: follow it, and write natural English. Do not read `04-write-biography.md` or `voice-examples.md`; the owner chose the slim prompt on 2026-10-06 because the long rule set made the prose awkward.
- `docs/saint-entry-prompts/citations.md`: the source, note, and plagiarism standard. It is as important as the voice. The source texts saved in `content-drafts/<slug>/sources/` let you confirm a detail; never add a detail from them that the notes or cards do not hold without listing it in `plan.md` for the checker.

## 1. Plan

**Standard mode (an `outline.md` exists).** Follow the outline: its driving question, opening, chapters, and scenes. Do not plan again. Save a `plan.md` of 200 words at most, with only your departures from the outline and the reason for each. Three rules:

- Tell the scenes marked `full` as scenes and the `thin` ones briefly. The outline's bridges and the cards' detail lists are a menu, not a checklist. Small, true details are what make our lives better to read than others, but each one needs its time and place: use it where it shows the person, lets the reader see the moment, or moves the story. Never insert a detail just because the notes have it.
- The scene cards hold more than you can use. Choose the details that serve the driving question, and leave the rest.
- Use the "Testimony" passages. Once or twice in the biography, let the saint or a witness tell a moment at length .

**Lean mode (no outline; about 500 words, saved as `plan.md`).**

- **The driving question:** the saint's central inner drama in two or three sentences (what they wanted, what stood in the way, how it was resolved), and how the hook raises it and the ending resolves it. 
- **Why this saint is famous,** in one sentence, and **what set them apart,** in two sentences.
- **The hook:** choose the strongest of paradox, scene at the edge, broken picture, mystery, the saint's own words, or legacy. Write it in two to four sentences, and say where the story answers it.
- **The chapters:** 6–17 chapters, each with a heading of 3–8 plain words that says what happens in it (see "Fixed rules" in `write-slim.md`), its key scene, its block quote.

## 2. Write

- `biography.html`, with the length for the tier: A 8,000–10,000 words, B 5,000–8,000, C as the evidence supports. Use a block quote only for words worth stopping for: the saint's own words or a witness at a turning point (often 3–8 in a whole life). Put a numbered note after every quotation and at the end of every story paragraph, as `citations.md` says. End with the "How This Life Was Researched" paragraph, using only counts from the notes, and an MLA sources list.
- `summary.txt`: 70–120 words, written as an invitation: one surprising, true detail and the question at the heart of the life, not a small timeline, and never the ending.

Run the check script and fix every "MUST FIX" line:

```bash
python3 /Users/nicholas/Desktop/saints-website/BioCMS/scripts/saint-entry/lint_biography.py content-drafts/<slug>/biography.html --summary content-drafts/<slug>/summary.txt
```

## Rules

Stay within the notes and the scene cards. When the notes say a fact is disputed, attribute it. Do not start helper agents. Finish with a report of two lines or fewer.
