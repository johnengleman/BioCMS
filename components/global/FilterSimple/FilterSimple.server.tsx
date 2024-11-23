import { getChurch } from '../../../hooks/getChurch'
import { getQuotesFilters } from '../../../queries/getQuoteFilters'
import { getMiraclesFilters } from '../../../queries/getMiraclesFilters'
import { getTeachingFilters } from '../../../queries/getTeachingFilters'
import { getPrayersFilters } from '../../../queries/getPrayersFilters'
import FilterSimpleClient from './FilterSimple.client'

const FilterSimple = async ({
  sort,
  type,
  searchParams,
}) => {
  const church = await getChurch(searchParams)

  let filterFn

  if (type === 'quotes') {
    filterFn = () => getQuotesFilters(church)
  } else if (type === 'miracles') {
    filterFn = () => getMiraclesFilters(church)
  } else if (type === 'teachings') {
    filterFn = () => getTeachingFilters(church)
  } else if (type === 'prayers') {
    filterFn = () => getPrayersFilters(church)
  }

  const filtersCount = await filterFn()

  return (
    <FilterSimpleClient
      filtersCount={filtersCount}
      church={church}
      sort={sort}
      type={type}
    />
  )
}

export default FilterSimple
