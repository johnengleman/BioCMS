import * as cheerio from 'cheerio'
import {
  getBiography,
  getMiracleBook,
} from './saintContent'

// Card data for the site-wide teachings and miracles lists. It runs
// on the server, so the browser gets short text, not the full HTML.

export type Preview = {
  count: number
  unit: string
  intro: string
  titles: string[]
}

const text = (html = '') =>
  cheerio.load(html).text().replace(/\s+/g, ' ').trim()

const miraclePreview = (html?: string): Preview => {
  const book = getMiracleBook(html)
  const entries = book.groups.flatMap((g) => g.entries)
  const intro =
    text(book.intro) ||
    text(book.groups[0]?.intro) ||
    text(entries[0]?.html)
  return {
    count: entries.length,
    unit: entries.length === 1 ? 'miracle' : 'miracles',
    intro,
    titles: entries.map((e) => e.title),
  }
}

const teachingPreview = (html?: string): Preview => {
  const { intro, chapters } = getBiography(html)
  return {
    count: chapters.length,
    unit: chapters.length === 1 ? 'teaching' : 'teachings',
    intro: text(intro) || text(chapters[0]?.html),
    titles: chapters.map((c) => c.title),
  }
}

export const withPreview = (
  kind: 'teachings' | 'miracles',
  items: any[] = [],
) =>
  items.map(({ teachings, miracles, ...item }) => ({
    ...item,
    preview:
      kind === 'miracles'
        ? miraclePreview(miracles)
        : teachingPreview(teachings),
  }))
