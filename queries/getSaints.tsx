import { request, gql } from 'graphql-request'

type Image = {
  directus_files_id: {
    id: string
    description: string
  }
}

type Book = {
  title: string
}

type Saying = {
  text: string
}

type Church = {
  name: string
}

type Saint = {
  id: string
  slug: string
  name: string
  summary: string
  biography: string
  birth_year: number
  death_year: number
  birth_location: string
  death_location: string
  tags: string[]
  images: Image[]
  sayings: Saying[]
  books: Book[]
}

type Response = {
  saints: Saint[]
}

const allSaintsQuery = gql`
  query {
    saints {
      id
      slug
      name
      summary
      biography
      tags
      birth_year
      death_year
      birth_location
      death_location
      books {
        title
      }
      sayings {
        text
      }
      images {
        directus_files_id {
          id
        }
      }
    }
  }
`

const churchSaintsQuery = gql`
  query getSaint($church: String!) {
    saints(
      filter: { venerated_in: { _contains: $church } }
    ) {
      id
      slug
      name
      summary
      biography
      tags
      birth_year
      death_year
      birth_location
      death_location
      books {
        title
      }
      sayings {
        text
      }
      images {
        directus_files_id {
          id
        }
      }
    }
  }
`

export const getSaints = async (church) => {
  if (church === 'all') {
    const { saints } = await request<Response>(
      `${process.env.NEXT_PUBLIC_DOMAIN}/graphql`,
      allSaintsQuery,
    )
    return saints
  } else {
    const { saints } = await request<Response>(
      `${process.env.NEXT_PUBLIC_DOMAIN}/graphql`,
      churchSaintsQuery,
      { church },
    )
    return saints
  }
}
