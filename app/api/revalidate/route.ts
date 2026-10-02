import { NextRequest } from 'next/server'
import { revalidatePath } from 'next/cache'

// Called by a Directus flow when content is published, so the site
// refreshes within seconds instead of waiting for the five-minute timer.
//
//   POST /api/revalidate          (header: x-revalidate-secret)
//   body (optional): { "paths": ["/saints/francis-of-assisi"] }
//
// Without a body, every page is refreshed. Set REVALIDATE_SECRET in the
// host's environment; without it this route is switched off.

// Compares in constant time, so the secret cannot be guessed by timing.
const same = (a: string, b: string) => {
  if (a.length !== b.length) return false
  let diff = 0
  for (let i = 0; i < a.length; i++)
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i)
  return diff === 0
}

export async function POST(request: NextRequest) {
  const secret = process.env.REVALIDATE_SECRET
  if (!secret)
    return Response.json({ error: 'Not enabled' }, { status: 503 })

  const sent = request.headers.get('x-revalidate-secret') || ''
  if (!same(sent, secret))
    return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json().catch(() => ({}))
  const paths: string[] = Array.isArray(body?.paths)
    ? body.paths
        .filter(
          (path: unknown): path is string =>
            typeof path === 'string' && path.startsWith('/'),
        )
        .slice(0, 50)
    : []

  if (paths.length) {
    paths.forEach((path) => revalidatePath(path))
  } else {
    revalidatePath('/', 'layout')
  }
  // The cached JSON files are separate routes.
  revalidatePath('/api/search-index')

  return Response.json({ revalidated: paths.length ? paths : 'all' })
}
