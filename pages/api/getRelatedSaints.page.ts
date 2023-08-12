import type { NextRequest } from 'next/server'
import { gql } from 'graphql-request'

export const config = {
  runtime: 'edge',
}

const allSaints = gql`
  query {
    saints {
      id
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
  query getSaintCategories($id: ID!) {
    saints_by_id(id: $id) {
      id
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

export default async function handler(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id') ?? undefined

  try {
    const allSaintsData = await getData(allSaints)
    const saintCategoryData = await getData(
      getSaintCategories,
      { id: id },
    )

    const targetCategories = new Set(
      saintCategoryData.data.saints_by_id.categories,
    )
    const relatedSaints = allSaintsData.data.saints.filter(
      (saint) =>
        saint.categories.some((category) =>
          targetCategories.has(category),
        ),
    )

    return new Response(JSON.stringify(relatedSaints), {
      status: 200,
      headers: {
        'content-type': 'application/json',
      },
    })
  } catch (error) {
    return new Response('An error occurred', {
      status: 500,
      headers: {
        'content-type': 'application/json',
      },
    })
  }
}
