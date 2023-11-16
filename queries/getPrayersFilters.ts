import fetchHelper from './fetchHelper'
import { properties } from '../components/global/FilterSimple/properties'

const getFilterList = (filter) =>
  `{ topics: { _icontains: "${filter}" } }`

function numberOfPrayersQuery(church) {
  // Variables declaration
  let variablesList: string[] = []
  if (church !== 'all') {
    variablesList.push('$church: String!')
  }

  // Filter construction
  let churchList: string[] = []

  if (church !== 'all') {
    churchList.push(
      '{ saint: { venerated_in: { _icontains: $church }}}',
    )
  }

  // Building the query
  let baseQuery = `
    query getPrayers${
      variablesList.length > 0
        ? `(${variablesList.join(', ')})`
        : ''
    } {
      ${properties.filters.prayers.map(
        (filter) => `${filter}: prayers_aggregated(
        filter: {
          _and: [
            ${getFilterList(filter)}
            ${churchList}
          ]
        }
      ) {
        count {
          id
        }
      }`,
      )}
    }
  `
  return baseQuery
}

const getNumberOfPrayers = async ({ church = 'all' }) => {
  const res = await fetchHelper({
    query: numberOfPrayersQuery(church),
    variables: { church },
  })
  return res.data
}

export const getPrayersFilters = async (
  church: string = 'all',
) => {
  const filters = {
    [church]: {
      none: {
        ...(await getNumberOfPrayers({
          church,
        })),
      },
    },
  }
  return filters || null
}
