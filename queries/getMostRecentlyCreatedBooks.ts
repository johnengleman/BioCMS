// import { gql } from 'graphql-request'

// type Book = {
//   id: number
//   store_link: string
//   title: string
//   pages: number
//   author: string
//   date_created: string
//   description_part_1: string
//   description_part_2: string
//   amazon_book_cover: string
//   genre: string
//   topics: string[] // Assuming topics is an array of strings. Adjust if necessary.
// }

// type Response = {
//   books: Book[]
// }

// // Gets saints created since x
// const booksCreatedSinceX = gql`
//   query ($date: String!) {
//     books(
//       sort: "date_created"
//       filter: { date_created: { _gte: $date } }
//     ) {
//       id
//       store_link
//       title
//       pages
//       author
//       date_created
//       description_part_1
//       description_part_2
//       amazon_book_cover
//       genre
//     }
//   }
// `

// // Get the last y created saints
// const lastYCreatedBooks = gql`
//   query ($limit: Int!) {
//     books(
//       sort: "date_created"
//       filter: { date_created: { _nnull: true } }
//       limit: $limit
//     ) {
//       id
//       store_link
//       title
//       pages
//       author
//       date_created
//       description_part_1
//       description_part_2
//       amazon_book_cover
//       genre
//     }
//   }
// `

// export const getBooksCreatedSinceX = async (lastUpdate) => {
//   if (!lastUpdate) {
//     return []
//   }

//   const { books } = await request<Response>(
//     `${process.env.NEXT_PUBLIC_DOMAIN}/graphql`,
//     booksCreatedSinceX,
//     { date: lastUpdate },
//   )
//   return books
// }

// export const getLastYCreatedBooks = async (limit) => {
//   const { books } = await request<Response>(
//     `${process.env.NEXT_PUBLIC_DOMAIN}/graphql`,
//     lastYCreatedBooks,
//     { limit },
//   )
//   return books
// }

// export default async function handler(req, res) {
//   const query = req.query
//   const { limit = 10, lastUpdate } = query
//   let mostRecentlyUpdatedBooks: Book[] = []

//   try {
//     mostRecentlyUpdatedBooks = await getBooksCreatedSinceX(
//       lastUpdate,
//     )
//     if (mostRecentlyUpdatedBooks.length < limit) {
//       mostRecentlyUpdatedBooks = await getLastYCreatedBooks(
//         limit,
//       )
//     }

//     res.status(200).json(mostRecentlyUpdatedBooks || [])
//   } catch (error) {
//     res.status(500).json({ error })
//   }
// }
