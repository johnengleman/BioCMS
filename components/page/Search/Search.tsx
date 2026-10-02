'use client'

import { useMemo, useState } from 'react'
import { useTradition } from '../../../hooks/useTradition'
import { inTradition } from '../../../utils/site'
import SearchClient from './Search.client'

// The search list is one cached file (/api/search-index). It loads the
// first time the visitor focuses a search field, so no page carries
// it, and the same file serves every tradition.
let request: Promise<any[]> | null = null
const loadIndex = () => {
  request ??= fetch('/api/search-index')
    .then((response) =>
      response.ok ? response.json() : Promise.reject(),
    )
    .catch(() => {
      request = null
      return []
    })
  return request
}

const Search = ({
  variant,
}: {
  variant?: 'compact' | 'hero'
}) => {
  const { church } = useTradition()
  const [saints, setSaints] = useState<any[]>([])
  const [loaded, setLoaded] = useState(false)

  const searchData = useMemo(
    () =>
      saints.filter((saint) =>
        inTradition(saint.venerated_in, church),
      ),
    [saints, church],
  )

  return (
    <div
      style={{ display: 'contents' }}
      onFocusCapture={() => {
        if (loaded) return
        setLoaded(true)
        loadIndex().then(setSaints)
      }}
    >
      <SearchClient
        searchData={searchData}
        variant={variant}
      />
    </div>
  )
}

export default Search
