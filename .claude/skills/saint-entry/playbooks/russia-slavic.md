# Playbook — Russia and the Slavic Orthodox lands

For saints of Russia, Ukraine, and Belarus, and for the Russian Church abroad. For Russian monks on Mount Athos, also read the Greek playbook.

## Start here

1. **Azbyka.ru (Азбука веры)** — the largest free Orthodox library in Russian. Full texts of the classic collections of Lives, patericons, and the saints' own writings. Checked 2026-09-29.
2. **Pravoslavnaya Entsiklopediya (pravenc.ru)** — the scholarly Orthodox encyclopedia, with long, sourced articles and bibliographies. Use it for facts and for leads to primary sources. The site answered to `curl` on 2026-09-29. Its search and page numbers are not yet checked.
3. **Drevo (drevo-info.ru)** — an open Orthodox encyclopedia. Short entries, good for identity, dates, and name forms. The site answered to `curl` on 2026-09-29.

## By era

### Early Church and Kievan Rus' (before 1240)

- The *Kiev Caves Patericon* (Киево-Печерский патерик) and the Lives in the *Primary Chronicle*.
- St. Dimitry of Rostov, *Lives of the Saints* (Жития святых), on Azbyka. It is arranged by the Church calendar.
- Pravenc articles for the historical context and for scholarly disputes.

### Medieval Muscovy (1240–1700)

- The oldest Lives, often by Epiphanius the Wise or Pachomius the Serb. Look for them by the saint's name on Azbyka.
- Metropolitan Makarii's *Great Menaion Reader* (Великие Минеи Четьи), printed 1868–1917. Public domain. Location on Azbyka not yet checked.
- Dimitry of Rostov and Filaret of Chernigov (see below).

### Synodal Russia (1700–1917)

- Filaret of Chernigov, *Lives of the Saints* (Избранные жития святых), on Azbyka.
- Sergei Smirnov, *Lives of the Russian Saints* (Жития русских святых), on Azbyka.
- The patericons of the great monasteries, on Azbyka: Valaam, Optina (*Вертоград старчества*), Glinsk, and Solovki.
- *Great Russian Elders* (Великие русские старцы), on Azbyka.
- The saint's own letters and sermons, often on Azbyka under the saint's name.

### New Martyrs and the 20th century (after 1917)

- *Great Russian Elders of the 20th Century* (Великие русские старцы XX века), on Azbyka.
- The glorification Lives published by the Moscow Patriarchate's Synodal Commission. Search patriarchia.ru. Not yet checked.
- The St. Tikhon's University (PSTGU) database of New Martyrs, with arrest and interrogation records. Address not yet checked.
- Hegumen Damaskin (Orlovsky), the multi-volume lives of the New Martyrs. Under copyright: facts only.
- OrthoChristian.com, for English translations and leads. Under copyright: facts only, and trace each article back to its Russian source.

### Catholic sources

Almost all saints of this region are Orthodox only. Catholic sources matter in three cases. All are unchecked leads:

- **Shared saints of Kievan Rus' before 1054,** such as Sts. Olga, Vladimir, Boris, and Gleb, whom some Catholic calendars also list. The *Acta Sanctorum* and the *Bibliotheca Sanctorum* have entries on some of them.
- **Russian and Ukrainian Greek-Catholic saints and blesseds,** such as Blessed Leonid Feodorov and the Ukrainian Greek-Catholic martyrs. Their sources are Vatican decrees and the sites of these Churches.
- **Disputed:** St. Josaphat Kuntsevych, honored by Catholics and viewed critically by many Orthodox. Present both views with sources.

## Access

- **Azbyka name lookup.** The command sandbox cannot resolve `azbyka.ru`, and WebFetch fails with "ENOTFOUND". The site itself works. Look up the address, then connect to it directly:

  ```bash
  IP=$(nslookup azbyka.ru | awk '/^Address: /{print $2; exit}')
  curl -sL -A "Mozilla/5.0" --resolve azbyka.ru:443:$IP "https://azbyka.ru/otechnik/Zhitija_svjatykh/"
  ```

  On 2026-09-29 the address was 95.129.237.155.
- **Azbyka URL patterns:**
  - Catalogue of Lives: `https://azbyka.ru/otechnik/Zhitija_svjatykh/`, which links to about 300 works.
  - A work: `https://azbyka.ru/otechnik/<Author>/<work-slug>/`. Examples:
    - `Dmitrij_Rostovskij/zhitija-svjatykh/`
    - `Filaret_Chernigovskij/izbrannye-zhitija-svjatyh-tom-1/`
    - `Sergej_Smirnov/zhitija-russkih-svjatyh/`
    - `Zhitija_svjatykh/valaamskie-startsy/`
    - `Zhitija_svjatykh/velikie-russkie-startsy-20-veka/`
    - `Ivan_Buharev/zhitija-vseh-svjatyh-prazdnuemyh-pravoslavnoj-greko-rossijskoj-tserkovyu/`
  - Saints calendar: `https://azbyka.ru/days/`. Not yet checked.
- **Raw text.** Strip the HTML from the `curl` output. Pages are long, so search the text for the saint's name forms before reading.

## Language

- Search every name form: the Church Slavonic form, the modern Russian form, the monastic name, and the title (for example преподобный, святитель, мученик, блаженный).
- Old texts use pre-1918 spelling (ѣ, і, ъ at the end of words). Search both spellings.
- Feast dates: Russian sources give the Julian date, often with the civil date in brackets. Record both. The difference is 12 days in the 19th century and 13 days from 1900.

## Rights

- Pre-revolutionary texts (Dimitry of Rostov, Filaret, Smirnov, Makarii, the old patericons) are public domain. Modern editions can add copyrighted notes.
- Soviet-era and modern Lives, Pravenc, and Damaskin are under copyright: facts only, in our own words.
- Azbyka's free reading does not mean permission to copy modern texts.

## Lessons log

(One dated line for each saint: what worked, what failed, what was missing.)
- 2026-09-30 Seraphim of Sarov (church-miracles): worked: synod.com English text of the 1903 Synod Act, ru.wikipedia (fetch_text, use --max-words 7600 for full), roca.org, orthochristian; failed: archive.org borrow-only books, roadtoemmaus.net PDFs (binary), pravenc.ru URL with Cyrillic (curl exit 3); Sanidopoulos relics page has errors vs Russian sources.
- 2026-09-30 Seraphim of Sarov (own-words): worked: azbyka work pages for Conversation, 1841 Skazanie, Chichagov 1903 Life via fetch_text.py (use --max-words 30000; default cuts at 3,000 words). Failed: 'Наставления' (1863) is mostly quotes from the Fathers, not his words. Missing: primary source for 'Стяжи дух мирен'; birth year 1759 (old Lives) vs 1754 (modern).

- 2026-09-30 Seraphim of Sarov (witnesses): worked: fetch_text.py on azbyka URLs directly (no DNS fix), chapter pages /1 /2 of Elagin 1863 Life (Russian eyewitness texts), the 'Skazanie' of Hieromonk Sergius 1841, and the azbyka 'Khronika zhizni' for dates. Failed/slow: default cut at 3000 words (use --max-words); Chichagov 'Letopis' front page is only a table of contents.
- 2026-10-01 Sergius of Radonezh (tier B): worked: azbyka Life 'zhitie-i-chudesa-prepodobnogo-sergija-igumena-radonezhskogo' via fetch_text (--max-words 95000; modern Russian translation of Epiphanius/Pachomius, so facts only), ru.wikipedia with --max-words 20000 for 1919-46 and source conflicts, Sanidopoulos Dimitry of Rostov English. Failed: source-library find.py no hits; pravenc not tried; no public-domain English Epiphanius found; 'Makovets' name absent from the Life text.
- 2026-10-01 Xenia of Saint Petersburg (tier B): worked: azbyka Bulgakovsky 1891 booklet (public domain, quotes 1847 police gazette and 1845 Grebenka), Blagovest 2010 on azbyka with full 1978 and 1988 Acts, ru.wikipedia (use --max-words 12000), fetch_text on azbyka without DNS fix; failed: pravenc.ru guessed URL gave wrong page, the Smolensky church ru.wikipedia title returned 68 words, search gave no pravenc URL; missing: Pravenc, Rakhmanin 1909, Saitov. Note: the request's calendar dates were reversed (24 Jan Julian = 6 Feb Gregorian) and the ROCOR canonization (1978) came before 1988.
