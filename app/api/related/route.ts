import { NextRequest } from 'next/server'
import { getRelatedSaints } from '../../../queries/getRelatedSaints'
import {
  CACHE_HEADERS,
  parseChurch,
} from '../../../utils/listParams'

// A pool of saints that share a category with one saint:
// GET /api/related?slug=&categories=a,b&church=
export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams
  const slug = params.get('slug') || ''
  const categories = (params.get('categories') || '')
    .split(',')
    .map((category) => category.trim())
    .filter((category) => /^[\w &'’-]{1,60}$/.test(category))

  if (!/^[a-z0-9-]{1,120}$/i.test(slug))
    return Response.json([], { headers: CACHE_HEADERS })

  try {
    const saints = await getRelatedSaints({
      slug,
      categories,
      church: parseChurch(params.get('church')),
    })
    return Response.json(saints, { headers: CACHE_HEADERS })
  } catch {
    return Response.json(
      { error: 'Could not load related saints' },
      { status: 502, headers: { 'Cache-Control': 'no-store' } },
    )
  }
}
