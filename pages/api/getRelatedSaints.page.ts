import { request, gql } from 'graphql-request'

interface Image {
  directus_files_id: {
    id: number
  }
}

interface Saint {
  id: number
  slug: string
  name: string
  birth_year?: number // The ? indicates that the property is optional
  death_year?: number
  categories: string[]
  images: Image[]
}

interface Response {
  saints: Saint[]
}

const relatedSaints = gql`
  query {
    saints {
      id
      slug
      name
      birth_year
      death_year
      categories
      summary
      images {
        directus_files_id {
          id
        }
      }
    }
  }
`

export const getRelatedSaints = async () => {
  const { saints } = await request<Response>(
    `${process.env.NEXT_PUBLIC_DOMAIN}/graphql`,
    relatedSaints,
  )
  return saints
}

export default async function handler(req, res) {
  const categories = req.body.categories ?? undefined

  try {
    const allSaints = await getRelatedSaints()

    const relatedSaints = allSaints.filter((saint) =>
      saint.categories.some((category) =>
        categories.includes(category),
      ),
    )

    try {
      JSON.stringify(relatedSaints)
    } catch (e) {
      console.error(
        'relatedSaints cannot be serialized:',
        e,
      )
      return res
        .status(500)
        .json({ error: 'Data serialization error' })
    }

    res.status(200).json(relatedSaints || [])
  } catch (error) {
    res.status(500).json({ error: 'failed to load data' })
  }
}
