import type { MetadataRoute } from 'next'
import { getSitemapSaints } from '../queries/getSitemapSaints'
import { properties } from '../utils/properties'
import {
  LIST_ROUTES,
  SAINT_CATEGORIES,
  filtersFor,
  listHref,
  type ListKind,
} from '../utils/listParams'

// Built ahead of time and refreshed every five minutes, so a saint
// published in Directus is listed without a new build.
export const revalidate = 300

const site = process.env.NEXT_PUBLIC_SITE_URL

const lastOf = (item?: {
  date_updated?: string
  date_created?: string
}) => item?.date_updated || item?.date_created

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const now = new Date()
  const saints = await getSitemapSaints()

  const fixed = [
    '/saints',
    '/miracles',
    '/teachings',
    '/quotes',
    '/novenas',
    '/books',
    '/about',
    '/updates',
  ].map((path) => ({ url: `${site}${path}`, lastModified: now }))

  const filters = [
    ...SAINT_CATEGORIES.map((c) => `/saints/category/${c}`),
    ...(Object.keys(LIST_ROUTES) as ListKind[]).flatMap((kind) =>
      filtersFor(kind)
        .filter((f) => f !== 'all')
        .map((f) => listHref(kind, f)),
    ),
    ...properties.books.presets.map(
      (genre: string) => `/books/genre/${genre}`,
    ),
  ].map((path) => ({ url: `${site}${path}`, lastModified: now }))

  const pages = saints.flatMap((saint) => {
    const base = `${site}/saints/${saint.slug}`
    const modified = lastOf(saint)
    return [
      { url: base, lastModified: modified },
      { url: `${base}/biography`, lastModified: modified },
      ...(['teachings', 'miracles'] as const)
        .filter((key) => saint[`${key}_func`]?.count)
        .map((key) => ({
          url: `${base}/${key}`,
          lastModified: lastOf(saint[key][0]),
        })),
      // Every saint's prayers live under /novenas.
      ...saint.prayers.map((prayer) => ({
        url: `${base}/novenas/${prayer.prayer_slug}`,
        lastModified: lastOf(prayer),
      })),
    ]
  })

  return [...fixed, ...filters, ...pages]
}

export default sitemap
