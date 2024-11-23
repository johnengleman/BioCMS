import fetchHelper from './fetchHelper'

type Saint = {
  id: string
  slug: string
  name: string
  categories: string[]
  birth_year: number
  death_year: number
  profile_image: { id: string } | null
}

type SaintsResponse = {
  saints: Saint[]
}

function getSaintsQuery(church: string | null): string {
  // Declare variables for the GraphQL query
  const variablesList: string[] = []
  const churchFilterConditions: string[] = []

  // Add variables and filter conditions based on the church parameter
  if (church && church !== 'all') {
    variablesList.push('$church: String!')
    churchFilterConditions.push(
      'venerated_in: { _icontains: $church }',
    )
  }

  // Construct the GraphQL query string
  let baseQuery = `
    query getSaint${
      variablesList.length > 0
        ? `(${variablesList.join(', ')})`
        : ''
    } {
      saints(
        filter: {
          ${churchFilterConditions.join('\n')}
        }
      ) {
        id
        slug
        name
        categories
        birth_year
        death_year
        profile_image {
          id
        }
      }
    }
  `
  return baseQuery
}

// Function to fetch the saints data
export const getSearchData = async (
  church: string = 'all',
): Promise<Saint[] | null> => {
  try {
    const response = await fetchHelper<SaintsResponse>({
      query: getSaintsQuery(church),
      variables: church !== 'all' ? { church } : {},
    })
    return response?.data?.saints || null
  } catch (error) {
    console.error('Error fetching saint data: ', error)
    return null
  }
}
