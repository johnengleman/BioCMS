const fetchHelper = async ({ query, variables = {} }) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT}/graphql`,
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
