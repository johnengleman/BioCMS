---
name: saint-entry
description: Research and write complete Find a Saint entries (biography, summary, full miracle list, teachings, quotes, saint fields, image) for one or more named Catholic or Orthodox saints, from old public-domain and original-language sources, and save them as Directus drafts. Use when the user says things like "create entries for these saints", "add St. X", "do Thérèse of Lisieux", or gives a list of saint names. Also use to resume or redo one stage for a saint. Not for CMS setup, schema changes, or frontend work.
---

# Saint entry

The user gives one or more saint names. You run the whole process by yourself and end with a Directus **draft** for each saint. Ask the user only at the points marked **Ask**. Never publish. The user publishes in Directus.

## Files

- Stage prompts: `/Users/nicholas/Desktop/saints-website/BioCMS/docs/saint-entry-prompts/` — `01-identify-and-plan.md` … `06-other-sections.md`, plus `05b-story-edit.md` and, when it exists, `voice-examples.md`.
- Check script: `BioCMS/scripts/saint-entry/lint_biography.py` enforces the mechanical biography rules. Each subagent reads its own stage prompt. Do not paste the prompts into the agent message.
- References in this skill: `references/directus.md` (fields, vocabulary, packet), `references/sources.md` (sources and image rules), `references/orthodox-paterika.md` (Greek, Russian, and Romanian lesser-known saints).
- Source library: `/Users/nicholas/Desktop/saints-website/source-library/`, searched with `find.py`. Saint-specific books go in `source-library/<slug>/`.
- Work folder for each saint: `/Users/nicholas/Desktop/saints-website/BioCMS/content-drafts/<slug>/`. Every stage writes its files there. This makes the work resumable.
- Draft save: the Directus flow in `BioCMS/scripts/directus-saint-drafts/README.md`.

## Two modes

**Lean mode is the default.** The goal is 5–10 saints a day, and a tier A saint such as Thérèse in under 30 minutes. For each saint:

1. **Research (about 10 minutes).** Decide the tier from the name (A: very famous with rich sources; B: well known; C: lesser known). Tier B and C: one agent reads `fast-1-research.md` and writes `notes.md`. Tier A: three agents in parallel, one for each focus (`own-words`, `witnesses`, `church-miracles`), each writing `notes-<focus>.md`.
2. **Write (about 10 minutes).** One agent reads `fast-2-write.md`, plans briefly, and writes `plan.md`, `biography.html`, `summary.txt`, and `entry.json`.
3. **Check and fix (about 5–10 minutes).** A new agent reads `fast-3-check.md`, checks the high-risk items (quotations, names, dates, numbers, absolute claims, disputes), fixes them in place, and writes `check.md`.
4. **Sections (about 10 minutes).** A `saint-sections` agent reads `06-other-sections.md` and writes `entry.json`: saint fields, the complete miracle list, teachings, quotes, relics, patronage, and the share kit, with the checked biography and summary.
5. **Save** the Directus draft with the upload script (see "Save the draft" below). Do not save an entry whose check says "not ready".

Up to five saints run at the same time. Spawn each step with its agent type: `saint-researcher` (Sonnet, medium effort), `saint-writer` (Opus, high effort), and `saint-checker` (Sonnet, high effort), and `saint-sections` (Sonnet, high effort), defined in `/Users/nicholas/Desktop/saints-website/.claude/agents/`. If those types are not available, use `general-purpose` with `model: "opus"` for the writer and `model: "sonnet"` for the others, and tell each agent the saint's name, slug, tier, and folder. The helper scripts in `BioCMS/scripts/saint-entry/` (`fetch_text.py`, `find_sources.py`) and the local `source-library/find.py` do the fetching and searching. There are no downloads and no outline review. The user reviews the finished drafts in Directus.

**Deep mode** runs only when the user asks for it, for a saint that deserves a definitive treatment. It is the staged pipeline below (stages 1–6, with download approval, merge digests, and optional review mode).

## Before the first saint

1. **Directus connection.** Check that Directus MCP tools are available in this session, for example tools whose names contain `directus`. If they are not available, continue anyway. Prepare everything up to `entry.json` and report at the end that the save step needs the connection.
2. **Duplicates.** Through the flow's `read` action, or the public API when there is no MCP connection, check each name and slug against published saints and drafts. If a saint already exists, ask whether to enrich the existing entry or to skip it. Do not overwrite it.
3. **Ambiguous names.** If a name could mean more than one saint, ask one short question for that name. Continue with the others.

## Deep mode pipeline

**Model:** spawn every subagent with `model: "sonnet"` (Sonnet 5.5), unless the user asks for another model.

Run the saints in parallel, up to three at a time. Within one saint, the stages run in order. Skip a stage whose output files already exist, unless the user asked to redo it.

### Stage 1 — Plan (one agent for each saint)

Spawn a `general-purpose` agent. Tell it the saint's name, the slug, the path to `01-identify-and-plan.md`, and the output path `content-drafts/<slug>/01-plan.md`. Tell it not to download anything.

### Ask — one download approval for the whole batch

When every stage 1 plan is done, collect all the proposed downloads (books and image files) from all the plans into **one** message. Give each file's name, source, and size, grouped by saint, with the value of each file in one line. Recommend the files with the highest value. Ask the user to approve the list, or a part of it.

- Download the approved files into `source-library/<slug>/`, or into the shared folders for general collections. Check that each file is a valid PDF, and index new PDFs with `find.py --index`.
- If the user declines a file, the research uses online reading instead.
- This is the only planned question. After it, run to the end without asking, except for the stop conditions below.

### Stage 2 — Research (several agents for each saint)

Use the research tier from the stage 1 plan: tier A up to four agents, tier B two or three, tier C one. Give each agent its share of the card budget. Split the stage 1 source plan into source families, for example the saint's own writings; eyewitness and process testimony; the old Lives and collections; official Church documents and miracles; and scholarship in the original language. Spawn one agent for each family. Tell each agent to read `02-research-dossier.md`, to use its own card prefix, and to write to `02-dossier/parts/<family>/`. Then spawn one merge agent. It combines the parts into the final `02-dossier/` files, removes duplicates, links conflicts, and renumbers the cards.

### Stage 2b — Merge into digests (tier A only, when needed)

Follow `02b-merge-digest.md`: sort the cards into life periods with `scripts/saint-entry/split_cards.py`, then spawn the period agents, the character agent, the miracles agent, and the quotations-and-scenes agent in parallel. Skip this stage when the cards total under about 90,000 words, which is normal for tiers B and C. The outline agent then reads the parts directly.

### Stage 3 — Outline (one agent)

The agent reads `03-evidence-outline.md`, the digests in `02-dossier/digest/`, and the merged dossier files, and writes `03-outline.md`. It opens individual cards in `parts/` only when it needs exact wording. If the value check says the research is too thin, run one more targeted stage 2 pass on the gaps that it names, and then redo the outline. Do this only once.

If the user asked for **review mode**, stop here and show the outlines. Otherwise continue.

### Stage 4 — Write (one agent)

Spawn the writer with `model: "sonnet"`. It reads `04-write-biography.md` and writes `04-biography.html`, `04-summary.txt`, and `04-notes.md`.

### Stage 5 — Check and fix (a fresh agent each round)

Spawn a new agent, not the writer. It reads `05-check.md` and writes `05-check.md` in the saint's folder. Then send the list of problems back to the writer agent with SendMessage, so the writer fixes them. Run the check again. Stop after two rounds. Keep the problems that are still open for the final report.

### Stage 5b — Story edit (a fresh agent)

Spawn a new agent with `model: "sonnet"`. It reads `05b-story-edit.md`, edits the biography in place, and lists the changed paragraphs. Then a fresh stage 5 checker checks only those paragraphs, and the check script runs again. Fix any fact problem that the edit introduced.

### Stage 6 — Other sections and packet (one agent)

The agent reads `06-other-sections.md` and writes `entry.json`, including the `share_kit`. Run `node --test scripts/directus-saint-drafts/test.cjs` in `BioCMS/`.

### Save the draft

Use the upload script. It sends the packet straight to the draft flow in about a second, so no agent has to retype the content into an MCP call:

```bash
cd /Users/nicholas/Desktop/saints-website/BioCMS
node scripts/directus-saint-drafts/upload.mjs content-drafts/<slug>/entry.json --read   # check for an existing draft first
node scripts/directus-saint-drafts/upload.mjs content-drafts/<slug>/entry.json          # read, save, verify the readback
```

The script reads its token from `~/.config/saints/directus.env` (the "Claude uploader" user) and never prints it. It writes `save_result` back into the packet. Do not upload an image unless its rights are verified (see `scripts/directus-saint-drafts/README.md`). Never publish: the owner publishes in Directus. Use the Directus MCP tools only when the script fails, and then read `scripts/directus-saint-drafts/README.md` first.

## Stop conditions

Stop work on one saint, keep its files, and continue with the others when:

- the identity is uncertain
- stage 3 still finds the evidence too thin after one extra research pass
- stage 5 still finds a fact or quotation error after two rounds
- the draft save fails, or the readback does not match. Never retry a save blindly. Read first.

## Final report

For each saint, give:

- the state: saved as a draft, prepared locally, or stopped (with the reason)
- the Directus link
- the biography word count and the number of block quotes
- the number of miracles
- the number of facts that are new to English readers
- open problems from stage 5
- gaps

Keep the report short. The details are in each saint's folder.

## Rules that always apply

- Rights labels decide what may be quoted or translated. See the stage prompts.
- No invented facts, quotations, feelings, or scenes, in any section.
- Download files only with the user's approval, given in the batch question.
- Draft only. Never publish, delete, or change the schema, permissions, or the frontend.
