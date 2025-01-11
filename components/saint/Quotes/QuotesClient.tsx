'use client'

import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFaceFrownSlight } from '@fortawesome/pro-duotone-svg-icons'
import { useInfiniteLoader } from 'masonic'
import { getQuotes } from '../../../queries/getQuotes'
import styles from './styles.module.scss'

const Masonry = dynamic(
  () => import('masonic').then((mod) => mod.Masonry),
  {
    ssr: false,
  },
)

type QuotesProps = {
  initialQuotes: QuoteProps[]
  church?: string
  filter?: string
  renderOnlyInitial?: boolean
}

type QuoteProps = {
  text: string
  topics: string[]
  showAuthor?: boolean
  saint: {
    name: string
    death_year: string
    birth_year: string
    profile_image: {
      description: string
      id: string
    }
  }
}

const Quote = ({ index, data, width }) => {
  const { text, topics, saints, showAuthor } = data || {}
  return (
    <div className={styles.quote}>
      <p className={styles.text}>{text}</p>
      <div className={styles.footer}>
        {showAuthor && data?.profile_image && (
          <div className={styles.authorContainer}>
            <div className={styles.profile}>
              <Image
                src={`${process.env.NEXT_PUBLIC_DIRECTUS_ASSETS}/assets/${data?.profile_image?.id}?key=search`}
                width={50}
                height={50}
                alt=""
              />
            </div>
            <div className={styles.author}>
              <p>{data?.name}</p>
              <p className={styles.dates}>
                {data?.birth_year}-{data?.death_year}
              </p>
            </div>
          </div>
        )}
        <div className={styles.topics}>
          {topics?.map((topic, index) => (
            <div
              key={index}
              className={styles.topic}
            >
              {topic}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const Quotes = ({
  initialQuotes,
  church,
  filter,
  renderOnlyInitial = false,
}: QuotesProps) => {
  const [items, setItems] = useState(initialQuotes)
  const [hasMore, setHasMore] = useState(true)

  const fetchMoreItems = async (
    startIndex,
    stopIndex,
    currentItems,
  ) => {
    if (!hasMore) return

    const nextItems = await getQuotes({
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
    <div className={styles.quotesContainer}>
      {items?.length ? (
        <Masonry
          items={items}
          columnGutter={20}
          rowGutter={5}
          overscanBy={1.25}
          columnWidth={275}
          onRender={
            !renderOnlyInitial ? maybeLoadMore : undefined
          }
          render={Quote}
          maxColumnCount={5}
        />
      ) : (
        <p className="status">
          No quotes found.{' '}
          <FontAwesomeIcon icon={faFaceFrownSlight} />
        </p>
      )}
    </div>
  )
}

export default Quotes
