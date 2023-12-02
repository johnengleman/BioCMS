import fetchHelper from './fetchHelper'

function getQuotesQuery({ church, filter }) {
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
    query getQuotes${
      variablesList.length > 0
        ? `(${variablesList.join(', ')})`
        : ''
    } {
      quotes(
        filter: {
          _and: [
            ${filterList.join(', ')}
            ${churchList}
          ]
        }
      ) {
       text
       topics
       saint {
         name
         birth_year
         death_year
         profile_image {
          id
          description
           }
         }
       }
    }
  `
  return baseQuery
}

export const getQuotes = async ({
  church = 'all',
  filter = 'all',
}) => {
  const query = getQuotesQuery({ church, filter })

  const res = await fetchHelper({
    query,
    variables: { church, filter },
  })
  return res.data.quotes
}
