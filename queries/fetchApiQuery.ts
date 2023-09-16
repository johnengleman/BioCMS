export type APIResponse = any[]

type queries = [
  'getMostRecentlyCreatedBooks',
  'getMostRecentlyUpdatedSaints',
  `getRelatedSaints`,
  'getTopAuthors',
]

const fetchAPIQuery = async (
  query: queries[number],
  options?: Record<string, any>,
): Promise<APIResponse | null> => {
  const response = await fetch(
    `${process.env.API_URL}/api/${query}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(options || {}),
    },
  )

  if (!response.ok) {
    console.error(`HTTP error! Status: ${response.status}`)
    return []
  }

  const data = await response.json()
  return data
}

export { fetchAPIQuery }
