'use client'

import { useMemo, useState, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { FaSearch } from 'react-icons/fa'
import Fuse from 'fuse.js'
import { Saint } from '../../saint/SaintSummary/interfaces'
import { useOnClickOutside } from 'usehooks-ts'
import styles from './styles.module.scss'

const SearchClient = ({ searchData }) => {
  const ref = useRef<HTMLDivElement>(null)
  const [searchInput, setSearchInput] = useState('')

  const handleClickOutside = () => {
    setSearchInput('')
  }

  const fuse = useMemo(() => new Fuse<Saint>(searchData || [], {
    keys: ['name'],
    threshold: 0.3,
    shouldSort: true,
    location: 0,
    distance: 100,
  }), [searchData])

  const searchOptions = useMemo(() => {
    const strippedSearch = searchInput
      .replace(/\b(st\.?|saint|elder)\b/gi, '')
      .replace(/[.,//]/g, '')
      .trim()
      .toLowerCase()

    return strippedSearch.length > 1
      ? fuse.search(strippedSearch).map((result) => result.item)
      : []
  }, [searchInput, fuse])

  useOnClickOutside(ref as any, handleClickOutside)

  if (!searchData) {
    return null
  }

  return (
    <div
      ref={ref}
      className={styles.search}
    >
      <div className={styles.searchContainer}>
        <div className={styles.inputWrapper}>
          <input
            type="text"
            className={styles.input}
            placeholder="Search For Saints"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <FaSearch />
        </div>
        <div className={styles.dropdownContent}>
          {searchOptions.map((option, i) => (
            <Link
              key={i}
              className={styles.result}
              href={`/saints/${option.slug}`}
              onClick={() => setSearchInput('')}
            >
              <div className={styles.profile}>
                <Image
                  src={`${process.env.NEXT_PUBLIC_DIRECTUS_ASSETS}/assets/${option.profile_image?.id}?key=search`}
                  width={50}
                  height={50}
                  alt=""
                />
              </div>
              <div className={styles.info}>
                <div className={styles.name}>
                  {option.name}
                </div>
                <div className={styles.dates}>
                  {option.birth_year} - {option.death_year}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SearchClient
