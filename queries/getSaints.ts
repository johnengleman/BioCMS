import fetchHelper from './fetchHelper'
import { getMonthNumber } from '../utils/dates'

function getSaintsQuery(church, filter, saintPreset, sort) {
  // Variables declaration
  let variablesList: string[] = []
  if (church !== 'all') {
    variablesList.push('$church: String!')
  }
  if (filter !== 'none' && !getMonthNumber(filter)) {
    variablesList.push('$filter: String!')
  }

  // Filter construction
  let filterList: string[] = []
  let churchList: string[] = []

  if (church !== 'all') {
    churchList.push('venerated_in: { _icontains: $church }')
  }

  if (filter !== 'none') {
    if (!getMonthNumber(filter)) {
      filterList.push(
        '{ categories: { _icontains: $filter } }',
      )
    } else {
      filterList.push(
        `{ feast_day_func: { month: { _eq: ${getMonthNumber(
          filter,
        )} } } }`,
      )
    }
  }

  if (saintPreset === 'patron-saints') {
    filterList.push(
      '{ categories: { _icontains: "Patron Saints" } }',
    )
  }

  if (saintPreset === '20th-century-saints') {
    filterList.push('{ death_year: { _gte: 1900 } }')
  }

  // Building the query
  let baseQuery = `
    query getSaints${
      variablesList.length > 0
        ? `(${variablesList.join(', ')})`
        : ''
    } {
      saints(
        sort: "${sort}"
        filter: {
          ${churchList}
          _and: [
            ${filterList.join(', ')}
          ]
        }
      ) {
        id
        slug
        name
        summary
        categories
        birth_year
        death_year
        feast_day
        profile_image {
          id
        }
      }
    }
  `

  return baseQuery
}

const parseSort = (sort) => {
  if (sort === 'created-oldest') {
    return 'date_created'
  }
  if (sort === 'created-newest') {
    return '-date_created'
  }
  if (sort === 'died-oldest') {
    return 'death_year'
  }
  if (sort === 'died-newest') {
    return '-death_year'
  }
}

export const getSaints = async ({
  church = 'all',
  filter = 'none',
  saintPreset = 'none',
  sort = 'created-newest',
}) => {
  const query = getSaintsQuery(
    church,
    filter,
    saintPreset,
    parseSort(sort),
  )
  const variables = { filter, church, saintPreset }

  const response = await fetchHelper({ variables, query })

  return response?.data?.saints
}
