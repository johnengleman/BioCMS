import { request, gql } from 'graphql-request'

export type Book = {
  id: string
  store_link: string
  title: string
  pages: number
  author: string
  date_created: string
  description_part_1: string
  description_part_2: string
  amazon_book_cover: string
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
      store_link
      title
      pages
      author
      date_created
      description_part_1
      description_part_2
      amazon_book_cover
      genre
    }
  }
`

export const getBooks = async () => {
  const { books } = await request<Response>(
    `${process.env.NEXT_PUBLIC_DOMAIN}/graphql`,
    query,
  )
  return books
}
