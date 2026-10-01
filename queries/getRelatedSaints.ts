import fetchHelper from './fetchHelper'
import { withParsedCategories } from '../utils/parseList'
interface Image {
  directus_files_id: {
    id: number
  }
}

interface SaintsResponse {
  data: {
    saints: any // Replace `any` with the actual type if known
  }
}

interface Saint {
  id: number
  slug: string
  name: string
  birth_year?: number
  death_year?: number
  categories: string[]
  image: Image
}

function getSaintsQuery(church) {
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
    query getSaints${
      variablesList.length > 0
        ? `(${variablesList.join(', ')})`
        : ''
    } {
      saints(
        filter: {
          ${churchList}
        }
      ) {
        id
        slug
        name
        birth_year
        death_year
        categories
        summary
        profile_image {
          id
        }
      }
    }
  `

  return baseQuery
}

export const getSaints = async (church) => {
  const query = getSaintsQuery(church)
  const res: SaintsResponse = await fetchHelper({
    query,
    variables: { church },
  })

  return res.data.saints.map(withParsedCategories)
}

export const getRelatedSaints = async ({
  categories,
  church,
  slug,
}) => {
  // Category values are not consistently cased in Directus ("monastics" vs "Monastics").
  const cats = categories.split(',').map((category) => category.toLowerCase())
  const allSaints = await getSaints(church)

  const relatedSaints = allSaints.filter((saint) =>
    saint.categories.some((category) =>
      cats.includes(category.toLowerCase()),
    ),
  )

  const filteredRelatedSaints = relatedSaints
    .filter((saint) => saint.slug !== slug)
    .sort(() => Math.random() - 0.5)
    .slice(0, 4)

  return filteredRelatedSaints
}
