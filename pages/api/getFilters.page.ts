import { request } from 'graphql-request'
import { properties } from '../../properties'

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

export default async function handler(req, res) {
  const church = req.query.church || 'all'

  try {
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

    res.setHeader(
      'Cache-Control',
      'public, max-age=86400, stale-while-revalidate=86400',
    )
    res.status(200).json(filters || [])
  } catch (error) {
    res.status(500).json({ error: 'failed to load data' })
  }
}
