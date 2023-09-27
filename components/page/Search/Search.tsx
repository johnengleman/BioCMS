import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/pro-duotone-svg-icons'
import ImageGlobal from '../../global/ImageGlobal/ImageGlobal'
import * as S from './styles'
import Fuse from 'fuse.js'
import { Saint } from '../../home/summary/interfaces'
import { useOnClickOutside } from 'usehooks-ts'

const Search = ({ searchData }) => {
  const ref = useRef(null)
  const [searchInput, setSearchInput] = useState('')
  const [searchOptions, setSearchOptions] = useState<
    Saint[]
  >([])

  const handleClickOutside = () => {
    setSearchInput('')
  }

  useEffect(() => {
    const strippedSearch = searchInput
      .replace(/\b(st\.?|saint|elder)\b/gi, '')
      .replace(/[.,//]/g, '')
      .trim()
      .toLowerCase()

    const fuse = new Fuse(searchData, {
      keys: ['name'],
      threshold: 0.3, // Increase threshold for more leniency
      shouldSort: true,
      location: 0, // Start at the beginning of the string
      distance: 100, // Increase distance to cover more character
    })

    if (strippedSearch.length > 1) {
      const results = fuse.search(strippedSearch)
      setSearchOptions(
        results.map((result) => result.item as Saint),
      )
    } else {
      setSearchOptions([])
    }
  }, [searchInput, searchData])

  useOnClickOutside(ref, handleClickOutside)

  if (!searchData) {
    return null
  }

  return (
    <S.Search ref={ref}>
      <div className="input-wrapper">
        <input
          type="text"
          className="input"
          placeholder="Search For Saints"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </div>
      <div className="dropdown-content">
        {searchOptions.map((option, i) => (
          <Link
            key={i}
            className="result"
            href={`/saints/${option.slug}`}
            onClick={() => setSearchInput('')}
          >
            <div className="profile">
              <ImageGlobal
                src={`${process.env.NEXT_PUBLIC_DOMAIN}/assets/${option.images[0]?.directus_files_id.id}?key=search`}
                fill={false}
                width={35}
                height={35}
              />
            </div>
            <div className="info">
              <div className="name">{option.name}</div>
              <div className="dates">
                {option.birth_year} - {option.death_year}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </S.Search>
  )
}

export default Search
