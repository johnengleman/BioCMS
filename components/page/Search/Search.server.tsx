import { getSearchData } from '../../../queries/getSearchData'
import { getChurch } from '../../../hooks/getChurch'
import SearchClient from './Search.client'

const Search = async ({ searchParams }) => {
  const church = await getChurch(searchParams)
  const searchData = await getSearchData(church)

  if (!searchData) {
    return null
  }

  return <SearchClient searchData={searchData} />
}

export default Search
