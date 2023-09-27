import { request } from 'graphql-request'
import { Saint } from '../types/types'

type Response = {
  saints: Saint[]
}

function getSaintsQuery(church, category, saintPreset, sort) {
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
  let churchList: string[] = []
  if (church !== 'all') {
    churchList.push('venerated_in: { _icontains: $church }')
  }
  if (category !== 'all') {
    filterList.push('{ categories: { _icontains: $category } }')
  }
  if(saintPreset === 'patron') {
    filterList.push('{ categories: { _icontains: "Patron Saints" } }')
  }
  if(saintPreset === '20th-century-saints') {
    filterList.push('{ death_year: { _gte: 1900 } }')
  }
  // if(saintPreset === 'saints-by-months') {
  //   filterList.push('{ death_year: { _gte: 1900 } }')
  // }

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

  const { saints } = await request<Response>(
    `${process.env.NEXT_PUBLIC_DOMAIN}/graphql`,
    getSaintsQuery(church, category, saintPreset, parseSort(sort)),
    {
      church,
      category,
    },
  )
  return saints
}
