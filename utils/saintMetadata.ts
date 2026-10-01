import type { Metadata } from 'next'
import { getSaint } from '../queries/getSaint'
import { splitSaintName } from './saintNames'

// Titles, description, canonical link and share image for each
// saint's pages.

type Page =
  | 'saint'
  | 'biography'
  | 'miracles'
  | 'teachings'
  | 'novena'

const LONG_NAME = 28
const DESCRIPTION_LENGTH = 160

const shortName = (name = '') =>
  name.length > LONG_NAME
    ? splitSaintName(name).title
    : name

// Plain text near 160 characters. Ends at a full sentence when one
// ends late enough, else at a word with "…".
const describe = (html = '') => {
  const text = html
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
  if (text.length <= DESCRIPTION_LENGTH) return text
  const cut = text.slice(0, DESCRIPTION_LENGTH)
  // The last sentence end, with an optional closing quote. "St.",
  // "Fr." and initials are not sentence ends.
  const ends = [
    ...`${cut} `.matchAll(
      /(?<!\b(?:St|Sts|Fr|Bl|Mt|Dr|Mr|Mrs|[A-Z]))[.!?]["”’]?(?=\s)/g,
    ),
  ]
  const last = ends[ends.length - 1]
  const sentence = last
    ? last.index! + last[0].length - 1
    : -1
  if (sentence > DESCRIPTION_LENGTH / 2)
    return cut.slice(0, sentence + 1)
  return `${cut.slice(0, cut.lastIndexOf(' '))}…`
}

export const saintMetadata = async (
  slug: string,
  page: Page,
  novenaId?: string,
): Promise<Metadata> => {
  const saint = await getSaint(slug)
  if (!saint) return { title: 'Saint not found' }

  const name = shortName(saint.name)
  const novena =
    page === 'novena'
      ? (saint.prayers || []).find(
          (p: any) => p.prayer_slug === novenaId,
        )
      : null
  const novenaTitle =
    novena?.prayer_title || `Novena to ${name}`

  const titles: Record<Page, string> = {
    saint: `${name}: Life, Miracles & Prayers`,
    biography: `The Life of ${name}`,
    miracles: `Miracles of ${name}`,
    teachings: `Teachings of ${name}`,
    // Most novena titles already name the saint.
    novena: novenaTitle.includes(name)
      ? novenaTitle
      : `${novenaTitle} | ${name}`,
  }
  const paths: Record<Page, string> = {
    saint: '',
    biography: '/biography',
    miracles: '/miracles',
    teachings: '/teachings',
    novena: `/novenas/${novenaId}`,
  }

  const title = titles[page]
  const description = describe(saint.summary)
  const url = `${process.env.NEXT_PUBLIC_SITE_URL}/saints/${slug}${paths[page]}`
  const image = saint.profile_image?.id
    ? `${process.env.NEXT_PUBLIC_DIRECTUS_ASSETS}/assets/${saint.profile_image.id}?width=1200&format=jpg&quality=80`
    : undefined

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: 'Find a Saint',
      type: page === 'saint' ? 'profile' : 'article',
      images: image
        ? [{ url: image, alt: saint.name }]
        : undefined,
    },
    twitter: {
      card: image ? 'summary_large_image' : 'summary',
      title,
      description,
      images: image ? [image] : undefined,
    },
  }
}
