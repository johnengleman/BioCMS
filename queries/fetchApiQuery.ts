import axios from 'axios'

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
  try {
    const response = await axios.post(
      `${process.env.API_URL}/api/${query}`,
      options,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )

    return response.data
  } catch (error) {
    return []
  }
}

export { fetchAPIQuery }
