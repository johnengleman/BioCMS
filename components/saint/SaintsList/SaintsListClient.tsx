// components/SaintsListClient.tsx (Client Component)
'use client'

import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react'
import { getSaints } from '../../../queries/getSaints'
import SaintSummary from '../SaintSummary/SaintSummary'
import ScrollUp from '../../global/ScrollUp/ScrollUp'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFaceFrownSlight } from '@fortawesome/pro-duotone-svg-icons'
import { useInfiniteLoader } from 'masonic'
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

  const fetchMoreItems = async (
    startIndex,
    stopIndex,
    currentItems,
  ) => {
    if (!hasMore) return

    const nextItems = await getSaints({
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
      {items?.length > 0 ? (
        <>
          <Masonry
            items={items}
            columnGutter={20}
            rowGutter={5}
            overscanBy={1.25}
            columnWidth={275}
            onRender={maybeLoadMore}
            render={SaintSummary}
            maxColumnCount={6}
          />
          <ScrollUp />
        </>
      ) : (
        <p className="status">
          No saints found.{' '}
          <FontAwesomeIcon icon={faFaceFrownSlight} />
        </p>
      )}
    </div>
  )
}

export default SaintsListClient
