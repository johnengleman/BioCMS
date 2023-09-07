import { request, gql } from 'graphql-request'

type DirectusFile = {
  id: number
  width: number
  height: number
  description: string
}

type Saint = {
  id: number
  date_created: string
  death_year: number // Assuming death_year is a number. Adjust if necessary.
  name: string
  images: { directus_files_id: DirectusFile }[]
}

type Response = {
  saints: Saint[]
}

// Gets saints created since x
const saintsCreatedSinceX = gql`
  query ($date: String!) {
    saints(
      sort: "date_created"
      filter: { date_created: { _gte: $date } }
    ) {
      id
      date_created
      death_year
      name
      summary
      categories
      images {
        directus_files_id {
          id
          width
          height
          description
        }
      }
    }
  }
`

// Get the last y created saints
const lastYCreatedSaints = gql`
  query ($limit: Int!) {
    saints(
      sort: "date_created"
      filter: { date_created: { _nnull: true } }
      limit: $limit
    ) {
      id
      date_created
      death_year
      summary
      categories
      name
      images {
        directus_files_id {
          id
          width
          height
          description
        }
      }
    }
  }
`

export const getSaintsCreatedSinceX = async (
  lastUpdate,
) => {
  if (!lastUpdate) {
    return []
  }

  const { saints } = await request<Response>(
    `${process.env.NEXT_PUBLIC_DOMAIN}/graphql`,
    saintsCreatedSinceX,
    { date: lastUpdate },
  )
  return saints
}

export const getLastYCreatedSaints = async (limit) => {
  const { saints } = await request<Response>(
    `${process.env.NEXT_PUBLIC_DOMAIN}/graphql`,
    lastYCreatedSaints,
    { limit },
  )
  return saints
}

export default async function handler(req, res) {
  const query = req.query
  const { limit = 10, lastUpdate } = query
  let mostRecentlyUpdatedSaints: Saint[] = []

  try {
    mostRecentlyUpdatedSaints =
      await getSaintsCreatedSinceX(lastUpdate)
    if (mostRecentlyUpdatedSaints.length < limit) {
      mostRecentlyUpdatedSaints =
        await getLastYCreatedSaints(limit)
    }

    res.status(200).json(mostRecentlyUpdatedSaints || [])
  } catch (error) {
    res.status(500).json({ error })
  }
}
