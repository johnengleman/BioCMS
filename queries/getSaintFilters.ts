import fetchHelper from './fetchHelper'
import { properties } from '../utils/properties'
import { getMonthNumber } from '../utils/dates'

const getCategoryFilterList = (filter) => {
  if (filter !== 'all') {
    return `{ categories: { _icontains: "${filter}" } }`
  }
  return ''
}

function numberOfSaintsQuery(church, saintPreset) {
  // Variables declaration
  let variablesList: string[] = []
  if (church !== 'all') {
    variablesList.push('$church: String!')
  }

  // Filter construction
  let presetList: string[] = []
  let churchList: string[] = []

  if (church !== 'all') {
    churchList.push(
      '{ venerated_in: { _icontains: $church } }',
    )
  }

  if (saintPreset === 'patron_saints') {
    presetList.push(
      '{ categories: { _icontains: "Patron Saints" } }',
    )
  }

  if (saintPreset === '20th_century_saints') {
    presetList.push('{ death_year: { _gte: 1900 } }')
  }

  // Building the query
  let baseQuery = `
    query getSaints${
      variablesList.length > 0
        ? `(${variablesList.join(', ')})`
        : ''
    } {
      all_${saintPreset}: saints_aggregated(
        filter: {
          _and: [
            ${churchList}
            ${presetList.join(', ')}
          ]
        }
      ) {
        count {
          id
        }
      }
      ${properties.saints.filters.category.map(
        (filter) => `${filter}: saints_aggregated(
        filter: {
          _and: [
            ${churchList}
            ${presetList.join(', ')}${getCategoryFilterList(
          filter,
        )}
          ]
        }
      ) {
        count {
          id
        }
      }`,
      )}
      ${properties.saints.filters.month.map(
        (filter) => `${filter}: saints_aggregated(
        filter: {
          _or: [
             ${
               church === 'all'
                 ? `{ feast_day_orthodox_func: { month: { _eq: "${getMonthNumber(
                     filter,
                   )}" } } }`
                 : ''
             }
            ${`{ feast_day_${
              church !== 'all' ? church : 'catholic'
            }_func: { month: { _eq: "${getMonthNumber(
              filter,
            )}" } } }`}
          ]
          _and: [
            ${churchList},
            ${presetList.join(', ')}
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

const getNumberOfSaints = async ({
  church = 'all',
  saintPreset = 'none',
}) => {
  const res = await fetchHelper({
    query: numberOfSaintsQuery(church, saintPreset),
    variables: { church, saintPreset },
  })

  return res.data
}

export const getSaintFilters = async ({
  church = 'all',
}: {
  church?: string
}) => {
  const filters = {
    [church]: {
      none: await getNumberOfSaints({
        church,
        saintPreset: 'all',
      }),
      '20th_century_saints': await getNumberOfSaints({
        church,
        saintPreset: '20th_century_saints',
      }),
      patron_saints: await getNumberOfSaints({
        church,
        saintPreset: 'patron_saints',
      }),
    },
  }
  return filters || null
}
