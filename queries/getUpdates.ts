import fetchHelper from './fetchHelper'

interface UpdatesResponse {
  data: {
    updates: any // Replace `any` with the actual type if known
  }
}

function getUpdatesQuery() {
  let baseQuery = `
    query getUpdates {
      updates {
        date
        title
        description
      }
    }
  `
  return baseQuery
}

export const getUpdates = async () => {
  const query = getUpdatesQuery()

  const res: UpdatesResponse = await fetchHelper({
    query,
  })
  return res.data.updates
}
