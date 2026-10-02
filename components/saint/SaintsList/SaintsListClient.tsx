'use client'

import dynamic from 'next/dynamic'
import { useCallback, useMemo, useState } from 'react'
// Loads through the server: the browser may not call Directus (CORS).
import { loadMoreSaints } from '../../../app/saints/actions'
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

interface SaintsListClientProps {
  initialSaints: any[]
  saintPreset: any
  church: any
  filter: any
  sort: any
}

const SaintsListClient = ({
  initialSaints,
  saintPreset,
  sort,
  filter,
  church,
}: SaintsListClientProps) => {
  const [saints, setSaints] = useState(initialSaints || [])
  const [hasMore, setHasMore] = useState(true)
  const isPhone = useMediaQuery('(max-width: 767px)')
  const gutter = isPhone ? 14 : 22

  const items = useMemo(() => {
    const list = [...saints]
    list.splice(Math.min(APP_CARD_AT, list.length), 0, APP_CARD)
    return list
  }, [saints])

  const fetchMoreItems = async () => {
    if (!hasMore) return
    const nextItems = await loadMoreSaints({
      church,
      filter,
      saintPreset,
      sort,
      // The app card is not a saint, so count saints only.
      offset: saints.length,
      limit: 12,
    })
    if (!nextItems.length) setHasMore(false)
    else setSaints((current) => [...current, ...nextItems])
  }

  const maybeLoadMore = useInfiniteLoader(fetchMoreItems, {
    minimumBatchSize: 12,
    isItemLoaded: (index, list) => !!list[index] || !hasMore,
  })

  const Card = useCallback(
    ({ data }) =>
      data?.__app ? (
        <AppCard />
      ) : (
        <SaintSummary
          data={data}
          church={church}
        />
      ),
    [church],
  )

  return (
    <div className={styles.list}>
      {saints.length ? (
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
            render={Card}
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

export default SaintsListClient
