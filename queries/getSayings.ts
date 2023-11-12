import { gql } from 'graphql-request'
import fetchHelper from './fetchHelper'

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
  const res = await fetchHelper({ query })
  return res.data
}
