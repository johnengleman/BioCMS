'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { useInfiniteLoader } from 'masonic'
import { getPrayers } from '../../../queries/getPrayers'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFaceFrownSlight } from '@fortawesome/pro-duotone-svg-icons'
import NovenaDetail from '../NovenaDetail/NovenaDetail'

const Masonry = dynamic(
  () => import('masonic').then((mod) => mod.Masonry),
  {
    ssr: false,
  },
)

const NovenaClient = ({
  initialPrayers,
  church,
  filter,
}) => {
  const [items, setItems] = useState(initialPrayers)
  const [hasMore, setHasMore] = useState(true)

  const fetchMoreItems = async (
    startIndex,
    stopIndex,
    currentItems,
  ) => {
    if (!hasMore) return

    const nextItems = await getPrayers({
      church,
      filter,
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
    threshold: 1,
    isItemLoaded: (index, items) =>
      !!items[index] || !hasMore,
  })

  return (
    <>
      {initialPrayers?.length ? (
        <Masonry
          items={items}
          columnGutter={20}
          rowGutter={5}
          overscanBy={1.25}
          columnWidth={275}
          onRender={maybeLoadMore}
          render={NovenaDetail}
          maxColumnCount={1}
        />
      ) : (
        <p className="status">
          No Novenas found.
          <FontAwesomeIcon icon={faFaceFrownSlight} />
        </p>
      )}
    </>
  )
}

export default NovenaClient
