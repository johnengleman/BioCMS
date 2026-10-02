import { getSearchData } from '../../../queries/getSearchData'

// Every saint the header search needs, for all traditions. The browser
// filters by tradition. Built ahead of time and refreshed every five
// minutes.
export const revalidate = 300

export async function GET() {
  const saints = await getSearchData()
  return Response.json(saints || [], {
    headers: {
      'Cache-Control':
        'public, max-age=60, s-maxage=300, stale-while-revalidate=3600',
    },
  })
}
