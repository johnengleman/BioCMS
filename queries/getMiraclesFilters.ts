import fetchHelper from './fetchHelper'
import { properties } from '../components/global/FilterSimple/properties'

const getFilterList = (filter) =>
  `{ time_period: { _icontains: "${filter}" } }`

function numberOfMiraclesQuery(church) {
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
    query getMiracles${
      variablesList.length > 0
        ? `(${variablesList.join(', ')})`
        : ''
    } {
      ${properties.filters.map(
        (filter) => `${filter}: miracles_aggregated(
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

const getNumberOfMiracles = async ({ church = 'all' }) => {
  const res = await fetchHelper({
    query: numberOfMiraclesQuery(church),
    variables: { church },
  })
  return res.data
}

export const getMiraclesFilters = async (
  church: string = 'all',
) => {
  const filters = {
    [church]: {
      none: {
        ...(await getNumberOfMiracles({
          church,
        })),
      },
    },
  }
  return filters || null
}
