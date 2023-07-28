import { request, gql } from 'graphql-request'

type Photo = {
  directus_files_id: {
    id: string
  }
}

type Saint = {
  id: string
  name: string
  summary: string
  biography: string
  birth_date: string
  death_date: string
  birth_location: string
  death_location: string
  categories: string[]
  photos: Photo[]
}

type Response = {
  saints: Saint[]
}

const query = gql`
  query {
    saints {
      id
      name
      summary
      biography
      categories
      birth_date
      death_date
      birth_location
      death_location
      photos {
        directus_files_id {
          id
        }
      }
    }
  }
`

export const getSaints = async () => {
  const { saints } = await request<Response>(
    'https://saints-cms.onrender.com/graphql',
    query,
  )
  return saints
}
