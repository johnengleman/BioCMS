import { NextRequest } from 'next/server'
import { getSaints } from '../../../queries/getSaints'
import {
  CACHE_HEADERS,
  parseSaintQuery,
} from '../../../utils/listParams'

// A page of saints for the list: GET /api/saints?church=&filter=
// &preset=&sort=&offset=&limit=
export async function GET(request: NextRequest) {
  const query = parseSaintQuery(request.nextUrl.searchParams)
  try {
    const saints = (await getSaints(query)) || []
    return Response.json(saints, { headers: CACHE_HEADERS })
  } catch {
    return Response.json(
      { error: 'Could not load saints' },
      { status: 502, headers: { 'Cache-Control': 'no-store' } },
    )
  }
}
