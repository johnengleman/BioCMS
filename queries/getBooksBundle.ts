import { getNewestBooks } from './getNewestBooks'
import { getBooks } from './getBooks'
import { getTopGenres } from './GetTopGenres'
import { getTopAuthors } from './getTopAuthors'

export type BooksBundle = {
  newest: any[]
  books: any[]
  // Books per genre, and saints with more than one book.
  genres: Record<string, number>
  authors: { name: string; count: number }[]
}

// Everything the books page shows for one tradition, genre and saint.
// `preset` is a genre and `filter` is a saint's name; 'none' and 'all'
// mean no choice (an empty string fails in Directus).
export const getBooksBundle = async ({
  church,
  preset,
  filter,
}: {
  church: string
  preset: string
  filter: string
}): Promise<BooksBundle> => {
  const [newest, books, genres, authors] = await Promise.all([
    getNewestBooks({ church, preset }),
    getBooks({ church, preset, filter }),
    getTopGenres({ church }),
    getTopAuthors({ church, preset }),
  ])

  return {
    newest: newest || [],
    books: books || [],
    genres: Object.fromEntries(
      (genres || []).map(([key, list]: [string, any]) => [
        key,
        list?.length || 0,
      ]),
    ),
    authors: (authors || [])
      .filter((a: any) => a.books?.length)
      .map((a: any) => ({ name: a.name, count: a.books.length }))
      .sort((a, b) => b.count - a.count),
  }
}
