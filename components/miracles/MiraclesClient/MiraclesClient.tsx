'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { useInfiniteLoader } from 'masonic'
import { getTeachings } from '../../../queries/getTeachings'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFaceFrownSlight } from '@fortawesome/pro-duotone-svg-icons'
import SaintDetail from '../../global/SaintDetail/SaintDetail'

const Masonry = dynamic(
  () => import('masonic').then((mod) => mod.Masonry),
  {
    ssr: false,
  },
)

const MiraclesClient = ({
  initialMiracles,
  church,
  filter,
}) => {
  const [items, setItems] = useState(initialMiracles)
  const [hasMore, setHasMore] = useState(true)

  const fetchMoreItems = async (
    startIndex,
    stopIndex,
    currentItems,
  ) => {
    if (!hasMore) return

    const nextItems = await getTeachings({
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
      {initialMiracles.length ? (
        <Masonry
          items={items}
          columnGutter={20}
          rowGutter={20}
          overscanBy={1.25}
          columnWidth={275}
          onRender={maybeLoadMore}
          render={SaintDetail}
          maxColumnCount={1}
        />
      ) : (
        <p className="status">
          No miracles found.{' '}
          <FontAwesomeIcon icon={faFaceFrownSlight} />
        </p>
      )}
    </>
  )
}

export default MiraclesClient
