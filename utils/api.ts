// Browser calls to the cached list API (app/api). They replace the old
// server actions, whose POST requests no cache can store.

type Args = Record<string, string | number | undefined>

const get = async (path: string, args: Args) => {
  const query = new URLSearchParams()
  Object.entries(args).forEach(([key, value]) => {
    if (value !== undefined && value !== '')
      query.set(key, String(value))
  })
  const response = await fetch(`${path}?${query}`)
  if (!response.ok) throw new Error(`Request failed: ${path}`)
  return response.json()
}

export const fetchSaints = (args: {
  church: string
  filter: string
  preset?: string
  sort?: string
  offset: number
  limit: number
}): Promise<any[]> => get('/api/saints', args)

export const fetchList = (
  kind: 'teachings' | 'miracles' | 'quotes' | 'prayers',
  args: {
    church: string
    filter: string
    offset: number
    limit: number
  },
): Promise<any[]> => get(`/api/list/${kind}`, args)

export const fetchRelated = (args: {
  slug: string
  categories: string
  church: string
}): Promise<any[]> => get('/api/related', args)

export const fetchBooks = (args: {
  church: string
  preset: string
  filter: string
}): Promise<any> => get('/api/books', args)
