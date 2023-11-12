import { gql } from 'graphql-request'
import { Saint } from '../types/types'
import fetchHelper from './fetchHelper'

const query = gql`
  query getSaint($slug: String!) {
    saints(filter: { slug: { _eq: $slug } }) {
      id
      name
      summary
      biography
      birth_year
      death_year
      birth_location
      death_location
      date_updated
      feast_day
      read_more_links
      categories
      patron
      profile_image {
        id
        width
        height
        description
      }
      books {
        author
        title
        store_link
        pages
        description
        amazon_book_cover
      }
      sayings {
        text
      }
      miracles {
        miracles
      }
      teachings {
        teachings
      }
      # prayers
      # tomb {
      #   id
      # }
      # tomb_church_name
      # tomb_location
    }
  }
`

export const getSaint = async (slug?: string) => {
  const res = await fetchHelper({
    query,
    variables: { slug },
  })

  return res.data.saints[0]
}
