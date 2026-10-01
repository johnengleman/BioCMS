# Playbook — Italy, Rome, and the early Latin Church

For saints of Italy and Rome, for the martyrs and Fathers of the early Latin Church, and for the Italo-Greek (Byzantine) saints of southern Italy. Read `latin-iberia.md` or `latin-france.md` when the life crosses regions. All access tests below were run on 2026-09-29 and 2026-09-30.

Tradition types: early martyrs and pre-1054 Western saints are usually **Shared** (Catholic and Orthodox). Saints after 1054 (Catherine of Siena, Philip Neri, Padre Pio) are **Catholic only**. Southern Italo-Greek saints are **Shared** or, for some, honored mainly by the Orthodox.

## Start here

1. **Acta Sanctorum on archive.org** (Bollandists, Latin). The best old scholarly Lives of nearly every saint, arranged by feast day. Full OCR text works. See "Access".
2. **Dicastery for the Causes of Saints (causesanti.va)** — a profile page with a biography and dates for each saint canonized or beatified since about 1590. Italian. Works with plain `curl`.
3. **santiebeati.it** — the Italian saints database (Catholic). Short entries, identity, dates, feast, patronage. Use it for name forms and leads. Works with plain `curl`. Copyright: facts only.

For Orthodox and Shared saints, add **OCA Lives of the Saints** (oca.org) and **John Sanidopoulos's blog** (johnsanidopoulos.com). See "Orthodox sources".

## Catholic sources

### Early Church (before ~600)

- **Acta Sanctorum (AS).** Volume 02 on archive.org holds Agnes (21 Jan): the Acta, the relics, and the miracles. Checked.
- **Migne, Patrologia Latina (PL).** Ambrose on Agnes is in his *De virginibus* (PL 16). Pope Damasus's epigrams on the martyrs are in PL 13. Gregory the Great's *Dialogues* (Benedict, book 2) is in PL 77. Volumes are on archive.org and Google Books. Use the index at patristica.net (see "Access").
- **Liber Pontificalis** and the Roman martyrology: leads for Roman martyrs and popes. Unchecked.
- **Monumenta Germaniae Historica (dmgh.de).** The site answered on 2026-09-30. Use it for Paul the Deacon and other Lombard-era Lives. Search not checked.

### Medieval (600–1500)

- **AS.** Catherine of Siena is in volume 12 (Aprilis III, 30 April date set in the Roman calendar of that time; her feast is now 29 April). The old text includes Raymond of Capua's *Legenda maior* and other early Lives. Checked: the volume text names her 35 times.
- **Treccani, Dizionario Biografico degli Italiani.** A scholarly article with bibliography. Example that works: `https://www.treccani.it/enciclopedia/caterina-da-siena-santa_(Dizionario-Biografico)/` (Eugenio Dupré Theseider; long text). The slug does not follow one rule. Find the slug through `https://www.treccani.it/enciclopedia/ricerca/<name>/`.
- **The saint's own writings** (Catherine: *Dialogo* and *Lettere*): find editions on archive.org. The Italian Wikisource address I guessed was 404. Unchecked.
- **Order sources.** Dominican: dominican Italian province site domenicani.it (answers). Franciscan: francescani.net and ofm.org (answer); franciscan-archive.org (answers, small). Their archives hold the *Analecta* and source collections. Titles not yet searched.
- **Vatican Library digital manuscripts (digi.vatlib.it).** The site answers. Use it for a manuscript of a Life. Search not checked.

### Early modern (1500–1900)

- **AS.** Philip Neri (26 May) is in volume 19 (Maii VI). Checked: the volume names him 91 times, with the Life text near line 101,353 of the OCR.
- **Dicastery profile.** `https://www.causesanti.va/it/santi-e-beati/filippo-neri.html` works (about 2,800 words). Canonization: 12 March 1622, with Ignatius, Francis Xavier, Teresa of Avila, and Isidore the Farmer. See the list page for that date.
- **Treccani DBI** for Philip Neri: the slug I tried gave an empty page. Find it through the Treccani search page.
- **Oratorian and Jesuit sources.** The Jesuit sites jesuits.global and gesuiti.it answer. The old series *Monumenta Historica Societatis Iesu* is on archive.org; not yet searched.
- **Bacci's Life of Philip Neri and Gallonio's Life** (17th century): leads. Unchecked.

### Modern (after 1900)

- **Dicastery profiles.** These have the best facts and links to the homily and the decree. Working addresses:
  - Padre Pio: `https://www.causesanti.va/it/santi-e-beati/pio-da-pietrelcina.html` (about 4,100 words).
  - Gianna Beretta Molla: `https://www.causesanti.va/it/santi-e-beati/gianna-beretta-molla.html` (about 3,800 words, with a biography section).
- **Acta Apostolicae Sedis (AAS).** The official decree text, in Latin, for a canonization. Padre Pio: AAS 94 (2002), canonization decree "SIPONTINA-VESTANA". Checked with `pdftotext`: the text names him and gives his birth and miracle. See "Access".
- **Vatican homilies.** Padre Pio's canonization homily: `https://www.vatican.va/content/john-paul-ii/it/homilies/2002/documents/hf_jp-ii_hom_20020616_padre-pio.html` (works, about 2,800 words). The canonization homily for 16 May 2004 (Gianna Molla and others) is at `.../en/homilies/2004/documents/hf_jp-ii_hom_20040516_canonizations.html` (works). The Italian address I guessed returned 404.
- **Padre Pio official site** padrepio.it and the Capuchin site cappuccini.org answer. Content not checked.
- **santiebeati.it**: Padre Pio id 71750, Gianna Molla id 51200.

## Orthodox sources (Shared and Italo-Greek saints)

- **OCA Lives (oca.org/saints/lives).** Works. Use the day page, then the saint link. Pattern: `https://www.oca.org/saints/lives/<yyyy>/<mm>/<dd>` lists the day. A saint page is `.../<yyyy>/<mm>/<dd>/<id>-<slug>`. The year in the address does not matter for the text.
  - Agnes: `https://www.oca.org/saints/lives/2026/01/21/100255-virgin-martyr-agnes-of-rome`. Checked from the day page.
  - The OCA search page (`/search?q=`) returns a page but did not give a usable saint list. Use the day page instead.
  - Trap: a wrong id opens a different saint (a guessed id showed Gregory of the Kiev Caves). Always take the link from the day page.
  - OCA lists Western saints who died before 1054. It does not list Catherine of Siena or Philip Neri.
  - OCA also lists Theoctistus, abbot at Cucomo in Sicily (4 January, id 100088).
- **Sanidopoulos blog (johnsanidopoulos.com).** Works. Search: `https://www.johnsanidopoulos.com/search?q=<name>`. Example: the search for Agnes returned her Synaxarion entry, with verses and the Life. The blog reprints Greek and Russian sources, often with the source named. Check that source before you cite.
- **Italo-Greek saints of southern Italy.** Names to search in the sources above: Nilus of Rossano (26 September), Bartholomew of Grottaferrata (11 November), Elias the Younger (17 August), Luke of Demenna, Saba of Collesano. The classic texts are Greek Lives in the Acta Sanctorum (Latin translations) and in Migne's Greek series (PG). These lead names were not tested in OCA or Sanidopoulos (the Nilus search returned only the general blog page). Mark as unchecked.
- For Byzantine texts, also read the Greek playbook when it exists.

## Access

- **Acta Sanctorum volume map (archive.org).** Identifiers are `actasanctorumNNunse`, for example `actasanctorum02unse`. Text: `https://archive.org/download/actasanctorumNNunse/actasanctorumNNunse_djvu.txt`. Files are large (5 to 10 MB). Search the text for the saint's name in Latin genitive (AGNETIS, CATHARINA SENENSI). The first pages of each file are OCR noise from library stamps. Read the title heading on page 1 of the scan to be sure.
  - Checked mapping: 01 Jan I, 02 Jan II, 03 Jan III, 06 Feb III, 08 Mar II, 09 Mar III, 10 Apr I, 11 Apr II, 12 Apr III, 14 to 20 May I to VII (14 = May I, 19 = May VI), 22 June II, 25 June V, 26 June VI, 29 to 31 July II to IV, 33 and 34 July VI and VII, 35 to 37 Aug I to III, 39 and 40 Aug V and VI, 41 and 42 Sept I and II, 44 and 45 Sept IV and V.
  - Gaps in that search: volumes 47 to 55 use other identifiers, and several volumes had no heading in the first 80 KB. Find them with the search below.
  - Find all items: `https://archive.org/advancedsearch.php?q=identifier%3Aactasanctorum*&fl%5B%5D=identifier&fl%5B%5D=title&rows=100&output=json`. Other scans (Google Books, Bollandist reprint) exist: `ActaSanctorum11Aprilis2`, `bub_gb_JKHCfGc1iy8C` (August).
  - How to find a saint by feast day: the Acta Sanctorum is arranged by month, then by day within the month. Each day has a heading such as "DIE XXI JANUARII". Find the month volumes, pick the tome that covers the day (a month has 2 to 7 tomes), then search the text. The saint's day is the day in the old Roman calendar. Some saints sit under a different day in the AS than in the modern calendar (Catherine of Siena is 30 April in the AS, 29 April now).
  - The set stops at November (early volumes of the November tomes) and a December volume. Saints after about 1700 are not in it.
  - The Brepols site (brepolis.net) answers but the database is paid. Bollandists site bollandistes.org answers; use it for *Bibliotheca Hagiographica Latina* (BHL) numbers. The BHLms manuscript database (bhlms.fltr.ucl.ac.be) did not resolve.
- **Migne PL.**
  - patristica.net/latina lists every PL volume and links each to Google Books and archive.org scans. It works with plain `curl`.
  - archive.org search: `title:(patrologiae cursus completus latina)` returns 434 items. Examples: `patrologiaecur133mign`, `patrologiaecur100mign`.
  - Documenta Catholica Omnia (documentacatholicaomnia.eu) has an Acta Sanctorum index page and a Migne page. The name does not resolve in the command sandbox. Use the address: `curl -sL --resolve www.documentacatholicaomnia.eu:443:78.40.128.213 -A "Mozilla/5.0" https://www.documentacatholicaomnia.eu/25_90_1643-1925-_Acta_Sanctorum.html`. This works. Links to the files were not checked.
  - The Latin Wikisource page for the Patrologia Latina answers (la.wikisource.org). Not searched.
- **santiebeati.it.**
  - Name search: `https://www.santiebeati.it/santi_search.php?query=<word>&Submit=Cerca`. Use one distinctive word (Neri, Pietrelcina, Siviglia). A full name can return nothing ("Filippo Neri" returned 0). Do not add `TipoRicerca=Completa`: it searches the whole text and returns 185 unranked results.
  - A saint page: `https://www.santiebeati.it/dettaglio/<id>`. Ids checked: Agnes 22350, Catherine of Siena 20900, Philip Neri 23150, Padre Pio 71750, Gianna Beretta Molla 51200, Isidore of Seville 26600, John of the Cross 25600, Teresa of Avila 24850, Josemaria Escriva 59650.
  - By date: `/emerologico.html`. By name letter: `/onomastico.html`.
- **Dicastery (causesanti.va).**
  - Canonizations by year and month: `/it/celebrazioni/canonizzazioni/<yyyy>/<mm>.html`. The years 1594 to 2025 are listed. Checked 2002/06 and 2004/05 and 1622/03.
  - Saint profile: `/it/santi-e-beati/<slug>.html`. The slug is the Italian name form, not always the one you expect (`pio-da-pietrelcina`, `josemaria-escriva-de-balaguer`, `giovanni-della-croce`, `filippo-neri`). Guessed slugs `caterina-da-siena`, `agnese`, `teresa-di-gesu`, `isidoro-di-siviglia` returned 404: saints canonized before about 1590 have no profile. Take the link from the year-month page.
  - Decrees: `/it/archivio-del-dicastero-cause-santi/promulgazione-decreti/decreti-pubblicati-<yyyy>.html` (linked from the site; page for 2026 exists; not opened).
- **vatican.va and AAS.**
  - The site answered to `curl` with a browser User-Agent. A test without any User-Agent also returned 200 on 2026-09-30, but the shared notes say plain `curl` gave 404. Always send `-A "Mozilla/5.0"`.
  - Volume list: `https://www.vatican.va/archive/aas/index_it.htm`. The page links volumes 1 (1909) to 94 (2002) and yearly indexes to 2009.
  - Volume PDF pattern: `https://www.vatican.va/archive/aas/documents/AAS-<vol>-<year>-ocr.pdf`. Two-part years add `-I` or `-II` (`AAS-09-I-1917-ocr.pdf`). Checked as existing: 1, 46 (1954), 60 (1968), 89 (1997), 94 to 98 (2002 to 2006). Not found: 99 (2007), 100, 102, 105. The pattern `AAS-95-2003.pdf` without `-ocr` is 404.
  - Each file is about 4 to 5 MB. The OCR text layer is good. Read it with `pdftotext file.pdf -` from a scratchpad copy, then delete the copy. Do not keep PDFs.
  - The index page `archive/aas/index.htm` is 404. Use `index_it.htm`.
- **Treccani.** Plain `curl` works. Pages hold cookie script before the text: strip script and style tags. The Treccani search page is `https://www.treccani.it/enciclopedia/ricerca/<name>/`.
- **Internet Culturale (internetculturale.it), SBN OPAC (opac.sbn.it), Vatican Library (digi.vatlib.it):** all answered on 2026-09-30. Search forms not tested. Use SBN for the catalogue record of an Italian edition, then look for the scan.
- **Trap.** In zsh, a line of `=` characters in an `echo` command fails ("not found"). Unquoted variables holding curl options do not split. Use `bash -c`.

## Language

- Italian name forms: Agnese, Caterina da Siena, Filippo Neri, Pio da Pietrelcina, Gianna Beretta Molla. Latin forms in the AS and PL: Agnes, Catharina Senensis, Philippus Nerius, Isidorus.
- AS headings use the genitive: "DE S. CATHARINA SENENSI". OCR breaks letters (double spaces, wrong letters). Search short stems (CATHARIN, AGNET) and try both C and G forms.
- Feast dates: the AS follows the pre-1970 Roman calendar. The modern General Roman Calendar can differ. Orthodox dates are Julian or New Calendar depending on the jurisdiction. OCA lists them by the Julian calendar with civil dates. Record both.
- Names in Roman epitaphs and early martyr texts: Latin and Greek forms exist for the same saint.

## Rights

- Acta Sanctorum, Migne, and the pre-1930 Lives are public domain. AAS 1909 to 2005 PDFs are official texts hosted by the Holy See; quote short parts and cite the volume and page.
- santiebeati.it, Treccani, Dicastery profiles, Vatican News, Sanidopoulos, and OCA are under copyright. Take facts only, in our own words.
- Vatican homilies are copyright of the Holy See. Quote at most one short line.

## Lessons log

(One dated line for each saint: what worked, what failed, what was missing.)
- 2026-09-30 Padre Pio (church-miracles): vatican.va homilies fetch fine with the *_02051999_padre-pio.html style URL (hf_jp-ii_hom_DDMMYYYY); guessed English slugs gave 404. causesanti.va profile works. EWTN timeline and caccioppoli.com give process dates but disagree on canonization-miracle dates; CNA/Catholic Leader pages returned empty. Decrees (AAS) not tried.
- 2026-09-30 Padre Pio (witnesses): causesanti.va, vocedipadrepio.com, and an archive.org full-text PDF of McCaffery worked. Archive "borrow" books give no text. find.py gave only noise. The fan site caccioppoli.com is useful for names but its quotes are unsourced. No old newspapers or AAS 2002 found.
- 2026-09-30 Padre Pio (own-words): causesanti.va, vatican.va homily, it.wikipedia and it.wikiquote fetched fine; no public-domain text of his letters found; vocedipadrepio.com PDFs fetched but --grep matched nothing; Epistolario Italian text needs a different source (not found online).
- 2026-09-30 Padre Pio (extra-primary): vocedipadrepio.com PDFs return raw PDF via fetch_text.py; pipe curl -sL <pdf> | pdftotext - out.txt in scratchpad, then grep. Lotti and Ruppi articles quote Epistolario with page numbers. The 22 Oct 1918 Italian passage is on realtasannita.it and sangiovannirotondofree.it. No free Epistolario text; Fr Agostino's Diary not online.
- 2026-10-01 Francis of Assisi (church-miracles): archive.org _djvu.txt via metadata file list works (fetch_text.py archive:<id> returned a 404 page; use curl on /download/<id>/<file>_djvu.txt). Celano 1 (Howell 1908) and Bonaventure 1868 gave all miracles; franciscan-archive.org bull Mira circa nos fetched fine; newadvent CE fetched; vatican.va guessed URL for Inter Sanctos was 404 (EWTN Spanish text worked). Not read: Celano 2, Elias letter, 1818 detail.
- 2026-10-01 Francis of Assisi (own-words): archive.org full OCR via curl download/<id>/<id>_djvu.txt works; fetch_text.py archive:<id> returned only the first 11 KB. Quaracchi Opuscula 1904 = opusculasanctipa00fran (Latin, all writings); Robinson 1906 = cu31924029364787 (English + notes on autographs); Canticle Umbrian text on it.wikisource Cantico_di_Frate_Sole (MS Assisi 338); Fioretti Luzzi 1917 = ifioretti00luzz; Peace Prayer origin on franciscan-archive.org/franciscana/peace.html. OCR has letter errors (h for b); check Latin against scan. franciscan-archive.org opera path guess 404; it.wikisource Fioretti guessed URLs empty.
