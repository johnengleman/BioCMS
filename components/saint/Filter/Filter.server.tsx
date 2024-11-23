import FilterClient from './Filter.client'
import { getSaintFilters } from '../../../queries/getSaintFilters'
import { getChurch } from '../../../hooks/getChurch'

const Filter = async ({ searchParams }) => {
  const church = await getChurch(searchParams)
  const selectedPreset = searchParams.preset || ''

  const filtersCount = await getSaintFilters({ church })

  return (
    <FilterClient
      filtersCount={filtersCount}
      selectedPreset={selectedPreset}
      church={church}
    />
  )
}

export default Filter
