import { request, gql } from 'graphql-request'

const query = gql`
  query getSaint($id: GraphQLStringOrFloat!) {
    saints(filter: { id: { _eq: $id } }) {
      id
      name
      summary
      biography
      birth_date
      death_date
      birth_location
      death_location
      categories
      photos {
        directus_files_id {
          id
        }
      }
      books {
        author {
          name
        }
        title
        link
        pages
        book_cover {
          id
        }
      }
      quotes {
        text
        topics
      }
    }
  }
`

export const getSaint = async (id?: string) => {
  const { saints } = await request(
    'https://saints-cms.onrender.com/graphql',
    query,
    { id },
  )
  return saints[0]
}
