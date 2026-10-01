# Playbook — Spain and Portugal

For saints of the Iberian Peninsula: the Visigothic Fathers, the medieval saints, the Golden Age mystics, the missionaries, and the 20th-century Spanish martyrs. Also read `latin-italy.md` for the Acta Sanctorum, Migne, the Dicastery, and vatican.va and AAS access notes: they apply here without change. Access tests were run on 2026-09-29 and 2026-09-30.

Tradition types: Visigothic and earlier saints (Isidore, Leander, Fructuosus of Tarragona, Vincent of Saragossa) are usually **Shared**. Teresa of Avila, John of the Cross, Josemaria Escriva, and the martyrs of 1936 are **Catholic only**.

## Start here

1. **Acta Sanctorum on archive.org** (Latin): the best old scholarly Lives up to about 1700. Isidore of Seville is in volume 10 (Aprilis I). Access notes are in `latin-italy.md`.
2. **Dicastery for the Causes of Saints (causesanti.va)** and **santiebeati.it**: dates, decrees, and short Italian biographies for canonized and beatified saints, including the martyrs of 1936. Works with plain `curl`. Details below.
3. **archive.org scans of the Spanish and Portuguese classics**: Flórez's *España Sagrada*, Jorge Cardoso's *Agiologio Lusitano*, and the Carmelite *Obras de Santa Teresa* (Biblioteca Mística Carmelitana). The Spanish national library (BDH) blocks automated access, so archive.org is the working route.

For Orthodox and Shared saints, add **OCA Lives** (see "Orthodox sources").

## Catholic sources

### Early Church and Visigothic Spain (before ~711)

- **AS, volume 10 (Aprilis I).** Isidore of Seville (4 April): heading "DE S. ISIDORO EPISCOPO HISPALENSI" near line 83,000 of the OCR text, with several further sections. Checked. Item: `https://archive.org/download/actasanctorum10unse/actasanctorum10unse_djvu.txt` (about 9 MB).
- **Migne, Patrologia Latina.** Isidore's own works fill PL 81 to 84. Braulio's notice on Isidore and Ildefonsus's *De viris illustribus* are in PL 81 and PL 96. Find the volume scans through `https://patristica.net/latina/` (links to Google Books and archive.org). Volume numbers 81 to 84 and 96 are from general knowledge: confirm on that page.
- **Isidore's *Etymologiae* (Lindsay edition, 1911)** is on archive.org: `isidorihispalensisetymololindsay2`. Public domain.
- **Flórez, *España Sagrada*** (1747 onward, Latin and Spanish). It holds the history of each Spanish diocese and Lives of its saints. archive.org has more than 60 scans, mostly copied from Google Books (identifiers `bub_gb_...`). Example: `A084043MC` (the 1747 first volume) and `bub_gb_GyWb4Amwmn4C` (volume 26). The scans do not name the tome in the title. To find the tome that holds a saint, open the scan and read the table of contents. Volume 9 (church of Seville) is expected to cover Isidore: unchecked. The 1918 *Índice de la España sagrada* is also on archive.org (several copies).
- **Real Academia de la Historia, *Diccionario Biográfico Español* (dbe.rah.es).** The site now loads a JavaScript app, so plain `curl` returns only an empty page shell. Use a browser. The old biography address pattern (`/biografias/12005/isidoro-de-sevilla`) returned the shell. Mark as needs a browser.

### Medieval (711–1500)

- **AS** for Lives of saints of the Reconquista and the Crown of Aragon, arranged by feast day. Volume map in `latin-italy.md`.
- **Portuguese saints:** Anthony of Lisbon and Padua, Isabel of Portugal, Nuno de Santa Maria. The *Agiologio Lusitano* (Jorge Cardoso, 1651 to 1666) has the Portuguese saints arranged by month and day. On archive.org: `agiologiolusitan01card_0`, `agiologiolusitan02card_0`, `agiologiolusitan03card_0` (1651 edition; volume 1 is January to March). Other scans: `bub_gb_srGJzieTTuUC`, `bub_gb_K4krJ4RiCy8C`, `bub_gb_GRLE_2wCuWQC`. Existence checked; content not read.
- **Order sources.** Franciscan: francescani.net and ofm.org (answer). Dominican: domenicani.it (answers). For Anthony of Padua, read the Italian playbook and the Franciscan and Antonian sources.

### Early modern (1500–1900)

- **Carmelite sources for Teresa of Avila and John of the Cross.**
  - archive.org: *Biblioteca Mística Carmelitana* (BMC), edited by Silverio de Santa Teresa. Identifiers: `BMC4ObrasDeSantaTeresaDeJessTomoIVMoradasConceptosExclamaciones`, `BMC8ObrasDeSantaTeresaDeJessTomoVIIIEpistolarioII`. Also `obrasdesantatere02tere` (1915) and `ObrasDeSantaTeresaI` (1951). The BMC edition is 20th century: check the rights before you quote (facts only for the notes; Teresa's own words are public domain in the original Spanish text).
  - Search that finds them: `https://archive.org/advancedsearch.php?q=title%3A%28obras+de+santa+teresa+de+jes%C3%BAs%29&fl%5B%5D=identifier&fl%5B%5D=title&rows=10&output=json`.
  - *Santa Teresa de Jesús, Obras completas* (BAC edition) is also on archive.org as a 2021 scan. Under copyright: do not quote.
  - The Discalced Carmelite Curia site ocd.pcn.net did not resolve. carmelitas.org answers (Spanish Carmelite site). Content not checked.
- **Dicastery profile for John of the Cross.** `https://www.causesanti.va/it/santi-e-beati/giovanni-della-croce.html` works (about 9,900 words). Teresa of Avila has no profile page there under the slugs I tried (`teresa-di-gesu`, `teresa-d-avila`, `teresa-di-avila`). She was canonized on 12 March 1622: see the list page `https://www.causesanti.va/it/celebrazioni/canonizzazioni/1622.html` and take the link from it. That list page returned empty once on 2026-09-30, so retry it.
- **AS.** Teresa (15 October) would be in an October tome of the Acta Sanctorum. Not searched.
- **Jesuit sources.** jesuitas.es (Jesuits of Spain) and jesuits.global answer. For Ignatius of Loyola, Francis Xavier, and Francis Borgia, use the *Monumenta Historica Societatis Iesu* scans on archive.org: unchecked.
- **santiebeati.it:** Teresa of Avila id 24850, John of the Cross id 25600.

### Modern (after 1900)

- **Josemaria Escriva (1902 to 1975).**
  - Dicastery profile: `https://www.causesanti.va/it/santi-e-beati/josemaria-escriva-de-balaguer.html` (about 9,100 words). Canonized 6 October 2002.
  - AAS 94 (2002): canonization decree "Canonizationis Beati Iosephmariae Escrivá de Balaguer ... (1902-1975)", with his birth at Barbastro. Checked in the OCR text.
  - opusdei.org and escriva.org returned 403 to `curl`. Use a browser. Mark those pages as needs a browser.
  - santiebeati.it id 59650.
  - The vatican.va homily addresses I guessed for 2002 returned 404. Find the homily from the Dicastery page links or the vatican.va search.
- **The Spanish martyrs of the 1930s.** Many are beatified in large groups.
  - santiebeati.it has one page for each martyr and a "Scheda del Gruppo" page for the group. Example: Blessed Michael Goñi Ariz, a Redemptorist priest, killed near Cuenca on 31 July 1936: `https://www.santiebeati.it/dettaglio/100485` (about 1,500 words). Another: Blessed Jesús Aníbal Gómez Gómez, a Claretian seminarian, id 100489.
  - The Dicastery beatification list should list each group by date: the page `/it/celebrazioni/beatificazioni.html` returned nothing on 2026-09-30. Unchecked.
  - AAS volumes (1909 to 2006) carry the decrees of martyrdom in Latin. See `latin-italy.md` for the URL pattern. Volumes after 98 (2006) are not at that address.
  - The Spanish bishops' conference site (conferenciaepiscopal.es) answers. Its pages on the causes were not searched.
  - The order and diocese that promoted the cause usually hold the best biography (Claretians, Redemptorists, Jesuits, diocese of the death place): unchecked.

## Orthodox sources (Shared saints)

- **OCA Lives (oca.org/saints/lives).** Works. Use the day page and take the link from it: `https://www.oca.org/saints/lives/2026/04/04` lists "Saint Isidore, Bishop of Seville" as `.../2026/04/04/100993-saint-isidore-bishop-of-seville`. The link exists. Page text not read.
  - Fructuosus of Tarragona and his deacons are on the 21 January day page (id 149029). Agnes of Rome is there too.
  - A wrong id opens a different saint. Never guess an id.
  - OCA does not list Teresa, John of the Cross, or Escriva.
- **Sanidopoulos (johnsanidopoulos.com).** Works: `https://www.johnsanidopoulos.com/search?q=<name>`. Not tested for Iberian names.
- **OrthodoxWiki** (orthodoxwiki.org): the Agnes address I guessed returned 404. Not tested further.
- Other Orthodox Western-saints resources: unchecked.

## Access

- **Blocked or needs a browser.**
  - **Biblioteca Digital Hispánica (bdh.bne.es), Hemeroteca Digital, and datos.bne.es:** HTTP 403 even with a full Chrome User-Agent. The response is a BNE block page. Use a browser. For a book that matters, add it to the batch list for the user to download.
  - **BNE catalogue (catalogo.bne.es):** HTTP 200, but it is a JavaScript app and gives no record text through `curl`.
  - **DBE (dbe.rah.es), opusdei.org, escriva.org:** see above.
- **Works, not yet searched.**
  - Biblioteca Virtual Miguel de Cervantes (cervantesvirtual.com): home page answers. Good for Spanish classic texts.
  - Biblioteca Nacional de Portugal: `https://bndigital.bnportugal.gov.pt/` answers (BNP Digital). `purl.pt` and `porbase.bnportugal.gov.pt` answer with almost empty pages (JavaScript). Record permanent links (purl.pt) if a Portuguese item is found by browser.
  - Real Biblioteca and university repositories: unchecked.
  - *Hispania Sacra* (CSIC journal) and *Lusitania Sacra*: unchecked.
- **archive.org search for Iberian titles.** Example: `https://archive.org/advancedsearch.php?q=title%3A%28agiologio+lusitano%29&fl%5B%5D=identifier&fl%5B%5D=title&fl%5B%5D=year&rows=10&output=json`. Text: `https://archive.org/download/<identifier>/<identifier>_djvu.txt` (Google Books scans have the same pattern; not tested for `bub_gb_` items).
- **santiebeati.it name search.** `https://www.santiebeati.it/santi_search.php?query=<word>&Submit=Cerca`, with a single distinctive word. "Siviglia" and "Isidoro" both found Isidore (id 26600). Use the Italian place name form (Siviglia, Avila, Balaguer).
- **Dicastery, vatican.va, AAS:** see `latin-italy.md`. Send `-A "Mozilla/5.0"`.
- **zsh traps:** unquoted variables holding curl options do not split, and `======` in `echo` fails. Use `bash -c`.

## Language

- Spanish name forms: Isidoro de Sevilla, Teresa de Jesús (Teresa de Ávila), Juan de la Cruz, Josemaría Escrivá de Balaguer. Portuguese: Santo António de Lisboa, Rainha Santa Isabel. Latin in AS and PL: Isidorus Hispalensis, Teresia a Iesu, Ioannes a Cruce.
- Old Spanish and Portuguese spelling: *ph* for f, *y* for i, *x* for j, *th* for t (Flórez writes "theatro"). The 1651 *Agiologio* uses "sanctos" and "varoens". Search both forms.
- Regional names: Catalan, Basque, and Galician forms exist (Sant Isidor, Xoán da Cruz). Try them for local sources.
- Feast dates: Isidore is 4 April in the Roman calendar and OCA. Teresa is 15 October. John of the Cross is 14 December. Escriva is 26 June. The 1936 martyrs each have their own date. Record the Church calendar each source uses.

## Rights

- Acta Sanctorum, Migne, Flórez, Cardoso, and the 19th-century Spanish editions are public domain. The BMC Carmelite edition, BAC editions, and modern Lives are not: facts only.
- Dicastery profiles, santiebeati.it, DBE, OCA, and Sanidopoulos are under copyright: facts only, in our own words.
- AAS texts are official Holy See documents. Cite volume and page. Quote only short parts.
- Escriva's writings are held by the Opus Dei prelature under copyright. Take facts only.

## Lessons log

(One dated line for each saint: what worked, what failed, what was missing.)
