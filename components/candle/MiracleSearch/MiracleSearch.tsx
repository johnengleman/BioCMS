'use client'

import { useEffect, useRef, useState } from 'react'
import styles from './styles.module.scss'

// Filters the miracle accounts rendered inside #miracle-list as the
// reader types. The accounts stay server-rendered; this only hides.
const MiracleSearch = ({ total }: { total: number }) => {
  const [query, setQuery] = useState('')
  const [shown, setShown] = useState(total)
  const entries = useRef<HTMLElement[]>([])

  useEffect(() => {
    entries.current = Array.from(
      document.querySelectorAll<HTMLElement>(
        '#miracle-list [data-miracle]',
      ),
    )
  }, [])

  useEffect(() => {
    const terms = query
      .toLowerCase()
      .split(/\s+/)
      .filter(Boolean)
    let count = 0
    // While searching, long groups show every match (see GroupMore).
    document
      .getElementById('miracle-list')
      ?.toggleAttribute('data-searching', terms.length > 0)
    entries.current.forEach((entry) => {
      const text = entry.textContent?.toLowerCase() || ''
      const match = terms.every((term) =>
        text.includes(term),
      )
      entry.hidden = !match
      if (match) count++
    })
    document
      .querySelectorAll<HTMLElement>(
        '#miracle-list [data-group]',
      )
      .forEach((group) => {
        group.hidden = !group.querySelector(
          '[data-miracle]:not([hidden])',
        )
      })
    setShown(count)
  }, [query])

  return (
    <div className={styles.search}>
      <label className={styles.field}>
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <circle
            cx="11"
            cy="11"
            r="7"
          />
          <path d="M20 20l-4-4" />
        </svg>
        <span className={styles.hidden}>
          Search the accounts
        </span>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={`Search ${total.toLocaleString('en-US')} accounts by name, place, illness, or year`}
        />
      </label>
      <p
        className={styles.count}
        aria-live="polite"
      >
        {query
          ? `${shown} of ${total}`
          : `${total} accounts`}
      </p>
      {query && shown === 0 && (
        <p className={styles.empty}>
          No account matches “{query}”. Try a place, a name
          or a year.
        </p>
      )}
    </div>
  )
}

export default MiracleSearch
