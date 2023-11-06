import fetchHelper from './fetchHelper'

function getSaintsQuery(
  church,
  category,
  saintPreset,
  sort,
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
  if (saintPreset === 'patron-saints') {
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
  category = 'none',
  saintPreset = 'none',
  sort = 'created-newest',
}) => {
  const query = getSaintsQuery(
    church,
    category,
    saintPreset,
    parseSort(sort),
  )
  const variables = { category, church, saintPreset }

  const response = await fetchHelper({ variables, query })

  return response?.data?.saints
}
