type Image = {
  directus_files_id: {
    id: string
    width: number
    height: number
    description: string
  }
}

type Tomb = {
  id: string
}

type Book = {
  title: string
  author: string
  store_link: string
  pages?: number
  description: string
  description_part_2: string
  amazon_book_cover: string
}

type Saying = {
  text: string
  topics: string[]
}

type Prayer = {
  prayer_name: string
  prayer_text: string
}

export type Teachings = {
  teachings: string
}

export type Saint = {
  id: string
  name: string
  summary: string
  slug: string
  biography: string
  miracles: string
  legacy_influence: string
  teachings: Teachings[]
  prayers: Prayer[]
  sayings: Saying[]
  birth_year: number
  death_year: number
  birth_location: string
  death_location: string
  update_updated: string
  tags: string[]
  images: Image[]
  books: Book[]
  tomb: Tomb
  categories: string[]
  tomb_location: string
  tomb_church_name: string
  date_updated: string
}
