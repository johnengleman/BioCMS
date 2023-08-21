import { gql } from 'graphql-request'

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

const getSaintCategories = gql`
  query getSaintCategories($slug: String!) {
    saints(filter: { slug: { _eq: $slug } }) {
      id
      slug
      name
      categories
    }
  }
`

const getData = async (
  queryFunc,
  variables?: Record<string, any>,
) => {
  const res = await fetch(
    'https://saints-cms.onrender.com/graphql',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: queryFunc.toString(),
        variables,
      }),
    },
  )

  return await res.json()
}

export default async function handler(req, res) {
  const slug = req.query.slug ?? undefined

  try {
    const allSaintsData = await getData(allSaints)
    const saintCategoryData = await getData(
      getSaintCategories,
      { slug: slug },
    )

    const targetCategories = new Set(
      saintCategoryData.data.saints[0].categories,
    )
    const relatedSaints = allSaintsData.data.saints.filter(
      (saint) =>
        saint.categories.some((category) =>
          targetCategories.has(category),
        ),
    )

    res.status(200).json(relatedSaints)
  } catch (error) {
    res.status(500).json({ error: 'failed to load data' })
  }
}
