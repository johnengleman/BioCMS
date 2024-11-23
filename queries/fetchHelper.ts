interface FetchHelperArgs {
  query: string
  variables?: Record<string, any>
}

interface GraphQLResponse<T> {
  data: T
  errors: { message: string }[]
}

const fetchHelper = async <T>({
  query,
  variables = {},
}): Promise<GraphQLResponse<T>> => {
  const response = await fetch(
    `${process.env.GRAPHQL_ENDPOINT}/graphql`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables,
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

export default fetchHelper
