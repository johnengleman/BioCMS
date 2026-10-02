import { NextRequest } from 'next/server'
import { loadList } from '../../../../queries/loadList'
import {
  CACHE_HEADERS,
  LIST_KINDS,
  parseListQuery,
  type ListKind,
} from '../../../../utils/listParams'

// A page of teachings, miracles, quotes or prayers:
// GET /api/list/<kind>?church=&filter=&offset=&limit=
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ kind: string }> },
) {
  const { kind } = await context.params
  if (!LIST_KINDS.includes(kind as ListKind))
    return Response.json({ error: 'Not found' }, { status: 404 })

  const query = parseListQuery(
    kind as ListKind,
    request.nextUrl.searchParams,
  )
  try {
    return Response.json(await loadList(kind as ListKind, query), {
      headers: CACHE_HEADERS,
    })
  } catch {
    return Response.json(
      { error: 'Could not load the list' },
      { status: 502, headers: { 'Cache-Control': 'no-store' } },
    )
  }
}
