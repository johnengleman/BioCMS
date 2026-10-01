import type { Metadata } from 'next'
import { getSaints } from '../../queries/getSaints'
import { getSaintFilters } from '../../queries/getSaintFilters'
import { getChurch } from '../../hooks/getChurch'
import { properties } from '../../utils/properties'
import SaintsListClient from '../../components/saint/SaintsList/SaintsListClient'
import SiteHeader from '../../components/candle/SiteHeader/SiteHeader'
import SiteFooter from '../../components/candle/SiteFooter/SiteFooter'
import PhotoHero from '../../components/candle/PhotoHero/PhotoHero'
import TraditionControl from '../../components/candle/TraditionControl/TraditionControl'
import FilterPills from '../../components/candle/FilterPills/FilterPills'
import PillMenu from '../../components/candle/PillMenu/PillMenu'
import styles from './candle.module.scss'

export const runtime = 'edge'

export const metadata: Metadata = {
  title:
    'Catholic & Orthodox Saints: Lives, Miracles, Prayers',
  description:
    'Lives, miracles and prayers of the Catholic and Orthodox saints.',
}

import { NextPageProps } from '../../types/nextjs'

type Params = {
  filter: string
  preset: string
  sort: string
}

const DEFAULTS: Params = {
  filter: 'all',
  preset: 'none',
  sort: 'created-newest',
}

// Filters are plain links, so the back button and sharing work.
const hrefWith = (
  current: Params,
  change: Partial<Params>,
) => {
  const next = { ...current, ...change }
  const query = new URLSearchParams()
  ;(Object.keys(next) as (keyof Params)[]).forEach(
    (key) => {
      if (next[key] !== DEFAULTS[key])
        query.set(key, next[key])
    },
  )
  const text = query.toString()
  return text ? `/saints?${text}` : '/saints'
}

const PRESETS = [
  { value: '20th_century_saints', label: '20th Century' },
  { value: 'patron_saints', label: 'Patron Saints' },
]

const SORTS = [
  { value: 'created-newest', label: 'Newest' },
  { value: 'created-oldest', label: 'Oldest added' },
  { value: 'died-oldest', label: 'Earliest saints' },
  { value: 'died-newest', label: 'Most recent saints' },
]

const label = (value: string) =>
  value
    .replace(/_/g, ' ')
    .replace(/\bOf\b/g, 'of')
    .replace(/\bThe\b/g, 'the')

const Saints = async (props: NextPageProps) => {
  const searchParams = await props.searchParams
  const church = await getChurch(searchParams)
  const current: Params = {
    filter: (searchParams.filter || 'all').toLowerCase(),
    preset: searchParams.preset || 'none',
    sort: searchParams.sort || 'created-newest',
  }

  const [initialSaints, filterCounts] = await Promise.all([
    getSaints({
      church,
      filter: current.filter,
      saintPreset: current.preset,
      sort: current.sort,
      offset: 0,
      limit: 30,
    }),
    getSaintFilters({ church }),
  ])
  const counts = filterCounts?.[church] || {}
  const countOf = (key: string) =>
    counts.none?.[key]?.[0]?.count?.id || 0

  // One row: All, the presets, then every category that has saints.
  // A preset and a category are not combined; choosing one clears
  // the other.
  const months = properties.saints.filters.month
  const isMonth = months.some(
    (m) => m.toLowerCase() === current.filter,
  )
  const pills = [
    {
      key: 'all',
      label: 'All',
      href: hrefWith(current, {
        preset: 'none',
        filter: 'all',
      }),
      selected:
        current.preset === 'none' &&
        current.filter === 'all',
    },
    ...PRESETS.map((p) => ({
      key: p.value,
      label: p.label,
      href: hrefWith(current, {
        preset: p.value,
        filter: 'all',
      }),
      selected: current.preset === p.value,
    })),
    ...properties.saints.filters.category
      .filter(
        (c) =>
          countOf(c) > 0 ||
          c.toLowerCase() === current.filter,
      )
      .map((c) => ({
        key: c.toLowerCase(),
        label: label(c),
        href: hrefWith(current, {
          preset: 'none',
          filter: c.toLowerCase(),
        }),
        selected: current.filter === c.toLowerCase(),
      })),
  ]

  const monthOptions = [
    {
      key: 'any',
      label: 'Any',
      href: hrefWith(current, { filter: 'all' }),
      selected: !isMonth,
    },
    ...months.map((m) => ({
      key: m.toLowerCase(),
      label: m,
      href: hrefWith(current, {
        preset: 'none',
        filter: m.toLowerCase(),
      }),
      selected: current.filter === m.toLowerCase(),
    })),
  ]

  const sortOptions = SORTS.map((s) => ({
    key: s.value,
    label: s.label,
    href: hrefWith(current, { sort: s.value }),
    selected: current.sort === s.value,
  }))

  return (
    <>
      <div className={styles.page}>
        <SiteHeader
          searchParams={searchParams}
          active="/saints"
        />
        <main>
          <PhotoHero>
            <div className={styles.titleRow}>
              <div>
                <h1 className={styles.title}>Saints</h1>
                <p className={styles.subtitle}>
                  Lives, miracles and prayers of the
                  Catholic and Orthodox saints.
                </p>
              </div>
              <div className={styles.tradition}>
                <TraditionControl church={church} />
              </div>
            </div>
            <div className={styles.toolbar}>
              <FilterPills
                label="Filter saints"
                pills={pills}
              />
              <div className={styles.menus}>
                <PillMenu
                  label="Feast"
                  options={monthOptions}
                />
                <PillMenu
                  label="Sort"
                  options={sortOptions}
                />
              </div>
            </div>
          </PhotoHero>
          <div className={styles.list}>
            <SaintsListClient
              key={`${church}-${current.filter}-${current.preset}-${current.sort}`}
              initialSaints={initialSaints}
              filter={current.filter}
              sort={current.sort}
              saintPreset={current.preset}
              church={church}
            />
          </div>
        </main>
        <SiteFooter />
      </div>
    </>
  )
}

export default Saints
