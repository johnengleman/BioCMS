import { request, gql } from 'graphql-request'

interface Photo {
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
  photos: Photo[]
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
      categories
      photos {
        directus_files_id {
          id
        }
      }
    }
  }
`

const saintCategories = gql`
  query getSaintCategories($slug: String!) {
    saints(filter: { slug: { _eq: $slug } }) {
      id
      slug
      name
      categories
    }
  }
`

export const getAllSaints = async () => {
  const { saints } = await request<Response>(
    'https://saints-cms.onrender.com/graphql',
    allSaints,
  )
  return saints
}

export const getSaintCategories = async (slug) => {
  const { saints } = await request<Response>(
    'https://saints-cms.onrender.com/graphql',
    saintCategories,
    { slug },
  )
  return saints
}

export default async function handler(req, res) {
  const slug = req.query.slug ?? undefined

  try {
    const allSaintsData = await getAllSaints()
    const saintCategoryData = await getSaintCategories(slug)

    const targetCategories = new Set(
      saintCategoryData[0].categories,
    )
    const relatedSaints = allSaintsData.filter((saint) =>
      saint.categories.some((category) =>
        targetCategories.has(category),
      ),
    )

    res.status(200).json(relatedSaints || [])
  } catch (error) {
    res.status(500).json({ error: 'failed to load data' })
  }
}
