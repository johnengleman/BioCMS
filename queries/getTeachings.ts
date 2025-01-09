import fetchHelper from './fetchHelper'

interface TeachingsResponse {
  data: {
    teachings: any // Replace `any` with the actual type if known
  }
}

function getTeachingsQuery(church, filter) {
  // Variables declaration
  let variablesList: string[] = []
  variablesList.push('$limit: Int!')
  variablesList.push('$offset: Int!')

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
    filterList.push(
      '{ time_period: { _icontains: $filter } }',
    )
  }

  // Building the query
  let baseQuery = `
    query getTeachings${
      variablesList.length > 0
        ? `(${variablesList.join(', ')})`
        : ''
    } {
      teachings(
       limit: $limit
        offset: $offset
        filter: {
          _and: [
            ${filterList.join(', ')}
            ${churchList}
          ]
        }
      ) {
       teachings
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

export const getTeachings = async ({
  church = 'all',
  filter = 'all',
  // sort = 'date-asc',
  offset = 0,
  limit = 10,
}) => {
  const query = getTeachingsQuery(church, filter)
  const variables = { filter, church, offset, limit }

  const response: TeachingsResponse = await fetchHelper({
    variables,
    query,
  })

  return response?.data?.teachings
}
