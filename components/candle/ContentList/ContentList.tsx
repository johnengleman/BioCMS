'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useTradition } from '../../../hooks/useTradition'
import { fetchList } from '../../../utils/api'
import { splitSaintName } from '../../../utils/saintNames'
import styles from './styles.module.scss'

type Kind = 'teachings' | 'miracles' | 'quotes' | 'prayers'

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

// A saint's teachings or miracles, as one wide card: the portrait shown
// whole on a beige panel, then the count, the name, the first lines,
// the first few titles, and a button.
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
      <Link
        href={item.link}
        className={styles.portrait}
        tabIndex={-1}
        aria-hidden="true"
      >
        {image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={`${assets}/assets/${image}?width=480&format=webp&quality=78`}
            alt=""
            loading="lazy"
          />
        )}
      </Link>
      <div className={styles.featureText}>
        {count > 0 && (
          <p className={styles.eyebrow}>
            {count.toLocaleString('en-US')} {unit}
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
                <li key={i}>
                  <em>{i + 1}</em>
                  <span>{title}</span>
                </li>
              ))}
          </ol>
        )}
        <Link
          href={item.link}
          className={styles.read}
        >
          {kind === 'miracles'
            ? count > 1
              ? `Read all ${count.toLocaleString('en-US')} accounts`
              : 'Read the account'
            : 'Read the teachings'}
          <span aria-hidden="true">→</span>
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

// One list for one tradition. It starts from the items in the built
// page when the tradition is "Both"; for Catholic or Orthodox it loads
// the first page from /api/list, which is cached.
const List = ({
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
  const [items, setItems] = useState<any[] | null>(
    church === 'all' ? initialItems || [] : null,
  )
  const [hasMore, setHasMore] = useState(
    church !== 'all' || (initialItems?.length || 0) >= pageSize,
  )
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (items) return
    let current = true
    fetchList(kind, {
      church,
      filter,
      offset: 0,
      limit: pageSize,
    })
      .then((list) => {
        if (!current) return
        setItems(list)
        setHasMore(list.length >= pageSize)
      })
      .catch(() => current && setItems([]))
    return () => {
      current = false
    }
    // Runs once per tradition: the parent keys this component on it.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const loadMore = async () => {
    if (!items) return
    setLoading(true)
    try {
      const next = await fetchList(kind, {
        church,
        filter,
        offset: items.length,
        limit: pageSize,
      })
      setItems((current) => [...(current || []), ...next])
      setHasMore(next.length >= pageSize)
    } catch {
      setHasMore(false)
    } finally {
      setLoading(false)
    }
  }

  if (!items)
    return (
      <p
        className={styles.empty}
        role="status"
      >
        Loading…
      </p>
    )
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

// A list page's items with a "Show more" button.
const ContentList = (props: {
  kind: Kind
  initialItems: any[]
  filter: string
  pageSize: number
  emptyText: string
}) => {
  const { church } = useTradition()
  return (
    <List
      key={church}
      church={church}
      {...props}
    />
  )
}

export default ContentList
