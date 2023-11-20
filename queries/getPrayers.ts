import fetchHelper from './fetchHelper'

function getPrayersQuery(church, filter) {
  // Variables declaration
  let variablesList: string[] = []
  if (church !== 'all') {
    variablesList.push('$church: String!')
  }
  if (filter !== 'all') {
    variablesList.push('$filter: String!')
  }

  // Filter construction
  let filterList: string[] = []
  let churchList: string[] = []
  if (church !== 'all') {
    churchList.push(
      '{ saint: { venerated_in: { _icontains: $church }}}',
    )
  }

  if (filter !== 'all') {
    filterList.push('{ topics: { _icontains: $filter } }')
  }

  // Building the query
  let baseQuery = `
    query getPrayers${
      variablesList.length > 0
        ? `(${variablesList.join(', ')})`
        : ''
    } {
      prayers(
        filter: {
          _and: [
            ${filterList.join(', ')}
            ${churchList}
          ]
        }
      ) {
       prayers
       prayer_slug
       saint {
        name
        slug
        categories
        summary
        birth_year
        death_year
        profile_image {
            id
          }
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

export const getPrayers = async ({
  church = 'all',
  filter = 'all',
  // sort = 'date-asc',
}) => {
  const query = getPrayersQuery(church, filter)
  const variables = { filter, church }

  const response = await fetchHelper({ variables, query })

  return response?.data?.prayers
}
