export interface Quote {
  id: string
  text: string
  topics: JSON
  author: {
    name: string
  }
  source: string
}
