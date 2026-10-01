'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  loadMoreMiracles,
  loadMorePrayers,
  loadMoreQuotes,
  loadMoreTeachings,
} from '../../../app/actions'
import { splitSaintName } from '../../../utils/saintNames'
import styles from './styles.module.scss'

type Kind = 'teachings' | 'miracles' | 'quotes' | 'prayers'

const LOADERS = {
  teachings: loadMoreTeachings,
  miracles: loadMoreMiracles,
  quotes: loadMoreQuotes,
  prayers: loadMorePrayers,
}

const assets = process.env.NEXT_PUBLIC_DIRECTUS_ASSETS
const LONG_NAME = 28

const shortName = (name = '') =>
  name.length > LONG_NAME
    ? splitSaintName(name).title
    : name

const years = (s: any) =>
  s?.birth_year || s?.death_year
    ? `${s.birth_year || '?'}–${s.death_year || '?'}`
    : ''

// A saint's teachings or miracles: portrait, name, first lines and
// the first few titles.
const FeatureCard = ({
  item,
  kind,
}: {
  item: any
  kind: Kind
}) => {
  // Built on the server (utils/listPreview).
  const {
    count,
    unit,
    intro,
    titles = [],
  } = item.preview || {}
  const image = item.saint?.profile_image?.id

  return (
    <article className={styles.feature}>
      {image && (
        <Link
          href={item.link}
          className={styles.portrait}
          tabIndex={-1}
          aria-hidden="true"
        >
          <img
            src={`${assets}/assets/${image}?width=400&format=webp&quality=78`}
            alt=""
            loading="lazy"
          />
        </Link>
      )}
      <div className={styles.featureText}>
        {count > 0 && (
          <p className={styles.eyebrow}>
            {count} {unit}
          </p>
        )}
        <h2>
          <Link href={item.link}>
            {shortName(item.saint?.name)}
          </Link>
        </h2>
        {years(item.saint) && (
          <p className={styles.years}>
            {years(item.saint)}
          </p>
        )}
        {intro && <p className={styles.intro}>{intro}</p>}
        {titles.length > 0 && (
          <ol className={styles.sections}>
            {titles
              .slice(0, 4)
              .map((title: string, i: number) => (
                <li key={i}>{title}</li>
              ))}
          </ol>
        )}
        <Link
          href={item.link}
          className={styles.read}
        >
          {kind === 'miracles'
            ? 'Read every account'
            : 'Read the teachings'}
          <span aria-hidden="true"> ›</span>
        </Link>
      </div>
    </article>
  )
}

const QuoteCard = ({ item }: { item: any }) => {
  const image = item.saint?.profile_image?.id
  const name = shortName(item.saint?.name)
  const body = (
    <>
      <blockquote>{item.text}</blockquote>
      <span className={styles.author}>
        {image && (
          <img
            src={`${assets}/assets/${image}?width=96&height=96&fit=cover&format=webp&quality=78`}
            alt=""
            loading="lazy"
          />
        )}
        <span>
          <span className={styles.authorName}>{name}</span>
          {years(item.saint) && (
            <span className={styles.authorYears}>
              {years(item.saint)}
            </span>
          )}
        </span>
      </span>
    </>
  )
  return item.saint?.slug ? (
    <Link
      href={`/saints/${item.saint.slug}`}
      className={styles.quote}
    >
      {body}
    </Link>
  ) : (
    <div className={styles.quote}>{body}</div>
  )
}

const PrayerCard = ({ item }: { item: any }) => {
  const image = item.saint?.profile_image?.id
  return (
    <Link
      href={item.link}
      className={styles.prayer}
    >
      {image && (
        <img
          src={`${assets}/assets/${image}?width=200&height=200&fit=cover&format=webp&quality=78`}
          alt=""
          loading="lazy"
        />
      )}
      <span>
        <span className={styles.eyebrow}>Novena</span>
        <span className={styles.prayerTitle}>
          {item.prayer_title || 'Novena'}
        </span>
        <span className={styles.authorYears}>
          {shortName(item.saint?.name)}
        </span>
      </span>
      <span
        className={styles.chevron}
        aria-hidden="true"
      >
        ›
      </span>
    </Link>
  )
}

// A list page's items with a "Show more" button.
const ContentList = ({
  kind,
  initialItems,
  church,
  filter,
  pageSize,
  emptyText,
}: {
  kind: Kind
  initialItems: any[]
  church: string
  filter: string
  pageSize: number
  emptyText: string
}) => {
  const [items, setItems] = useState(initialItems || [])
  const [hasMore, setHasMore] = useState(
    (initialItems?.length || 0) >= pageSize,
  )
  const [loading, setLoading] = useState(false)

  const loadMore = async () => {
    setLoading(true)
    try {
      const next = await LOADERS[kind]({
        church,
        filter,
        offset: items.length,
        limit: pageSize,
      })
      setItems((current) => [...current, ...next])
      setHasMore(next.length >= pageSize)
    } catch {
      setHasMore(false)
    } finally {
      setLoading(false)
    }
  }

  if (!items.length)
    return <p className={styles.empty}>{emptyText}</p>

  return (
    <>
      <div className={styles[kind]}>
        {items.map((item, i) =>
          kind === 'quotes' ? (
            <QuoteCard
              key={i}
              item={item}
            />
          ) : kind === 'prayers' ? (
            <PrayerCard
              key={i}
              item={item}
            />
          ) : (
            <FeatureCard
              key={i}
              item={item}
              kind={kind}
            />
          ),
        )}
      </div>
      {hasMore && (
        <div className={styles.more}>
          <button
            type="button"
            onClick={loadMore}
            disabled={loading}
          >
            {loading ? 'Loading…' : 'Show more'}
          </button>
        </div>
      )}
    </>
  )
}

export default ContentList
