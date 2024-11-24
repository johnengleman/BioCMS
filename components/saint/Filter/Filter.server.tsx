import FilterClient from './Filter.client'
import { getSaintFilters } from '../../../queries/getSaintFilters'
import { getChurch } from '../../../hooks/getChurch'

type SelectedPreset =
  | 'none'
  | '20th_century_saints'
  | 'patron_saints'

const Filter = async ({ searchParams }) => {
  const church = await getChurch(searchParams)
  const selectedPreset: SelectedPreset =
    (searchParams.preset as SelectedPreset) ?? 'none'

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
