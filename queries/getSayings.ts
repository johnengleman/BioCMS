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
  quotes: Saying[]
}

const query = gql`
  query {
    quotes {
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
