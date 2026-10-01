# Playbook — Romania, Moldova, Serbia, Bulgaria, North Macedonia, Montenegro

For saints of the Romanian, Serbian, Bulgarian, Macedonian, and Montenegrin lands. For Slavic Orthodox saints in Russia, read `russia-slavic.md` too. For Athonite saints (Sava and Symeon at Hilandar, Paisius on Athos), read the Greek playbook when it exists.

All checks below were made on 2026-09-29 and 2026-09-30 with `curl -sL -A "Mozilla/5.0"`. Word counts are the visible text after stripping HTML.

## Start here

### Orthodox sources

1. **Doxologia (doxologia.ro)**, Archdiocese of Iași. Romanian. Lives of saints, the *Patericul românesc* series, the confessors of the communist prisons, and a full alphabetical synaxarion. Works with plain `curl`.
2. **Svetosavlje (svetosavlje.org)**. Serbian, in Cyrillic. It hosts the *Prologue of Ohrid* by St. Nikolai Velimirović day by day, and the *Lives of the Saints* by St. Justin Popović. Works with plain `curl`.
3. **Pravoslavieto.com** and **bg-patriarshia.bg**. Bulgarian. Pravoslavieto has a Life page for each calendar saint, often with excerpts from old Lives. The Patriarchate site has a "Bulgarian Saints" section. Both work with plain `curl`.

### Catholic sources

1. **Vatican News (vaticannews.va)**. Short profiles and news of the beatifications of the Greek-Catholic martyrs of Romania (2019) and Bulgaria (2002). Works.
2. **The Greek-Catholic Church of Romania (bru.ro)**. The Romanian Church United with Rome. The home page works. Deep pages are unchecked.
3. **Dicastery for the Causes of Saints (causesanti.va)** and vatican.va, for decrees and homilies. The site answers, but every URL I guessed for a homily returned 404. Find the exact address through a web search first.

## Catholic, Orthodox, or both

- Most saints of this region are **Orthodox only**: Sava, John of Rila, Paisius, Justin Popović, Vasilije of Ostrog.
- **Shared:** Cyril and Methodius, and Clement and Naum of Ohrid. Rome honors Cyril and Methodius, so use one source from each tradition. Clement and Naum are honored mainly by the Orthodox. Check before you mark them shared.
- **Eastern Catholic:** the Romanian Greek-Catholic martyr bishops (beatified 2 June 2019 at Blaj): Valeriu Traian Frențiu, Vasile Aftenie, Ioan Suciu, Tit Liviu Chinezu, Ioan Bălan, Alexandru Rusu, and Iuliu Hossu. Also Bl. Eugene Bossilkov (Bulgarian Catholic, Latin rite, beatified 2002). Vatican News confirms the seven names and the date.
- **Catholic only, Balkan connection:** Mother Teresa (born in Skopje) and St. Leopold Mandić (Herceg Novi, Montenegro coast). Not checked in this pass. Use Vatican sources.
- **Disputed:** Nikolai Velimirović and Justin Popović are honored as saints by the Serbian Church. Some critics attack their political and theological views. Cite the critical scholarship separately from the Church sources. Present both fairly. Do not add polemics. Serbian Church glorifications outside Serbia (for example in Montenegro or Macedonia) are sometimes contested by the local Church. Set `venerated_in` only for the Church that honors the saint.

## By era

### Early Church and the first Christians (before about 600)

The region holds the Roman Danube provinces. Saints are martyrs such as Sava the Goth and the Martyrs of Niculițel. Use:

- Doxologia synaxarion: `https://doxologia.ro/sinaxar-alfabetic`. It is one page of about 10,000 words, with a link to each saint. Search the page for the name.
- The Bulgarian calendar with Life pages: `https://www.pravoslavieto.com/1/calendar.htm`. It links to `life/MM.DD_sv_Name.htm` pages. Example: `life/04.15_sv_Sava_Gotski.htm`.
- Shared saints: New Advent and the OCA (see Access).

### Medieval (600–1500)

Sample saint, Serbia: **St. Sava of Serbia** (about 1175–1236, feast 14 Jan Julian, 27 Jan Gregorian).

- **Prologue of Ohrid**, entry for 14 January in Serbian: `https://svetosavlje.org/prolog-2/15/`. The entry is short and confirms his birth, monastic vow on Mt. Athos, and the autocephaly of the Serbian Church. Checked: full Serbian text returned.
- SPC calendar: `https://www.spc.rs/sr/news/kalendar/`. Each article is at `/sr/news/kalendar/<number>.<slug>.html`. Checked with the Justin article (8,355 words).
- The old Lives by Domentijan (1253) and Teodosije (about 1300) are the primary sources. I did not find a full online text. Web search returned scholarship only. Leads: the Rastko Project (`https://www.rastko.rs`, works, large) and the Digital Library of the National Library of Serbia (`https://digitalna.nb.rs`, works). Mark both as unchecked for these texts.
- Serbian Wikipedia's article `https://sr.wikipedia.org/wiki/Свети_Сава` works and lists sources in "Литература".

Sample saint, Bulgaria: **St. John of Rila** (about 876–946, feasts 19 Oct, 18 Aug, 1 July).

- `https://www.pravoslavieto.com/life/10.19_sv_Ivan_Rilski.htm`. About 6,000 words in Bulgarian. It lists several Lives, including the one from the Chet'i Minei. Checked: real text returned. The page is in Windows-1251 in places, so decode carefully.
- Also on Pravoslavieto: `life/08.18_sv_Ivan_Rilski_uspenie.htm` and `life/07.01_sv_Ivan_Rilski_moshti.htm`.
- Bulgarian Patriarchate: `https://bg-patriarshia.bg/sv-ioan-rilski`. About 8,600 words. Checked.
- Primary sources named on those pages: the Life by Patriarch Euthymius of Tarnovo and the older Lives. I read only the lists, not the texts.

Other saints of this era: Clement and Naum of Ohrid. `https://mk.wikipedia.org/wiki/Свети_Климент_Охридски` works (about 9,600 words). The Macedonian Church site works on plain HTTP only: `http://mpc.org.mk` (HTTPS failed). It has a calendar. Deep pages are unchecked.

Romanian medieval saints (for example Nifon of Wallachia, Anthim the Iberian later): use Doxologia. Pattern: `https://doxologia.ro/<saint-slug>-drumul-spre-sfintenie`. You cannot guess the slug. Find it in the calendar page or the synaxarion.

### Early modern (1500–1900)

Sample saint: **St. Paisius Velichkovsky** of Neamț (1722–1794, feast 15 Nov).

- Doxologia: `https://doxologia.ro/sfantul-cuvios-paisie-de-la-neamt` (about 1,900 words) and `https://doxologia.ro/sfantul-paisie-de-la-neamt-drumul-spre-sfintenie` (about 560 words). Both returned real Romanian text.
- Doxologia Publishing House has PDF sample pages on his life. Search results showed `edituradoxologia.ro/sites/default/files/pdf/...`. I did not fetch them. Unchecked.
- Ioanichie Bălan, *Patericul românesc*. Full OCR text on archive.org (2 MB): `https://archive.org/download/ioanichie-balan.-patericul-romanesc/ioanichie%20b%C4%83lan.%20patericul%20rom%C3%A2nesc_djvu.txt`. It holds about 311,000 words. Checked. The OCR uses the old cedilla letters (ş, ţ), so search for both forms. Also: an English translation exists on archive.org (`the-romanian-paterikon-by-archimandrite-ioanichie-balan-english-translation_202608`). Not read.
- Paisius's Slavic side: for his Russian and Ukrainian sources, read `russia-slavic.md`.
- Sample saint, Moldavian hermit: **Paisie of Sihăstria** (1701–1784) and Sila and Natan: `https://doxologia.ro/sfintii-cuviosi-sila-paisie-natan-drumul-spre-sfintenie` (about 4,000 words). Checked. The local canonization of Paisie and Cleopa at Sihăstria took place on 7 Aug 2025. This is a local proclamation. Check the Synod act before you call it a general canonization.

Serbian saints of this era (Sts. Vasilije of Ostrog, Petar of Cetinje): the Montenegrin-Littoral Metropolitanate site `https://mitropolija.com/sveti-vasilije-ostroski` works and quotes Nikolai's Prologue text. Serbian Wikipedia also works.

### Modern (after 1900)

Sample saint: **St. Justin Popović** (1894–1979, glorified 2010; feast 1 June, old style 19 May).

- SPC: `https://www.spc.rs/sr/news/kalendar/16930.prepodobni-justin-celijski.html`. Checked. Long Serbian Life.
- Svetosavlje: `https://svetosavlje.org/zitija-svetih/2/` has the Life of Justin, as a preface to his own *Lives of the Saints* (12 volumes, 1972–1977). Justin's Lives are under copyright. Facts only.
- Older SPC archive: `http://arhiva.spc.rs/sr/zhitije_svetog_justina_tshelijskog.html`. Works, but short.

Romanian confessors of the prisons and the elders:

- Doxologia index of confessors: `https://doxologia.ro/marturisitori-temnitele-comuniste-index`. About 1,300 words, with a link to each person at the site root, for example `/arhimandritul-justin-parvu` (about 1,600 words, checked), `/arhimandritul-arsenie-papacioc`, and `/arhimandritul-roman-braga`. Most of these people are not canonized. Check recognition first. Valeriu Gafencu is popularly called "the saint of the prisons". I did not check any glorification act. Do not call him a saint without one.
- Doxologia elders: `https://doxologia.ro/parinti` and `https://doxologia.ro/maici`.
- Ioanichie Bălan's *Patericul românesc* (see above) covers many 20th-century elders, including Cleopa.
- Greek-Catholic martyrs: Vatican News print page `https://www.vaticannews.va/en/pope/news/2019-06/pope-francis-romania-beatification-7-greek-catholic-martyrs.print.html`. Checked. Short. It gives the seven names. For full biographies, use bru.ro and the Vatican decrees (unchecked).
- Bulgarian Catholic: Eugene Bossilkov. `https://en.wikipedia.org/wiki/Eugene_Bossilkov` works as a lead. Find the Vatican homily of 15 March 2002 by web search. My guessed vatican.va address failed.

## Orthodox sources: notes on each

- **Doxologia.** Menus: "Sinaxar alfabetic", "Părinți duhovnicești", "Maici cu viață duhovnicească", "Mărturisitori în temnițele comuniste", "Vieţile Sfinţilor" (`/biblioteca/vietile-sfintilor`, about 104 pages of results) and "Pateric" (`/biblioteca/pateric`). The list page `https://doxologia.ro/patericul-romanesc` shows the newest entries. The internal search box does not work with plain `curl` (search URLs return an empty page; the site uses Google search). Use the synaxarion page, the calendar (`/calendar-ortodox/YYYYMM`), or a web search with `site:doxologia.ro`.
- **Basilica.ro** (Romanian Patriarchate press) is blocked. It returns 403 with a Cloudflare page, even for a Safari header. The archive `arhiva.basilica.ro` is blocked too. Use a browser, or a web search snippet, and mark the article "needs a browser". **Patriarhia.ro** works for plain `curl` (news and decrees). Its calendar at `calendar.patriarhia.ro` is a JavaScript app and returned almost no text. It needs a browser.
- **Serbian Church (spc.rs).** The home page works but is very large (1.4 MB). The calendar articles work. The site search is unchecked. The old archive `arhiva.spc.rs` still works.
- **Prologue of Ohrid, Serbian original.** Svetosavlje, month pages: `https://svetosavlje.org/prolog-N/` and day pages `https://svetosavlje.org/prolog-N/D/`. The month number is shifted by one: January is `prolog-2`, September is `prolog-10`, December is `prolog-13`. The day number is also shifted by one: 1 September is `/prolog-10/2/`. The dates are Julian (Serbian Church calendar). So 14 January Julian is `/prolog-2/15/`. Checked with Sava. Wikisource also has a page `https://sr.wikisource.org/wiki/Охридски_пролог`, which links to Svetosavlje. Russian version: Azbyka `https://azbyka.ru/otechnik/Nikolaj_Serbskij/ohridskij-prolog/`. It needs the Azbyka lookup trick in `russia-slavic.md`.
- **Bulgarian sources.** Pravoslavieto.com is old (last updated 2014) but has stable pages. Pattern: `https://www.pravoslavieto.com/life/MM.DD_sv_Name.htm`. Read the calendar page for the exact file names. Dates are New Julian (Gregorian in fixed feasts). Bulgarian Patriarchate: `https://bg-patriarshia.bg/bul-saints` and `/lives-of-saints`. Both work. `https://chitanka.info` (Bulgarian free library) works. I did not test a search for a Life.
- **OCA (oca.org).** It covers Sava and John of Rila in English, but a guessed URL can return a different saint. On 2026-09-29 my guessed Sava, John of Rila, and 28 June addresses all showed other saints (Basil, Laurence of Kaluga, the Circumcision). Always read the heading of the page. Find the address through the site's own calendar.
- **North Macedonia.** `http://mpc.org.mk` (HTTP only). Wikipedia `mk.wikipedia.org` works. Little else checked.
- **Moldova.** The Metropolis of Chișinău `https://mitropolia.md` works (home page only checked).

## National digital libraries

- Serbia: `https://digitalna.nb.rs` (National Library) answers. Search inside the site is unchecked. Rastko `https://www.rastko.rs` answers. The link `rastko-sr/delo/12344` that I tried returned an unrelated Kosovo journal. Do not reuse it.
- Bulgaria: `https://www.nationallibrary.bg` answers. Catalogue search is unchecked.
- Romania: `dacoromanica.ro` and `bibliotecadigitala.ro` answer, but return almost no text to `curl` (JavaScript or redirect). Need a browser. `documente.bcucluj.ro` answers with little text. `dspace.bcu-iasi.ro` answers. All unchecked for saints.
- Archive.org is the best free source of scanned Romanian books (Bălan's *Patericul românesc*, *Convorbiri duhovnicești*). See `orthodox-paterika.md` for the titles.
- Not reachable in the sandbox: `cyrillicsource.com`, `zhitiya.org`, `digital.bnrm.md`, and `www.biserica.org` (no connection). `www.bibliotecametropolitana.ro` returned 403.

## Access

- **Plain `curl` works** on doxologia.ro, svetosavlje.org, spc.rs, pravoslavieto.com, bg-patriarshia.bg, mitropolija.com, archive.org, vaticannews.va, oca.org, and patriarhia.ro.
- **Blocked:** basilica.ro (Cloudflare 403). **Needs a browser:** calendar.patriarhia.ro, dacoromanica.ro.
- Strip HTML first. Pravoslavieto pages can be Windows-1251. Try UTF-8, then `cp1251`.
- The archive.org text URL must use the percent-encoded file name. Find the name with `https://archive.org/metadata/<id>`.
- Doxologia slugs are not predictable. Try `<saint-slug>-drumul-spre-sfintenie` first. A 404 page still returns HTTP 200 with the words "Nu am găsit pagina". Check the text, not the status code.
- A vatican.va address must be exact. Guessed addresses return 404.

## Language

- **Romanian:** Cuviosul (venerable), Sfântul Ierarh (bishop), Sfântul Mucenic (martyr), Sfântul Mărturisitor (confessor). Old texts use ş and ţ with a cedilla. Modern text uses ș and ț with a comma. Search both. Diacritics may be missing (Paisie, Neamț or Neamţ). The Church spells Paisius as *Paisie*.
- **Serbian:** Cyrillic and Latin are both used. Svetosavlje and SPC use Cyrillic. Convert names. Sava: Свети Сава / Sveti Sava. Justin: Јустин Ћелијски (of Ćelije), Поповић. Feast dates use the Julian calendar. Add 13 days for the Gregorian date.
- **Bulgarian:** John of Rila is Иван Рилски or Йоан Рилски. Both forms occur. The Bulgarian Church uses the New Julian calendar for fixed feasts, so dates match the Gregorian calendar. Pascha follows the Julian calculation.
- **Romanian Church calendar:** also New Julian for fixed feasts. Serbian and Macedonian Churches use the old Julian calendar. Record both dates.
- **Russian forms** appear in Azbyka: Иоанн Рыльский, Паисий Величковский.

## Rights

- Medieval and 19th-century texts are public domain. Modern editions may add copyrighted notes.
- **St. Nikolai Velimirović** died in 1956. Wikisource marks his Prologue public domain on a "life plus 50 years" basis. That basis is out of date for Serbia. Serbian law now uses life plus 70 years, which ends after 31 Dec 2026. The Prologue was first published in the 1920s, so a US claim may differ. Treat the text as facts-only, and do not copy it, until a rights check is made. I did not do that check.
- Justin Popović (d. 1979): under copyright. Facts only.
- Bălan's *Patericul românesc*, Doxologia articles, SPC, and Vatican News texts: under copyright. Facts only, in our own words. Archive.org hosting does not give a right to copy.
- Two sites that repeat one Life are one source. Doxologia often reprints Bălan.

## Gaps and unchecked leads

- Full online text of Domentijan and Teodosije (Serbian medieval Lives).
- Site searches on spc.rs, bru.ro, and the national libraries.
- Catholic sources on Mother Teresa, Leopold Mandić, Bl. Anton Durcovici, and Bulgarian Catholic saints.
- Romanian Synod acts of canonization (patriarhia.ro pages exist but I did not read one).
- Montenegrin and Macedonian Church saint pages beyond the home pages.

## Lessons log

(One dated line for each saint: what worked, what failed, what was missing.)
