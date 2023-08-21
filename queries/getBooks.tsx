import { request, gql } from 'graphql-request'

export type Book = {
  id: string
  link: string
  title: string
  pages: number
  author: string
  date_created: string
  description_part_1: string
  description_part_2: string
  book_image: string
  genre: string
  topics: JSON
}

type Response = {
  books: Book[]
}

const query = gql`
  query {
    books {
      id
      link
      title
      pages
      author
      date_created
      description_part_1
      description_part_2
      book_image
      genre
      topics
    }
  }
`

export const getBooks = async () => {
  const { books } = await request<Response>(
    'https://saints-cms.onrender.com/graphql',
    query,
  )
  return books
}
