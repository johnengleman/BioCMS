import { request } from 'graphql-request'
import { Saint } from '../types/types'

type Response = {
  saints: Saint[]
}

function getSaintsQuery(church, category, sort) {
  // Variables declaration
  let variablesList: string[] = []
  if (church !== 'all') {
    variablesList.push('$church: String!')
  }
  if (category !== 'all') {
    variablesList.push('$category: String!')
  }

  // Filter construction
  let filterList: string[] = []
  if (church !== 'all') {
    filterList.push('venerated_in: { _icontains: $church }')
  }
  if (category !== 'all') {
    filterList.push('categories: { _icontains: $category }')
  }

  // Building the query
  let baseQuery = `
    query getSaint${
      variablesList.length > 0
        ? `(${variablesList.join(', ')})`
        : ''
    } {
      saints(
        sort: "${sort}"
        filter: {
          ${filterList.join(', ')}
        }
      ) {
        id
        slug
        name
        summary
        biography
        categories
        birth_year
        death_year
        birth_location
        death_location
        books {
          title
        }
        sayings {
          text
        }
        images {
          directus_files_id {
            id
          }
        }
      }
    }
  `

  return baseQuery
}

function getPatronSaints(sort) {
  const query = `query getSaint {
        saints(
          sort: "${sort}"
           filter: {
           categories: { _icontains: "patron saints" }
        }
          ) {
            id
            slug
            name
            summary
            biography
            categories
            birth_year
            death_year
            birth_location
            death_location
            categories
            books {
              title
            }
            sayings {
              text
            }
            images {
              directus_files_id {
                id
              }
            }
          }
        }
      `
  return query
}

function get20thCenturySaints(sort) {
  const query = `query getSaint {
        saints(
          sort: "${sort}"
          ) {
            id
            slug
            name
            summary
            biography
            categories
            birth_year
            death_year
            birth_location
            death_location
            books {
              title
            }
            sayings {
              text
            }
            images {
              directus_files_id {
                id
              }
            }
          }
        }
      `
  return query
}

function SaintsByMonths(sort) {
  const query = `query getSaint {
        saints(
          sort: "${sort}"
          ) {
            id
            slug
            name
            summary
            biography
            categories
            birth_year
            death_year
            birth_location
            death_location
            books {
              title
            }
            sayings {
              text
            }
            images {
              directus_files_id {
                id
              }
            }
          }
        }
      `
  return query
}

const parseSort = (sort) => {
  if (sort === 'newest-asc') {
    return 'date_created'
  }
  if (sort === 'newest-desc') {
    return '-date_created'
  }
  if (sort === 'chronological-asc') {
    return 'death_year'
  }
  if (sort === 'chronological-desc') {
    return '-death_year'
  }
}

export const getSaints = async (
  church = 'all',
  category = 'all',
  saintPreset = 'none',
  sort = 'chronological-asc',
) => {
  console.log('preset', saintPreset)

  if (saintPreset === 'patron') {
    const { saints } = await request<Response>(
      `${process.env.NEXT_PUBLIC_DOMAIN}/graphql`,
      getPatronSaints(parseSort(sort)),
    )
    return saints
  } else if (saintPreset === '20th-century-saints') {
    const { saints } = await request<Response>(
      `${process.env.NEXT_PUBLIC_DOMAIN}/graphql`,
      get20thCenturySaints(parseSort(sort)),
    )
    return saints
  } else if (saintPreset === 'saints-by-months') {
    const { saints } = await request<Response>(
      `${process.env.NEXT_PUBLIC_DOMAIN}/graphql`,
      SaintsByMonths(parseSort(sort)),
    )
    return saints
  } else {
    const { saints } = await request<Response>(
      `${process.env.NEXT_PUBLIC_DOMAIN}/graphql`,
      getSaintsQuery(church, category, parseSort(sort)),
      {
        church,
        category,
      },
    )
    return saints
  }
}
