import fetchHelper from './fetchHelper'

function getTeachingsQuery(
  church,
  category,
  teachingPreset,
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
      '{ time_period: { _icontains: $category } }',
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
          ${churchList}
          _and: [
            ${filterList.join(', ')}
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
        images {
            directus_files_id {
              id
            }
          }
        }
      }
    }
  `

  return baseQuery
}

const parseSort = (sort) => {
  if (sort === 'created-asc') {
    return 'date_created'
  }
  if (sort === 'created-desc') {
    return '-date_created'
  }
  if (sort === 'died-asc') {
    return 'death_year'
  }
  if (sort === 'died-desc') {
    return '-death_year'
  }
}
export const getTeachings = async ({
  church = 'all',
  category = 'none',
  teachingPreset = 'none',
  // sort = 'date-asc',
}) => {
  const query = getTeachingsQuery(
    church,
    category,
    teachingPreset,
  )
  const variables = { category, church, teachingPreset }

  const response = await fetchHelper({ variables, query })

  return response?.data?.teachings
}
