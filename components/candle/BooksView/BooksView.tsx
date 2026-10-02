'use client'

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'
import { useTradition } from '../../../hooks/useTradition'
import { fetchBooks } from '../../../utils/api'
import { properties } from '../../../utils/properties'
import type { BooksBundle } from '../../../queries/getBooksBundle'
import FilterPills from '../FilterPills/FilterPills'
import PillMenu from '../PillMenu/PillMenu'
import Section from '../Section/Section'
import BookCard, { genreLabel } from '../BookCard/BookCard'

// The books page for one genre (in the address). The tradition is kept
// in the browser. The built page has the books for "Both traditions";
// for another tradition, or for one saint, the bundle comes from the
// cached /api/books.
type Context = {
  bundle: BooksBundle
  loading: boolean
  genre: string
  saint: string
  setSaint: (saint: string) => void
}

const BooksContext = createContext<Context | null>(null)

const useBooks = () => {
  const context = useContext(BooksContext)
  if (!context) throw new Error('Use inside <BooksProvider>')
  return context
}

export const BooksProvider = ({
  genre,
  initial,
  children,
}: {
  genre: string
  initial: BooksBundle
  children: ReactNode
}) => {
  const { church } = useTradition()
  // A saint chosen for one tradition does not carry to another.
  const [chosen, setChosen] = useState({ church: 'all', saint: 'all' })
  const saint = chosen.church === church ? chosen.saint : 'all'
  const isDefault = church === 'all' && saint === 'all'
  const key = `${church}|${saint}`
  const [fetched, setFetched] = useState<{
    key: string
    bundle: BooksBundle
  } | null>(null)

  useEffect(() => {
    if (isDefault) return
    let current = true
    fetchBooks({
      church,
      preset: genre || 'none',
      filter: saint,
    })
      .then(
        (bundle) => current && setFetched({ key, bundle }),
      )
      .catch(() => {})
    return () => {
      current = false
    }
  }, [key, isDefault, church, genre, saint])

  const ready = isDefault || fetched?.key === key
  const bundle = isDefault
    ? initial
    : fetched?.key === key
      ? fetched.bundle
      : // Until the new books arrive, keep showing the last ones.
        fetched?.bundle || initial

  return (
    <BooksContext.Provider
      value={{
        bundle,
        loading: !ready,
        genre,
        saint,
        setSaint: (next) => setChosen({ church, saint: next }),
      }}
    >
      {children}
    </BooksContext.Provider>
  )
}

// The genre pills on the hero. Each is the address of a page built
// ahead of time (/books/genre/prayer_and_devotionals).
export const BooksPills = () => {
  const { bundle, genre } = useBooks()
  const pills = [
    {
      key: 'none',
      label: 'All',
      href: '/books',
      selected: !genre,
    },
    ...properties.books.presets
      .filter(
        (p: string) => bundle.genres[p] > 0 || p === genre,
      )
      .map((p: string) => ({
        key: p,
        label: genreLabel(p),
        href: `/books/genre/${p}`,
        selected: genre === p,
      })),
  ]
  if (pills.length < 2) return null
  return (
    <FilterPills
      label="Filter books by genre"
      pills={pills}
      tone="glass"
    />
  )
}

// "Saint: Any" menu. Saints with more than one book, most books first.
export const BooksSaintMenu = () => {
  const { bundle, saint, setSaint } = useBooks()
  if (!bundle.authors.length) return null
  const options = [
    {
      key: 'all',
      label: 'Any',
      onSelect: () => setSaint('all'),
      selected: saint === 'all',
    },
    ...bundle.authors.map((a) => ({
      key: a.name,
      label: a.name,
      onSelect: () => setSaint(a.name),
      selected: saint === a.name,
    })),
  ]
  return (
    <PillMenu
      label="Saint"
      options={options}
    />
  )
}

export const BooksContent = ({
  className,
  newestClassName,
  gridClassName,
  emptyClassName,
}: {
  className?: string
  newestClassName?: string
  gridClassName?: string
  emptyClassName?: string
}) => {
  const { bundle, loading, genre, saint } = useBooks()
  const showNewest = saint === 'all' && bundle.newest.length > 0
  const heading =
    saint !== 'all'
      ? `Books about ${saint}`
      : genre
        ? genreLabel(genre)
        : 'All books'

  return (
    <div
      className={className}
      aria-busy={loading}
    >
      {showNewest && (
        <Section
          id="newest"
          title="Newest"
        >
          <div className={newestClassName}>
            {bundle.newest.map((book: any, i: number) => (
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
        {bundle.books.length ? (
          <div className={gridClassName}>
            {bundle.books.map((book: any, i: number) => (
              <BookCard
                key={book.id || i}
                book={book}
              />
            ))}
          </div>
        ) : (
          <p className={emptyClassName}>
            No books yet. Each saint&apos;s reading list grows as
            their entry is written.
          </p>
        )}
      </Section>
    </div>
  )
}
