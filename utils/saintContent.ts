import * as cheerio from 'cheerio'

// Name and date helpers live in saintNames (safe for the browser).
export { formatFeast, splitSaintName } from './saintNames'

// Helpers that read structure out of a saint's HTML fields
// (biography, miracles, teachings) for the saint page.

export type Heading = { id: string; title: string }
export type MiracleItem = Heading & { group?: string }

// Sections that are reference matter, not chapters.
const BACK_MATTER =
  /^(sources|image credit|further reading|a note on the sources|how this life was researched|key to the sources)/i

const headings = (
  $: cheerio.CheerioAPI,
  selector: string,
): Heading[] =>
  $(selector)
    .toArray()
    .map((el) => ({
      id: $(el).attr('id') || '',
      title: $(el).text().trim(),
    }))
    .filter((h) => h.title)

export const getChapters = (html?: string): Heading[] => {
  if (!html) return []
  return headings(cheerio.load(html), 'h2').filter(
    (h) => !BACK_MATTER.test(h.title),
  )
}

// Counts the entries listed under the "Sources" heading.
export const getSources = (html?: string) => {
  const none = { count: 0, id: '' }
  if (!html) return none
  const $ = cheerio.load(html)
  const heading = $('h2')
    .toArray()
    .find((el) => /^sources/i.test($(el).text().trim()))
  if (!heading) return none
  return {
    count: $(heading).nextUntil('h2').find('li').length,
    id: $(heading).attr('id') || '',
  }
}

// The opening paragraphs before the first chapter heading.
export const getOpening = (
  html?: string,
  maxParagraphs = 3,
): string[] => {
  if (!html) return []
  const $ = cheerio.load(html)
  const paragraphs: string[] = []
  $('body')
    .children()
    .each((_, el) => {
      if (el.tagName === 'h2') return false
      if (el.tagName === 'p') paragraphs.push($(el).html() || '')
      return paragraphs.length < maxParagraphs
    })
  return paragraphs
}

// Miracles follow the entry guide: <h2> groups, one <h3 id> per
// miracle. Older entries use one <h2> per miracle after an
// introductory <h2>; those are read the same way.
export const getMiracles = (html?: string): MiracleItem[] => {
  if (!html) return []
  const $ = cheerio.load(html)
  if ($('h3').length) {
    return $('h3')
      .toArray()
      .map((el) => ({
        id: $(el).attr('id') || '',
        title: $(el).text().trim(),
        group: $(el).prevAll('h2').first().text().trim(),
      }))
  }
  const h2s = headings($, 'h2')
  return h2s.length > 1 ? h2s.slice(1) : h2s
}

export type Section = Heading & { html: string }

const sectionsOf = ($: cheerio.CheerioAPI, tag: string) =>
  $(tag)
    .toArray()
    .map((el) => ({
      id: $(el).attr('id') || '',
      title: $(el).text().trim(),
      html: $(el)
        .nextUntil(tag)
        .toArray()
        .map((node) => $.html(node))
        .join(''),
    }))

const introOf = ($: cheerio.CheerioAPI, tag: string) => {
  const parts: string[] = []
  $('body')
    .children()
    .each((_, el) => {
      if (el.tagName === tag) return false
      parts.push($.html(el))
    })
  return parts.join('')
}

// Splits a biography into its opening, chapters and back matter.
export const getBiography = (html?: string) => {
  if (!html) return { intro: '', chapters: [], backMatter: [] }
  const $ = cheerio.load(html)
  const sections = sectionsOf($, 'h2')
  return {
    intro: introOf($, 'h2'),
    chapters: sections.filter((s) => !BACK_MATTER.test(s.title)),
    backMatter: sections.filter((s) => BACK_MATTER.test(s.title)),
  }
}

export const countWords = (html?: string) =>
  html
    ? cheerio.load(html).text().split(/\s+/).filter(Boolean).length
    : 0

export type MiracleEntry = Section & {
  number: number
  status?: string
  source?: string
}

export type MiracleGroup = Heading & {
  intro: string
  entries: MiracleEntry[]
}

const LABELLED = /^(status|sources?):\s*/i

// Pulls the "Status:" and "Source:" lines out of an entry's body.
const toEntry = (
  section: Section,
  number: number,
): MiracleEntry => {
  const $ = cheerio.load(section.html)
  const entry: MiracleEntry = { ...section, number }
  $('p').each((_, el) => {
    const match = $(el).text().trim().match(LABELLED)
    if (!match) return
    if (/^status/i.test(match[1])) {
      entry.status = $(el).text().trim().replace(LABELLED, '')
    } else {
      // Keeps links; drops the leading "Source:" label and its tags.
      entry.source = ($(el).html() || '').replace(
        /^\s*(<(strong|em|b)>)?\s*sources?:\s*(<\/(strong|em|b)>)?\s*/i,
        '',
      )
    }
    $(el).remove()
  })
  entry.html = $('body').html() || ''
  return entry
}

// Builds the miracle list. New entries: <h2> groups with one <h3>
// per miracle. Older entries: an introductory <h2>, then one <h2>
// per miracle.
export const getMiracleBook = (html?: string) => {
  const empty = {
    intro: '',
    groups: [] as MiracleGroup[],
    backMatter: [] as Section[],
  }
  if (!html) return empty
  const $ = cheerio.load(html)
  let number = 0

  if ($('h3').length) {
    const groups: MiracleGroup[] = []
    const backMatter: Section[] = []
    $('h2')
      .toArray()
      .forEach((h2) => {
        const title = $(h2).text().trim()
        const body = $(h2).nextUntil('h2')
        if (BACK_MATTER.test(title)) {
          backMatter.push({
            id: $(h2).attr('id') || '',
            title,
            html: body
              .toArray()
              .map((n) => $.html(n))
              .join(''),
          })
          return
        }
        const intro = $(h2)
          .nextUntil('h2, h3')
          .toArray()
          .map((n) => $.html(n))
          .join('')
        const entries = body
          .filter('h3')
          .toArray()
          .map((h3) =>
            toEntry(
              {
                id: $(h3).attr('id') || '',
                title: $(h3).text().trim(),
                html: $(h3)
                  .nextUntil('h2, h3')
                  .toArray()
                  .map((n) => $.html(n))
                  .join(''),
              },
              ++number,
            ),
          )
        groups.push({
          id: $(h2).attr('id') || '',
          title,
          intro,
          entries,
        })
      })
    return { intro: introOf($, 'h2'), groups, backMatter }
  }

  const sections = sectionsOf($, 'h2')
  const [first, ...rest] = sections
  const items = sections.length > 1 ? rest : sections
  return {
    intro: introOf($, 'h2') + (sections.length > 1 ? first.html : ''),
    groups: [
      {
        id: '',
        title: '',
        intro: '',
        entries: items
          .filter((s) => !BACK_MATTER.test(s.title))
          .map((s) => toEntry(s, ++number)),
      },
    ],
    backMatter: items.filter((s) => BACK_MATTER.test(s.title)),
  }
}

// The three kinds of miracle status, for the labels:
// approved by the Church, sworn at a Church process, or a report.
// Approvals for other people (e.g. her parents) say "not attributed".
export type StatusKind = 'approved' | 'sworn' | 'reported'

export const isApproved = (status?: string) =>
  /^approved/i.test(status || '') && !/not attributed/i.test(status || '')

export const statusKind = (status?: string): StatusKind => {
  if (isApproved(status)) return 'approved'
  if (/sworn|process|inquiry|articles of the cause/i.test(status || ''))
    return 'sworn'
  return 'reported'
}

// Plain text from a small HTML field, such as the summary.
export const plainText = (html?: string) =>
  html ? cheerio.load(html).text().replace(/\s+/g, ' ').trim() : ''
