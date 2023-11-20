import fetchHelper from './fetchHelper'
import { properties } from '../utils/properties'

const getFilterList = (filter) => {
  if (filter !== 'all') {
    return `{ topics: { _icontains: "${filter}" } }`
  }
  return ''
}

function numberOfQuotesQuery(church) {
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
    query getQuotes${
      variablesList.length > 0
        ? `(${variablesList.join(', ')})`
        : ''
    } {
      ${properties.quotes.filters.map(
        (filter) => `${filter}: quotes_aggregated(
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

const getNumberOfQuotes = async ({ church = 'all' }) => {
  const res = await fetchHelper({
    query: numberOfQuotesQuery(church),
    variables: { church },
  })
  return res.data
}

export const getQuotesFilters = async (
  church: string = 'all',
) => {
  const filters = {
    [church]: {
      none: {
        ...(await getNumberOfQuotes({
          church,
        })),
      },
    },
  }
  return filters || null
}
