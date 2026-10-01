# Sources — merged (stage 2b)

This file merges the four `parts/*/sources.md` files, unchanged, one part after another. Headings sit lower. Locator rules and rights labels differ by part; each part states its own rules first. Common rules: Laveille 1928 and Taylor's books (1912, 1924) are public-domain; Thérèse's own texts are public-domain; the Carmel of Lisieux transcriptions and archive pages are 'unknown' (short French quotation, our own English); modern works are facts-only. The site archives-carmel-lisieux.fr must not be used. No part downloaded any file; downloads that need approval are listed in the parts' gap files.



## Part own-writings (F-OW)

### Original title: Sources — own writings (F-OW)

Researcher: stage 2, source family "the saint's own writings". Written 2026-09-29.

#### Locator scheme

| Locator | Meaning | Example |
|---|---|---|
| Ms A 12r / 12v | Manuscript A, folio 12, recto / verso (Carmel transcription; "content_one" = recto, "content_two" = verso) | Ms A 45r |
| Ms B 2v, Ms C 5r | Manuscripts B and C, same scheme | Ms C 7v |
| LT nnn | Letter number in the Carmel's (and the Œuvres complètes) numbering, with recipient and date | LT 43 (to Pauline, 1887) |
| PN nn / RP n / Pri nn | Poem / pious recreation (play) / prayer number | PN 17 "Vivre d'amour" |
| CJ d.m.n | Carnet jaune, day.month, saying number, as numbered on the Carmel site | CJ 30.9 |
| DE/Céline, DE/MSC, DE/autres | Last words recorded by Sr Geneviève (Céline); by Sr Marie du Sacré-Cœur; by other sisters | DE/Céline 16 Aug |
| HA 1911 ch. N | *Histoire d'une âme*, 1911 French edition (Pauline's edited text), chapter N; local file D1a (Gutenberg #36708) | HA 1911 ch. V |

#### Rights labels

- **public-domain**: her own words (manuscripts, letters, poems, plays, prayers, 1873–1897); words of 1897 recorded by her sisters; the 1911 *Histoire d'une âme*; Taylor 1912.
- **unknown**: the Carmel of Lisieux's modern transcriptions, headings, editorial notes ("La santé de Thérèse"), and essays on its site. We used them to read her words and for facts only. All English in this dossier is our own translation.
- **facts-only / unknown**: *Novissima Verba*, local English file (actually the 1952 Kenedy edition).

#### "New to English readers" scheme

- **no**: in the stage 1 English baseline (Wikipedia EN, Vatican 1997 biography, *Divini amoris scientia*, EWTN/Crawley, Franciscan Media).
- **partial**: not in the baseline, but already in an old public-domain English book (Taylor 1912, which translated Pauline's edited text; or *Novissima Verba* in English), or only summarised in the baseline.
- **yes**: not in the baseline and not in those old English books. English readers have it only from modern copyrighted translations (ICS, Clarke), if at all.
- Test used: phrase search in the 1911 French edited text (D1a) with a script (`chk.py`), and word search in the local *Novissima Verba* English text. A phrase "ABSENT" from D1a was cut or rewritten by Pauline. The test is by exact phrase, so a few "yes" marks may be "partial" if Pauline kept the idea in other words. Cards say "check" where this matters.

#### Sources consulted

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

#### Method notes

- The Carmel pages were read as HTML (the manuscript and notebook pages carry their transcription as embedded JSON). No PDFs or images were downloaded.
- Quotations are copied from the Carmel transcription exactly (including her spelling and the recorders' dialect spellings). Translations are ours.

## Part life-family (F-LF)

### Original title: Sources — life, family and historical context (stage 2, part "life-family")

Researcher: life-family agent. Written 2026-09-29. Card prefix F-LF-, miracle prefix M-LF-.
This part covers the chronological life, the Martin and Guérin families, the Alençon and Lisieux settings, the Carmel's history, and the historical context. Other parts cover her own writings, the process testimony and the official miracles in depth.

#### Locator rules used in the cards

- **LAV p.N** = Laveille 1928 English, `source-library/therese-of-lisieux/laveille-1928.pdf`, **PDF page N**. Book page = PDF page − 20. Cards give the PDF page.
- **FND p.N** = *The Foundation of the Carmel of Lisieux* (1913), `source-library/therese-of-lisieux/carmel-foundation-1913.pdf`, PDF page N.
- **CF n** = a letter of the Martin family correspondence, numbered as in the Carmel archive (*Correspondance familiale*). The URL of every cited CF letter is in the table in section 3 below. Letters without a CF number are cited by writer, addressee and date, with the full URL.
- **Carmel page "…"** = a page of https://archives.carmeldelisieux.fr/ ; full URL in section 2.
- **HA ch./p.** = *Histoire d'une Âme* chapter and page **as cited in Laveille's footnotes** (French edition). This is a secondary locator only. Other parts of the dossier check her words against the manuscripts.
- **Summarium 1919 p./§**, **Process of the Ordinary p.**, **Apostolic Process p.** = the process citations **as printed in Laveille's footnotes**. I did not see these printed volumes.

#### 1. Local books (read)

| Source | Bibliographic data | Rights | Reliability notes | Read? |
|---|---|---|---|---|
| Laveille 1928 (LAV) | Mgr Auguste-Pierre Laveille, *St Thérèse de l'Enfant Jésus 1873–1897, according to the official documents of the Carmel of Lisieux*, tr. Rev. M. Fitzsimons OMI, Benziger / Burns Oates, 1928 (French 1925; English from the 3rd French ed.). 472 pp. Letter-preface by Mgr Alfred Baudrillart, 12 Sep 1925. | public-domain (US) | The Carmel chose the author. Every page was checked by "the three Carmelite sisters" of the saint (LAV p.18), so it is the family's authorised version. It quotes about 130 unpublished Zélie letters and many process depositions with page numbers. **Laveille was himself a pilgrim on the 1887 Rome pilgrimage** (LAV p.17, p.176, p.183, p.187–188, p.413). Weaknesses: it smooths the family letters (it drops Zélie's words on the child's tantrums and stubbornness; see F-LF-064, F-LF-066); it never names the Bon-Sauveur asylum or Caen (it says "a Home chosen by his family", LAV p.216); it adds pious commentary and some scenery. The Appendix (LAV p.448–467) prints 15 letters of Thérèse to the Guérins and ancestral civil and military records. | Fully read. PDF pp. 1–119 read directly by me; pp. 120–473 read in full by three helper readers who made page-tagged notes; I spot-checked page images (p.23, and the helpers checked p.195, p.416–417, p.461–466 and others). |
| Foundation 1913 (FND) | *The Foundation of the Carmel of Lisieux and its Foundress, Reverend Mother Geneviève of St Teresa*, tr. "a religious of the Society of the Holy Child Jesus", St Anselm Society, London, 1913. 60 pp. From Carmel documents and oral testimony. | public-domain | A Carmel publication; edifying tone; dates of Mother Geneviève's priorates are internally inconsistent (FND p.36, p.39). Useful for the house, the poverty, the Superiors (Sauvage, Cagnard, Delatroëtte) and Mother Geneviève's influence on Thérèse. | Fully read (by a helper reader; notes checked against pp. 12–13 images). |
| Other local files | `story-of-a-soul-1912.pdf`, `novissima-verba-1927.pdf`, D1–D12 downloads | — | Not my source family. Other parts use them. I searched them only for "Taxil", "Diana" and "Bon Sauveur": no relevant hits (only Latin *taxillus* in AAS 13). | Searched only |

#### 2. Web pages, Archives du Carmel de Lisieux (archives.carmeldelisieux.fr)

Rights: the site has no copyright statement (see 01-plan §9). The 19th-century letters are public-domain in substance. The site's transcriptions, notes and essays are treated as **unknown**: I use them for facts, and I give short French extracts with **our own English translation**. Fetched 2026-09-29 with a plain HTTP client (text only; no files downloaded to the project).

| Page | URL | Author / nature | Used for |
|---|---|---|---|
| Correspondence index (72 pages, about 3,547 letters) | https://archives.carmeldelisieux.fr/correspondance/ | Carmel transcriptions of the family correspondence, with editor's notes in brackets | Index of letters |
| Zélie Martin | https://archives.carmeldelisieux.fr/personnage/zelie-martin/ | Short Carmel biography | Birth place Gandelain; business dates |
| Louis Martin | https://archives.carmeldelisieux.fr/personnage/louis-martin/ | Short Carmel biography | Illness named as cerebral arteriosclerosis; death at La Musse |
| Le couple Martin | https://archives.carmeldelisieux.fr/le-couple-martin/ | Carmel essay (cites P. Piat, Céline's books, the processes) | Louis's youth; Zélie's childhood and business; Louis's illness, asylum number 14 449, 3 years 3 months |
| Léonie et les siens ou la grâce de la dernière place | https://archives.carmeldelisieux.fr/leonie-et-les-siens-ou-la-grace-de-la-derniere-place/ | Lecture by Anne-Marie Pelletier, Lisieux colloquium, 30 Sep 1999 | Léonie's dates and difficulties (facts-only) |
| Les 46 éditions de Histoire d'une âme | https://archives.carmeldelisieux.fr/naissance-dune-sainte/lhistoire-du-ame/les-46-editions-de-histoire-dune-ame-de-1898-a-1955/ | Essay and table by Claude Langlois | Printing and copies 1898–1955 (facts-only) |
| Histoire et généalogie des Martin et Guérin | https://archives.carmeldelisieux.fr/environnement-familial/histoire-et-genealogie-des-martin-et-guerin/ | Genealogy by Daniel Audibert (Feb 2014) | Only the dedication was readable as text |
| Bottin (who's who) | https://archives.carmeldelisieux.fr/environnement-familial/bottin/ | Carmel index of persons | Name forms (e.g. Sr Costard, Dr de Cornière, Louise Gasse, Mme Deverny) |
| Family library, schooling, places, First Communions | …/environnement-familial/le-contenu-de-la-bibliotheque-familiale/ ; …/scolarite-des-filles/ ; …/lieux-de-vie/ ; …/les-premieres-communions/ | Carmel pages | Pages load their content by script; little text reached. Not used. |
| Illness at 10, Rome journey | …/la-vie-de-sainte-therese-de-lisieux/la-maladie-de-therese-a-10-ans/ ; …/voyage-a-rome/ | Carmel pages | Content loads by script; no text reached. Not used. |

#### 3. Family letters cited (Carmel archive transcriptions)

All letters: text public-domain in substance; transcription rights unknown; English in the cards is **our translation**. The site's editor sometimes inserts notes in round or square brackets; I do not quote those notes as the letter.

Zélie Martin's letters (CF numbers):

| CF 15 | https://archives.carmeldelisieux.fr/correspondance/de-mme-martin-a-son-frere-isidore-guerin-cf-15-7-novembre-1865/ |
| CF 85 | https://archives.carmeldelisieux.fr/correspondance/de-mme-martin-a-sa-belle%e2%80%91soeur-cf-85-16-janvier-1873/ |
| CF 86 | https://archives.carmeldelisieux.fr/correspondance/de-mme-martin-a-son-frere-isidore-guerin-cf-86-17-janvier-1873/ |
| CF 87 | https://archives.carmeldelisieux.fr/correspondance/de-mme-martin-a-son-frere-isidore-guerin-cf-87-1er-mars-1873/ |
| CF 88 | https://archives.carmeldelisieux.fr/correspondance/de-mme-martin-a-mme-guerin-cf-88-9-mars-1873/ |
| CF 89 | https://archives.carmeldelisieux.fr/correspondance/de-mme-martin-a-mme-guerin-cf-89-mars-1873/ |
| CF 90 | https://archives.carmeldelisieux.fr/correspondance/de-mme-martin-a-mme-guerin-cf-90-30-mars-1873/ |
| CF 92 | https://archives.carmeldelisieux.fr/correspondance/de-mme-martin-a-sa-fille-pauline-cf-92-avril-1873/ |
| CF 98 | https://archives.carmeldelisieux.fr/correspondance/de-mme-martin-a-sa-fille-pauline-cf-98-5-mai-1873/ |
| CF 103 | https://archives.carmeldelisieux.fr/correspondance/de-mme-martin-a-mme-guerin-cf-103-29-mai-1873/ |
| CF 104 | https://archives.carmeldelisieux.fr/correspondance/de-mme-martin-a-sa-fille-pauline-cf-104-1er-juillet-1873/ |
| CF 106 | https://archives.carmeldelisieux.fr/correspondance/de-mme-martin-a-mme-guerin-cf-106-20-juillet-1873/ |
| CF 110 | https://archives.carmeldelisieux.fr/correspondance/de-mme-martin-a-ses-filles-marie-et-pauline-cf-110-1er-novembre-1873/ |
| CF 111 | https://archives.carmeldelisieux.fr/correspondance/de-mme-martin-a-son-frere-isidore-guerin-cf-111-29-novembre-1873/ |
| CF 112 | https://archives.carmeldelisieux.fr/correspondance/de-mme-martin-a-ses-filles-marie-et-pauline-cf-112-30-novembre-1873/ |
| CF 113 | https://archives.carmeldelisieux.fr/correspondance/de-mme-martin-a-son-frere-isidore-guerin-et-a-sa-belle%e2%80%91soeur-cf-113-13-decembre-1873/ |
| CF 114 | https://archives.carmeldelisieux.fr/correspondance/de-mme-martin-a-son-frere-isidore-guerin-et-a-sa-belle%e2%80%91soeur-cf-114-11-janvier-1874/ |
| CF 115 | https://archives.carmeldelisieux.fr/correspondance/de-mme-martin-a-ses-filles-marie-et-pauline-cf-115-mars-1874/ |
| CF 116 | https://archives.carmeldelisieux.fr/correspondance/de-mme-martin-a-son-frere-isidore-guerin-cf-116-29-mars-1874/ |
| CF 117 | https://archives.carmeldelisieux.fr/correspondance/de-mme-martin-a-mme-guerin-cf-117-1er-juin-1874/ |
| CF 118 | https://archives.carmeldelisieux.fr/correspondance/de-mme-martin-a-mme-guerin-cf-118-24-juin-1874/ |
| CF 119 | https://archives.carmeldelisieux.fr/correspondance/de-mme-martin-a-ses-filles-marie-et-pauline-cf-119-25-juin-1874/ |
| CF 121 | https://archives.carmeldelisieux.fr/correspondance/de-mme-martin-a-son-frere-isidore-guerin-et-a-sa-belle%e2%80%91soeur-cf-121-9-aout-1874/ |
| CF 124 | https://archives.carmeldelisieux.fr/correspondance/de-mme-martin-a-mme-guerin-cf-124-8-novembre-1874/ |
| CF 125 | https://archives.carmeldelisieux.fr/correspondance/de-mme-martin-a-mme-guerin-cf-125-13-decembre-1874/ |
| CF 126 | https://archives.carmeldelisieux.fr/correspondance/de-mme-martin-a-mme-guerin-cf-126-24-decembre-1874/ |
| CF 130 | https://archives.carmeldelisieux.fr/correspondance/de-mme-martin-a-mme-guerin-cf-130-14-mars-1875/ |
| CF 131 | https://archives.carmeldelisieux.fr/correspondance/de-mme-martin-a-son-frere-isidore-guerin-et-a-sa-belle%e2%80%91soeur-cf-131-29-avril-1875/ |
| CF 132 | https://archives.carmeldelisieux.fr/correspondance/de-mme-martin-a-mme-guerin-cf-132-19-mai-1875/ |
| CF 136 | https://archives.carmeldelisieux.fr/correspondance/de-mme-martin-a-mme-guerin-cf-136-22-aout-1875/ |
| CF 141 | https://archives.carmeldelisieux.fr/correspondance/de-mme-martin-a-sa-fille-pauline-cf-141-10-octobre-1875/ |
| CF 144 | https://archives.carmeldelisieux.fr/correspondance/de-mme-martin-a-mme-guerin-cf-144-31-octobre-1875/ |
| CF 146 | https://archives.carmeldelisieux.fr/correspondance/de-mme-martin-a-sa-fille-pauline-cf-146-21-novembre-1875/ |
| CF 147 | https://archives.carmeldelisieux.fr/correspondance/de-mme-martin-a-sa-fille-pauline-cf-147-5-decembre-1875/ |
| CF 148 | https://archives.carmeldelisieux.fr/correspondance/de-mme-martin-a-mme-guerin-cf-148-28-decembre-1875/ |
| CF 149 | https://archives.carmeldelisieux.fr/correspondance/de-mme-martin-a-mme-guerin-cf-149-9-janvier-1876/ |
| CF 151 | https://archives.carmeldelisieux.fr/correspondance/de-mme-martin-a-sa-fille-pauline-cf-151-janvier-1876/ |
| CF 154 | https://archives.carmeldelisieux.fr/correspondance/de-mme-martin-a-sa-fille-pauline-cf-154-26-fevrier-1876/ |
| CF 155 | https://archives.carmeldelisieux.fr/correspondance/de-mme-martin-a-mme-guerin-cf-155-5-mars-1876/ |
| CF 156 | https://archives.carmeldelisieux.fr/correspondance/de-mme-martin-a-sa-fille-pauline-cf-156-12-mars-1876/ |
| CF 157 | https://archives.carmeldelisieux.fr/correspondance/de-mme-martin-a-sa-fille-pauline-cf-157-26-mars-1876/ |
| CF 158 | https://archives.carmeldelisieux.fr/correspondance/de-mme-martin-a-mme-guerin-cf-158-7-mai-1876/ |
| CF 159 | https://archives.carmeldelisieux.fr/correspondance/de-mme-martin-a-sa-fille-pauline-cf-159-14-mai-1876/ |
| CF 160 | https://archives.carmeldelisieux.fr/correspondance/de-mme-martin-a-sa-fille-pauline-cf-160-21-mai-1876/ |
| CF 164 | https://archives.carmeldelisieux.fr/correspondance/de-mme-martin-a-sa-fille-pauline-cf-164-16-juillet-1876/ |
| CF 169 | https://archives.carmeldelisieux.fr/correspondance/de-mme-martin-a-sa-fille-pauline-cf-169-22-octobre-1876/ |
| CF 170 | https://archives.carmeldelisieux.fr/correspondance/de-mme-martin-a-sa-fille-pauline-cf-170-29-octobre-1876/ |
| CF 172 | https://archives.carmeldelisieux.fr/correspondance/de-mme-martin-a-sa-fille-pauline-cf-172-3-novembre-1876/ |
| CF 173 | https://archives.carmeldelisieux.fr/correspondance/de-mme-martin-a-mme-guerin-cf-173-12-novembre-1876/ |
| CF 175 | https://archives.carmeldelisieux.fr/correspondance/de-mme-martin-a-sa-fille-pauline-cf-175-3-decembre-1876/ |
| CF 176 | https://archives.carmeldelisieux.fr/correspondance/de-mme-martin-a-sa-belle-soeur-cf-176-7-decembre-1876/ |
| CF 177 | https://archives.carmeldelisieux.fr/correspondance/de-mme-martin-a-mme-guerin-cf-177-17-decembre-1876/ |
| CF 182 | https://archives.carmeldelisieux.fr/correspondance/de-mme-martin-a-mme-guerin-cf-182-8-janvier-1877/ |
| CF 188 | https://archives.carmeldelisieux.fr/correspondance/de-mme-martin-a-pauline-cf-188-13-fevrier-1877/ |
| CF 192 | https://archives.carmeldelisieux.fr/correspondance/de-mme-martin-a-pauline-cf-192-4-mars-1877/ |
| CF 193 | https://archives.carmeldelisieux.fr/correspondance/de-mme-martin-a-mme-guerin-cf-193-12-mars-1877/ |
| CF 194 | https://archives.carmeldelisieux.fr/correspondance/de-mme-martin-a-pauline-cf-194-12-mars-1877/ |
| CF 195 | https://archives.carmeldelisieux.fr/correspondance/de-mme-martin-a-pauline-cf-195-22-mars-1877/ |
| CF 196 | https://archives.carmeldelisieux.fr/correspondance/de-mme-martin-a-mme-guerin-cf-196-25-mars-1877/ |
| CF 197 | https://archives.carmeldelisieux.fr/correspondance/de-mme-martin-a-mme-guerin-cf-197-12-avril-1877/ |
| CF 201 | https://archives.carmeldelisieux.fr/correspondance/de-mme-martin-a-pauline-cf-201-10-mai-1877/ |
| CF 204 | https://archives.carmeldelisieux.fr/correspondance/de-mme-martin-a-pauline-cf-204-mai-1877/ |
| CF 205 | https://archives.carmeldelisieux.fr/correspondance/de-mme-martin-a-son-frere-isidore-et-a-sa-belle%e2%80%91soeur-cf-205-7-juin-1877/ |
| CF 206 | https://archives.carmeldelisieux.fr/correspondance/de-mme-martin-a-son-frere-isidore-cf-206-11-juin-1877/ |
| CF 207 | https://archives.carmeldelisieux.fr/correspondance/de-mme-martin-a-mme-guerin-cf-207-14-juin-1877/ |
| CF 208 | https://archives.carmeldelisieux.fr/correspondance/de-mme-martin-a-m-martin-cf-208-juin-1877/ |
| CF 209 | https://archives.carmeldelisieux.fr/correspondance/de-mme-martin-a-son-frere-isidore-guerin-et-a-sa-belle%e2%80%91soeur-cf-209-24-juin-1877/ |
| CF 210 | https://archives.carmeldelisieux.fr/correspondance/de-mme-martin-a-pauline-cf-210-25-juin-1877/ |
| CF 212 | https://archives.carmeldelisieux.fr/correspondance/de-mme-martin-a-mme-guerin-cf-212-8-juillet-1877/ |
| CF 213 | https://archives.carmeldelisieux.fr/correspondance/de-mme-martin-a-mme-guerin-cf-213-15-juillet-1877/ |
| CF 214 | https://archives.carmeldelisieux.fr/correspondance/de-mme-martin-a-pauline-cf-214-15-juillet-1877/ |
| CF 215 | https://archives.carmeldelisieux.fr/correspondance/de-mme-martin-a-son-frere-isidore-guerin-et-a-sa-belle%e2%80%91soeur-cf-215-24-juillet-1877/ |
| CF 216 | https://archives.carmeldelisieux.fr/correspondance/de-mme-martin-a-son-frere-isidore-guerin-cf-216-27-juillet-1877/ |
| CF 217 | https://archives.carmeldelisieux.fr/correspondance/de-mme-martin-a-son-frere-isidore-guerin-cf-217-16-aout-1877/ |

Other letters (no CF number), all at `https://archives.carmeldelisieux.fr/correspondance/<slug>/`:

| Letter | Slug |
|---|---|
| Louis Martin to Zélie, 8 Oct 1863 | de-m-martin-a-sa-femme-8-octobre-1863 |
| Louis Martin to Pauline, [22?] May 1873 | de-m-martin-a-pauline-22-mai-1873 |
| Louis Martin to his five daughters, 25 Nov 1877 | de-louis-martin-a-ses-cinq-filles-marie-pauline-leonie-celine-therese-25-novembre-1877 |
| Louis Martin to his five daughters, 29 Nov 1877 | de-louis-martin-a-ses-cinq-filles-marie-pauline-leonie-celine-therese-a-lisieux-29-novembre-1877 |
| Louis Martin to François-Julien Nogrix, 1883 | de-louis-martin-a-m-francois-julien-nogrix-1883 |
| Louis Martin to his daughters, Paris, 2 Aug 1885 | de-louis-martin-a-ses-filles-2-aout-1885 |
| Louis Martin to Marie: Munich 27 Aug, Vienna 30 Aug, Black Sea 7 Sep, Constantinople 11 and 16 Sep, Naples 25 Sep, Rome 27 Sep, Milan 6 Oct 1885 | de-louis-martin-a-sa-fille-marie-27-aout-1885 ; …-30-aout-1885 ; …-7-septembre-1885 ; …-11-septembre-1885 ; …-16-septembre-1885 ; …-25-septembre-1885 ; …-27-septembre-1885 ; …-6-octobre-1885 |
| Louis Martin to his Carmelite daughters, 14 Aug 1887 (visiting card) | de-m-martin-a-ses-filles-carmelites-14-aout-1887 |
| Louis Martin to the Nogrix family, 10 Apr 1888 | de-m-martin-a-la-famille-nogrix-10-avril-1888 |
| Louis Martin to his Carmelite daughters, after 15 Jun 1888 | de-m-martin-a-ses-filles-carmelites-apres-le-15-juin-1888 |
| Sr Agnès de Jésus to Céline, 17(?) Jun 1888 | de-soeur-agnes-de-jesus-a-celine-17-juin-1888 |
| Mme Guérin to her husband, 26 Jun 1888 | de-madame-guerin-a-son-mari-26-juin-1888 |
| Mme Guérin to her Carmelite nieces, 26 Jun 1888 | de-madame-guerin-a-ses-nieces-carmelites-26-juin-1888 |
| Céline to Agnès, Marie du Sacré-Cœur and Thérèse, Jan–Feb 1889 (fragment) | de-celine-a-ses-soeurs-agnes-msc-therese-janvier-fevrier-1889-fragment |
| Céline to the same, 12 Feb 1889 (fragment) | de-celine-a-agnes-msc-therese-12-fevrier-1889-fragment |
| Céline to the same, Feb 1889 (fragment) | de-celine-a-agnes-msc-therese-fevrier-1889-fragment |
| Céline to Pauline Romet, 18 Feb 1889 | de-celine-a-pauline-romet-18-fevrier-1889 |
| Céline to the same three, 27 Feb 1889 (fragment) | de-celine-a-ses-soeurs-agnes-msc-therese-27-fevrier-1889-fragment |
| Céline to the same three, 1 Mar 1889, from Caen (fragments) | de-celine-a-ses-soeurs-agnes-de-jesus-marie-du-sacre-coeur-et-therese-fragments-1er-mars-1889 |
| Mme Guérin to Jeanne La Néele, 8, 10 and 15 May 1892 | de-madame-guerin-a-jeanne-la-neele-8-mai-1892 ; …-10-mai-1892 ; …-15-mai-1892 |
| Céline to Mère Agnès, Marie du Sacré-Cœur and Thérèse, 29 Jul 1894 | de-celine-a-mere-agnes-de-jesus-soeur-marie-du-sacre-coeur-et-therese-29-juillet-1894 |

I fetched and extracted about 450 letters (all of Zélie's 204 letters on the site, all of Louis's, the letters of 1870–1879, and the letters of the key months of Louis's illness: Jun–Jul 1888, Nov 1888, Feb–Mar 1889, May 1892, Jul–Aug 1894). I read in full every Zélie letter passage that names Thérèse (70 letters from CF 83 to CF 217), Zélie's last letters CF 204–217, all Louis letters, and the illness letters listed above. I did **not** read the other ~3,100 letters on the site (Guérin, Carmel and later correspondence 1878–1941). See gaps-and-conflicts.md.

#### 4. Modern reference works and scholarship (facts-only)

Collected by a helper researcher with web search; each URL is listed with the fact it supports in the context cards (F-LF-256 to F-LF-260 and the cards marked "via helper") and in `gaps-and-conflicts.md`. See the list at the end of this file (section 6), which lists them.

#### 5. Sources not reached

- The printed *Summarium* (1914, 1919) and the *Procès* (Teresianum 1973, 1976): not seen. All process citations come through Laveille's footnotes.
- *Correspondance familiale* (Cerf 2004) printed apparatus: not seen (modern; facts-only anyway).
- Abbé Madeline, *Athis-de-l'Orne et la Bienheureuse Thérèse*: not found.
- P. Stéphane-Joseph Piat, *Histoire d'une famille* (1945) and Céline's books on her parents: cited by the Carmel page only; not seen.
- Gallica: blocked, not used (per instructions).

#### 6. Web pages fetched (modern and Carmel), with outcome

Helper research of 2026-09-29 (web-context.md), and pages I fetched myself. "WORKED" means the page was read; where the helper read only a summary or search snippet, the cards say so. All modern works are facts-only. Pages marked FAILED were not used. Raw page text (not summaries) was used for every date and quotation from my own fetches, per the coordinator's rule.

Fetched by me in this stage (raw text read with curl, output not saved to disk):
- https://archives.carmeldelisieux.fr/la-vie-de-sainte-therese-de-lisieux/la-maladie-de-therese-a-10-ans/ — WORKED (date of the cure: 13 May 1883, Pentecost; list of sub-pages)
- https://archives.carmeldelisieux.fr/environnement-familial/les-premieres-communions/premieres-communions-des-filles-martin/ — WORKED (First Communion dates of the five Martin girls; Abbé Domin's letter of Dec 1898)
- https://en.wikipedia.org/wiki/Jules_Ferry_laws — WORKED
- https://fr.wikipedia.org/wiki/Histoire_de_la_la%C3%AFcit%C3%A9_en_France — WORKED (1880 decrees)
- https://fr.wikipedia.org/wiki/Loi_du_1er_juillet_1901_relative_au_contrat_d%27association — WORKED (lead only)
- https://fr.wikipedia.org/wiki/Loi_du_9_d%C3%A9cembre_1905_concernant_la_s%C3%A9paration_des_%C3%89glises_et_de_l%27%C3%89tat — WORKED (lead only)
- https://fr.wikipedia.org/wiki/D%C3%A9crets_du_29_mars_1880 — WORKED (only a redirect stub, no text)

From the helper's URL log:
- https://fr.wikipedia.org/wiki/Louis_Martin_(saint) — FAILED (404)
- https://fr.wikipedia.org/wiki/Zélie_Martin — WORKED (resolves to the joint article "Louis et Zélie Martin")
- https://fr.wikipedia.org/wiki/Léonie_Martin — WORKED
- https://fr.wikipedia.org/wiki/Isidore_Guérin — WORKED
- https://archives.carmeldelisieux.fr/ — WORKED (home, site map)
- https://archives.carmeldelisieux.fr/en/personnage/louis-martin/ — WORKED (short bio)
- https://archives.carmeldelisieux.fr/environnement-familial/famille-de-therese/ — WORKED (index of family pages)
- https://archives.carmeldelisieux.fr/personnage/les-petits-enfants-du-ciel/ — WORKED
- https://archives.carmeldelisieux.fr/personnage/zelie-martin/ — WORKED (short bio)
- https://archives.carmeldelisieux.fr/personnage/soeur-francoise-therese/ — WORKED (full text of Fr Stéphane-Joseph Piat's biography of Léonie, Office Central de Lisieux 1967)
- https://archives.carmeldelisieux.fr/personnage/isidore-guerin/ — WORKED (short bio)
- https://archives.carmeldelisieux.fr/personnage/louis-martin/ — WORKED (FR short bio)
- https://archives.carmeldelisieux.fr/environnement-familial/lieux-de-vie/ — WORKED (list of places)
- https://archives.carmeldelisieux.fr/lieux/le-havre/ — WORKED
- https://archives.carmeldelisieux.fr/lieux/la-musse/ — WORKED
- https://archives.carmeldelisieux.fr/lieux/buissonnets/ — WORKED
- https://archives.carmeldelisieux.fr/lieux/abbaye-benedictine-notre-dame-du-pre/ — WORKED
- https://leoniemartin.org/my-blog-about-st-therese/2013/6/25/louis-martin-is-found-at-le-havre-june-27-1888-125-years-ago.html — WORKED (blog by Maureen O'Riordan; cites Clarke's Letters vol. I and Gaucher 2010)
- https://www.louisandzeliemartin.org/blessed-louis-and-zelie-martin-blog/tag/Bon+Sauveur — WORKED (blog by Maureen O'Riordan; cites Carmel archives and Hénault-Morel 2015)
- https://louisandzeliemartin.org/blessed-louis-and-zelie-martin-blog/tag/Caen — WORKED (same blog)
- https://www.ewtn.com/catholicism/library/her-father-louis-martin-13794 — WORKED (little detail)
- https://www.ewtn.com/catholicism/library/her-father-louis-martin-13782 — WORKED (extract from General Correspondence vol. II, tr. Clarke, ICS 1988)
- https://archives.carmeldelisieux.fr/personnage/celine-martin/ — WORKED (short bio)
- https://archives.carmeldelisieux.fr/lieux/rues-labbey-et-paul-banaston/ — WORKED
- https://archives.carmeldelisieux.fr/lieux/lisieux/ — WORKED
- https://en.wikipedia.org/wiki/Louis_Martin_and_Marie-Az%C3%A9lie_Gu%C3%A9rin — WORKED
- https://www.aciprensa.com/noticias/54764/este-es-el-milagro-que-permitira-canonizacion-de-padres-de-santa-teresa-de-lisieux — WORKED (ACI Prensa, 18 Mar 2015)
- https://www.ilgiornale.it/news/tettamanzi-celebra-guarigione-miracolosa-monza.html — WORKED (Il Giornale, Sabrina Cottone, 19 Jul 2009)
- https://www.louisandzeliemartin.org/canonization-miracle — WORKED
- https://www.louisandzeliemartin.org/the-beatification-miracle — WORKED
- https://louisandzeliemartin.org/history-of-the-cause — WORKED
- https://therecord.com.au/news/international/extraordinary-story-of-carmen-leads-to-canonisation-for-parents-of-st-therese/ — WORKED (The Record, Perth, 21 Oct 2015, from CNA/Zenit)
- https://fr.wikipedia.org/wiki/Diana_Vaughan — WORKED (long article on the Taxil hoax, cites Introvigne, Rossi, Weber, Cerf 1975 edition)
- https://en.wikipedia.org/wiki/Taxil_hoax — WORKED
- https://churchpop.com/the-surprising-little-known-story-behind-st-thereses-famous-joan-of-arc-photo/ — WORKED (low quality, no sources)
- https://it-front.aleteia.org/2021/10/19/when-st-therese-dressed-up-as-joan-of-arc-and-the-sad-story-of-the-photo — FAILED (DNS error)
- https://archives.carmeldelisieux.fr/type_archive/recreations-pieuses/ — WORKED (list)
- https://archives.carmeldelisieux.fr/archive/le-triomphe-de-lhumilite/ — WORKED
- https://archives.carmeldelisieux.fr/archive/jeanne-darc-dans-sa-prison-photos-de-therese-n13-et-14-1896/ — WORKED
- https://archives.carmeldelisieux.fr/photos-de-therese/ — WORKED
- https://archives.carmeldelisieux.fr/la-vie-de-sainte-therese-de-lisieux/sainte-therese-de-lisieux/ — WORKED
- https://archives.carmeldelisieux.fr/oeuvres-de-therese/dernieres-paroles-de-therese/derniere-annee-de-la-vie-de-therese/ — WORKED (Carmel chronology, Sep–Dec 1896)
- https://archives.carmeldelisieux.fr/oeuvres-de-therese/dernieres-paroles-de-therese/derniere-annee-de-la-vie-de-therese-2/ — WORKED (Carmel chronology, 1897)
- https://archives.carmeldelisieux.fr/wp-json/wp/v2/search?search=Vaughan — WORKED (site search)
- https://archives.carmeldelisieux.fr/personnage/taxil-leo-monsieur-ne-gabriel-antoine-jogand-pages/ — WORKED
- https://archives.carmeldelisieux.fr/correspondance/de-soeur-marie-de-leucharistie-a-mme-guerin-17-juin-1896/ — WORKED
- https://archives.carmeldelisieux.fr/correspondance/de-soeur-marie-du-s-coeur-a-m-et-mme-guerin-21-juin-1896/ — WORKED
- https://archives.carmeldelisieux.fr/naissance-dune-sainte/lhistoire-du-ame/ — WORKED (index only)
- https://archives.carmeldelisieux.fr/naissance-dune-sainte/lhistoire-du-ame/la-fabrication-de-lhistoire-dune-ame/ — WORKED
- https://archives.carmeldelisieux.fr/naissance-dune-sainte/lhistoire-du-ame/les-46-editions-de-histoire-dune-ame-de-1898-a-1955/ — WORKED (by Claude Langlois; edition table)
- https://archives.carmeldelisieux.fr/naissance-dune-sainte/lhistoire-du-ame/les-editions-critiques-1956-et-apres/ — WORKED (first-person account by a member of the Centenary Edition team, probably Mgr Guy Gaucher — author not named on the page)
- https://archives.carmeldelisieux.fr/naissance-dune-sainte/lhistoire-du-ame/les-traductions/ — WORKED
- https://fr.wikipedia.org/wiki/Histoire_d'une_âme — WORKED (disambiguation page only)
- https://fr.wikipedia.org/wiki/Histoire_d%27une_%C3%A2me_(Th%C3%A9r%C3%A8se_de_Lisieux) — WORKED (long article; cites Antoinette Guise 2000, Conrad De Meester, Julie Bourgoin 2021, Carmel archives)
- https://fr.wikipedia.org/wiki/Manuscrits_autobiographiques — FAILED (no such article)
- https://archives.carmeldelisieux.fr/la-vie-de-sainte-therese-de-lisieux/voyage-a-rome/ — WORKED (heading only)
- https://archives.carmeldelisieux.fr/la-vie-de-sainte-therese-de-lisieux/voyage-a-rome/horaires/ — WORKED (day-by-day timetable)
- https://archives.carmeldelisieux.fr/personnage/germain-abel-anastase-monseigneur/ — WORKED
- https://archives.carmeldelisieux.fr/personnage/huet-louis-monsieur-le-chanoine/ — WORKED
- https://archives.carmeldelisieux.fr/la-vie-de-sainte-therese-de-lisieux/voyage-a-rome/recit-de-huet/ — WORKED (Abbé Huet's letters to the Semaine religieuse de Bayeux)
- https://archives.carmeldelisieux.fr/la-vie-de-sainte-therese-de-lisieux/voyage-a-rome/recits-de-celine/ — WORKED
- https://archives.carmeldelisieux.fr/la-vie-de-sainte-therese-de-lisieux/voyage-a-rome/recits-divers-du-voyage-a-rome-copies-par-celine/ — WORKED
- https://archives.carmeldelisieux.fr/la-vie-de-sainte-therese-de-lisieux/voyage-a-rome/souvenirs-du-voyage-a-rome/ — WORKED (little text)
- https://archives.carmeldelisieux.fr/la-vie-de-sainte-therese-de-lisieux/voyage-a-rome/correspondance-pendant-le-voyage-a-rome/ — WORKED (list of letters)
- https://archives.carmeldelisieux.fr/la-vie-de-sainte-therese-de-lisieux/voyage-a-rome/documents-divers-sur-le-voyage-a-rome/adresse-a-mgr-germain/ — WORKED
- https://archives.carmeldelisieux.fr/la-vie-de-sainte-therese-de-lisieux/voyage-a-rome/documents-divers-sur-le-voyage-a-rome/le-jubile-de-leon-xiii/ — WORKED
- https://fides.org/en/news/74248-Therese_Rome_and_the_world — WORKED (Gianni Valente, Agenzia Fides, 1 Oct 2023)
- https://resolve.cambridge.org/... — REDIRECT; https://www.cambridge.org/core/journals/journal-of-ecclesiastical-history/article/visiting-peter-in-chains-french-pilgrimage-to-rome-187393/6AA11F5A2A9295073096F957F8DFBF4F — WORKED (abstract only)
- https://archives.carmeldelisieux.fr/wp-json/wp/v2/search?search=... — WORKED (several site searches)
- https://archives.carmeldelisieux.fr/personnage/pasquer-victoire-mademoiselle/ — WORKED
- https://archives.carmeldelisieux.fr/personnage/papinau-madame-veuve-jules-nee-valentine-cochain/ — WORKED
- https://archives.carmeldelisieux.fr/personnage/notta-alphonse-henri-docteur/ — WORKED
- https://archives.carmeldelisieux.fr/personnage/le-juif-desire/ — WORKED
- https://archives.carmeldelisieux.fr/correspondance/de-mme-martin-a-mr-guerin-isidore-cf-178-decembre-1876/ — WORKED
- https://archives.carmeldelisieux.fr/correspondance/de-mme-martin-a-mr-martin-cf-179-24-decembre-1876/ — WORKED
- https://archives.carmeldelisieux.fr/monsieur-guerin/ — WORKED (study by Br Marc Fortin OCD)
- https://archives.carmeldelisieux.fr/environnement-familial/scolarite-des-filles/scolarite-des-filles-martin/ — WORKED
- https://archives.carmeldelisieux.fr/au-carmel-du-temps-de-therese/la-communaute/soeur-genevieve-de-la-sainte-face/autobiographie-de-soeur-genevieve-de-la-sainte-face/ — WORKED (Céline's 1909 autobiography, written for Mère Agnès)
- https://archives.carmeldelisieux.fr/au-carmel-du-temps-de-therese/la-communaute/soeur-genevieve-de-la-sainte-face/autobiographie-de-soeur-genevieve-de-la-sainte-face-suite/ — WORKED
- https://archives.carmeldelisieux.fr/au-carmel-du-temps-de-therese/la-communaute/soeur-genevieve-de-la-sainte-face/autobiographie-de-soeur-genevieve-de-la-sainte-face-1909-suite-et-fin/ — WORKED
- https://archives.carmeldelisieux.fr/au-carmel-du-temps-de-therese/la-communaute/soeur-marie-du-sacre-coeur/notes-preparatoires-de-soeur-marie-du-sacre-coeur/ — WORKED (Marie's notes for her Process deposition)

Not used: archives-carmel-lisieux.fr (now a casino site; never use it). Gallica: blocked.

## Part eyewitness (F-EW)

### Original title: Sources — eyewitness and process testimony (family F-EW)

Researcher: stage 2, source family "eyewitness and process testimony". Written 2026-09-29.

Rights labels follow the stage 1 plan. The substance of the depositions (1910–1917) is old, but the web text of the Archives du Carmel and the printed Teresianum editions (1973, 1976) are modern editions with no terms-of-use statement. They are **facts-only**: our cards restate them in our own words, French quotations stay under about 25 words, and every English rendering is our own translation. The English books of 1913–1926 are **public-domain** (published in the US before 1930).

Card prefixes: every card in `facts.md` is `F-EW-NNN`; miracles are `M-EW-NNN`; quotations are `Q-EW-NNN`. During extraction, the work was split into batches (A–L); the old batch IDs were replaced at merge time. Gap-fill batch N (F-EW-2448 and later, M-EW-142 and later, Q-EW-122 and later) was appended by hand and is not date-sorted.

#### 1. Primary web sources (Archives du Carmel de Lisieux)

Domain: `https://archives.carmeldelisieux.fr`. **Never** use the old domain `archives-carmel-lisieux.fr` (now a casino site).

| # | Source | URL | Locator scheme | Rights | Read |
|---|---|---|---|---|---|
| W1 | *Les témoignages du Procès ordinaire* (Ordinary / Informative Process, Bayeux–Lisieux, sessions from 12 Aug 1910; 48 witnesses heard, 33 depositions given on the page, which follows the Teresianum edition of 1973) | https://archives.carmeldelisieux.fr/naissance-dune-sainte/les-proces-la-sainte-de-therese/le-proces-ordinaire/les-temoignages-du-proces-ordinaire/ | "PO" + witness number + folio of the public copy in square brackets, e.g. `PO 1 Agnès [135r]`, + session and date | facts-only | Fully read (all 33 depositions; about 1.2 million characters), in parallel batches |
| W2 | *Les témoignages du Procès apostolique* (Apostolic Process, 1915–1917; 58 sessions; closed 25 Aug 1916 for the main series; 25 witnesses + Fr Godefroy Madelaine heard separately) | https://archives.carmeldelisieux.fr/naissance-dune-sainte/les-proces-la-sainte-de-therese/le-proces-apostolique/les-temoignages-du-proces-apostolique/ | "PA" + witness number + folio, e.g. `PA 8 Geneviève [1234r]` | facts-only | Fully read (26 depositions; about 1.1 million characters) |
| W3 | Community pages: biographies, obituary circulars, "notes préparatoires" (drafts written by the nuns before testifying), "témoignages" of nuns who did not testify, souvenirs | `https://archives.carmeldelisieux.fr/au-carmel-du-temps-de-therese/la-communaute/<person>/<page>/` | page URL + section | facts-only (the circulars themselves are 1891–1950 printed texts; the older ones are public-domain in substance, but we used the site transcription) | Read in part: all témoignage, souvenirs and notes préparatoires pages; Gonzague pages; Céline's "Conseils et souvenirs"; Marie's autobiographical memories; circulars of Marie de la Trinité, Marie de l'Eucharistie, Thérèse de Saint-Augustin, Aimée de Jésus, Marie des Anges; all short biographies. **Not read (after gap fill)**: the very long biographies and circulars of Mère Agnès (≈320,000 chars), Sr Marie du Sacré-Cœur (≈420,000), Sr Geneviève (≈525,000), Marie de l'Eucharistie biography (≈180,000), Mère Geneviève's circular (≈185,000), Mère Agnès's autobiography (≈77,000). These deal mostly with the sisters' own lives after 1897. |
| W4 | *Léonie et les siens, ou la grâce de la dernière place* | https://archives.carmeldelisieux.fr/leonie-et-les-siens-ou-la-grace-de-la-derniere-place/ | URL + section | facts-only | Fully read |

Reliability notes for W1–W3:
- The depositions are sworn, detailed, and first-hand for the Carmel years. They are also partisan: every Carmelite witness wanted the cause to succeed. The site's editors say so and note rivalry between witnesses (Sr Geneviève and Sr Marie de la Trinité) and a difference of view between the Martin sisters and the novices.
- Witnesses prepared with a canvas: Mgr de Teil's printed Articles (April 1910) (see L1). Mère Agnès asked de Teil how the process worked and briefed the nuns as prioress. Some wording therefore repeats the Articles or *Histoire d'une âme*.
- Eleven Ordinary-Process depositions about miracles only were left out of the 1973 printing, and so are not on W1.
- Several nuns who knew Thérèse never testified: Mère Marie de Gonzague (d. 1904) and Sr Marie de l'Eucharistie (d. 1905) were dead; two sick nuns left in 1909; six older or less concerned nuns were not called. W3 holds some of their written memories.

#### 1a. Gap-fill batch N (this session's additions)

| Source | What was read | Cards |
|---|---|---|
| W1 PO 33, Bishop Giannattasio (f. 1309v–1329v) | Whole deposition | F-EW-2448 to F-EW-2472, M-EW-142 to M-EW-145, Q-EW-122 to Q-EW-125 |
| W2 PA 6, Mère Agnès [531]–[552] | End of the 1915 deposition, including the 54-case miracle summary | F-EW-2473 to F-EW-2482, M-EW-146 to M-EW-189 |
| W1 PO 4, Céline [402r]–[415v] | Last sessions (perfumes, coffin plank, signature) | F-EW-2483 to F-EW-2491, M-EW-190 to M-EW-194 |
| W1 PO 16, Mère Isabelle (whole text) | Re-read | F-EW-2492 to F-EW-2507, M-EW-195 to M-EW-202 |
| W2 PA 11 (Léonie) | Whole deposition re-read | F-EW-2508 to F-EW-2522, Q-EW-126 to Q-EW-130 |
| W2 PA 10 (Marie des Anges) | Whole deposition re-read | F-EW-2523 to F-EW-2531, M-EW-203, Q-EW-131 to Q-EW-132 |
| W1 PO 7 (Léonie, letters to her) | Re-read | F-EW-2532 to F-EW-2538, Q-EW-133 to Q-EW-136 |
| W1 PO 10 (Pichon) | Whole deposition re-read | F-EW-2539 to F-EW-2541 |
| W1 PO 13 (TSA), PO 21–22 (Frapereau, Gaignet), PA 25 (Roulland) | Checked against existing cards; only one new entry | M-EW-204 |
| W3 circular of Sr Thérèse de Saint-Augustin (58k) | Whole text | F-EW-2542 to F-EW-2557 |
| W3 Sr Marie-Élisabeth (extern sister): biography, circular | Whole | F-EW-2558 to F-EW-2564 and F-EW-2670 |
| W3 circular of Sr Marie de l'Eucharistie (44k) | Whole | F-EW-2565 to F-EW-2580 |
| W3 biography of Marie de l'Eucharistie, extracts of Fr Piat's book (Office Central, 1967; about 185k chars) | Whole page | F-EW-2581 to F-EW-2662 |
| W3 short biographies: Marie-Emmanuel, Saint-Joseph-de-Jésus, Saint-Stanislas, Marguerite-Marie | Thérèse passages | F-EW-2663 to F-EW-2669 |

The 65 cards whose source line said only "circular" (or "Aimée circular") now name the circular, its subject, its writer (Mère Agnès de Jésus in every case), its date and its URL. Cards that come from Marie de la Trinité's or Marie des Anges's circular also keep the old wording in a "[was: ...]" tag.

Webfetch was not used. All text came from the files already fetched in `_work/witness-texts/` (raw page text, not summaries).

#### 2. Local public-domain books

| # | Book | File (`source-library/therese-of-lisieux/`) | Locator | Rights | Read |
|---|---|---|---|---|---|
| L1 | Mgr R. de Teil, *The Cause of Beatification of the Little Flower of Jesus*, tr. L. Basevi, New York: Kenedy, 1913 | `D3-de-teil-cause-of-beatification-1913.pdf` (242 pp.) | article number + book page; book page = PDF page − 14 | public-domain | Fully read |
| L2 | A. H. Dolan, O.Carm., *The Living Sisters of the Little Flower*, Chicago: Carmelite Press, 1926 | `D4-dolan-living-sisters-1926.pdf` (228 pp.) | chapter + book page; book page = PDF page − 6 | public-domain | Fully read |
| L3 | T. N. Taylor (ed.), *Sœur Thérèse of Lisieux*, New York: Kenedy, 1924 (9th impression) | `D6-taylor-soeur-therese-1924.pdf` (466 pp.) | book page; book page = PDF page − 34 | public-domain | Read: Epilogue "A Victim of Divine Love" (pp. 193–222), "Counsels and Reminiscences" (pp. 225–262), the Gallipoli and Dorans sections of "Shower of Roses" (pp. 333–340, 398–401). Not read for this family: the autobiography, letters, poems, and most "Shower of Roses" favours (other families) |
| L4 | *The Foundation of the Carmel of Lisieux and its Foundress*, London: St Anselm Society, 1913 | `carmel-foundation-1913.pdf` (60 pp.) | PDF page | public-domain | Fully searched; pages mentioning Thérèse read |
| L5 | Mgr A.-P. Laveille, *St Thérèse de l'Enfant Jésus*, tr. M. Fitzsimons, Benziger, 1928 | `laveille-1928.pdf` | book page (PDF = book + 20) + the deposition or Summarium paragraph he cites | public-domain | Used ONLY for passages where Laveille quotes a named deposition or the Summarium of 1914/1919 (about 40 pages) |

Reliability notes:
- L1 is not testimony. It is the vice-postulator's list of what the cause meant to prove (the "Articles"), April 1910, largely built from *Histoire d'une âme*, plus some unpublished anecdotes (novices, doctor, fire, dispensations) and the miracle dossier to 1911. Source type: official.
- L2 is late (spring 1926) oral testimony, written up for a devotional audience by an American promoter. Useful for small memories (Léonie, the teacher Sr Saint-François de Sales, Mme Tifenne, Jeanne Guérin). Treat details as medium confidence.
- L3's Epilogue was written by the Lisieux prioress (Mère Agnès); the Counsels are the novices' memories, unnamed in the book (mainly Céline and Sr Marie de la Trinité).
- L5 cites the printed Roman Summarium of 1919 (apostolic process) by page and paragraph. We give both Laveille's page and the Summarium reference.

#### 3. Sources not reached

- The printed Summarium (1914, 1919) and the Teresianum *Procès* volumes (1973, 1976): not available; the Carmel site gives the depositions in full text instead.
- The eleven miracle-only depositions of the Ordinary Process: not on the site.
- Gallica: not used (it blocks automated access).
- The full circulars/biographies listed under W3 "Not read" (size; mostly after 1897).

#### 4. Downloads

Nothing was downloaded. The web pages were read as HTML.

## Part official-miracles (F-OM)

### Original title: Sources — official documents, miracles, after death (prefix F-OM / M-OM)

Researcher: stage 2, family "official Church documents, miracles, and what happened after her death". Written 2026-09-29.

Abbreviations used in the cards:

| Short | Source |
|---|---|
| AAS 13 | *Acta Apostolicae Sedis* 13 (1921) = `source-library/therese-of-lisieux/D10-AAS-13-1921.pdf` |
| AAS 15 | AAS 15 (1923) = `D8-AAS-15-1923.pdf` |
| AAS 17 | AAS 17 (1925) = `D9-AAS-17-1925.pdf` |
| AAS 20 | AAS 20 (1928) = `D11-AAS-20-1928.pdf` |
| AAS 36 | AAS 36 (1944) = `D12-AAS-36-1944.pdf` |
| Taylor 1924 | `D6-taylor-soeur-therese-1924.pdf` |
| Taylor 1926/30 | `D7-taylor-saint-therese-1930.pdf` |
| Laveille | `laveille-1928.pdf` |
| Dolan | `D4-dolan-living-sisters-1926.pdf` |
| Carmel | https://archives.carmeldelisieux.fr/ (never the old domain archives-carmel-lisieux.fr) |

#### Local sources

| # | Source | Locator scheme | Rights | Reliability | Read |
|---|---|---|---|---|---|
| 1 | AAS 13 (1921). Decree on heroic virtues, 14 Aug 1921, pp. 449–452; Diarium entries pp. 115 (25 Jan 1921), 365 (28 Jun 1921), 453 (2 Aug 1921). | Printed page = PDF page. | public-domain (US, 1921) | Official Latin act; the best source for dates and for the Congregation's own reasoning. | Relevant pages fully read; volume searched with find.py and a page-level regex for Teresia/Theresia/Lexovien/Lisieux. |
| 2 | AAS 15 (1923). Decree on miracles, 11 Feb 1923, pp. 168–170; decree *de tuto*, 19 Mar 1923, pp. 228–231; brief *Quod Ioannes*, 29 Apr 1923, pp. 202–207; letter *Pro tuo ipse officio* to Card. Vico, 14 May 1923, pp. 283–284; Diarium pp. 41, 92, 188, 478; consistory allocution p. 253. | Printed page = PDF page. | public-domain | Official. The miracles decree gives the Latin diagnoses. | Relevant pages fully read. |
| 3 | AAS 17 (1925). Miracles decree, 19 Mar 1925, pp. 148–150; decree *de tuto*, 29 Mar 1925, pp. 200–201; secret and public consistories pp. 125–128; semipublic consistory 22 Apr 1925 pp. 169–170; canonization ceremony, formula and homily, 17 May 1925, pp. 209–214; bull *Vehementer exsultamus hodie*, 17 May 1925, pp. 337–347; letter to Carmelite Order, 15 Nov 1925, p. 579; Diarium pp. 86, 162. | Printed page = PDF page. | public-domain | Official. The bull has the fullest official account of the four miracles. | Relevant pages fully read. Page images of pp. 150 and 344 checked. |
| 4 | AAS 20 (1928). Decree naming her patron of all missions, 14 Dec 1927, pp. 147–148; Office, Martyrology *elogium* and Mass, pp. 148–153; *Urbis et Orbis* decree extending the Mass to the whole Church, 14 Mar 1928, pp. 153–154. | Printed page = PDF page. | public-domain | Official. | Relevant pages fully read. |
| 5 | AAS 36 (1944). Apostolic letter of Pius XII naming her secondary patron of France, 3 May 1944, pp. 329–330. | Printed page = PDF page. | facts-only (1944) | Official. | Read. Also p. 58 (1944 decree on another cause that cites her). |
| 6 | T. N. Taylor (ed.), *Sœur Thérèse of Lisieux, the Little Flower of Jesus*, Burns Oates / Kenedy, 9th impression 1924 (first ed. 1912). Prologue rewritten 1924; "Shower of Roses" in four "bouquets" (book pp. 329–403); Benedict XV allocution (book p. 407). | PDF page given; book page = PDF − 42 in the Roses section. | public-domain | Taylor was a witness at the 1910–11 tribunal and printed letters sent to the Carmel, often with doctors' certificates. The accounts are "reports", not verified by the Church unless stated. | Prologue (PDF 19–31) and whole Roses section (PDF 369–450) read. |
| 7 | T. N. Taylor, *Saint Thérèse of Lisieux, the Little Flower of Jesus*, revised translation "with the story of her canonization and an account of several of her heavenly roses", Kenedy. Preface dated 25 Mar 1926; text updated to March 1927. **This scan carries a Westminster imprimatur of 7 Dec 1936** (PDF p. 10). | PDF page given. Book page = PDF − 14 in the Prologue; PDF − 26 in the Epilogue; PDF − 30 in the Roses. | public-domain (text first published 1926–27; this is a later printing — see gaps file) | Taylor was an eyewitness in St Peter's on 17 May 1925 and at Lisieux in Sept 1925. Pious tone; some date slips (see gaps). | Prologue (PDF 15–42), Epilogue Parts I end–III (PDF 265–318), Shower of Roses and "Conquest of America" (PDF 415–476) read. |
| 8 | Mgr A.-P. Laveille, *St Thérèse de l'Enfant Jésus … according to the official documents of the Carmel of Lisieux*, tr. M. Fitzsimons, Benziger 1928 (French 1925). Ch. XIV end (death, funeral) and ch. XV (glorification). | Book page + 20 = PDF page. | public-domain | Written at the Carmel's request, with access to the Summarium of 1919. Cites Summarium pages. Laudatory. | PDF 395–447 read in full. Other hits checked (PDF 15, 347). |
| 9 | A. H. Dolan, *The Living Sisters of the Little Flower*, 1926, ch. X on Pierre Derrien. | PDF page. | public-domain | Interview by an American priest; hearsay for the 1904 cure. | PDF 136–139 read only. Rest belongs to another family. |
| 10 | Carmel archive, "Les miracles de Thérèse": https://archives.carmeldelisieux.fr/naissance-dune-sainte/les-miracles/les-miracles-de-therese/ | URL | unknown (facts only) | Official Carmel site. | Fetched. |
| 11 | Carmel, "Les miracles de la Béatification": https://archives.carmeldelisieux.fr/naissance-dune-sainte/les-proces-la-sainte-de-therese/le-proces-apostolique/les-miracles-de-la-beatification/ | URL | unknown | Prints the two beatification accounts (Anne's own account is first person). | Fetched twice. |
| 12 | Carmel, "Pluie de roses": https://archives.carmeldelisieux.fr/naissance-dune-sainte/les-miracles/pluie-de-roses/ | URL | unknown | Counts of volumes and accounts. | Fetched. |
| 13 | Carmel, "Historique de la béatification et de la canonisation": https://archives.carmeldelisieux.fr/naissance-dune-sainte/la-beatification-et-la-canonisation/historique-de-la-beatification-et-de-la-canonisation/ | URL | unknown | Best dated chronology of the processes. | Fetched. |
| 14 | Carmel, "Retour de Thérèse au Carmel" (26 Mar 1923): https://archives.carmeldelisieux.fr/naissance-dune-sainte/la-beatification-et-la-canonisation/retour-de-therese-au-carmel/ | URL | unknown | Detailed. | Fetched. |
| 15 | Carmel, "Le 17 mai 1925": https://archives.carmeldelisieux.fr/naissance-dune-sainte/la-beatification-et-la-canonisation/le-17-mai-1925/ | URL | unknown | Mostly images; little text. | Fetched. |
| 16 | Carmel, "Thérèse et la Première Guerre mondiale" and sub-pages "1re guerre — courrier du front", "Étude sur le courrier du front", "Supplique des soldats envoyés au pape pour la béatification de Thérèse": https://archives.carmeldelisieux.fr/naissance-dune-sainte/therese-et-la-premiere-guerre-mondiale/ (+ /1re-guerre-courrier-du-front/ ; /etude-sur-le-courrier-du-front/ ; /supplique-des-soldats-envoyes-au-pape-pour-la-beatification-de-therese/) | URL | unknown | Transcribed soldiers' letters; petitions. | Fetched. |
| 17 | Carmel, "Voyages des reliques": https://archives.carmeldelisieux.fr/naissance-dune-sainte/voyages-des-reliques/ | URL | unknown | | Fetched. |
| 18 | Sanctuary of Lisieux: relics tours https://www.therese-de-lisieux.catholique.fr/en/evenements-actualites/voyages-des-reliques/ ; basilica https://www.therese-de-lisieux.catholique.fr/en/decouvrir-le-sanctuaire/la-basilique/ ; Carmel chapel https://www.therese-de-lisieux.catholique.fr/en/decouvrir-le-sanctuaire/le-carmel/ | URL | facts-only | Official shrine site. | Fetched. |
| 19 | John Paul II, *Divini amoris scientia*, 19 Oct 1997: https://www.vatican.va/content/john-paul-ii/en/apost_letters/1997/documents/hf_jp-ii_apl_19101997_divini-amoris.html | § number | facts-only | Official. | Fetched (targeted questions). |
| 20 | Francis, *C'est la confiance*, 15 Oct 2023, §6 and notes 4–13: https://www.vatican.va/content/francesco/en/apost_exhortations/documents/20231015-santateresa-delbambinogesu.html | § and note | facts-only | Official. Used to test the Pius X saying and to get AAS locators of later papal texts. | Fetched (raw HTML text checked for footnote markers). |
| 21 | Web search result only (not a primary page): Wikipedia "Basilica of Sainte-Thérèse, Lisieux" gave 30 Sep 1929, 11 Jul 1937, 11 Jul 1954. Confirmed by source 18. | — | — | Lead only. | — |

#### Sources not reached or not used

- *Pluie de roses* (10 vols, 1907–1926), *Interventions de Sœur Thérèse pendant la guerre* (cited by Laveille, PDF 422), and the album *La Bienheureuse Thérèse de l'Enfant-Jésus: sa béatification* (Carmel 1923, cited by Laveille PDF 429, 432): not online in a form we could reach. Gallica blocked; not tried.
- A. Guise, *Les miracles de Sr Thérèse … 1898–1926* (PDF on the Carmel site): not opened (PDF; no download).
- S. Vogt, study of the letters from the front (PDF on the Carmel site): not opened.
- The Italian/French original texts of Benedict XV's allocution (14 Aug 1921) and Pius XI's allocutions (11 Feb 1923, 19 Mar 1923): they are **not** in AAS 13 or 15 (searched). We have them only in Taylor's English and in Laveille's quotations.
- Paul VI letter of 2 Jan 1973 (AAS 65, 12–15) and Pius XII radio message of 11 Jul 1954 (AAS 46, 404–407): locators found in *C'est la confiance* notes 9–10; texts not read.

#### Second-pass sources (Carmel archive and Vatican), read through a summarizing fetch tool

| # | Source | URL (base https://archives.carmeldelisieux.fr/naissance-dune-sainte/) | Rights | Read |
|---|---|---|---|---|
| 22 | Le procès apostolique | les-proces-la-sainte-de-therese/le-proces-apostolique/ | unknown | Read (summary) |
| 23 | Témoignages du procès apostolique | .../le-proces-apostolique/les-temoignages-du-proces-apostolique/ | unknown | Read (summary); first five witnesses only |
| 24 | Décret sur l'héroïcité des vertus | .../le-proces-apostolique/decret-sur-lheroicite-des-vertus/ | unknown | Read (summary) |
| 25 | Les exhumations de Thérèse (3 sub-pages) | .../le-proces-apostolique/les-exhumations-de-therese/ (+ a-lisieux-les-recits-anciens-des-deux-exhumations/ ; au-proces-apostolique-verification-de-la-tombe-et-reconnaissance-des-restes-de-la-servante-de-dieu/) | unknown | Two sub-pages read; "voir-les-photos-de-1917" not read |
| 26 | Les miracles (index), Un miracle c'est quoi, Comment lire un récit de miracle | les-miracles/ | unknown | Read (summary) |
| 27 | Bref de la béatification; Bulle de la canonisation (French) | la-beatification-et-la-canonisation/bref-de-la-beatification/ ; .../bulle-de-la-canonisation/ | unknown | Read (summary) |
| 28 | Thérèse et la Première Guerre: images et cartes postales; sélection de courrier illustré; souvenirs des soldats | therese-et-la-premiere-guerre-mondiale/... | unknown | Headings and captions only |
| 29 | Benedict XVI, audience 6 Apr 2011 | https://www.vatican.va/content/benedict-xvi/en/audiences/2011/documents/hf_ben-xvi_aud_20110406.html | facts-only | Summary only; errors seen |
| 30 | John Paul II, homily 19 Oct 1997 | https://www.vatican.va/content/john-paul-ii/en/homilies/1997/documents/hf_jp-ii_hom_19101997.html | facts-only | Summary only |

Note on D7 (Taylor 1926/30): the scan has a 1936 imprimatur; rights are "unknown" until the 1926–27 first publication is confirmed (W-OM-002).
