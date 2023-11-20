import fetchHelper from './fetchHelper'
import { properties } from '../utils/properties'

const getFilterList = (filter) => {
  if (filter !== 'all') {
    return `{ topics: { _icontains: "${filter}" } }`
  }
  return ''
}

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
      ${properties.prayers.filters.map(
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
