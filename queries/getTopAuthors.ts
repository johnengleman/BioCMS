// import { request, gql } from 'graphql-request'

// type DirectusFile = {
//   id: number
//   width: number
//   height: number
//   description: string
// }

// type Saint = {
//   id: number
//   name: string
//   images: { directus_files_id: DirectusFile }[]
//   books_func: { count: number }
// }

// type Response = {
//   saints: Saint[]
// }

// // Gets saints created since x
// const getAuthorsWithAtLeastTwoBooks = gql`
//   query {
//     saints(filter: { books_func: { count: { _gt: 1 } } }) {
//       id
//       name
//       images(limit: 1) {
//         directus_files_id {
//           id
//           width
//           height
//           description
//         }
//       }
//       books_func {
//         count
//       }
//     }
//   }
// `

// export const getTopAuthors = async (limit) => {
//   const { saints } = await request<Response>(
//     `${process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT}/graphql`,
//     getAuthorsWithAtLeastTwoBooks,
//   )
//   return saints
//     .sort((a, b) => b.books_func.count - a.books_func.count)
//     .slice(0, limit)
// }

// export default async function handler(req, res) {
//   const query = req.query
//   const { limit = 10, lastUpdate } = query

//   try {
//     const topAuthors = await getTopAuthors(limit)
//     res.status(200).json(topAuthors || [])
//   } catch (error) {
//     res.status(500).json(error)
//   }
// }
