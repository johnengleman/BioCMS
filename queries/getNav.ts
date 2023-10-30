import fetchHelper from './fetchHelper'

function getNavQuery(church) {
  // Variables declaration
  let variablesList: string[] = []
  if (church !== 'all') {
    variablesList.push('$church: String!')
  }

  // Filter construction
  let churchList: string[] = []
  if (church !== 'all') {
    churchList.push('venerated_in: { _icontains: $church }')
  }

  // Building the query
  let baseQuery = `
   query getNav${
     variablesList.length > 0
       ? `(${variablesList.join(', ')})`
       : ''
   }  {
      saints_aggregated(
        filter: {
          ${churchList}
        }
      ) {
        count {
          id
        }
      }
      teachings_aggregated(
        filter: {
          ${churchList}
        }
      ) {
        count {
          id
        }
      }
      miracles_aggregated(
        filter: {
          ${churchList}
        }
      ) {
        count {
          id
        }
      }
       books_aggregated(
        filter: {
          ${churchList}
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

export const getNav = async ({ church = 'all' }) => {
  const query = getNavQuery(church)
  const variables = { church }
  const response = await fetchHelper({ variables, query })

  return response?.data
}
