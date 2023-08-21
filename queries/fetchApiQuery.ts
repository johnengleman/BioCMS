interface IAPIResponse {
  [key: string]: any
}

type queries = [
  'getMostRecentlyCreatedBooks',
  'getMostRecentlyUpdatedSaints',
  `getRelatedSaints/?slug=${string}`,
  'getTopAuthors',
]

const createQueryParams = (options) => {
  let queryParams = ''

  if (options) {
    queryParams = '?'
    for (const [key, value] of Object.entries(options)) {
      queryParams += `${key}=${value}&`
    }
    queryParams = queryParams.slice(0, -1)
  }

  return queryParams
}

const fetchAPIQuery = async (
  query: queries[number],
  options?: Record<string, any>,
): Promise<IAPIResponse | null> => {
  try {
    const response = await fetch(
      `${
        process.env.API_URL
      }/api/${query}${createQueryParams(options)}`,
    )

    if (!response.ok) {
      throw new Error(
        `HTTP error! Status: ${response.status}`,
      )
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error during API request:', error)
    return null
  }
}

export { fetchAPIQuery }
