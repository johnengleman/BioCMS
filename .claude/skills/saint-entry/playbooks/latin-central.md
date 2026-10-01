# Playbook — Central Europe (Latin lands)

For saints of Germany, Austria, Switzerland, Poland, the Czech lands, Slovakia, Hungary, Croatia, and Slovenia. Also covers the shared and Eastern Catholic saints of the region. Read `latin-italy.md` for Rome and `russia-slavic.md` for Ukraine and Belarus when the life crosses over.

All access notes were checked with `curl -sL -A "Mozilla/5.0"` on 2026-09-29 and 2026-09-30, unless marked "unchecked".

## Start here

**Catholic (and shared) saints**

1. **Ökumenisches Heiligenlexikon (heiligenlexikon.de)** — German. Long, sourced articles by Joachim Schäfer, with a "Quellen" list at the end and a feast-day list for each diocese. It covers Catholic, Orthodox, and Protestant figures, and modern martyrs. Works with `curl`. Use it first for identity, dates, and leads.
2. **MDZ / Bayerische Staatsbibliothek OCR (digitale-sammlungen.de)** — this is the way to read the Latin texts of the Monumenta Germaniae Historica (MGH) as raw text. See "Access". It works with `curl`.
3. **Czech Kramerius (kramerius5.nkp.cz)** for Bohemian and Moravian saints, and **Magyar Katolikus Lexikon (lexikon.katolikus.hu)** for Hungarian saints. Both give raw text with `curl`. For Poland, use the Vatican homilies, ekai.pl, and Wikisource until Polona works again (see "Access").

**Orthodox and shared-with-Orthodox saints:** Pravenc (pravenc.ru) gives long, sourced articles in Russian, for example on St. Gorazd of Prague. See "Orthodox and Eastern Catholic sources".

## Catholic sources (ranked, all checked unless marked)

| Source | Use | Note |
|---|---|---|
| heiligenlexikon.de | Biography, feast days, sources | Works. |
| Deutsche Biographie (deutsche-biographie.de) | NDB and ADB articles, with literature lists | Works. Canisius page `sfz69555.html` gave about 5,500 words. Search: `https://www.deutsche-biographie.de/search?name=<name>`. |
| Historisches Lexikon der Schweiz (hls-dhs-dss.ch) | Swiss saints (Niklaus von Flüe, Gall, Meinrad) | Article pages work: `/de/articles/<id>/`. The search page returns 403. Find the id by web search. |
| Slovenska biografija (slovenska-biografija.si) | Slovene saints and blesseds (Slomšek, Baraga, Grozde) | Works. Search: `/iskanje/?q=<name>`. Article: `/oseba/sbi584693/` (Slomšek, about 10,700 words). |
| Hrvatska enciklopedija (enciklopedija.hr) and Hrvatski biografski leksikon (hbl.lzmk.hr) | Croatian saints (Stepinac, Tavelić, Mandić) | Both sites answer. Article URL guesses (`/clanak/<slug>`) failed. Search within the site by hand. HBL is still unfinished: only the early letters are published. Deep test: unchecked. |
| Polski Słownik Biograficzny (ipsb.nina.gov.pl) | Poles, all eras | Works. Search: `/search?q=<name>`. Article access: unchecked. |
| Magyar Katolikus Lexikon (lexikon.katolikus.hu) | Hungarian saints, feast, cult | Works. Pattern: `/<Letter>/<Title>.html`, for example `/I/István, I..html`. Saints appear under a plain name entry, with a note "lásd a szentek között". Use the letter index `_I_tartalom.html`. Erzsébet gave a disambiguation page. |
| Czech Kramerius (NDK) | Old Czech Lives and 19th- and 20th-century books | Works. See "Access". |
| Vatican (vatican.va) | Canonization homilies, decrees | Works with a browser User-Agent. The English Kolbe 1982 page had no text, but the Italian page gave about 1,860 words. The Faustina 2000 English homily gave about 1,820 words. |
| Dicastery for the Causes of Saints (causesanti.va) | Official status: saint, blessed, venerable | Home and "celebrazioni" pages answer. Individual decrees: unchecked. |
| Catholic Encyclopedia (newadvent.org/cathen) | Old English articles with bibliographies | Works, for example `/cathen/03252a.htm` (Canisius, about 3,900 words). Guessed page numbers fail, so search first. |
| BBKL (bautz.de/bbkl) | German Church lexicon, with literature | The pages I tried returned only a register page of 1.2 MB, not the article. Treat as needing a browser. Unchecked for article text. |
| ekai.pl (Catholic News Agency, Poland) | Polish saint news and short profiles | Home answers. Articles: unchecked. |
| Polish Wikisource (pl.wikisource.org) | Old Polish texts, such as *Żywoty świętych Pańskich na wszystkie dnie roku* | The search API works: `/w/api.php?action=query&list=search&srsearch=<text>&format=json`. Direct page-name guesses returned 404, so use the API to find titles. |

Not reachable from the sandbox:
- **Arcanum (arcanum.com, adt.arcanum.com)** and **Hungaricana (library.hungaricana.hu)**: HTTP 403. They need a browser. The user may need to download items by hand.
- **Österreichisches Biographisches Lexikon (biographien.ac.at)**: it does not resolve by name, but it answers at IP 193.170.80.13 (`curl --resolve www.biographien.ac.at:443:193.170.80.13`). My guessed article URLs returned 404. The ÖBL starts in 1815, so it holds no medieval saints. The new host `oeaw.ac.at/acdh/oebl` sits behind a Cloudflare check.
- **Polona (polona.pl)**: the site loads, but its API returned "503 Service Unavailable" to both `curl` and the browser pane on 2026-09-29. Not verified. Retry later.
- **FBC (fbc.pionier.net.pl)**: the site asks for a browser proof-of-work check. `curl` gets a check page. The browser pane showed a blank page. Not verified.
- **Hungarian MEK (mek.oszk.hu)**: the home page works. Its search is a form (POST), so `curl` search failed. Use the site by browser.
- Not resolving at all: `kramerius.nkp.cz` search UI, `catholica.cz`, `stiftsbibliothek.ch`, `zeno.org`, `pravoslavna.sk`, `sbsl.sk`, `biography.sk`, `kai.pl`.

## Orthodox and Eastern Catholic sources

The region has three special groups. Set the tradition type for each saint as the README describes.

- **Sts. Cyril and Methodius and the Moravian mission (shared).** Both Churches honor them. Catholic feast: 14 February (in the Latin Church). The Orthodox feast is 11 May. Use one strong source from each side: Catholic — heiligenlexikon.de, and John Paul II's texts on vatican.va; Orthodox — Pravenc. Old Czech texts: Kramerius. The Slavonic Lives (*Vita Constantini*, *Vita Methodii*): unchecked. Find them in Kramerius or archive.org.
- **Ukrainian Greek-Catholic martyrs and St. Josaphat Kuntsevych.** The Greek-Catholic (Eastern Catholic) Church honors them. Josaphat is disputed: honored by Catholics, viewed critically by many Orthodox. Present both views. Use `venerated_in` for the Catholic side only. Sources: ugcc.ua (home page answers; article pages unchecked), the Catholic Encyclopedia, vatican.va, and the Pravenc article on Josaphat (the Pravenc search URL `https://pravenc.ru/text/Иосафат.html` answers; it lists articles, so open the article it links).
- **Czech, Slovak, and Polish Orthodox saints.** Example: St. Gorazd of Prague (Matěj Pavlík, 1879–1942), a New Martyr. Pravenc: search URL `https://pravenc.ru/text/Горазд.html` gives a list of links. The article is `https://pravenc.ru/text/166169.html` (about 3,800 words, vol. 12, pp. 88–92, with his Russian-language sources). Feast: 4 September (Church of the Czech Lands), and 22 August in the Russian calendar. Orthodox church sites: orthodox.pl (Poland) answers; pravoslavnacirkev.cz returned 403; pravoslavna.sk did not resolve. Also see `russia-slavic.md` for the Azbyka lookup trick.

## By era

### Early Church and missions (before 600)

Saints of the Roman Danube provinces and the Alps: St. Severin of Noricum, Sts. Florian, Afra, Ursula's companions, Maurice. Sources, ranked:
1. Eugippius, *Vita Severini*. Latin text in MGH SS rer. Germ. 26 (dMGH volume list, "[26]"). Read it by the MDZ OCR route.
2. heiligenlexikon.de for the saint.
3. Acta Sanctorum, at archive.org (see Access). Volume order follows the calendar.
4. Catholic Encyclopedia.

### Medieval (600–1500)

Sample saint tested: **St. Boniface** (feast 5 June).
- heiligenlexikon.de: `https://www.heiligenlexikon.de/BiographienB/Bonifatius.html` (about 1,000 words, works).
- MGH: *Vitae sancti Bonifatii archiepiscopi Moguntini*, ed. Levison, 1905 (SS rer. Germ. 57). The volume page is `https://www.dmgh.de/mgh_ss_rer_germ_57/index.htm`. It holds the Lives by Willibald, Radbod, Otloh, and others. The MDZ id is `bsb00000705`.
- Read the Latin: `https://api.digitale-sammlungen.de/ocr/bsb00000705/101` returned the Latin text of the Willibald Life (page 15 of the volume). Checked.
- Also: MGH Epistolae selectae 1 (Boniface's letters). The dMGH page `https://www.dmgh.de/mgh_epp_sel_1/index.htm` answers. The MDZ id: unchecked.

Sample saint tested: **St. Hildegard of Bingen** (17 September). heiligenlexikon.de: `BiographienH/Hildegard_von_Bingen.html` (about 5,300 words, works). Her own works and the *Vita*: unchecked.

Sample saint tested: **St. Stanislaus of Kraków** (11 April; 8 May in the old Polish calendar). heiligenlexikon.de: `BiographienS/Stanislaus_von_Krakau.html` (works). Primary text: the *Vita S. Stanislai* in *Monumenta Poloniae historica*, vol. 4 (Bielowski, 1864–1893 series). On archive.org, the item `monumentapoloni01bielgoog` (about 2.8 MB of OCR text) has "VITA S. STANISLAI" in Latin at about line 13,390 of the text. `monumentapoloni00bielgoog` also answers. The file URL is `https://archive.org/download/<id>/<id>_djvu.txt`. It works. The OCR is rough (u/v and y/v errors).

Sample saint tested: **St. Hedwig of Silesia** (16 October). heiligenlexikon.de: `BiographienH/Hedwig_von_Schlesien.htm` (about 1,240 words; note the `.htm` ending). A second entry, `Hedwig_Jadwiga_von_Polen.html`, is the Polish queen, a different saint. The old Life (*Legenda maior*): in MGH SS 19 and in Polish *Monumenta*; unchecked.

Other checked leads: Hungarian kings and saints in Magyar Katolikus Lexikon; the Czech patron saints (Wenceslas, Ludmila, Adalbert/Vojtěch, Procopius, Agnes) through Kramerius (a 1947 book *Svatý Vojtěch* by Holinka came back as public); the MGH *Scriptores rerum Hungaricarum*: unchecked.

### Early modern (1500–1900)

Sample saint tested: **St. Peter Canisius** (27 April in the German area; 21 December in the general calendar).
- heiligenlexikon.de: `BiographienP/Petrus_Canisius.htm` (about 2,500 words, with a very full list of local feast days).
- Deutsche Biographie: `https://www.deutsche-biographie.de/sfz69555.html` (NDB and ADB text plus literature).
- Catholic Encyclopedia: `newadvent.org/cathen/03252a.htm`.
- Canisius's letters, *Beati Petri Canisii epistulae et acta* (Braunsberger, 1896–1923): unchecked. Look on archive.org.
- Other saints of this era: Clemens Maria Hofbauer, John Nepomuk (Czech; Kramerius), Andrew Bobola (Poland).

### Modern and martyrs (after 1900)

Sample saints tested: **St. Maximilian Kolbe** and **St. Faustina Kowalska**.
- Kolbe: heiligenlexikon.de `BiographienM/Maximilian_Kolbe.htm` (about 4,100 words). Faustina: `BiographienM/Maria_Faustyna_Kowalska.html` (about 1,600 words). Modern saints often sit under their forename, not their surname, and the file ending varies. Use the alphabet list.
- Vatican homilies: Kolbe 1982 (Italian page works, English page was empty) and Faustina 2000 (English page works).
- Order and shrine sites: niepokalanow.pl (Kolbe, answers), faustyna.pl (answers). Text pages: unchecked.
- Nazi-era martyrs (German and Austrian): Bl. Clemens von Galen, Bl. Bernhard Lichtenberg, Bl. Karl Leisner, Bl. Franz Jägerstätter, St. Edith Stein. Sources: heiligenlexikon.de; and the collection *Zeugen für Christus* (Helmut Moll, print; the website did not resolve; unchecked). Copyright: facts only.
- Polish martyrs of the German occupation and the Communist era (108 Martyrs, Bl. Jerzy Popiełuszko, and others): ipsb.nina.gov.pl (older persons only), ipn.gov.pl (Institute of National Remembrance, answers; page tests unchecked), heiligenlexikon.de.
- Czech and Slovak Communist-era victims: Czech Kramerius (books to 1950s are open, later ones private), ustrcr.cz (answers), upn.gov.sk (Slovak National Memory Institute, answers). Article tests: unchecked.
- Hungary: Card. Mindszenty, Bl. Vilmos Apor, Bl. Sára Salkaházi, and others. Start with Magyar Katolikus Lexikon and heiligenlexikon.de.
- Croatia and Slovenia: Bl. Alojzije Stepinac, Bl. Miroslav Bulešić, Bl. Lojze Grozde. See the Slovene and Croatian rows above.

## Access

- **heiligenlexikon.de**
  - Article URL: `https://www.heiligenlexikon.de/Biographien<Letter>/<Name>.html`. The ending is `.html` or `.htm`, and a wrong ending returns a soft 404 page of about 15 KB (HTTP 404). Use the alphabet list to get the exact link: `https://www.heiligenlexikon.de/Alphabet/<Letter>.html` (lists all names, also surnames). Example: from `Alphabet/K.html` the Kolbe link is `../BiographienM/Maximilian_Kolbe.htm`.
  - The site search form is `Grundlagen/Suchergebnis.html`, which uses Google. It gave nothing to `curl`.
  - Strip the script tags before you read. The "Quellen" list and the author line come at the end.
- **MGH through MDZ (Latin raw text)**
  1. On the dMGH volume page (`https://www.dmgh.de/<series_vol>/index.htm`), the series list holds all volume titles. The dMGH page itself is a page-image viewer and gives no text to `curl`.
  2. The page-link function in the volume's `book.js` shows the MDZ id (`bsb00000705` for SS rer. Germ. 57).
  3. Get the OCR of scan page N: `https://api.digitale-sammlungen.de/ocr/<bsb-id>/<N>` (hOCR HTML; strip the tags).
  4. Search inside a volume: `https://api.digitale-sammlungen.de/iiif/services/search/v1/<bsb-id>?q=<word>` (JSON, gives page numbers).
  5. Volume metadata and page list: `https://api.digitale-sammlungen.de/iiif/presentation/v2/<bsb-id>/manifest`.
  - dMGH cross-series search works by `curl`: `https://www.dmgh.de/search?q=<word>` (about 1,180 hits for "Bonifatius"). Hits link to `<volume>/index.htm#page/<N>`. The scan number can differ from the printed page number.
- **Czech Kramerius (NDK) API**, works:
  - Search: `https://kramerius5.nkp.cz/search/api/v5.0/search?q=<query>&fl=PID,dc.title,dc.creator,datum_str,dostupnost&rows=10&wt=json`. Use `fq=fedora.model:monograph` to limit to books. Example query: `dc.title:"Svatý Vojtěch"`.
  - Only items with `dostupnost: public` can be read. Items marked `private` are locked.
  - Pages of a book: `.../item/<PID>/children`. Raw OCR of one page: `.../item/<page-PID>/streams/TEXT_OCR`. Checked with the 1891 book on Aloysius Gonzaga (about 516 child items).
  - Full-text search in all books: `q=text_ocr:<word>`. It works, with many hits.
  - The public reading site `digitalniknihovna.cz` is a browser application.
- **archive.org**: `https://archive.org/advancedsearch.php?q=<query>&fl[]=identifier&fl[]=title&rows=10&output=json`. Raw text: `https://archive.org/download/<id>/<id>_djvu.txt`. *Acta Sanctorum Junii* has four Google Books copies (`bub_gb_qJjIip3XkpMC` and others). The Boniface entry falls in the June 1 to June 5 volumes.
- **Deutsche Digitale Bibliothek (deutsche-digitale-bibliothek.de)** and **e-rara.ch** (Swiss rare books) answer. Search tests: unchecked. The MDZ search page `digitale-sammlungen.de/en/search?query=` answers with a browser application.
- **Wikisource** (pl, cs): use the MediaWiki API, not guessed page names.

## Language

- German: Umlauts and `ß` matter. The old form `Bonifacius` and the Latin `Bonifatius` both exist. Names with "von" carry the place (Hedwig von Schlesien, Stanislaus von Krakau). Search under the given name.
- Polish: Kolbe = Maksymilian Maria Kolbe; Faustina = Maria Faustyna Kowalska (Helena Kowalska); Stanisław ze Szczepanowa; Jadwiga Śląska. Old texts use pre-1936 spelling.
- Czech: Václav (Wenceslas), Vojtěch (Adalbert), Prokop, Ludmila, Zdislava, Jan Nepomucký. Hungarian: István, Imre, László, Erzsébet, Margit. Croatian and Slovene: Nikola Tavelić, Leopold Mandić, Alojzije Stepinac, Anton Martin Slomšek.
- Feast dates differ by diocese and country. heiligenlexikon.de lists them. Record the general calendar date and the local date.
- Latin: MGH texts use classical and medieval forms (Bonifatius, Stanislaus). OCR of Latin gives errors such as `vv` and long s, so search for word stems.

## Rights

- MGH editions and 19th-century collections (Bielowski, Braunsberger, Acta Sanctorum) are public domain as texts. The scans on MDZ and archive.org are marked for free use. Check the licence line on each item.
- heiligenlexikon.de, Magyar Katolikus Lexikon, HLS, NDB, Slovenska biografija, Pravenc, and Vatican-site texts are under copyright: facts only, in our own words. The Vatican allows quoting its texts with credit. Confirm on the page.
- Kramerius: only items marked `public` are open. Do not use `private` items.
- Modern Lives from orders and shrines (Niepokalanów, faustyna.pl) are facts only.

## Lessons log

(One dated line for each saint: what worked, what failed, what was missing.)
