import { gql } from 'graphql-request'
import fetchHelper from './fetchHelper'

interface SaintResponse {
  data: {
    saints: any // Replace `any` with the actual type if known
  }
}

const query = gql`
  query getSaint($slug: String!) {
    saints(filter: { slug: { _icontains: $slug } }) {
      id
      name
      summary
      biography
      birth_year
      death_year
      birth_location
      death_location
      date_updated
      feast_day_orthodox
      feast_day_catholic
      categories
      patron
      profile_image {
        id
        width
        height
        description
      }
      other_images {
        directus_files_id {
          id
          width
          height
          description
        }
      }
      books {
        author
        title
        store_link
        year
        publisher
        pages
        description
      }
      quotes {
        text
        topics
      }
      miracles {
        miracles
      }
      teachings {
        teachings
      }
      prayers {
        prayer_title
        prayer_slug
        prayer_image {
          id
        }
        prayers
      }
      relic_description
      relic_location
      relic_image {
        width
        height
        description
        id
      }
    }
  }
`

export const getSaint = async (slug?: string) => {
  const res: SaintResponse = await fetchHelper({
    query,
    variables: { slug },
  })

  return res.data.saints[0]
}
