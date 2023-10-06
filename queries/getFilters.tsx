import { request } from 'graphql-request'
import { properties } from '../properties'

export const config = {
  runtime: 'edge',
}

const getFilterList = (filter) =>
  `{ categories: { _icontains: "${filter}" } }`

type Response = {
  saints_aggregated
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

  if (saintPreset === 'patron') {
    presetList.push(
      '{ categories: { _icontains: "Patron Saints" } }',
    )
  }

  if (saintPreset === '20th-century-saints') {
    presetList.push('{ death_year: { _gte: 1900 } }')
  }
  // if(saintPreset === 'saints-by-months') {
  //   filterList.push('{ death_year: { _gte: 1900 } }')
  // }

  // Building the query
  let baseQuery = `
    query getSaints${
      variablesList.length > 0
        ? `(${variablesList.join(', ')})`
        : ''
    } {
      ${properties.filters.map(
        (filter) => `${filter}: saints_aggregated(
        filter: {
          ${churchList}
          _and: [
            ${presetList.join(', ')},${getFilterList(
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
  const data = await request<Response>(
    `${process.env.NEXT_PUBLIC_DOMAIN}/graphql`,
    numberOfSaintsQuery(church, saintPreset),
    { church, saintPreset },
  )
  return data
}

export const getFilters = async (
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
    },
  }
  return filters
}
