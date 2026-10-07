# Saint entry workflow

**Standard mode (default for tier A and B):** [fast-1-research.md](fast-1-research.md) (wide research), [fast-1b-outline.md](fast-1b-outline.md) (driving question, portrait, at most 15 chosen scenes), [fast-1c-scenes.md](fast-1c-scenes.md) (deep research of the chosen scenes only, one card each), [fast-2-write.md](fast-2-write.md), and [fast-3-check.md](fast-3-check.md), with up to five saints in parallel.

**Lean mode (tier C, or on request):** the same without the outline and the scene research.

The staged pipeline below is **deep mode**, for rare definitive entries. Its research has no fixed limit, so it is slow.

The `saint-entry` skill in `BioCMS/.claude/skills/saint-entry/` runs all stages by itself. Say "create entries for St. X, St. Y". It asks once, for downloads, and saves Directus drafts. It never publishes. Add "review mode" to stop after the outlines.

Each stage has its own prompt. Each stage writes files to `content-drafts/<slug>/`. The next stage reads them.

| Stage | Prompt | Output | Review |
|---|---|---|---|
| 1. Identify and plan | [01-identify-and-plan.md](01-identify-and-plan.md) | `01-plan.md` | User approves downloads |
| 2. Research dossier | [02-research-dossier.md](02-research-dossier.md) | `02-dossier/` | — |
| 2b. Merge into digests | [02b-merge-digest.md](02b-merge-digest.md) | `02-dossier/digest/`, merged miracles, quotations, scenes | — |
| 3. Evidence outline | [03-evidence-outline.md](03-evidence-outline.md) | `03-outline.md` | Optional (review mode) |
| 4. Write the biography | [04-write-biography.md](04-write-biography.md) | `04-biography.html`, `04-summary.txt`, `04-notes.md` | — |
| 5. Independent check | [05-check.md](05-check.md) | `05-check.md` (fix loop, max 2 rounds) | — |
| 5b. Story edit | [05b-story-edit.md](05b-story-edit.md) | edited biography, `05b-story-edit.md`; then a check of the changed parts | — |
| 6. Other sections, share kit, packet | [06-other-sections.md](06-other-sections.md) | `entry.json` | — |
| 7. Save draft | Directus MCP flow ([README](../../scripts/directus-saint-drafts/README.md)) | Directus draft | User publishes |

## Source library

Public-domain collections are in `/Users/nicholas/Desktop/saints-website/source-library/`. Search them by name. The search ignores case and accents and reports PDF page numbers:

```bash
/Users/nicholas/Desktop/saints-website/source-library/find.py "Genevieve" --in therese-of-lisieux
```

Download new sources only with the user's approval.

## Rights labels

- `public-domain`: may be quoted, translated, and adapted.
- `facts-only`: facts may be used with a citation, but the wording may not be used.
- `unknown`: treat it as `facts-only`.

## Check script

`scripts/saint-entry/lint_biography.py` checks the mechanical rules: HTML, no links outside the sources list, average sentence length, heading length, praise words, "not X, but Y" sentences, block quote count, and summary length. Stages 4, 5, and 5b run it.

## Voice examples

After the owner reacts to a draft, the paragraphs they love and the paragraphs they dislike go into `voice-examples.md`. The writer and the story editor read it first. Its examples outrank the voice description in the prompts.
