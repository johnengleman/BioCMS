import fetchHelper from './fetchHelper'
import { withParsedCategories } from '../utils/parseList'

type Saint = {
  id: string
  slug: string
  name: string
  categories: string[]
  venerated_in: string
  birth_year: number
  death_year: number
  profile_image: { id: string } | null
}

type SaintsResponse = {
  saints: Saint[]
}

// Directus returns 100 rows unless told otherwise; -1 means all.
const query = `
  query getSearchData {
    saints(limit: -1) {
      id
      slug
      name
      categories
      venerated_in
      birth_year
      death_year
      profile_image {
        id
      }
    }
  }
`

// Every saint, for the header search. The browser filters by tradition.
export const getSearchData = async (): Promise<Saint[] | null> => {
  try {
    const response = await fetchHelper<SaintsResponse>({ query })
    return response?.data?.saints?.map(withParsedCategories) || null
  } catch (error) {
    console.error('Error fetching saint data: ', error)
    return null
  }
}
