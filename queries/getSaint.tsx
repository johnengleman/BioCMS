import { request, gql } from 'graphql-request'

type Photo = {
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
  link: string
  pages: number
  description_part_1: string
  book_image: string
}

type Quote = {
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
  categories: string[]
  photos: Photo[]
  books: Book[]
  quotes: Quote[]
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
      legacy_and_influence
      birth_year
      death_year
      birth_location
      death_location
      categories
      photos {
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
        link
        pages
        description_part_1
        book_image
      }
      quotes {
        text
        topics
      }
      prayers
      tomb {
        id
      }
      tomb_church_name
      tomb_location
    }
  }
`

export const getSaint = async (slug?: String) => {
  const { saints } = await request<Response>(
    'https://saints-cms.onrender.com/graphql',
    query,
    { slug },
  )
  return saints[0]
}
