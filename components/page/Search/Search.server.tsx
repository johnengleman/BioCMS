import { getSearchData } from '../../../queries/getSearchData'
import { getChurch } from '../../../hooks/getChurch'
import SearchClient from './Search.client'

const Search = async ({
  searchParams,
  variant,
}: {
  searchParams: any
  variant?: 'compact' | 'hero'
}) => {
  const church = await getChurch(searchParams)
  const searchData = await getSearchData(church)

  if (!searchData) {
    return null
  }

  return (
    <SearchClient
      searchData={searchData}
      variant={variant}
    />
  )
}

export default Search
