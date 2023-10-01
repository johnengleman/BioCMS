import { request } from 'graphql-request'

const saintFilters = [
  'None',
  'Ascetics',
  'Bishops',
  'Confessors',
  'Converts',
  'Fathers of the Church',
  'Fools for Christ',
  'Hermits',
  'Holy Women',
  'Married',
  'Martyrs',
  'Miracle Workers',
  'Missionaries',
  'Monastics',
  'Mothers',
  'Nuns',
  'Warriors',
]

const presets = ['all', 'patron', '20th-century-saints']

type Response = {
  saints_aggregated
}

function numberOfSaintsQuery(
  church,
  category,
  saintPreset,
) {
  // Variables declaration
  let variablesList: string[] = []
  if (church !== 'all') {
    variablesList.push('$church: String!')
  }
  if (category !== 'none') {
    variablesList.push('$category: String!')
  }

  // Filter construction
  let filterList: string[] = []
  let churchList: string[] = []

  if (church !== 'all') {
    churchList.push('venerated_in: { _icontains: $church }')
  }
  if (category !== 'none') {
    filterList.push(
      '{ categories: { _icontains: $category } }',
    )
  }
  if (saintPreset === 'patron') {
    filterList.push(
      '{ categories: { _icontains: "Patron Saints" } }',
    )
  }
  if (saintPreset === '20th-century-saints') {
    filterList.push('{ death_year: { _gte: 1900 } }')
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
      saints_aggregated(
        filter: {
          ${churchList}
          _and: [
            ${filterList.join(', ')}
          ]
        }
      ) {
        count {
          id
        }
      }
    }
  `
  return baseQuery
}

const getNumberOfSaints = async ({
  church = 'all',
  category = 'none',
  saintPreset = 'none',
}) => {
  const { saints_aggregated } = await request<Response>(
    `${process.env.NEXT_PUBLIC_DOMAIN}/graphql`,
    numberOfSaintsQuery(church, category, saintPreset),
    { category, church, saintPreset },
  )
  return saints_aggregated[0].count.id
}

export default async function handler(req, res) {
  try {
    const filters = {
      all: {
        none: await Promise.all(
          saintFilters.map(async (filter) => ({
            name: filter,
            count: await getNumberOfSaints({
              church: 'all',
              category: filter,
              saintPreset: 'all',
            }),
          })),
        ),
        patron: await Promise.all(
          saintFilters.map(async (filter) => ({
            name: filter,
            count: await getNumberOfSaints({
              church: 'all',
              category: filter,
              saintPreset: 'patron',
            }),
          })),
        ),
        '20th-century-saints': await Promise.all(
          saintFilters.map(async (filter) => ({
            name: filter,
            count: await getNumberOfSaints({
              church: 'all',
              category: filter,
              saintPreset: '20th-century-saints',
            }),
          })),
        ),
      },
      catholic: {
        none: await Promise.all(
          saintFilters.map(async (filter) => ({
            name: filter,
            count: await getNumberOfSaints({
              church: 'all',
              category: filter,
              saintPreset: 'all',
            }),
          })),
        ),
        patron: await Promise.all(
          saintFilters.map(async (filter) => ({
            name: filter,
            count: await getNumberOfSaints({
              church: 'all',
              category: filter,
              saintPreset: 'patron',
            }),
          })),
        ),
        '20th-century-saints': await Promise.all(
          saintFilters.map(async (filter) => ({
            name: filter,
            count: await getNumberOfSaints({
              church: 'all',
              category: filter,
              saintPreset: '20th-century-saints',
            }),
          })),
        ),
      },
      orthodox: {
        none: await Promise.all(
          saintFilters.map(async (filter) => ({
            name: filter,
            count: await getNumberOfSaints({
              church: 'all',
              category: filter,
              saintPreset: 'all',
            }),
          })),
        ),
        patron: await Promise.all(
          saintFilters.map(async (filter) => ({
            name: filter,
            count: await getNumberOfSaints({
              church: 'all',
              category: filter,
              saintPreset: 'patron',
            }),
          })),
        ),
        '20th-century-saints': await Promise.all(
          saintFilters.map(async (filter) => ({
            name: filter,
            count: await getNumberOfSaints({
              church: 'all',
              category: filter,
              saintPreset: '20th-century-saints',
            }),
          })),
        ),
      },
    }

    // res.setHeader(
    //   'Cache-Control',
    //   'public, max-age=86400, stale-while-revalidate=86400',
    // )
    res.status(200).json(filters || [])
  } catch (error) {
    res.status(500).json({ error: 'failed to load data' })
  }
}
