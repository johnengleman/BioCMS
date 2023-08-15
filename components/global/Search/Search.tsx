import { useEffect, useState } from 'react'
import Link from 'next/link'
import ImageGlobal from '../ImageGlobal/ImageGlobal'
import * as S from './styles'
import Fuse from 'fuse.js'
import { Saint } from '../../saints/summary/interfaces'

const Search = ({ saints }) => {
  const [searchInput, setSearchInput] = useState('')
  const [searchOptions, setSearchOptions] = useState<
    Saint[]
  >([])

  useEffect(() => {
    const strippedSearch = searchInput
      .replace(/\b(st\.?|saint|elder)\b/gi, '')
      .replace(/[.,//]/g, '')
      .trim()
      .toLowerCase()

    const fuse = new Fuse(saints, {
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
  }, [searchInput, saints])

  return (
    <S.Search>
      <div className="input-wrapper">
        <i className="fa-solid fa-magnifying-glass search-icon"></i>
        <input
          type="text"
          className="input"
          placeholder="Search"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </div>
      <div className="dropdown-content">
        {searchOptions.map((option, i) => (
          <Link
            key={i}
            className="result"
            href={`/saints/${option.slug}`}
          >
            <div className="profile">
              <ImageGlobal
                src={`https://saints-cms.onrender.com/assets/${option.photos[0]?.directus_files_id.id}?key=search`}
                fill={false}
                width={35}
                height={35}
              />
            </div>
            <div className="name">{option.name}</div>
          </Link>
        ))}
      </div>
    </S.Search>
  )
}

export default Search
