import fetchHelper from './fetchHelper'
import { withParsedCategories } from '../utils/parseList'

interface SaintsResponse {
  data: {
    saints: any
  }
}

const MAX_CATEGORIES = 6
const POOL = 12

// Saints who share a category with this one. Directus does the
// matching ("monastics" and "Monastics" both match, _icontains).
export const getRelatedSaints = async ({
  categories,
  church,
  slug,
}: {
  categories: string[]
  church: string
  slug: string
}) => {
  const list = categories
    .map((category) => category.trim())
    .filter(Boolean)
    .slice(0, MAX_CATEGORIES)
  if (!list.length) return []

  const variables: Record<string, string> = { slug }
  const declarations = ['$slug: String!']
  const any = list.map((category, i) => {
    variables[`c${i}`] = category
    declarations.push(`$c${i}: String!`)
    return `{ categories: { _icontains: $c${i} } }`
  })
  const conditions = ['{ slug: { _neq: $slug } }', `{ _or: [${any.join(', ')}] }`]
  if (church !== 'all') {
    variables.church = church
    declarations.push('$church: String!')
    conditions.push('{ venerated_in: { _icontains: $church } }')
  }

  const query = `
    query getRelatedSaints(${declarations.join(', ')}) {
      saints(
        limit: ${POOL}
        filter: { _and: [${conditions.join(', ')}] }
      ) {
        id
        slug
        name
        summary
        categories
        venerated_in
        birth_year
        death_year
        birth_location
        death_location
        feast_day_catholic
        feast_day_orthodox
        profile_image {
          id
          metadata
        }
      }
    }
  `

  const response: SaintsResponse = await fetchHelper({
    query,
    variables,
  })
  return (response?.data?.saints || []).map(withParsedCategories)
}
