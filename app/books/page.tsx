import type { Metadata } from 'next'
import { getNewestBooks } from '../../queries/getNewestBooks'
import { getBooks } from '../../queries/getBooks'
import { getTopGenres } from '../../queries/GetTopGenres'
import { getTopAuthors } from '../../queries/getTopAuthors'
import { getChurch } from '../../hooks/getChurch'
import { properties } from '../../utils/properties'
import SiteHeader from '../../components/candle/SiteHeader/SiteHeader'
import SiteFooter from '../../components/candle/SiteFooter/SiteFooter'
import HomeHero from '../../components/candle/HomeHero/HomeHero'
import { CHURCH_LABELS, asChurch } from '../../utils/site'
import FilterPills from '../../components/candle/FilterPills/FilterPills'
import PillMenu from '../../components/candle/PillMenu/PillMenu'
import Section from '../../components/candle/Section/Section'
import BookCard, {
  genreLabel,
} from '../../components/candle/BookCard/BookCard'
import styles from './candle.module.scss'

import { NextPageProps } from '../../types/nextjs'

export const runtime = 'edge'

export const metadata: Metadata = {
  title:
    'Books on the Saints: Lives, Teachings & Devotions',
  description:
    'Discover books on Catholic and Orthodox saints: theology, spiritual writings, history and devotions.',
}

// preset = a genre, filter = a saint's name. 'none' and 'all' mean
// no choice (an empty string fails in Directus).
type Params = { preset: string; filter: string }

const hrefWith = (
  current: Params,
  change: Partial<Params>,
) => {
  const next = { ...current, ...change }
  const query = new URLSearchParams()
  if (next.preset !== 'none')
    query.set('preset', next.preset)
  if (next.filter !== 'all')
    query.set('filter', next.filter)
  const text = query.toString()
  return text ? `/books?${text}` : '/books'
}

const Books = async (props: NextPageProps) => {
  const searchParams = await props.searchParams
  const church = await getChurch(searchParams)
  const current: Params = {
    preset: searchParams.preset || 'none',
    filter: searchParams.filter || 'all',
  }

  const [newest, books, genres, authors] =
    await Promise.all([
      getNewestBooks({ church, preset: current.preset }),
      getBooks({
        church,
        preset: current.preset,
        filter: current.filter,
      }),
      getTopGenres({ church }),
      getTopAuthors({ church, preset: current.preset }),
    ])

  const genreCount = Object.fromEntries(
    (genres || []).map(([key, list]: [string, any]) => [
      key,
      list?.length || 0,
    ]),
  )

  const pills = [
    {
      key: 'none',
      label: 'All',
      href: hrefWith(current, { preset: 'none' }),
      selected: current.preset === 'none',
    },
    ...properties.books.presets
      .filter(
        (p: string) =>
          genreCount[p] > 0 || p === current.preset,
      )
      .map((p: string) => ({
        key: p,
        label: genreLabel(p),
        href: hrefWith(current, { preset: p }),
        selected: current.preset === p,
      })),
  ]

  const saintOptions = [
    {
      key: 'all',
      label: 'Any',
      href: hrefWith(current, { filter: 'all' }),
      selected: current.filter === 'all',
    },
    ...(authors || [])
      .filter((a: any) => a.books?.length)
      .sort(
        (a: any, b: any) => b.books.length - a.books.length,
      )
      .map((a: any) => ({
        key: a.name,
        label: a.name,
        href: hrefWith(current, { filter: a.name }),
        selected: current.filter === a.name,
      })),
  ]

  const showNewest =
    current.filter === 'all' && (newest?.length || 0) > 0
  const heading =
    current.filter !== 'all'
      ? `Books about ${current.filter}`
      : current.preset !== 'none'
        ? genreLabel(current.preset)
        : 'All books'

  return (
    <div className={styles.page}>
      <SiteHeader
        searchParams={searchParams}
        active="/books"
        overlay
      />
      <main>
        <HomeHero
          church={church}
          size="short"
          title="Books"
          subtitle="Lives, writings, and devotions to read next, chosen for each saint."
          filters={
            pills.length > 1 && (
              <FilterPills
                label="Filter books by genre"
                pills={pills}
                tone="glass"
              />
            )
          }
        />
        <div className={styles.results}>
          <span>
            Showing books for {CHURCH_LABELS[asChurch(church)]} ·{' '}
            <a href="#site-footer">Change</a>
          </span>
          {saintOptions.length > 1 && (
            <PillMenu
              label="Saint"
              options={saintOptions}
            />
          )}
        </div>

        <div className={styles.content}>
          {showNewest && (
            <Section
              id="newest"
              title="Newest"
            >
              <div className={styles.newest}>
                {newest.map((book: any, i: number) => (
                  <BookCard
                    key={book.id || i}
                    book={book}
                    compact
                  />
                ))}
              </div>
            </Section>
          )}

          <Section
            id="all-books"
            title={heading}
          >
            {books?.length ? (
              <div className={styles.grid}>
                {books.map((book: any, i: number) => (
                  <BookCard
                    key={book.id || i}
                    book={book}
                  />
                ))}
              </div>
            ) : (
              <p className={styles.empty}>
                No books yet. Each saint&apos;s reading list
                grows as their entry is written.
              </p>
            )}
          </Section>
        </div>
      </main>
      <SiteFooter church={church} />
    </div>
  )
}

export default Books
