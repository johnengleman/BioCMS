import fetchHelper from './fetchHelper'

function getTeachingsQuery(
  church,
  filter,
  teachingPreset,
) {
  // Variables declaration
  let variablesList: string[] = []
  if (church !== 'all') {
    variablesList.push('$church: String!')
  }
  if (filter !== 'none') {
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

  if (filter !== 'none') {
    filterList.push(
      '{ time_period: { _icontains: $filter } }',
    )
  }
  // if (saintPreset === 'patron') {
  //   filterList.push(
  //     '{ categories: { _icontains: "Patron Saints" } }',
  //   )
  // }

  // Building the query
  let baseQuery = `
    query getTeachings${
      variablesList.length > 0
        ? `(${variablesList.join(', ')})`
        : ''
    } {
      teachings(
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
  filter = 'none',
  teachingPreset = 'none',
  // sort = 'date-asc',
}) => {
  const query = getTeachingsQuery(
    church,
    filter,
    teachingPreset,
  )
  const variables = { filter, church, teachingPreset }

  const response = await fetchHelper({ variables, query })

  return response?.data?.teachings
}
