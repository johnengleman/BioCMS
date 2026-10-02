'use client'

import dynamic from 'next/dynamic'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { fetchSaints } from '../../../utils/api'
import {
  WithSaintsView,
  type SaintsView,
} from '../../candle/SaintsFilters/SaintsFilters'
import SaintSummary from '../SaintSummary/SaintSummary'
import AppCard from '../AppCard/AppCard'
import ScrollUp from '../../global/ScrollUp/ScrollUp'
import { useInfiniteLoader } from 'masonic'
import { useMediaQuery } from 'usehooks-ts'
import styles from './styles.module.scss'

const Masonry = dynamic(
  () => import('masonic').then((mod) => mod.Masonry),
  {
    ssr: false,
  },
)

// The app card goes in as the seventh item (or last, for short lists).
const APP_CARD_AT = 6
const APP_CARD = { __app: true, id: 'app-card' }
const FIRST_PAGE = 30
const NEXT_PAGE = 12

const Card = ({ data }: { data: any }) =>
  data?.__app ? <AppCard /> : <SaintSummary data={data} />

// One list for one view. It starts from the saints in the built page
// when the view is the default one (both traditions, newest first).
// For any other view it loads the first page from /api/saints, which
// is cached. Keyed on the view, so a new view starts fresh.
const SaintsList = ({
  view,
  initialSaints,
}: {
  view: SaintsView
  initialSaints: any[]
}) => {
  const [saints, setSaints] = useState<any[] | null>(
    view.isDefault ? initialSaints : null,
  )
  // A short first page means there is nothing more to load.
  const [hasMore, setHasMore] = useState(
    !view.isDefault || initialSaints.length >= FIRST_PAGE,
  )
  const isPhone = useMediaQuery('(max-width: 767px)')
  const gutter = isPhone ? 14 : 22

  const query = useMemo(
    () => ({
      church: view.church,
      filter: view.filter,
      preset: view.preset,
      sort: view.sort,
    }),
    [view],
  )

  useEffect(() => {
    if (saints) return
    let current = true
    fetchSaints({ ...query, offset: 0, limit: FIRST_PAGE })
      .then((list) => {
        if (!current) return
        setSaints(list)
        setHasMore(list.length >= FIRST_PAGE)
      })
      .catch(() => current && setSaints([]))
    return () => {
      current = false
    }
    // Runs once per view: the parent keys this component on the view.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const items = useMemo(() => {
    const list = [...(saints || [])]
    list.splice(Math.min(APP_CARD_AT, list.length), 0, APP_CARD)
    return list
  }, [saints])

  const fetchMoreItems = async () => {
    if (!hasMore || !saints) return
    const next = await fetchSaints({
      ...query,
      // The app card is not a saint, so count saints only.
      offset: saints.length,
      limit: NEXT_PAGE,
    }).catch(() => [])
    if (!next.length) setHasMore(false)
    else setSaints((current) => [...(current || []), ...next])
  }

  const maybeLoadMore = useInfiniteLoader(fetchMoreItems, {
    minimumBatchSize: NEXT_PAGE,
    isItemLoaded: (index, list) => !!list[index] || !hasMore,
  })

  const render = useCallback(Card, [])

  return (
    <div className={styles.list}>
      {saints === null ? (
        <p
          className="emptyState"
          role="status"
        >
          Loading saints…
        </p>
      ) : saints.length ? (
        <>
          {/* One column on phones, up to four on wide screens. */}
          <Masonry
            key={gutter}
            items={items}
            itemKey={(item: any, index) => item?.id ?? index}
            columnGutter={gutter}
            rowGutter={gutter}
            overscanBy={1.5}
            columnWidth={290}
            onRender={maybeLoadMore}
            render={render}
            maxColumnCount={4}
          />
          <ScrollUp />
        </>
      ) : (
        <p className="emptyState">
          No saints match these filters yet.
        </p>
      )}
    </div>
  )
}

const SaintsListClient = ({
  initialSaints,
  category,
}: {
  initialSaints: any[]
  category: string
}) => (
  <WithSaintsView
    category={category}
    render={(view) => (
      <SaintsList
        key={`${view.church}|${view.filter}|${view.preset}|${view.sort}`}
        view={view}
        initialSaints={initialSaints}
      />
    )}
  />
)

export default SaintsListClient
