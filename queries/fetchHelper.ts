import { unstable_cache } from 'next/cache'

interface GraphQLResponse<T> {
  data: T
  errors: { message: string }[]
}

// How long a Directus answer is reused, in seconds. Content changes
// only when the owner publishes, and a publish clears the cache at once
// (POST /api/revalidate). This number only bounds a missed webhook.
export const DATA_REVALIDATE = 60
export const DATA_TAG = 'directus'

const request = async (query: string, variables: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT}/graphql`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables: JSON.parse(variables),
      }),
    },
  )

  if (!response.ok) {
    throw new Error(
      'Network response was not ok ' + response.statusText,
    )
  }

  return await response.json()
}

// Shared by every page and API route. On Cloudflare it is stored in
// KV, so a Directus (Railway) request is made once a minute per query
// instead of once per visitor. A failed request throws, so errors are
// never cached.
const cachedRequest = unstable_cache(request, ['directus-graphql'], {
  revalidate: DATA_REVALIDATE,
  tags: [DATA_TAG],
})

const fetchHelper = async <T>({
  query,
  variables = {},
}: {
  query: string
  variables?: Record<string, any>
}): Promise<GraphQLResponse<T>> =>
  cachedRequest(query, JSON.stringify(variables))

export default fetchHelper
