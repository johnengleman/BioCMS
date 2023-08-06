import { request, gql } from 'graphql-request'

type Photo = {
  directus_files_id: {
    id: string
    width: number
    height: number
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
  description: string
  book_cover: {
    id: string
  }
}

type Quote = {
  text: string
  topics: string[]
}

type Church = {
  name: string
  website: string
  image: {
    id: string
  }
  city: string
  country: string
}

type RelatedTo = {
  saint: {
    key: number
    collection: string
  }
  relationship_type: string
}

type Prayer = {
  prayer_name: string
  prayer_text: string
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
  books: Book[]
  quotes: Quote[]
  churches: Church[]
  related_to: RelatedTo[]
  tomb: Tomb
  tomb_location: string
  tomb_church_name: string
  prayers: Prayer[]
}

type Response = {
  saints_by_id: Saint
}

const query = gql`
  query getSaint($id: ID!) {
    saints_by_id(id: $id) {
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
          width
          height
        }
      }
      books {
        author
        title
        link
        pages
        description
        book_cover {
          id
        }
      }
      quotes {
        text
        topics
      }
      churches {
        name
        website
        image {
          id
        }
        city
        country
      }
      related_to
      prayers
      tomb {
        id
      }
      tomb_church_name
      tomb_location
    }
  }
`

export const getSaint = async (id?: string) => {
  const { saints_by_id } = await request<Response>(
    'https://saints-cms.onrender.com/graphql',
    query,
    { id },
  )
  return saints_by_id
}
