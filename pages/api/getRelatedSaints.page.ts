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
  tags: string[]
  images: Image[]
}

interface Response {
  saints: Saint[]
}

const allSaints = gql`
  query {
    saints {
      id
      slug
      name
      birth_year
      death_year
      tags
      images {
        directus_files_id {
          id
        }
      }
    }
  }
`

const saintTags = gql`
  query getSaintTags($slug: String!) {
    saints(filter: { slug: { _eq: $slug } }) {
      id
      slug
      name
      tags
    }
  }
`

export const getAllSaints = async () => {
  const { saints } = await request<Response>(
    '${process.env.NEXT_PUBLIC_DOMAIN}/graphql',
    allSaints,
  )
  return saints
}

export const getSaintTags= async (slug) => {
  const { saints } = await request<Response>(
    `${process.env.NEXT_PUBLIC_DOMAIN}/graphql`,
    saintTags,
    { slug },
  )
  return saints
}

export default async function handler(req, res) {
  const slug = req.query.slug ?? undefined

  try {
    const allSaintsData = await getAllSaints()
    const saintTagData = await getSaintTags(slug)

    const targetTags = new Set(
      saintTagData[0].tags,
    )
    const relatedSaints = allSaintsData.filter((saint) =>
      saint.tags.some((category) =>
        targetTags.has(category),
      ),
    )

    res.status(200).json(relatedSaints || [])
  } catch (error) {
    res.status(500).json({ error: 'failed to load data' })
  }
}
