# HANDOFF — eyewitness and process testimony family

## UPDATE 2026-09-29 (gap-fill session)

Gap fill done by hand. `build_out.py` was NOT run (it would renumber the cards). Backups of the three output files from before this session are in `_work/*.bak-before-gapfill`.

Counts now: 2,670 fact cards (F-EW-001 to F-EW-2670; the 223 new ones, F-EW-2448 and later, sit at the end of `facts.md` under "Added cards", not date-sorted); 204 miracle entries (M-EW-001 to M-EW-204); 136 quotations (Q-EW-001 to Q-EW-136). New cards carry Extraction IDs N-F1 to N-F228, N-M01 to N-M63, N-Q01 to N-Q15. Numbering jumps: F-EW-2670 is a late card (Marie-Élisabeth's last years) placed in the middle of the batch.

Gaps closed:
- (a) Bishop Giannattasio (PO 33): fully carded (25 fact cards, 4 miracle entries, 4 quotations).
- (b) Mère Agnès PA 6 [531]–[552]: carded (10 fact cards; the 54-case miracle summary is now 44 miracle entries M-EW-146 to M-EW-189, for the cases not already carded).
- (c) Céline PO 4 [402r]–[415v]: carded (9 fact cards, 5 miracle entries). Most of [402r]–[409r] was already carded; [409v]–[412v] was the missing part; f. [413v]–[415v] holds only the signature.
- (d) Mère Isabelle PO 16: re-read; 16 fact cards and 8 miracle entries added.
- (e) "circular" source lines: 65 cards fixed (49 pure "circular" plus 16 "Aimée circular" or "autobiography; circular"). Each now names the circular, its subject, its writer (Mère Agnès in every case), date and URL.

Scope items added (step 4), from witness texts and community pages that were unread: circular of Thérèse de Saint-Augustin (16 cards); Sr Marie-Élisabeth, the extern sister (8); circular of Marie de l'Eucharistie (16); Fr Piat's biography of Marie Guérin (82 cards: family and money, Isidore Guérin, the Guérin pharmacy, La Musse, health bulletins of July–Sept 1897, Isidore and the Cause, family tomb); Marie-Emmanuel, Saint-Joseph-de-Jésus, Saint-Stanislas, Marguerite-Marie (7). Léonie (PA 11, PO 7) letters from Thérèse: 5 quotations plus 4 more; Marie des Anges PA 10 leftovers; Pichon PO 10 leftovers.

Still open:
- The very long pages were not read: circulars and biographies of Mère Agnès (≈330k), Marie du Sacré-Cœur (≈330k biography, ≈105k circular), Sr Geneviève (≈300k biography, ≈235k circular, ≈173k autobiography), Mère Geneviève the foundress (≈194k circular). The Piat book pages are the only long one done.
- Marie de l'Eucharistie's nineteen health bulletins (July–Sept 1897), her "Souvenirs" of Thérèse, and her letters to Céline Maudelonde are cited by Piat but not on the site.
- No check against page images. No de-duplication (by design).
- Quotations: the new ones are proposals; the "best 20–30" selection is not done.
- `scenes.md`, `works.md`: NOT updated with the new cards. Candidate new scenes: the sealed envelope at Gallipoli (F-EW-2462 to F-EW-2467); Thérèse shutting the grille on Marie Guérin and laughing (F-EW-2605); Canon Maupas and the milk cup (F-EW-2622); the 8 Jan 1897 dream of TSA (F-EW-2551); Isidore Guérin's article of 3 Nov 1891 against Chéron (F-EW-2595). New works: 'Mes armes' (25 Mar 1897), 'Jésus seul' (15 Aug 1896), the cantata for Marie's entry (15 Aug 1895), 'Saint-Stanislas Kostka' (8 Feb 1897), 'La Vertu' coach (by Marie), the eucharistic verse of 16 Jul 1897.
- `gaps-and-conflicts.md` has a new section "From batch N".

(The older text below is kept for the record. Where it says a batch is PARTIAL, read it with this update.)

Stopped on the coordinator's order after an API usage limit ended most helper agents. Written 2026-09-29.

## What is on disk (this folder)

| File | State |
|---|---|
| `sources.md` | Complete for what was consulted. Update the "Read" column when the remaining work is done. |
| `facts.md` | 2,447 cards (F-EW-001 to F-EW-2447), sorted by the date in each card's When line; 441 undated cards at the end. 1,442 marked new to English readers (yes), 965 partial. Not de-duplicated on purpose (one speaker per card). |
| `miracles.md` | 141 entries (M-EW-001 to M-EW-141). Several are the same event told by different witnesses. |
| `quotations.md` | 121 entries. No quotations from batches whose files lack a quotations block. |
| `scenes.md` | 23 curated scenes with final card numbers. `_scene_candidates.md` holds 83 unranked proposals. |
| `works.md` | Summary + 178 card pointers grouped by kind of work (auto-grouped by title keywords; check). |
| `gaps-and-conflicts.md` | The "Gaps and conflicts" sections of every batch that wrote one (A, D, G, J, L, and any partial ones that reached it). |
| `_work/batches/A.md … L.md` | The raw batch notes with extraction IDs. Each final card ends with "Extraction ID: X-Fnn". |
| `_work/INSTRUCTIONS.md` | The exact extraction rules given to the helpers (with the scope ADDENDUM). |
| `_work/merge.py`, `_work/build_out.py` | Rebuild all output files from the batch notes. Edit paths at the top if the scratchpad moves. `idmap.json` maps extraction IDs to final IDs. |

To rebuild after adding cards: put new batch files (same format, a new batch letter, e.g. `M.md`) in the batches folder, set `OUT` in `merge.py` to that folder, add the letter to `order` in `merge.build`, and run `python3 build_out.py`. Card numbers will change; `scenes.md` must then be regenerated (its card lists use `idmap.json`).

## Working source files (plain text, already fetched)

Scratchpad: `/private/tmp/claude-501/-Users-nicholas-Desktop-saints-website/e5f47d61-2316-4712-8219-d4c1aba2c8b7/scratchpad/ew/`
- `wit/PO-NN-*.txt` — each Ordinary Process deposition, split by witness (33 files) + `PO-00-intro.txt`.
- `wit/PA-NN-*.txt` — each Apostolic Process deposition (26 files) + `PA-00-intro.txt`.
- `sub/*.txt` — community subpages (≈100 pages). `sub/<person>__<page>.txt` = `https://archives.carmeldelisieux.fr/au-carmel-du-temps-de-therese/la-communaute/<person>/<page>/`.
If the scratchpad is gone, re-fetch the two process pages (URLs in sources.md) and split them at the "Témoin N -" headings (`_work/h2t.py` converts HTML to text).

## Coverage by batch

| Batch | Sources | Status | What remains |
|---|---|---|---|
| A | PO 1 Mère Agnès | Complete (summary written) | Addendum topics (Opposition/Distinctive/last words/liturgy) partly carded — the helper had begun adding them. Check the end of `A.md`. |
| B | PA 6 Mère Agnès (folios [340]–[552]) | Complete (see update) | Folios [531]–[552] carded in batch N. |
| C | PO 3 Marie du Sacré-Cœur ([304r]–[331v]); PO 4 Sr Geneviève ([333v]–[415v]) | Complete (see update) | PO 4 tail carded in batch N. |
| D | PA 7 Marie; PA 8 Geneviève | Complete | — |
| E | PO 17 / PA 21 Marie de la Trinité; PO 18 Marie-Madeleine; PO 15 / PA 18 Marthe; PA 17 Aimée de Jésus | Nearly complete (last card at PA 17 [1049]–[1050], the file's end) | Apply the addendum; gaps; summary. |
| F | PO 13 / PA 9 Thérèse de Saint-Augustin; PO 14 / PA 10 Marie des Anges; PO 16 Isabelle; PO 7 / PA 11 Léonie | Complete (see update) | PO 16 re-read; PA 11, PA 10 re-read. |
| G | Jeanne Guérin, Benedictines, Pichon, Roulland, Dumaine, Valadier, Lemonnier, chaplains | Complete | — |
| H | Cult and miracle witnesses | Complete (see update) | PO 33 carded in batch N. PO 28 Hélène Knight is only a one-line note (text of 551 chars). |
| I | Notes préparatoires, témoignages, souvenirs, Gonzague pages, Fébronie, Léonie lecture | Nearly complete (ends in the Léonie lecture) | Check that every `témoignage` page was carded (Marie de Jésus, Marie de l'Incarnation, Saint-Jean de la Croix, Saint-Vincent de Paul, Thérèse de Jésus, Marie de Saint-Joseph, Saint-Jean-Baptiste, Hermance). Addendum; gaps; summary. |
| J | Céline's *Conseils et souvenirs*; Marie's autobiographical memories | Complete | — |
| K | Gonzague biography; small biographies; circulars | Mostly complete (see update) | Locators fixed. Circulars of Marie de l'Eucharistie and Thérèse de Saint-Augustin, and four short biographies, done in batch N. |
| L | Local books: De Teil 1913, Dolan 1926, Taylor 1924 (Epilogue, Counsels, Gallipoli/Dorans), Carmel Foundation 1913, Laveille 1928 (deposition quotations only) | Complete | — |

## Not read at all (by design or size)

- Very long community pages about the sisters' later lives: Mère Agnès circular (≈320k chars) and autobiography (≈77k); Sr Marie du Sacré-Cœur biography (≈320k) and circular (≈100k); Sr Geneviève biography (≈300k), autobiography (≈167k), circular (≈227k); Marie de l'Eucharistie biography (≈180k); Mère Geneviève's circular (≈185k). Low priority for Thérèse's life; Céline's autobiography may hold childhood memories.
- Taylor 1924 "Shower of Roses" favours other than Gallipoli and Dorans (other family).
- The eleven miracle-only Ordinary Process depositions (not on the website).

## Tasks still to do before this part is final

1. Finish B, C (tail), F (PO 16), H (PO 33), K (listed files). Apply the addendum to A, B, C, E, F, H, I, K.
2. Fix the locators of K cards that say only "circular".
3. Re-sort the 441 undated cards if a period can be inferred.
4. Choose quotations: `quotations.md` holds all proposals; mark the best 20–30 of Thérèse's own words.
5. Check `works.md` groupings by hand (they were matched by title keywords).
6. Merge gaps from the partial batches once they write them.

## Final report (short)

- Cards: 2,447 fact cards; 1,442 new to English readers (plus 965 partly new); 141 miracle entries; 121 quotations; 23 curated scenes.
- Three most valuable finds: (1) the full sworn depositions of about 60 witnesses on the Archives du Carmel site, including frank material on Mère Marie de Gonzague (jealousy, morphine refused, her weeping before Thérèse's child portrait); (2) cool and critical views of Thérèse from nuns and teachers — "what will our Mother write in her circular?", "insignificant", sandals burned as "filth", a Benedictine who did not believe in "mystical holinesses"; (3) small human details: her mimicry, her laughter at her own funeral plans, the mussel shell for tears, peaches and eau de Cologne, 500 cautery points, Léonie seeing nothing at the 1883 cure, the prison chaplain on Pranzini's crucifix.
- Biggest gaps: Bishop Giannattasio's deposition (Gallipoli) not carded; the end of Mère Agnès's 1915 deposition and of Céline's 1910 deposition; Mère Isabelle; several community circulars; no de-duplication across witnesses.
