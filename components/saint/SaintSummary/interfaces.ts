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
  sayings: {
    text: string
  }[]
  tags: string[]
  profile_image: {
    id: string
  }
}
