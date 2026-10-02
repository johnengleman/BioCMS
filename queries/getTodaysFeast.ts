import fetchHelper from './fetchHelper'

export type FeastSaint = {
  name: string
  slug: string
  feast_day_catholic?: string | null
  feast_day_orthodox?: string | null
}

// Saints whose feast is yesterday, today or tomorrow (UTC). The
// browser then picks the one for its own local date (TodaysFeast), so
// the "Today" pill matches the visitor's calendar day.
export const getTodaysFeast = async (church: string) => {
  const now = Date.now()
  const days = [-1, 0, 1].map((offset) => {
    const d = new Date(now + offset * 86400000)
    return { month: d.getUTCMonth() + 1, day: d.getUTCDate() }
  })
  const calendars =
    church === 'orthodox'
      ? ['orthodox']
      : church === 'catholic'
        ? ['catholic']
        : ['catholic', 'orthodox']
  const conditions = calendars.flatMap((calendar) =>
    days.map(
      ({ month, day }) =>
        `{ feast_day_${calendar}_func: { month: { _eq: ${month} }, day: { _eq: ${day} } } }`,
    ),
  )
  const churchFilter =
    church === 'all'
      ? ''
      : `{ venerated_in: { _icontains: "${church}" } }`

  const query = `
    query getTodaysFeast {
      saints(
        limit: 12
        filter: { _and: [ { _or: [ ${conditions.join(', ')} ] } ${churchFilter} ] }
      ) {
        name
        slug
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
