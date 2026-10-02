import fetchHelper from './fetchHelper'
import { withParsedCategories } from '../utils/parseList'

// Card fields too, so the saints list can show these saints directly.
export type FeastSaint = {
  [key: string]: any
  categories?: any
  name: string
  slug: string
  venerated_in?: string | null
  profile_image?: { id: string; metadata?: any } | null
  feast_day_catholic?: string | null
  feast_day_orthodox?: string | null
}

// Saints of either tradition whose feast is yesterday, today or
// tomorrow (UTC). The browser then picks the ones for its own local
// date and tradition (the "Feast today" filter), so it matches the
// visitor's calendar day.
export const getTodaysFeast = async () => {
  const now = Date.now()
  const days = [-1, 0, 1].map((offset) => {
    const d = new Date(now + offset * 86400000)
    return { month: d.getUTCMonth() + 1, day: d.getUTCDate() }
  })
  const conditions = ['catholic', 'orthodox'].flatMap((calendar) =>
    days.map(
      ({ month, day }) =>
        `{ feast_day_${calendar}_func: { month: { _eq: ${month} }, day: { _eq: ${day} } } }`,
    ),
  )
  const query = `
    query getTodaysFeast {
      saints(
        limit: 100
        filter: { _or: [ ${conditions.join(', ')} ] }
      ) {
        id
        name
        slug
        summary
        categories
        venerated_in
        birth_year
        death_year
        birth_location
        death_location
        profile_image {
          id
          width
          height
          metadata
        }
        feast_day_catholic
        feast_day_orthodox
      }
    }
  `
  try {
    const response = await fetchHelper<{ saints: FeastSaint[] }>({
      query,
    })
    return (response?.data?.saints || []).map(
      withParsedCategories,
    ) as FeastSaint[]
  } catch {
    return []
  }
}
