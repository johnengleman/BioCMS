'use client'

import { useId, useMemo, useState, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next-nprogress-bar'
import { FaSearch } from 'react-icons/fa'
import Fuse from 'fuse.js'
import { Saint } from '../../saint/SaintSummary/interfaces'
import { useOnClickOutside } from 'usehooks-ts'
import styles from './styles.module.scss'

// Saint search: a field with a drop-down of results. The header uses
// the compact field; the home page photo uses `variant="hero"`.
// Keyboard: arrows move, Enter opens, Escape clears.
const SearchClient = ({
  searchData,
  variant = 'compact',
}: {
  searchData: any
  variant?: 'compact' | 'hero'
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const listId = useId()
  const [searchInput, setSearchInput] = useState('')
  const [activeIndex, setActiveIndex] = useState(-1)

  const close = () => {
    setSearchInput('')
    setActiveIndex(-1)
  }

  const fuse = useMemo(
    () =>
      new Fuse<Saint>(searchData || [], {
        keys: ['name'],
        threshold: 0.3,
        shouldSort: true,
        location: 0,
        distance: 100,
      }),
    [searchData],
  )

  const query = searchInput
    .replace(/\b(st\.?|saint|elder)\b/gi, '')
    .replace(/[.,//]/g, '')
    .trim()
    .toLowerCase()

  const searchOptions = useMemo(
    () =>
      query.length > 1
        ? fuse.search(query).map((result) => result.item)
        : [],
    [query, fuse],
  )

  useOnClickOutside(ref as any, close)

  if (!searchData) {
    return null
  }

  const open = query.length > 1
  const assets = process.env.NEXT_PUBLIC_DIRECTUS_ASSETS

  const onKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === 'Escape') {
      close()
    } else if (
      event.key === 'ArrowDown' &&
      searchOptions.length
    ) {
      event.preventDefault()
      setActiveIndex((i) => (i + 1) % searchOptions.length)
    } else if (
      event.key === 'ArrowUp' &&
      searchOptions.length
    ) {
      event.preventDefault()
      setActiveIndex(
        (i) =>
          (i - 1 + searchOptions.length) %
          searchOptions.length,
      )
    } else if (
      event.key === 'Enter' &&
      searchOptions.length
    ) {
      const saint = searchOptions[Math.max(activeIndex, 0)]
      close()
      router.push(`/saints/${saint.slug}`)
    }
  }

  return (
    <div
      ref={ref}
      className={`${styles.search} ${variant === 'hero' ? styles.hero : ''}`}
    >
      <div className={styles.searchContainer}>
        <div className={styles.inputWrapper}>
          <input
            type="search"
            className={styles.input}
            placeholder={
              variant === 'hero'
                ? 'Search saints by name'
                : 'Search for saints'
            }
            aria-label="Search for saints"
            role="combobox"
            aria-expanded={open}
            aria-controls={listId}
            aria-autocomplete="list"
            aria-activedescendant={
              activeIndex >= 0
                ? `${listId}-${activeIndex}`
                : undefined
            }
            value={searchInput}
            onChange={(e) => {
              setSearchInput(e.target.value)
              setActiveIndex(-1)
            }}
            onKeyDown={onKeyDown}
          />
          <FaSearch aria-hidden="true" />
          {variant === 'hero' && (
            <span
              className={styles.heroButton}
              aria-hidden="true"
            >
              <FaSearch />
            </span>
          )}
        </div>
      </div>
      {open && (
        <div
          className={styles.dropdownContent}
          id={listId}
          role="listbox"
          aria-label="Saints"
        >
          {searchOptions.length ? (
            searchOptions.map((option, i) => (
              <Link
                key={option.slug}
                id={`${listId}-${i}`}
                role="option"
                aria-selected={i === activeIndex}
                className={`${styles.result} ${
                  i === activeIndex ? styles.active : ''
                }`}
                href={`/saints/${option.slug}`}
                onClick={close}
                onMouseEnter={() => setActiveIndex(i)}
              >
                <span className={styles.profile}>
                  {option.profile_image?.id && (
                    <img
                      src={`${assets}/assets/${option.profile_image.id}?width=96&height=96&fit=cover&format=webp&quality=80`}
                      width={44}
                      height={44}
                      alt=""
                    />
                  )}
                </span>
                <span className={styles.info}>
                  <span className={styles.name}>
                    {option.name}
                  </span>
                  {(option.birth_year ||
                    option.death_year) && (
                    <span className={styles.dates}>
                      {option.birth_year || '?'}–
                      {option.death_year || '?'}
                    </span>
                  )}
                </span>
              </Link>
            ))
          ) : (
            <p className={styles.empty}>
              No saints match “{searchInput.trim()}”.
            </p>
          )}
        </div>
      )}
    </div>
  )
}

export default SearchClient
