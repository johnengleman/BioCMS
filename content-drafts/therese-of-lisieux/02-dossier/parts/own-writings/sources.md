# Sources — own writings (F-OW)

Researcher: stage 2, source family "the saint's own writings". Written 2026-09-29.

## Locator scheme

| Locator | Meaning | Example |
|---|---|---|
| Ms A 12r / 12v | Manuscript A, folio 12, recto / verso (Carmel transcription; "content_one" = recto, "content_two" = verso) | Ms A 45r |
| Ms B 2v, Ms C 5r | Manuscripts B and C, same scheme | Ms C 7v |
| LT nnn | Letter number in the Carmel's (and the Œuvres complètes) numbering, with recipient and date | LT 43 (to Pauline, 1887) |
| PN nn / RP n / Pri nn | Poem / pious recreation (play) / prayer number | PN 17 "Vivre d'amour" |
| CJ d.m.n | Carnet jaune, day.month, saying number, as numbered on the Carmel site | CJ 30.9 |
| DE/Céline, DE/MSC, DE/autres | Last words recorded by Sr Geneviève (Céline); by Sr Marie du Sacré-Cœur; by other sisters | DE/Céline 16 Aug |
| HA 1911 ch. N | *Histoire d'une âme*, 1911 French edition (Pauline's edited text), chapter N; local file D1a (Gutenberg #36708) | HA 1911 ch. V |

## Rights labels

- **public-domain**: her own words (manuscripts, letters, poems, plays, prayers, 1873–1897); words of 1897 recorded by her sisters; the 1911 *Histoire d'une âme*; Taylor 1912.
- **unknown**: the Carmel of Lisieux's modern transcriptions, headings, editorial notes ("La santé de Thérèse"), and essays on its site. We used them to read her words and for facts only. All English in this dossier is our own translation.
- **facts-only / unknown**: *Novissima Verba*, local English file (actually the 1952 Kenedy edition).

## "New to English readers" scheme

- **no**: in the stage 1 English baseline (Wikipedia EN, Vatican 1997 biography, *Divini amoris scientia*, EWTN/Crawley, Franciscan Media).
- **partial**: not in the baseline, but already in an old public-domain English book (Taylor 1912, which translated Pauline's edited text; or *Novissima Verba* in English), or only summarised in the baseline.
- **yes**: not in the baseline and not in those old English books. English readers have it only from modern copyrighted translations (ICS, Clarke), if at all.
- Test used: phrase search in the 1911 French edited text (D1a) with a script (`chk.py`), and word search in the local *Novissima Verba* English text. A phrase "ABSENT" from D1a was cut or rewritten by Pauline. The test is by exact phrase, so a few "yes" marks may be "partial" if Pauline kept the idea in other words. Cards say "check" where this matters.

## Sources consulted

| # | Source | Bibliographic data | Rights | Reliability | Status |
|---|---|---|---|---|---|
| 1 | Manuscript A (autograph) | Thérèse, Jan 1895 – Jan 1896, to Mère Agnès de Jésus; 86 folios. Carmel transcription with facsimiles: https://archives.carmeldelisieux.fr/archive/manuscrit-a/ (text is embedded in the page as JSON) | her text public-domain; transcription unknown | Highest: her own unedited words. The site's transcription duplicates part of 59v (a site error, not hers) | **Fully read** |
| 2 | Manuscript B | Thérèse, Sept 1896, to Sr Marie du Sacré-Cœur; 5 folios (1r–1v cover letter; 2r–5v dated 8 Sept 1896). https://archives.carmeldelisieux.fr/archive/manuscrit-b/ | same | Highest | **Fully read** |
| 3 | Manuscript C | Thérèse, June–July 1897, to Mère Marie de Gonzague; 37 folios. https://archives.carmeldelisieux.fr/archive/manuscrit-c/ | same | Highest. **The site's transcription is incomplete**: folios 8v and 26v are empty and 27r–27v start mid-sentence. Gaps were checked against HA 1911 ch. X | **Fully read** (as transcribed) |
| 4 | Letters LT 1–266 | 270 pages, one per letter, from https://archives.carmeldelisieux.fr/oeuvres-de-therese/correspondance-de-therese/ ; each at https://archives.carmeldelisieux.fr/correspondance/lt-NNN-.../ | her text public-domain; transcription unknown | Highest (autograph or copies; the Carmel notes which) | All 270 pages fetched; **LT 1–266 all read and carded** (LT 1–109 by a sub-agent, checked for coverage; LT 110–181 by a sub-agent; LT 182–266 read in full in the second pass). Not carded as separate cards: LT 3, 4, 8, 10, 15 (one-line items), LT 215 (one line) |
| 5 | Poems PN, plays RP, prayers Pri | 92 pages under https://archives.carmeldelisieux.fr/archive/ (pn-N, rp-N, titles) | same | Highest | Fetched; dates, recipients, occasions and tunes for all 92 items are in works.md section 6 (from the Carmel pages' header lines); read line by line and carded: PN 17, 40, 44, 45, 47, 50, 51, 54, PS 8, RP 1, 3, 4, 7, 8 (headers and casts), Pri 2, 6, 9, 20, 21; other items only in the table |
| 6 | Carnet jaune (Yellow Notebook) | Sayings recorded by Mère Agnès de Jésus, 6 Apr – 30 Sep 1897, month pages https://archives.carmeldelisieux.fr/archive/cj-avril-1897/ … /cj-septembre-1897/ ; "Paroles retrouvées" /archive/paroles-retrouvees/ ; facsimile pages /archive/carnet-jaune/ and /carnet-jaune-2/ | 1897 words public-domain; transcription and monthly health notes unknown | **Medium-high.** The notebook was written out in 1921–1923 from a destroyed 1904–1905 copy of loose sheets (Langlois). Most sayings are thought unrewritten; "strategic" sayings may be reworked | **Fully read and carded, 6 Apr – 30 Sep 1897**; the July 16–31 entries and three Paroles retrouvées (21–26 May no. 11, 8 Jun, 19 Jun) were carded in the second pass |
| 7 | Last words recorded by Sr Geneviève (Céline) | https://archives.carmeldelisieux.fr/oeuvres-de-therese/dernieres-paroles-de-therese/dernieres-paroles-a-celine/ (July–Sept 1897, plus "Varia" 1–5) | as 6 | Medium: Céline noted only sayings addressed to her, from 21 July 1897; reworked later | **Fully read** |
| 8 | Last words recorded by Sr Marie du Sacré-Cœur | …/dernieres-paroles-marie-du-sacre-coeur/ (8–29 Jul 1897) | as 6 | Medium-high | **Fully read** (pages 8–12 of the notebook are empty on the site) |
| 9 | Last words to other sisters | …/dernieres-paroles-a-dautres-soeurs/ : Sr Marie de l'Eucharistie, Sr Marie de la Trinité, Sr Thérèse de Saint-Augustin, Sr Hermance du Cœur de Jésus, Sr Marie des Anges, Sr Marthe de Jésus | as 6 | Medium: later accounts, some via obituary circulars | **Fully read** |
| 10 | Claude Langlois, "Les dernières paroles de Thérèse sont-elles de Thérèse ?" | Essay on the Carmel site, …/les-dernieres-paroles-de-therese-sont-elles-de-therese/ ; summarises his book *Les dernières paroles de Thérèse de Lisieux* (2000) | unknown (facts only) | Scholarly | Skimmed; key sections read (textual history; shower of roses; Céline's notes) |
| 11 | *Histoire d'une âme*, 1911 French edition | Local: `source-library/therese-of-lisieux/D1a-histoire-dune-ame-gutenberg-36708.txt` (Gutenberg #36708; same text as D1 PDF) | public-domain | Pauline's edited text; used to detect edits and as proxy for what Taylor 1912 translated | Searched by phrase (not read in full) |
| 12 | *Novissima Verba*, English | Local: `novissima-verba-1927.pdf/.txt` (1952 Kenedy edition) | unknown / facts-only | Mère Agnès's 1927 selection (362 sayings) | Searched by word for "new to English" tests |
| 13 | Taylor 1912 (*Story of a Soul*; complete *Little Flower*) | Local: `story-of-a-soul-1912.pdf`, `D5-taylor-little-flower-1912-complete.pdf` | public-domain | English of the edited text | Not read directly; the 1911 French edited text was used as its proxy |
| 14 | "Dernière année de la vie de Thérèse" (chronicle by the Carmel editors) | Pages on the Carmel site (Jan–Sep 1897 and earlier), text in _work/lw_all.txt (225 KB) | unknown; modern editorial text, facts only in our words | Scholarly narrative, not a primary source; its claims (for example the photograph sent to Diana Vaughan) need a second source | Only the passages on Diana Vaughan/Taxil (lines 17, 51–55, 246–247), the 9 Jan 1897 dream and the LT 216 erasure (lines 3–15) and the 16 Jul 1897 entry were read; the rest is unread |
| — | Old domain archives-carmel-lisieux.fr | Now a casino site | — | Never used | Not used |
| — | Gallica | Blocked automated access | — | — | Not used |

## Method notes

- The Carmel pages were read as HTML (the manuscript and notebook pages carry their transcription as embedded JSON). No PDFs or images were downloaded.
- Quotations are copied from the Carmel transcription exactly (including her spelling and the recorders' dialect spellings). Translations are ours.
