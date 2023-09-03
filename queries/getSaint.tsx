import { request, gql } from 'graphql-request'

type Image = {
  directus_files_id: {
    id: string
    width: number
    height: number
    description: string
  }
}

type Tomb = {
  id: string
}

type Book = {
  author: string
  title: string
  store_link: string
  pages: number
  description_part_1: string
  amazon_amazon_book_cover: string
}

type Saying = {
  text: string
  topics: string[]
}

type Prayer = {
  prayer_name: string
  prayer_text: string
}

type Saint = {
  id: string
  name: string
  summary: string
  slug: string
  biography: string
  miracles: string
  legacy_and_influence: string
  birth_year: number
  death_year: number
  birth_location: string
  death_location: string
  tags: string[]
  images: Image[]
  books: Book[]
  sayings: Saying[]
  tomb: Tomb
  tomb_location: string
  tomb_church_name: string
  prayers: Prayer[]
}

type Response = {
  saints: Saint
}

const query = gql`
  query getSaint($slug: String!) {
    saints(filter: { slug: { _eq: $slug } }) {
      id
      name
      summary
      biography
      miracles
      legacy_influence
      birth_year
      death_year
      birth_location
      death_location
      tags
      images {
        directus_files_id {
          id
        }
      }
      books {
        author
        title
        store_link
        pages
        description_part_1
        amazon_book_cover
      }
      sayings {
        text
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

export const getSaint = async (slug?: String) => {
  const { saints } = await request<Response>(
    `${process.env.NEXT_PUBLIC_DOMAIN}/graphql`,
    query,
    { slug },
  )
  return saints[0]
}
