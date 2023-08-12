export interface Saint {
  id: string
  name: string
  slug: string
  summary: string
  biography: string
  birth_year: number
  birth_location: string
  death_year: number
  death_location: string
  books: {
    title: string
  }[]
  quotes: {
    text: string
  }[]
  categories: string[]
  photos: {
    directus_files_id: {
      id: string
    }
  }[]
}
