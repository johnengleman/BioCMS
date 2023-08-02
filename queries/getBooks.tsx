import { request, gql } from 'graphql-request'

type Book = {
  id: string
  link: string
  title: string
  book_cover: {
    id: string
  }
  pages: number
  category: string
  author: string
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
      book_cover {
        id
      }
      pages
      category
      author
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
