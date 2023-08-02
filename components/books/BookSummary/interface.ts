export interface Book {
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
