import { request, gql } from 'graphql-request'

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
  const { saints } = await request(
    'https://saints-cms.onrender.com/graphql',
    query,
  )
  return saints
}
