# Source guide

Core discovery links checked on 2026-09-01. Additional user-supplied resources have their own verification note below. These are starting points, not citations for an individual saint: open the relevant article and record its exact URL. Recheck links and facts when using the skill. Do not infer an article's contents from a blocked page.

## Catholic sources

| Resource | Best use | Limit |
| --- | --- | --- |
| [Vatican News: saints](https://www.vaticannews.va/en/saints.html) | Catholic calendar entries and brief official profiles | Usually too short to support a full biography alone; the calendar is dynamic. |
| [Dicastery for the Causes of Saints](https://www.causesanti.va/it/celebrazioni.html) | Distinguish saints, blesseds, and venerables; locate formal recognition and decrees | Often Italian. Find the person's decree/profile; an announcement and an actual canonization are different events. |
| [Benedict XVI's general audiences](https://www.vatican.va/content/benedict-xvi/en/audiences/2007.index.html) | Church Fathers and historical saints, their writings and spiritual contributions | Use the archive's year navigation or a site search; cite the specific audience, not the archive index. |
| [New Advent: Catholic Encyclopedia](https://www.newadvent.org/cathen/) | Detailed older biographies, historical disputes, and bibliographic leads | Historical reference with an older Catholic perspective; recheck modern scholarship, calendars, and recognition elsewhere. |
| [Franciscan Media: Saint of the Day](https://www.franciscanmedia.org/saint-of-the-day/) | Accessible secondary overview and useful historical caveats | A short modern account, not a primary witness or permission to reproduce its prose/images. |

Also look for the saint's own religious order, official sanctuary, canonization cause, or diocesan archive. Verify the institution owns the site. Such a source can establish its current shrine practice without independently verifying every ancient event it repeats.

## Orthodox sources

| Resource | Best use | Limit |
| --- | --- | --- |
| [Orthodox Church in America: Lives of the Saints](https://www.oca.org/saints/lives) | Name/date search, lives, liturgical commemorations, and links to hymns | An official Orthodox presentation, often preserving hagiographic tradition rather than independent historical verification. |
| [Greek Orthodox Archdiocese: saints](https://www.goarch.org/saints) | Greek Orthodox feast profiles and cross-checking names | Returned HTTP 403 to automated browsing during setup; use a normally accessible browser or another source, not a guessed citation. |
| [Greek Orthodox Archdiocese: calendar](https://www.goarch.org/chapel/calendar) | Calendar context and commemorations | Same access caveat; the listed day needs its calendar/jurisdiction context. |

For a modern Orthodox saint, prioritize the canonizing patriarchate/church and the relevant monastery or diocese. Distinguish official glorification from popular local devotion. Multiple Orthodox jurisdictions can commemorate the same person differently; do not universalize one jurisdiction's calendar.

### Lesser-known saints, elders, and ascetics

Read [Orthodox paterika and regional archives](orthodox-paterika.md) when researching lesser-known Orthodox figures, especially Athonite, Russian, or Romanian monastics. It preserves the user's Greek, Russian, and Romanian book/resource list, including Azbyka, Monk Moses's Pemptousia archive, Doxologia, Saint.gr, and Project Synaxaria. Start with the relevant language/region rather than searching every collection. These additional links and bibliographic descriptions were supplied by the user and have not been independently verified in this update.

## Primary writings and historical context

- [New Advent: Church Fathers](https://www.newadvent.org/fathers/) provides texts useful for teachings and historical testimony. Identify the actual author, work, book/chapter, translation, and approximate distance from the saint's life. An ancient Life is primary evidence for what its author reports, not independent proof of every narrated miracle.
- Follow references to scholarly editions, university collections, or museum research when identity, chronology, or attributed works are disputed. Use Wikipedia or general search to locate these sources, not as the sole authority for an entry.
- Search with aliases and the original-language name when helpful. Examples: `site:oca.org/saints/lives "[name]"`, `site:vatican.va "[name]"`, `site:causesanti.va "[name]"`, `"[name]" letters critical edition`, and `"[name]" monastery official biography`.
- For Scripture, identify book/chapter/verse and translation; keep later tradition separate from the biblical text.

## Image discovery and provenance

Start at [Wikimedia Commons](https://commons.wikimedia.org/) or [The Met's Open Access collection](https://www.metmuseum.org/hubs/open-access). Search the saint's name and aliases plus portrait/icon/painting. Inspect the **individual file or object page**, not a search thumbnail. The Met's CC0 program applies to designated works, not every image on its website.

Record: source page URL, downloadable file URL, title, depicted subject, artist/photographer, date if known, rights statement/license URL, required credit, any changes, dimensions, and access date. Confirm rights for both the artwork and its reproduction where relevant. See [Commons reuse guidance](https://commons.wikimedia.org/wiki/Commons:Reusing_content_outside_Wikimedia).

Prefer clear portraits/icons with enough detail for a roughly 900 × 1,200 portrait display, without cutting off a face or important iconographic detail. Use the original file when possible; do not upscale a poor image just to reach that size. Do not alter an image with AI unless the user asks.

**Current frontend limitation:** Directus file `description` becomes image alt text, not a visible credit line. Private metadata or alt text alone is not a substitute for required public attribution. Prefer public-domain/CC0 material under the present UI. Use CC BY/CC BY-SA only when the existing site can display the required credit and license links for its use; otherwise retain it as a candidate and report the credit-placement requirement, without changing the frontend under this skill. Do not assume noncommercial/no-derivatives or unclear permissions fit the site.

## Evidence notes

Keep concise notes alongside each prepared entry:

| Claim/field | Specific source and locator | Evidence type | Decision |
| --- | --- | --- | --- |
| Identity and dates | Direct article/work URL | Near-contemporary / scholarly / church biography | Supported, approximate, disputed, or unknown |
| Miracle account | Actual Life, witness, or decree | Contemporary testimony / later tradition / formal recognition | Attribute accurately; note material limits |
| Church and feast day | Particular church calendar/profile | Liturgical/official | Preserve jurisdiction and calendar convention |
| Image | File/object page and rights statement | Rights/provenance | Reusable, credit needed, or unresolved |

Do not manufacture precision or numeric confidence scores. Conflicting credible sources should produce an explained editorial choice or a flagged gap, not a silent merge.

## Access notes (2026-09-29)

- **Gallica (gallica.bnf.fr)** blocks automated access (503, 403, or timeout). Find works through the BnF catalogue or the data.bnf.fr SPARQL endpoint, and record the `ark:` link. If a Gallica book is essential, add it to the batch download list so that the user can download it by hand.
- **Domains change owners.** The old Lisieux Carmel archive domain now hosts a casino site. Check that a page's content matches the institution before citing it.
- **WebFetch on a PDF** saves a copy of the file in the session's tool-results folder. Prefer archive.org text files or HTML pages for reading. Fetch a PDF only when there is no text version.
- **vatican.va** returns 404 to plain `curl`. Send a normal browser User-Agent header. The AAS volumes are at `https://www.vatican.va/archive/aas/documents/AAS-<vol>-<year>-ocr.pdf`.
- **Shell loops:** the Bash tool runs zsh, which does not split unquoted variables. Use `bash -c '…'` or `IFS=: read` for loops that split strings.
- **WebFetch summarizes.** Its answers come from a small model and have given wrong dates for Thérèse's entry into Carmel and a patronage. Cards must be taken from raw page text (`curl -sL -A "Mozilla/5.0" <url>`), not from WebFetch summaries.

## John Sanidopoulos — Mystagogy Resource Center (tested 2026-09-29)

A large English Orthodox blog network run by John Sanidopoulos since about 2009. Many posts are his first English translations from Greek (synaxaria, Lives, homilies, recent Greek elders), and he often names the Greek book or author he translated. Strongest for Greek, Byzantine, and Athonite saints, and useful for any Orthodox saint.

- **Sites:** `www.johnsanidopoulos.com` (14,949 posts; daily saints) and `www.mystagogyresourcecenter.com` (3,212 posts). The sister sites (New Myriobiblon, Honey and Hemlock, and others) are small or off-topic.
- **Search (Blogger feed, works with curl):** `https://www.johnsanidopoulos.com/feeds/posts/default?q=<name>&alt=json&max-results=50`. It returns titles and links. Paginate with `&start-index=51`. The feed gives short summaries only.
- **Best search: per-saint labels.** The blog has 964 labels, many for one saint (e.g. "St. Nektarios of Aegina": 79 posts; "St. Kosmas Aitolos": 44). List all labels with `https://www.johnsanidopoulos.com/feeds/posts/summary?alt=json&max-results=0` (the `category` array), then fetch a label: `https://www.johnsanidopoulos.com/feeds/posts/summary/-/<URL-encoded label>?alt=json&max-results=500`. For keyword search, always set `max-results=150` or more; the default returns only a few hits (tested 2026-09-30).
- **Full text:** fetch the post page with `curl -sL -A "Mozilla/5.0" <url>` and take the text of the `post-body` element. The copy protection works only in a browser and does not affect this.
- **Source notes:** he usually names his source at the top ("Synaxarion by Monk Gerasimos Mikragiannanitis") or at the end ("Source:", "Translated by John Sanidopoulos"). Record the Greek original. It leads to the Greek text, which is often older and public domain.
- **Rights:** his translations and articles are his own work under copyright: facts only, in our own words. Cite the post in the sources list. Quote the saint's words from the Greek original in our own translation, or from a public-domain translation.
