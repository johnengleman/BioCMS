import { NextRequest } from 'next/server'
import { getBooksBundle } from '../../../queries/getBooksBundle'
import { properties } from '../../../utils/properties'
import {
  CACHE_HEADERS,
  parseChurch,
} from '../../../utils/listParams'

// The books page data: GET /api/books?church=&preset=&filter=
// preset is a genre, filter is a saint's name.
export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams
  const preset = params.get('preset') || 'none'
  const filter = (params.get('filter') || 'all').slice(0, 80)
  try {
    const bundle = await getBooksBundle({
      church: parseChurch(params.get('church')),
      preset: properties.books.presets.includes(preset)
        ? preset
        : 'none',
      filter,
    })
    return Response.json(bundle, { headers: CACHE_HEADERS })
  } catch {
    return Response.json(
      { error: 'Could not load books' },
      { status: 502, headers: { 'Cache-Control': 'no-store' } },
    )
  }
}
