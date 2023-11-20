import fetchHelper from './fetchHelper'
import { properties } from '../utils/properties'

const getFilterList = (filter) => {
  if (filter !== 'all') {
    return `{ time_period: { _icontains: "${filter}" } }`
  }
  return ''
}

function numberOfTeachingsQuery(church) {
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
    query getTeachings${
      variablesList.length > 0
        ? `(${variablesList.join(', ')})`
        : ''
    } {
      ${properties.teachings.filters.map(
        (filter) => `${filter}: teachings_aggregated(
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

const getNumberOfTeaching = async ({ church = 'all' }) => {
  const res = await fetchHelper({
    query: numberOfTeachingsQuery(church),
    variables: { church },
  })
  return res.data
}

export const getTeachingFilters = async (
  church: string = 'all',
) => {
  const filters = {
    [church]: {
      none: {
        ...(await getNumberOfTeaching({
          church,
        })),
      },
    },
  }
  return filters || null
}
