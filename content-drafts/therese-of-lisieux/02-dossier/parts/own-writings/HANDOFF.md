# HANDOFF — own-writings part (F-OW / M-OW)

Updated 2026-09-29 after the second pass (gap closing). The first pass wrote 334 cards. The second pass added 251 cards. A new agent continues from these files.

## Output files (all in this folder)

| File | State |
|---|---|
| facts.md | **585 cards** (F-OW-001 … F-OW-585). F-OW-001–334 are in date order. F-OW-335–585 are appended in blocks A–K (see the note at the top of the file). 335 cards are marked "new to English readers: yes" (167 + 168), 237 "partial", 13 "no". **Do not re-run merge.py**: it would renumber everything and break the references in the other files. Append with `_work`-independent scripts instead (the scratch script `append_cards.py` is in the scratchpad dir `ow2/`). |
| quotations.md | Sections A (her writing), B (1897 sayings, recorder named), C (LT 110–181), side-by-side edits, D (LT 1–109, 22 items), E (LT 182–266, 38 items), F (Carnet jaune 16–31 July 1897, 13 items). All French checked against the local texts. |
| miracles.md | M-OW-01 … M-OW-38 (manuscripts and last words; letters LT 1–109 = M-OW-27–34; letters LT 182–266 and Carnet jaune July 1897 = M-OW-35–38). |
| works.md | Manuscripts; letters overview; **section 6: a checked table of all 92 poems, plays and prayers (date, recipient, occasion, tune)** with corrections to the earlier auto-extracted dates. |
| scenes.md | 23 + 8 + 8 + 12 scenes (the last 12 are from LT 182–266, CJ July 1897, Diana Vaughan). |
| gaps-and-conflicts.md | Sections 1–8. Section 8 lists the second-pass gaps, conflicts, edit differences and a verification note. |
| sources.md | Table updated (letters all read; Carnet jaune fully read; poems partly read; the "Dernière année" chronicle added as row 14). |

## What is complete

- Manuscripts A, B, C; Carnet jaune 6 Apr – 30 Sep 1897 (all of July now carded, plus the Paroles retrouvées of 21–26 May no. 11, 8 June, 19 June); last words to Céline, Marie du Sacré-Cœur and other sisters.
- **Letters LT 1–266 are all read and carded.** LT 1–109: merged from `_work/out_lt1.md` (99 cards, F-OW-335–433) plus four cards for letters it had skipped (LT 64, 67, 72, 79: F-OW-434–437). LT 182–266: 83 cards (F-OW-438 to F-OW-520).
- Carnet jaune 16–31 July 1897: F-OW-521 to F-OW-563 (includes the full 17 July "spend my heaven" entry, F-OW-525, and the 30 July extreme unction, F-OW-550 and F-OW-559).
- Poems, plays and prayers: F-OW-564 to F-OW-583 (20 cards), works.md section 6, and two index cards (F-OW-584 connections to other saints; F-OW-585 surprise facts).

## What is still open

1. **Not carded, by choice (one-line items):** LT 3, 4, 8, 10, 12–15, 17 (dedications and one-liners; see works.md section 5) and LT 215.
2. **Poems and prayers read only in the table:** PN 1–16 (other than PN 4), PN 18–39, 41–43, 46, 48, 49, 52, 53; PS 1–7; RP 2, 5, 6 (headers and casts only); Pri 1, 3–5, 7, 8, 10–19. Pri 17 and Pri 19 were read and are mentioned in the index card and works.md but have no card of their own. Their texts are in `_work/pn_all.txt` (JSON-escaped; a decoded copy is `ow2/pn_dec.txt` in the scratchpad).
3. **Ms B and Ms C edit check against the 1911 edition** (item 5 of the earlier list): not done. `chk.py` is in `_work/`. Only phrase checks for the letters and the Carnet jaune were done.
4. **"Dernière année de la vie de Thérèse" chronicle** (`_work/lw_all.txt`, 225 KB): only the Diana Vaughan passages and a few others were read. Other facts may be found there (for example the 9 Jan 1897 dream is already carded from another source). It is modern editorial text: facts only, in our words.
5. **Pages not read at all:** Carmel pages for school notebooks, images, écrits divers, travaux artistiques (URLs in works.md section 4).
6. **Novissima Verba "new to English" labels for the July 1897 sayings** were set by a keyword search only. Compare line by line if the biography quotes them.
7. **Nine quotations in first-pass cards did not match the local texts in an automatic test** (probably spelling, punctuation, or line breaks): "j'assurais être parfaitement guérie"; "il valait mieux parler à Dieu que de parler de Dieu"; "je devrais me désoler de dormir (depuis 7 ans)..."; "Histoire printanière d'une petite fleur blanche écrite par elle-même"; "Moi aussi – après ma mort, je ferai pleuvoir des roses"; "il me venait de telles pensées contre l'autorité"; "on m'a mise «dans un lit de malheur"; "c'est moi qui vous filerai de près !"; "Qu'elles sont gentilles ces deux petites filles-là avec leur jargon inintelligible !". Re-read them against the source before use.
8. Verify any claim that comes only from the Carmel editors (for example the photograph of Thérèse as Joan of Arc sent to "Diana Vaughan", F-OW-578).

## Most valuable finds of the second pass

- LT 36 (20 Nov 1887) gives a plain, same-night account of the Leo XIII audience (F-OW cards in block A).
- The 1911 edition moved and re-dated her farewell letters to Bellière and changed why she was glad to die (F-OW-498); it also hid a sister's name and added a painting job to the 28 May 1897 letter (F-OW-490).
- RP 7 (21 Jun 1896) names Diana Vaughan as a real convert and "a new Joan of Arc" (F-OW-572).
- LT 224 (25 Apr 1897): her own account of Joan of Arc and "my mission... to make the King of Heaven loved" (F-OW-482).
- LT 258 (18 Jul 1897): the parable of the two children; the thought of Heaven gives her no joy (F-OW-508, F-OW-509).
- LT 231–232: "after my death do not believe what will be told you" (F-OW-491).
- Pri 21 (8 Sep 1897): her last text, with the saxifrage flower from her father (F-OW-583).

## Tools and files (scratchpad)

Scratch dir (first pass): `/private/tmp/claude-501/-Users-nicholas-Desktop-saints-website/e5f47d61-2316-4712-8219-d4c1aba2c8b7/scratchpad/ow/`. Second-pass scripts and card sources: `.../scratchpad/ow2/` (`append_cards.py`, `verify_quotes.py`, `cards_B0..E.md`, `pn_dec.txt`). The fetched texts are in `_work/` in this folder (`lt_part1/2/3.txt`, `cj1.txt`, `cj2.txt`, `pn_all.txt`, `lw_all.txt`, `msA/B/C.f.txt`), with `chk.py` and `AGENT-RULES.md`.

- `chk.py "phrase"` tests whether a French phrase is in the 1911 edited text (ABSENT = cut or rewritten).
- `verify_quotes.py file.md` checks that each « … » in "Original words" is in the local texts.
- English checks: `source-library/find.py "<term>" --in therese-of-lisieux`; Novissima Verba text: `source-library/therese-of-lisieux/novissima-verba-1927.txt`.

## Cautions

- Never use archives-carmel-lisieux.fr (casino site). Use archives.carmeldelisieux.fr.
- All English is our translation. Carmel notes, editors' headings, "La santé de Thérèse" summaries and the "Dernière année" chronicle are modern editorial text (rights unknown; facts only, in our words).
- Copy dates, numbers, names and quotations from the raw texts in `_work/`, never from a summary tool.
- Handle "If I had not had faith, I would have killed myself" (22 Sep 1897, F-OW-321) with its context.
