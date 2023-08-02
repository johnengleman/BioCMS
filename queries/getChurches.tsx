import { request, gql } from 'graphql-request'

type Church = {
  id: string
  name: string
  website: string
  city: string
  country: string
  image: {
    id: string
  }
}

type Response = {
  churches: Church[]
}

const query = gql`
  query {
    churches {
      id
      name
      website
      image {
        id
      }
      city
      country
    }
  }
`

export const getChurches = async () => {
  const { churches } = await request<Response>(
    'https://saints-cms.onrender.com/graphql',
    query,
  )
  return churches
}
