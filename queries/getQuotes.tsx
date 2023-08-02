import { request, gql } from 'graphql-request'

type Quote = {
  id: string
  text: string
  topics: JSON
  author: {
    name: string
  }
  source: string
}

type Response = {
  quotes: Quote[]
}

const query = gql`
  query {
    quotes {
      id
      text
      topics
      author {
        name
      }
      source
    }
  }
`

export const getQuotes = async () => {
  const { quotes } = await request<Response>(
    'https://saints-cms.onrender.com/graphql',
    query,
  )
  return quotes
}
