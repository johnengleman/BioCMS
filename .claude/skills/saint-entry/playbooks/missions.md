# Playbook — Missions: the Americas, Asia, Africa, and Oceania

For saints of North, Central, and South America; Japan, China, Korea, Vietnam, the Philippines, and India; Africa; and Oceania. It covers Catholic and Orthodox saints. Access was checked on 2026-09-30 unless a line says "unchecked".

For Ethiopian, Coptic, and Malankara (Indian Oriental Orthodox) saints, read the christian-east playbook. For Spanish and Portuguese colonial saints, also read the Iberia playbook. For French missionaries, also read the France playbook.

## Tradition type

- **Catholic only:** nearly all saints of Latin America, the Philippines, Korea, Vietnam, Uganda, and Oceania. Also the Martyrs of Japan, the Martyrs of China (Catholic list), and the North American Martyrs.
- **Orthodox only:** St. Herman, St. Innocent (Veniaminov), St. Jacob Netsvetov, St. Peter the Aleut, St. Nicholas of Japan, and the Holy Martyrs of China (1900). The Catholic Church does not list them as saints.
- **Shared:** almost none in this region. Treat St. Francis Xavier as Catholic only.
- **Disputed:** St. Peter the Aleut. The Orthodox honor him as a martyr of San Francisco (1815). The story comes from the Orthodox tradition only, and some Catholic writers doubt it. I did not check the scholarship. Give both views with sources. Set `venerated_in` for the Orthodox Church only.
- Dates: Orthodox sources in North America and Japan often use the Gregorian calendar (the OCA does). Russian sources use the Julian calendar. Record the calendar for each feast day.

## Start here

**Catholic**

1. **Vatican canonization homilies (vatican.va)** — give the official list of martyrs, dates, and a short sketch. Works for saints canonized after 1958. Check the index page by year, then open the "en" document. See Access.
2. **Original mission chronicles on archive.org** — Thwaites, *Jesuit Relations* (Canada), Blair and Robertson, *The Philippine Islands* (on Gutenberg and archive.org), Dallet, *Histoire de l'église de Corée* (Korea), and the 17th-century Spanish lives of Rose of Lima. Full text is free.
3. **Dictionary of Canadian Biography (biographi.ca)** and **Dictionary of African Christian Biography (dacb.org)** — sourced, scholarly entries with bibliographies. Use them for North American and African saints.

**Orthodox**

1. **OCA Lives of the Saints (oca.org/saints/lives)** — search by name. Covers Herman, Innocent, Nicholas of Japan, Peter the Aleut, and the Martyrs of China.
2. **Azbyka.ru** — the full Russian texts: the 1894 *Life of Herman*, the diaries of Nicholas of Japan, and the works of Innocent (Veniaminov).
3. **Pravenc (pravenc.ru)** — long, sourced Russian articles. Use them for facts and for primary sources.

## Catholic sources

### Official sites

- **Vatican homilies.** Working examples:
  - Korea (103 martyrs, 6 May 1984): `https://www.vatican.va/content/john-paul-ii/en/homilies/1984/documents/hf_jp-ii_hom_19840506_martiri-coreani.html` — 2,627 words.
  - Vietnam (117 martyrs, 19 June 1988): `.../john-paul-ii/en/homilies/1988/documents/hf_jp-ii_hom_19880619_martiri.html`.
  - Lorenzo Ruiz and companions (Japan and the Philippines, 18 Oct 1987): `.../homilies/1987/documents/hf_jp-ii_hom_19871018_canonizzaz-martiri.html`.
  - Augustine Zhao Rong and 119 companions (China), Josephine Bakhita, and Katharine Drexel (1 Oct 2000): `.../homilies/2000/documents/hf_jp-ii_hom_20001001_canonization.html`.
  - Juan Diego (31 July 2002): `.../homilies/2002/documents/hf_jp-ii_hom_20020731_canonization-mexico.html`.
  - Kateri Tekakwitha and Pedro Calungsod (21 Oct 2012): `https://www.vatican.va/content/benedict-xvi/en/homilies/2012/documents/hf_ben-xvi_hom_20121021_canonizzazioni.html`.
  - Damien of Molokai (11 Oct 2009): `.../benedict-xvi/en/homilies/2009/documents/hf_ben-xvi_hom_20091011_canonizzazioni.html`.
- **Fides (fides.org/en)** — the Vatican mission news agency. Loads. Search not checked.
- **Church of Korea:** the English CBCK site (english.cbck.or.kr) lists "103 Korean Martyr Saints", but the martyr pages return an error page ("404") with HTTP 200. Do not use them. The Korean-language site (cbck.or.kr) loads; its martyr pages are unchecked.
- **Japan:** cbcj.catholic.jp (Bishops' Conference of Japan) loads. Its saint pages are unchecked.
- **Shrines:**
  - National Kateri Tekakwitha Shrine, Fonda NY (katerishrine.org) — loads; the page has 6,957 words. The shrine pages are devotional. Do not use them for dates.
  - Martyrs' Shrine (Midland, Auriesville) and the Uganda Martyrs Shrine at Namugongo: the sandbox did not connect to the Midland and Auriesville sites (`martyrshrine.org`, `martyrshrine.com`). The Namugongo site (ugandamartyrsshrine.org) resolves but did not answer curl. Mark all three "needs a browser".
- **Dicastery for the Causes of Saints (causesanti.va)** and **Vatican News (vaticannews.va)** — the general sources.md rules apply. The guessed direct URLs I tried on Vatican News and the Dicastery returned 404. Find the page from the site search first.

### Encyclopedias and databases

- **Catholic Encyclopedia (1913).** New Advent's abridged index (`newadvent.org/cathen/<letter>.htm`) lists few of these saints. Working New Advent pages: Rose of Lima (`13192c.htm`), Peter Claver (`11763a.htm`), Francis Xavier (`06233b.htm`). Do not guess other IDs (many return 404).
  Use the **Wikisource API** to find the rest:
  `https://en.wikisource.org/w/api.php?action=query&list=search&srsearch=<name>+intitle:Catholic+Encyclopedia+1913&format=json`
  Then fetch the wikitext with `https://en.wikisource.org/w/index.php?title=<title>&action=raw`. Titles found: *Catherine Tegakwitha (Tekakwitha, Takwitha)*, *St. Isaac Jogues*, *René Goupil*, *Auriesville*, *Sts. Peter Baptist and Twenty-five Companions*, *St. Philip of Jesus*, *St. Toribio Alfonso Mogrovejo*. The article "Japanese Martyrs" is only a redirect (42 words). The 1913 set has no entry for Martin de Porres (only a beatified person then) or for the Uganda martyrs.
- **Dictionary of Canadian Biography.** `https://www.biographi.ca/en/bio/<surname>_<given>_<vol>E.html`. Tested: `tekakwitha_1E.html` (2,720 words) and `jogues_isaac_1E.html` (4,469 words). Use the site search for other names.
- **Dictionary of African Christian Biography (dacb.org).** Entry URL pattern: `https://dacb.org/stories/<country>/<surname>-<given>/`. Tested: `stories/uganda/lwanga-charles/` (2,266 words, correct saint). Site search `?s=` returned no links in my test, so use the country index.
- **Santi e Beati (santiebeati.it)** — Italian saint database. Loads. Entry lookup not checked. **Catholic-Hierarchy** loads; not needed for lives. **Hagiography Circle** (newsaints.faithweb.com) loads; a list of canonizations with dates.

### Primary texts by region

**North America (early modern):**
- Thwaites, *The Jesuit Relations and Allied Documents* (73 vols., 1896–1901), on archive.org. Search:
  `https://archive.org/advancedsearch.php?q=title%3A%28jesuit+relations+allied+documents%29+AND+mediatype%3Atexts&fl%5B%5D=identifier&fl%5B%5D=title&rows=100&output=json`
  Full text: `https://archive.org/download/<identifier>/<identifier>_djvu.txt` (about 90,000 words per volume). Trap: the identifier numbers do not always match the volume number. Check the title in the search result and search the text.
  Test result: Kateri appears in `jesuitrelationsa0063jesu` and `jesuitrelationsa0063reub` (spelled "Catherine Tegakwita"). She does not appear in the 57 and 64 volumes I tested. Spellings in the text: Tegakwita, Tegakouita, Tegakoüita, Tegakvita. Search for all of them.
  The Creighton University site (puffin.creighton.edu/jesuit/relations) does not resolve. Use archive.org.
- Canadiana (canadiana.ca) holds the French *Relations des Jésuites* (1858 Quebec edition). The site loads. I did not open a volume. It is unchecked whether the text is searchable by curl.
- Some archive.org items whose identifier ends in `0000xxxx` (for example `blackmartyrs0000revj`) are lending copies. They give HTTP 401 for the text. Do not use them.

**Latin America:**
- Rose of Lima: Leonard Hansen, *Vida admirable, y muerte preciosa ... Rosa de Santa Maria* (1665), archive.org `vidaadmirableymu00hans_0` (30,450 words, Spanish, tested). Also Cataño's *Vida portentosa ... de Santa Rosa de Santa María* (1896 edition), archive.org `vidaportentosade00cata` (147,937 words; "Rosa" appears 1,172 times, tested).
- Martin de Porres: archive.org has 20th-century lives (`bwb_W3-EGX-869`, 1937; `san-martin-de-porres`). Search results returned the modern English lives as lending copies (401). The 17th-century process testimony was not found. Gap.
- Junípero Serra: Palou, *Relación histórica de la vida ... del venerable padre fray Junípero Serra* (1787), archive.org `relacionhistoric00palo` (found by search; text not opened).
- Juan Diego: Laso de la Vega, *Huei tlamahuiçoltica* (1649), English edition on archive.org (`storyofguadalupe00lisa`), lending; not tested.
- Spanish digital libraries: Biblioteca Virtual Miguel de Cervantes (cervantesvirtual.com) loads. PARES (pares.cultura.gob.es, Archivo General de Indias) loads. Memoria Chilena loads but is script-driven (4 words in curl). Biblioteca Digital Hispánica did not connect. Gallica blocks scripts (see sources.md). None searched for a saint.

**Asia:**
- Korea: Dallet, *Histoire de l'église de Corée* (Paris 1874, 2 vols.), archive.org `histoiredeleglis00dall` (vol. 1, 251,654 words) and `histoiredelgli02dall` (vol. 2, 258,912 words). Tested: André Kim (Andrew Kim Taegon) appears in vol. 2 (OCR writes "André  Kim" with two spaces; also "Kim-hai-kim"). The Kim martyrdom (1846) is in vol. 2.
- Philippines: Blair and Robertson, *The Philippine Islands, 1493–1898* (55 vols.), on Project Gutenberg and archive.org. Example: `thephilippineisl56778gut` (vol. 49); `https://www.gutenberg.org/cache/epub/56778/pg56778.txt` gave 100,044 words. Find other volumes by the archive.org search on the title. Lorenzo Ruiz (1637) is in the volumes for 1633–1640; volume not tested.
- Japan: Frois's *Historia de Japam* and the Jesuit annual letters (*Cartas de Iapão*). Found on archive.org: `segunda-parte-das-cartas-de-iapao-que-escreuerao-os-padres-irmaos-da-companhia-d` (1598, not opened). Paul Miki and the 26 martyrs (1597) appear in the Jesuit letters and in Frois's account. Text not tested.
- Vietnam and Southeast Asia: Pallu, *Relation abrégée des missions ... Siam, Cochinchine, Tonkin* (1682) and *Relation des missions des évesques françois* (1684), archive.org `relationabregeed00pall` and `relationdesmissi00pari` (not opened). The Paris Foreign Missions archive (IRFA, irfa.paris) loads. It offers an archive inventory and a library. I did not find a martyr notice search. Unchecked.
- China: *The Life and Methods of Matteo Ricci* (1914), archive.org `lifemethodsofmat00reni` (not opened). The Chinese martyrs are best reached through the 2000 Vatican homily and the 1900 Boxer sources.
- India: Francis Xavier's letters and the Monumenta series — unchecked. Alphonsa, Chavara, and Euphrasia (modern, Syro-Malabar and Syro-Malankara) — Church sources only; unchecked.

**Africa and Oceania:**
- Uganda: J. P. Thoonen, *Black Martyrs* (1941), archive.org `blackmartyrs0000revj` — lending copy (401) and under copyright. Use DACB for Lwanga and the 1964 canonization.
- Oceania: the Marist sites (marists.org loads; maristsource.org did not connect), Papers Past (NZ) gives a bot-check page (needs a browser), and Trove (Australia) loads its front page only. The Mary MacKillop sites returned 406 or no connection. Unchecked for the lives of Peter Chanel, Damien, Peter To Rot, and Mary MacKillop. Gap.

## Orthodox sources

### Orthodox America and Alaska

- **OCA.** Search: `https://www.oca.org/saints/lives/search?q=<name>`. Then list the result links:
  `curl -sL -A "Mozilla/5.0" '<search url>' | grep -o 'href="/saints/lives/[^"]*"'`.
  Tested: `q=herman` gives *Glorification of Venerable Herman of Alaska* and *Repose of Venerable Herman of Alaska*. `q=aleut` gives *Martyr Peter the Aleut* (24 Sept). `q=innocent` gives *Repose of Saint Innocent, Metropolitan of Moscow, Enlightener of Siberia and America* (31 March) and *Glorification of Saint Innocent* (6 Oct). `q=Japan` gives *Saint Nicholas, Enlightener of Japan* (3 Feb). `q=china` gives *Hieromartyr Metrophanes Chang Tzi Tzung, first Chinese priest, and the Martyrs of China* (11 June).
  The date in the URL changes with the year. Use the search, not a stored link. A working Herman page is `https://www.oca.org/saints/lives/2026/12/13/103530-repose-of-venerable-herman-of-alaska-wonderworker-of-all-america` (mentions the 1793 Valaam mission, Spruce Island, and the Aleut disciple Ignaty Aligyaga).
- **OrthodoxWiki (orthodoxwiki.org, without "www").** The host `www.orthodoxwiki.org` fails; use `https://orthodoxwiki.org/<Title>`. Tested: `Herman_of_Alaska`, `Innocent_of_Alaska`, `Nicholas_of_Japan`, `Martyrs_of_China`. It is a wiki. Use it for identity and leads only.
- **Azbyka** (see Access for the address trick):
  - The 19th-century Life: `https://azbyka.ru/otechnik/Zhitija_svjatykh/zhitie-valaamskogo-monaha-germana-amerikanskogo-missionera-aljaskinskogo/` — *Житие Валаамского монаха Германа, Американского миссионера (Аляскинского)*, 6,182 words. It is public domain.
  - A second title in the same catalogue: *Преподобный Герман Аляскинский: американский святой русского происхождения* (modern; copyright).
  - Innocent's works: `https://azbyka.ru/otechnik/Innokentij_Moskovskij/` (autobiographical note, will, letters, and a Life by a contemporary).
  - Nicholas of Japan: `https://azbyka.ru/otechnik/Nikolaj_Japonskij/` — diaries (`dnevniki-tom-ii/` through `-v/`) and the memoir *Архиепископ Николай Японский: воспоминания и характеристика*.
  - Calendar pages: `https://azbyka.ru/days/sv-german-aljaskinskij` loads (Herman's life summary, 1757–1837).
- **Pravenc.** Article URL pattern: `https://www.pravenc.ru/text/<Title with %20 for spaces>.html`. Tested:
  - `Герман%20Аляскинский` — works. It says he died 15 Nov 1836 on Spruce Island; Azbyka says 1837 (OCA: repose 13 Dec 1837 in the Gregorian style). **The sources disagree on the year. Flag it.**
  - `Иннокентий%20(Вениаминов)` — works.
  - `Николай%20(Касаткин)` — works (has sections on the years in Japan).
  - Do not use the `+` form or the site search. Both give "not found" or empty pages.
- **OrthoChristian (orthochristian.com), Pravmir.com, Pravoslavie.ru** load. They are modern; use for English or Russian leads only. Trace each article to its source.
- **The Library of Congress "Alaskan Russian Church Archives"** collection page returned 403 to curl. Needs a browser. **Kodiak and St. Herman Brotherhood sites:** `sainthermanmonastery.org` returned 406; the Alaska diocese sites did not resolve. Unchecked.
- Main English books (under copyright, facts only): Veniaminov's *Notes on the Islands of the Unalaska District*, Fitzhugh translation; the St. Herman Brotherhood's *Little Russian Philokalia* vol. 5 and *Father Herman*. None was open online in my tests.

### Orthodox Asia and Africa

- **Japan:** OCA, Azbyka (diaries), and Pravenc for Nicholas. Japanese sources unchecked.
- **China:** the Martyrs of 1900 — OCA and OrthodoxWiki (both tested). Pravenc has articles on the Chinese mission (title search not tested). John of Shanghai (Maximovitch) is a saint of Russia abroad; use the Russia playbook, and search OCA by name.
- **Korea:** the Orthodox mission in Korea — no saint located. Unchecked.
- **Africa:** OCA search for "Africa" gives only early Church martyrs of Carthage. I found no Orthodox mission saint of sub-Saharan Africa in my tests. The Orthodox Church in Uganda, Kenya, and Congo has candidates (Patriarchate of Alexandria). All unchecked. This is a gap; do not invent one.
- **India:** Orthodox saints of India are Malankara (Oriental Orthodox). Use the christian-east playbook.

## By era

### Early Church (before 600)

Almost no saints of this playbook's region fall in this era. North African saints (Carthage, Hippo) belong in the christian-east and Latin playbooks. The Thomas Christians of India (Apostle Thomas): see christian-east.

### Medieval (600–1500)

Few saints. Missions before 1500 are in the christian-east playbook (Nestorian China) and the Iberia playbook. Nothing tested here.

### Early modern (1500–1900)

This is the main era. Order of value for a Catholic saint:
1. The Vatican homily (list of martyrs and dates).
2. The primary chronicle on archive.org (Jesuit Relations, Dallet, Hansen, Blair and Robertson, Frois).
3. The national dictionary of biography (DCB, DACB).
4. The 1913 Catholic Encyclopedia through Wikisource.
5. The order's or shrine's own site (for cult, not for facts).

For an Orthodox saint: OCA for the summary and calendar, Azbyka for the old Life and the saint's own words, Pravenc for critical facts and sources.

### Modern (after 1900)

Includes Uganda (1886 martyrs, canonized 1964), Vietnam, China (1900 Boxers, 1940s), Oceania (Peter To Rot), and the Orthodox mission in Japan (Nicholas d. 1912). Sources: Vatican homily, DACB, order archives, and for Orthodox saints OCA, Azbyka, Pravenc. Recent Lives are under copyright: use facts only.

## Sample saints tested

| Saint | What I found |
|---|---|
| Rose of Lima | New Advent `13192c.htm`; Hansen 1665 (`vidaadmirableymu00hans_0`); Cataño (`vidaportentosade00cata`). |
| Martin de Porres | No 1913 entry. Modern lives on archive.org are lending copies. The Vatican John XXIII 1962 homily index loaded, but I did not find a canonization text. Gap. |
| Kateri Tekakwitha | CE 1913 on Wikisource; DCB; Thwaites vol. 63 text; Benedict XVI 2012 homily. |
| North American Martyrs | CE 1913 (Jogues, Goupil, Auriesville); DCB (Jogues); Thwaites. |
| Andrew Kim Taegon | Vatican 1984 homily; Dallet vol. 2; CBCK English martyr pages broken. |
| Paul Miki | CE 1913 (*Peter Baptist and Twenty-five Companions*); the 1598 Jesuit letters from Japan (not opened). Pius IX canonized in 1862; no Vatican homily online. |
| Charles Lwanga | DACB entry; the 1964 canonization is by Paul VI. I did not find the homily URL; Namugongo shrine site not reachable. |
| Herman of Alaska | OCA, OrthodoxWiki, Azbyka (1894-era Life), Pravenc. Year of death differs (1836 or 1837). |
| Innocent of Alaska | OCA, OrthodoxWiki, Azbyka, Pravenc. |
| Nicholas of Japan | OCA, OrthodoxWiki, Azbyka diaries, Pravenc. |

## Access

- **Vatican.** Use a browser User-Agent header. Get the document from the year index: `https://www.vatican.va/content/<pope>/en/homilies/<year>.index.html`, then grep the links. Guessed document names mostly return 404. Search the index text for a place name (Seoul, Manila, Kampala, and so on). The 1988 Vietnam homily is titled only "Canonization of Vietnamese martyrs" in its text; its file name is `..._martiri.html`.
- **archive.org.** Search with the advancedsearch URL above (`output=json`). Read text with `.../download/<id>/<id>_djvu.txt`. OCR text has extra spaces (for example "André  Kim"). Search with a loose pattern.
- **Wikisource API** works from curl without a key.
- **Azbyka.** The sandbox does not resolve `azbyka.ru`. Look up the address and use `--resolve`, as in the Russia playbook:
  `IP=$(nslookup azbyka.ru | awk '/^Address: /{print $2; exit}'); curl -sL -A "Mozilla/5.0" --resolve azbyka.ru:443:$IP "<url>"`
  On 2026-09-30 the address was 95.129.237.155.
- **Pages that return an error page with HTTP 200:** english.cbck.or.kr martyr pages. Check the page text, not only the status.
- **Needs a browser:** Papers Past (bot check), the Library of Congress collection page (403), Franciscan Media (403), HathiTrust catalogue search (403).
- **Not reachable from the sandbox:** puffin.creighton.edu, martyrshrine.org and .com, catholic.or.jp, www.26martyrs.jp, bibliotecadigitalhispanica.bne.es, mission-etrangeres.com.
- **Wrong site:** `26martyrs.com` is a Japanese tourist blog about Nagasaki. It is not the museum. Do not cite it as an official source.
- I started a check of the Namugongo shrine site with `--resolve`. It did not finish. Mark the site unchecked.

## Language

- **Latin America (Spanish):** Rosa de Santa María (Rose of Lima), fray Martín de Porres, San Juan Diego Cuauhtlatoatzin. Old spelling uses ç, ſ, and "y" for "i". Peruvian names may carry "de Santa María" or "de Lima".
- **Canada (French and Latin):** Kateri is Catherine Tegakwita (Tegakouita). The Mohawk place names vary: Ossernenon, Gandaouagué, Kahnawake ("Caughnawaga", "Sault Saint-Louis").
- **Korea:** Kim Dae-geon (Andrew Kim Taegon; Dallet writes "André Kim"). Use the Korean order (family name first) and both romanizations.
- **Japan:** Paul Miki (Miki Paulo). The 26 martyrs are also "Nagasaki martyrs". The 1862 canonization is by Pius IX.
- **Vietnam:** French sources write Tonkin, Cochinchine, Annam. The saints have Vietnamese, baptismal, and French names.
- **Philippines:** Lorenzo Ruiz de Manila; Pedro Calungsod (Pedro Calonsor in some records).
- **Africa:** Charles Lwanga (Karoli Lwanga); Luganda forms; the 22 Ugandan martyrs of 1886 (the Catholic list); Anglican martyrs are separate.
- **Russian forms:** Герман Аляскинский; Иннокентий (Вениаминов), митрополит Московский; Николай (Касаткин), Японский; мч. Пётр Алеут. Pre-1918 spelling appears in old texts.
- **Calendars:** the OCA uses the New (Gregorian) calendar for fixed feasts in America; Russian sources use the Julian calendar. Record the calendar.

## Rights

- Public domain: Thwaites (1896–1901), Dallet (1874), Hansen (1665), Cataño (1896), Blair and Robertson (1903–09), Palou (1787), the 1913 Catholic Encyclopedia, the 19th-century Life of Herman.
- Facts only, in our own words: Vatican homilies (Vatican copyright statement), DCB and DACB entries, OCA, Pravenc, OrthodoxWiki, OrthoChristian, shrine and order sites, and all 20th-century lives.
- Lending copies on archive.org (identifier ends `0000xxxx`): do not read around the lending limit.

## Gaps to fill

- Orthodox saints of sub-Saharan Africa (unknown).
- 17th-century process testimony for Martin de Porres.
- Official Church pages for Korea (Korean site), Japan, Vietnam, and the Philippines (CBCP did not resolve for curl).
- Martyrs of Vietnam: the MEP archive pages.
- Oceania: Peter Chanel, Damien, Peter To Rot, Mary MacKillop.
- Peter the Aleut: the historical basis and the scholarly dispute.

## Lessons log

(One dated line for each saint: what worked, what failed, what was missing.)
