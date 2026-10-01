// components/SaintsListClient.tsx (Client Component)
'use client'

import dynamic from 'next/dynamic'
import { useState } from 'react'
// Loads through the server: the browser may not call Directus (CORS).
import { loadMoreSaints } from '../../../app/saints/actions'
import SaintSummary from '../SaintSummary/SaintSummary'
import ScrollUp from '../../global/ScrollUp/ScrollUp'
import { useInfiniteLoader } from 'masonic'
import { useMediaQuery } from 'usehooks-ts'
import styles from '../../../app/saints/styles.module.scss'

const Masonry = dynamic(
  () => import('masonic').then((mod) => mod.Masonry),
  {
    ssr: false,
  },
)

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
  const [items, setItems] = useState(initialSaints)
  const [hasMore, setHasMore] = useState(true)
  // Phones: tighter gaps, so two columns fit.
  const isPhone = useMediaQuery('(max-width: 767px)')
  const gutter = isPhone ? 12 : 24

  const fetchMoreItems = async (
    startIndex,
    stopIndex,
    currentItems,
  ) => {
    if (!hasMore) return

    const nextItems = await loadMoreSaints({
      church,
      filter,
      saintPreset,
      sort,
      offset: startIndex,
      limit: stopIndex - startIndex,
    })

    if (nextItems.length === 0) {
      setHasMore(false) // No more data to load
    } else {
      setItems((current) => [...current, ...nextItems])
    }
  }
  const maybeLoadMore = useInfiniteLoader(fetchMoreItems, {
    minimumBatchSize: 4,
    isItemLoaded: (index, items) =>
      !!items[index] || !hasMore,
  })

  return (
    <div className={styles.saintHome}>
      {items?.length ? (
        <>
          {/* Two columns on phones, up to four on desktop. */}
          <Masonry
            key={gutter}
            items={items}
            columnGutter={gutter}
            rowGutter={gutter}
            overscanBy={1.25}
            columnWidth={150}
            onRender={maybeLoadMore}
            render={SaintSummary}
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
