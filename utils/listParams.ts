import { properties } from './properties'
import { isChurch, type Church } from './site'

// Allowed values for the public list API. The API passes these values
// to Directus queries, so anything not on a list is replaced by the
// default.

export const SAINT_SORTS = [
  'created-newest',
  'created-oldest',
  'died-oldest',
  'died-newest',
]
export const DEFAULT_SAINT_SORT = SAINT_SORTS[0]
export const SAINT_PRESETS = ['none', ...properties.saints.presets]

// Saint categories and feast months, lowercase ("fathers_of_the_church").
export const SAINT_CATEGORIES: string[] =
  properties.saints.filters.category.map((c: string) =>
    c.toLowerCase(),
  )
export const SAINT_MONTHS: string[] =
  properties.saints.filters.month.map((m: string) =>
    m.toLowerCase(),
  )

export type ListKind =
  | 'teachings'
  | 'miracles'
  | 'quotes'
  | 'prayers'

export const LIST_KINDS: ListKind[] = [
  'teachings',
  'miracles',
  'quotes',
  'prayers',
]

export const filtersFor = (kind: ListKind): string[] =>
  properties[kind].filters

const pick = (value: string | null, allowed: string[], fallback: string) =>
  value && allowed.includes(value) ? value : fallback

const whole = (
  value: string | null,
  fallback: number,
  max: number,
) => {
  const n = Number(value)
  return Number.isInteger(n) && n >= 0
    ? Math.min(n, max)
    : fallback
}

export const parseChurch = (value: string | null): Church =>
  isChurch(value) ? value : 'all'

export const parseSaintQuery = (params: URLSearchParams) => ({
  church: parseChurch(params.get('church')),
  filter: pick(
    params.get('filter'),
    [...SAINT_CATEGORIES, ...SAINT_MONTHS],
    'all',
  ),
  saintPreset: pick(params.get('preset'), SAINT_PRESETS, 'none'),
  sort: pick(params.get('sort'), SAINT_SORTS, DEFAULT_SAINT_SORT),
  offset: whole(params.get('offset'), 0, 100000),
  limit: Math.max(1, whole(params.get('limit'), 12, 50)),
})

export const parseListQuery = (
  kind: ListKind,
  params: URLSearchParams,
) => ({
  church: parseChurch(params.get('church')),
  filter: pick(params.get('filter'), filtersFor(kind), 'all'),
  offset: whole(params.get('offset'), 0, 100000),
  limit: Math.max(1, whole(params.get('limit'), 12, 50)),
})

// Directus changes only when the owner publishes, and Directus answers
// are already cached for a minute (queries/fetchHelper.ts), so a
// response may be shared for a minute and served stale for an hour
// while it refreshes in the background.
export const CACHE_HEADERS = {
  'Cache-Control':
    'public, max-age=60, s-maxage=60, stale-while-revalidate=3600',
}

// Where each list lives, and the word in its category URLs:
// /miracles/era/modern_era, /quotes/topic/faith.
export const LIST_ROUTES: Record<
  ListKind,
  { path: string; segment: string }
> = {
  miracles: { path: '/miracles', segment: 'era' },
  teachings: { path: '/teachings', segment: 'era' },
  quotes: { path: '/quotes', segment: 'topic' },
  prayers: { path: '/novenas', segment: 'topic' },
}

export const listHref = (kind: ListKind, filter: string) => {
  const { path, segment } = LIST_ROUTES[kind]
  return filter === 'all' ? path : `${path}/${segment}/${filter}`
}

export const saintsHref = ({
  category = '',
  preset = 'none',
  month = '',
  feast = false,
  sort = DEFAULT_SAINT_SORT,
}: {
  category?: string
  preset?: string
  month?: string
  // Saints whose feast is today (?feast=today).
  feast?: boolean
  sort?: string
}) => {
  const query = new URLSearchParams()
  if (!category && feast) query.set('feast', 'today')
  else if (!category && preset !== 'none') query.set('preset', preset)
  else if (!category && month) query.set('month', month)
  if (sort !== DEFAULT_SAINT_SORT) query.set('sort', sort)
  const path = category
    ? `/saints/category/${category}`
    : '/saints'
  const text = query.toString()
  return text ? `${path}?${text}` : path
}
