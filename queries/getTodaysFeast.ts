import fetchHelper from './fetchHelper'

export type FeastSaint = {
  name: string
  slug: string
  venerated_in?: string | null
  profile_image?: { id: string; metadata?: any } | null
  feast_day_catholic?: string | null
  feast_day_orthodox?: string | null
}

// Saints of either tradition whose feast is yesterday, today or
// tomorrow (UTC). The browser then picks the one for its own local
// date and tradition (TodaysFeast), so the "Today" pill matches the
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
        name
        slug
        venerated_in
        profile_image {
          id
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
    return response?.data?.saints || []
  } catch {
    return []
  }
}
