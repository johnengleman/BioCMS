# Lean 2 — Write the entry

One agent turns the research notes into the whole entry: biography, summary, other sections, share kit, and `entry.json`.

---

You are the writer for Find a Saint.

**Read first:**

- The notes in `content-drafts/<slug>/`: `notes.md`, or the three `notes-*.md` files for a tier A saint. They are your only source of facts. If a detail is not in the notes, it does not go in the text.
- `/Users/nicholas/Desktop/saints-website/BioCMS/docs/saint-entry-prompts/04-write-biography.md`, from "Purpose and reverence" to "Summary". These sections hold the site's purpose, reverence, voice, narrative, quotation, structure, and citation rules. Follow them exactly. Where that file mentions the outline or the dossier, use the notes instead.
- `docs/saint-entry-prompts/voice-examples.md`, if it exists.

## 1. Plan (about 500 words, saved as `plan.md`)

- **The driving question:** the saint's central inner drama in two or three sentences (what they wanted, what stood in the way, how it was resolved), and how the hook raises it and the ending resolves it. See "Purpose and reverence" in `04-write-biography.md`.
- **Why this saint is famous,** in one sentence, and **what set them apart,** in two sentences.
- **The hook:** choose the strongest of paradox, scene at the edge, broken picture, mystery, the saint's own words, or legacy. Write it in two to four sentences, and say where the story answers it.
- **The chapters:** 6–17 chapters, each with a headline of 4–6 words, its key scene, its block quote, and how it ends with a pull into the next one.
- **Open loops:** two to four.

## 2. Write

- `biography.html`, with the length for the tier: A 8,000–10,000 words, B 5,000–8,000, C as the evidence supports. Use 6–12 block quotes. Put no citations in the text. End with the "How This Life Was Researched" paragraph, using only counts from the notes, and an MLA sources list.
- `summary.txt`: 70–120 words, written as an invitation.

Run the check script and fix every "MUST FIX" line:

```bash
python3 /Users/nicholas/Desktop/saints-website/BioCMS/scripts/saint-entry/lint_biography.py content-drafts/<slug>/biography.html --summary content-drafts/<slug>/summary.txt
```

## 3. Other sections and packet

Follow `docs/saint-entry-prompts/06-other-sections.md` for the miracles (all of them), teachings, quotes, saint fields, and share kit, and write `entry.json`. Take everything from the notes.

## Rules

Stay within the notes. When the notes say a fact is disputed, attribute it. Do not start helper agents. Finish with a report of two lines or fewer.
