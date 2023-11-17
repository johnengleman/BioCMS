import fetchHelper from './fetchHelper'

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

  const res = await fetchHelper({
    query,
  })
  return res.data.updates
}
