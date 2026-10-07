# Teachings and miracles rewrite (started 2026-10-05)

Owner's request: "fix all the existing miracles and teaching drafts" with the new rules (06b-teachings.md, 06-other-sections.md: easy to read, straight sentences, plain headings, modern-English quotations, no invented detail).

Each saint works in `content-drafts/<slug>-standard/`. The old texts are saved there as `old-teachings.html` and `old-miracles.html`.

1. Teachings: `saint-teachings` agent (Fable) writes `teachings-plan.md` and `teachings.html` fresh from the notes, the scene cards, and the checked biography.
2. Miracles: `saint-sections` agent (Sonnet) revises `old-miracles.html` into `miracles.html`, against the notes, and adds missing miracles.
3. Two `saint-checker` agents check each file ("Checking the teachings page or the miracle list" in fast-3-check.md).
4. `python3 scripts/saint-entry/sync_packet.py content-drafts/<slug>-standard`, then `upload.mjs --read`, then `upload.mjs`. John Maximovitch is a published item: prepare locally only.

| Saint | Teachings | Miracles | Checks | Uploaded |
|---|---|---|---|---|
| francis-of-assisi | waiting for the 3-step test | done | miracles checked | miracles 2026-10-05 |
| seraphim-of-sarov | waiting for the 3-step test | done | miracles checked | miracles 2026-10-05 |
| benedict-of-nursia | waiting for the 3-step test | done | miracles checked | miracles 2026-10-05 |
| augustine-of-hippo | new 3-step test running | done | miracles checked | miracles 2026-10-05 |
| nicholas-of-myra | 3-step test running | running | | |
| anthony-of-padua | waiting for the 3-step test | running | | |
| thomas-aquinas | waiting for the 3-step test | running | | |
| sergius-of-radonezh | waiting for the 3-step test | done | miracles checked, titles done | bio + miracles 2026-10-05 |
| padre-pio | waiting for the 3-step test | running | | |
| teresa-of-avila | waiting for the 3-step test | running | | |
| joan-of-arc | waiting for the 3-step test | running | | |
| john-maximovitch | waiting for the 3-step test | running | | |

## Queued (owner-approved 2026-10-05)

1. Reverence pass (reverence-pass.md) on every biography, miracle list, and essay: test on Francis first, then the other eleven.
2. After the reverence pass: mine the large miracle collections for completeness.
   - Anthony: Acta Sanctorum June vol. 2 appendix from p. 210 (named canonization miracles, Ancona manuscript) and the Liber miraculorum, pp. 216–245 (about 80 numbered accounts); also Rigauld ch. 10 and Coleridge pp. 210–213.
   - Teresa: the Procesos (about 300 "milagro" mentions).
   - Thomas Aquinas: the Tocco and Gui catalogues, and the Fossanova 1321 depositions.
   - Others: ask each saint's checker which collections remain.

Mining status (each mined list then goes: saint-checker on new accounts -> copy edit of new accounts -> upload):
| Saint | Mining | Check | Copy edit | Uploaded |
|---|---|---|---|---|
| anthony-of-padua | done (59 new) | done | done | 2026-10-06 |
| thomas-aquinas | done (60 new) | done | done | 2026-10-06 |
| teresa-of-avila | done (60 new; 192 more listed) | done | done | 2026-10-06 |

## Reverence pass (owner-approved 2026-10-05, model: Saint Francis)

Each saint: Fable reverence pass on biography, miracles (and teachings where it exists) -> saint-checker on the changes -> sync_packet (skip teachings until the owner approves the essays) -> upload.

| Saint | Reverence pass | Check | Copy edit | Copy-edit list fixed | Uploaded |
|---|---|---|---|---|---|
| francis-of-assisi | done | done | done | done | 2026-10-05 (final) |
| seraphim-of-sarov | done | done | done | done (by hand) | 2026-10-05 (final) |
| benedict-of-nursia | done | done | done | done | 2026-10-05 (final) |
| nicholas-of-myra | done (incl. essay) | done | done | done | 2026-10-05 (final; essay held) |
| augustine-of-hippo | done (incl. essay) | done | done | done | 2026-10-05 (final; essay held) |
| anthony-of-padua | done | done | done | done | 2026-10-05 (final) |
| thomas-aquinas | done | done | done | done | 2026-10-05 (final) |
| sergius-of-radonezh | done | done | done | done | 2026-10-05 (final) |
| joan-of-arc | done | done | done | done | 2026-10-05 (final) |
| teresa-of-avila | done | done | done | done | 2026-10-05 (final) |
| padre-pio | done | done | done | done | 2026-10-05 (final; named Saint Pio) |
| john-maximovitch | done | done | done | done | 2026-10-06 (draft on published item 4; live page unchanged until promoted) |

Open for the owner: Evodius title (Augustine files use plain "Evodius" for now).

## Copy edit (owner-requested 2026-10-05)

After each saint's reverence check: saint-copyeditor (Opus) on biography, summary, miracles, and teachings (copy-edit.md), then a saint-checker resolves the editor's listed fact points (SKILL.md 4d), then sync and upload. Francis first, because it is already uploaded.

## Process changes (owner-approved 2026-10-06)

- Writers on Opus 5.5 high; no separate reverence pass for new texts.
- New order: writer -> copy edit -> one fact check (resolves the copy editor's list, writes facts.md) -> miracles and essay from facts.md -> one copy edit -> one combined check (check-sections.md) -> sync -> upload.
- College citation standard: citations.md. Numbered notes in the biography and essay; exact places in miracle "Source:" lines; nothing from memory; write less when a detail is missing.
- Checkers and copy editors read rules-card.md and citations.md, not the full writing prompt.
- Research saves source texts with fetch_text.py --save into content-drafts/<slug>/sources/.
- Texts written before 2026-10-06 have no numbered notes: lint them with --legacy until they are given notes.
- Mining limit for future saints: 30 new accounts.

## Slim-prompt rewrite of the biographies (owner-requested 2026-10-06)

Each saint: copy to *.before-slim -> saint-writer (Opus, write-slim.md; facts from the checked biography + notes + cards; numbered notes added) -> copy edit (biography + summary) -> one fact check (also writes facts.md) -> sync (skip teachings) -> upload. Up to four writers at a time. John Maximovitch: draft on published item 4 (upload.mjs --skip=teachings).

| Saint | Slim rewrite | Copy edit | Check | Uploaded |
|---|---|---|---|---|
| clare-of-assisi | done (5 drafts; prompt tuning) | done | done | 2026-10-07 |
| anthony-of-padua | written | done | done | 2026-10-07 (review 7; middle revised and checked, uploaded) |
| teresa-of-avila | written | done | done | 2026-10-07 (review 7; middle revised and checked, uploaded) |
| thomas-aquinas | written | done | done | 2026-10-07 (review 7.5; middle revised and checked, uploaded) |
| francis-of-assisi | written | done | done | 2026-10-07 (review 7; middle revised and checked, uploaded) |
| seraphim-of-sarov | written (new line applied) | done | done | 2026-10-07 (review: heart 7, story 7, prose 8, whole 7.5) |
| benedict-of-nursia | written (new line applied) | done | done | 2026-10-07 (review: heart 7, story 7, prose 7, whole 7) |
| augustine-of-hippo | written | done | done | 2026-10-07 (review: heart 8, story 7, prose 7, whole 7) |
| nicholas-of-myra | written | done | done | 2026-10-07 (review: heart 6, story 7, prose 7, whole 7) |
| sergius-of-radonezh | written | done | done | 2026-10-07 (review: heart 7, story 6, prose 8, whole 7) |
| joan-of-arc | written (three new lines applied) | done | done | 2026-10-07 (review: heart 8, story 7, prose 7, whole 7.5) |
| padre-pio | written (three new lines applied) | running | | |
| john-maximovitch | written (three new lines applied) | running | | |


Prompts FROZEN 2026-10-06 after the Saint Clare tuning (copy in backups/prompts-FROZEN-2026-10-06). Per saint now: re-outline (fast-1b-outline.md, for the heart of the story) -> one writer draft -> copy edit -> one fact check -> sync/upload -> one blind review (blind-review.md), revise only for a real problem.

Middle revisions (owner-approved 2026-10-07): Thomas, Anthony, Teresa running (focused revision of middle chapters per blind review + the new "resistance in each period" line; then a short fact check of changed passages; then upload). Francis after its fact check finishes.
