import { request, gql } from 'graphql-request'

type Saying = {
  id: string
  text: string
  topics: JSON
  author: {
    name: string
  }
  source: string
}

type Response = {
  sayings: Saying[]
}

const query = gql`
  query {
    sayings {
      id
      text
      author {
        name
      }
    }
  }
`

export const getSayings = async () => {
  const { sayings } = await request<Response>(
    `${process.env.NEXT_PUBLIC_DOMAIN}/graphql`,
    query,
  )
  return sayings
}
