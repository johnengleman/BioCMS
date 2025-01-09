import fetchHelper from './fetchHelper'
import { getMonthNumber } from '../utils/dates'

interface SaintsResponse {
  data: {
    saints: any // Replace `any` with the actual type if known
  }
}

function getSaintsQuery(church, filter, saintPreset, sort) {
  // Variables declaration
  let variablesList: string[] = []
  variablesList.push('$limit: Int!')
  variablesList.push('$offset: Int!')

  if (church !== 'all') {
    variablesList.push('$church: String!')
  }
  if (filter !== 'all' && !getMonthNumber(filter)) {
    variablesList.push('$filter: String!')
  }

  // Filter construction
  let filterList: string[] = []
  let churchList: string[] = []

  if (church !== 'all') {
    churchList.push(
      '{ venerated_in: { _icontains: $church } }',
    )
  }

  if (filter !== 'all') {
    if (!getMonthNumber(filter)) {
      filterList.push(
        '{ categories: { _icontains: $filter } }',
      )
    } else if (church !== 'all') {
      filterList.push(
        `{ feast_day_${church}_func: { month: { _eq: "${getMonthNumber(
          filter,
        )}" } } }`,
      )
    }
  }

  if (saintPreset === 'patron_saints') {
    filterList.push(
      '{ categories: { _icontains: "Patron Saints" } }',
    )
  }

  if (saintPreset === '20th_century_saints') {
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
        limit: $limit
        offset: $offset
        sort: "${sort}"
        filter: {
             _or: [
             ${
               church === 'all' && getMonthNumber(filter)
                 ? `{ feast_day_orthodox_func: { month: { _eq: "${getMonthNumber(
                     filter,
                   )}" } } }, { feast_day_catholic_func: { month: { _eq: "${getMonthNumber(
                     filter,
                   )}" } } }`
                 : ''
             }
          ]
          _and: [
            ${churchList},
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
        feast_day_catholic
        feast_day_orthodox
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
  filter = 'all',
  saintPreset = 'none',
  sort = 'created-newest',
  offset = 0,
  limit = 10,
}) => {
  const query = getSaintsQuery(
    church,
    filter,
    saintPreset,
    parseSort(sort),
  )
  const variables = {
    filter,
    church,
    saintPreset,
    offset,
    limit,
  }

  const response: SaintsResponse = await fetchHelper({
    variables,
    query,
  })

  return response?.data?.saints
}
