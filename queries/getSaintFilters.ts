import fetchHelper from './fetchHelper'
import { properties } from '../components/saint/Filter/properties'
import { getMonthNumber } from '../utils/dates'

const getCategoryFilterList = (filter) => {
  if (filter !== 'None') {
    return `, { categories: { _icontains: "${filter}" } }`
  }
  return ''
}

const getMonthFilterList = (filter) => {
  if (filter !== 'None') {
    return `, { feast_day_func: { month: { _eq: "${getMonthNumber(
      filter,
    )}" } } }`
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
    churchList.push('venerated_in: { _icontains: $church }')
  }

  if (saintPreset === 'patron-saints') {
    presetList.push(
      '{ categories: { _icontains: "Patron Saints" } }',
    )
  }

  if (saintPreset === '20th-century-saints') {
    presetList.push('{ death_year: { _gte: 1900 } }')
  }

  // Building the query
  let baseQuery = `
    query getSaints${
      variablesList.length > 0
        ? `(${variablesList.join(', ')})`
        : ''
    } {
      ${properties.organize.category.map(
        (filter) => `${filter}: saints_aggregated(
        filter: {
          ${churchList}
          _and: [
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
      ${properties.organize.month.map(
        (filter) => `${filter}: saints_aggregated(
        filter: {
          ${churchList}
          _and: [
            ${presetList.join(', ')}${getMonthFilterList(
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

export const getSaintFilters = async (
  church: string = 'all',
) => {
  const filters = {
    [church]: {
      none: {
        ...(await getNumberOfSaints({
          church,
          saintPreset: 'all',
        })),
      },
      '20th-century-saints': {
        ...(await getNumberOfSaints({
          church,
          saintPreset: '20th-century-saints',
        })),
      },
      'patron-saints': {
        ...(await getNumberOfSaints({
          church,
          saintPreset: 'patron-saints',
        })),
      },
    },
  }
  return filters || null
}
