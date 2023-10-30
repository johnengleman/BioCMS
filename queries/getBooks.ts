import fetchHelper from './fetchHelper'

function getBooksQuery({ church, preset, filter }) {
  // Variables declaration
  let variablesList: string[] = []
  if (church !== 'all') {
    variablesList.push('$church: String!')
  }

  if (preset !== 'none') {
    variablesList.push('$preset: String!')
  }

  if (filter !== 'none') {
    variablesList.push('$filter: String!')
  }

  // Filter construction
  let filterList: string[] = []
  let churchList: string[] = []
  if (church !== 'all') {
    churchList.push(
      '{ saint: { venerated_in: { _icontains: $church }}}',
    )
  }
  if (preset !== 'none') {
    filterList.push('{ genre: { _icontains: $preset } }')
  }

  if (filter !== 'none') {
    filterList.push(
      '{ saint: { name: { _icontains: $filter } } }',
    )
  }

  // Building the query
  let baseQuery = `
    query getBooks${
      variablesList.length > 0
        ? `(${variablesList.join(', ')})`
        : ''
    } {
      books(
        sort: "best_sellers_rank"
        filter: {
          _and: [
            ${filterList.join(', ')}
            ${churchList}
          ]
        }
      ) {
        id
        store_link
        title
        pages
        author
        date_created
        description
        amazon_book_cover
        genre
        saint {
            name
            venerated_in
            images {
              directus_files_id {
                id
              }
            }
          }
        }
    }
  `
  return baseQuery
}

export const getBooks = async ({
  church = 'all',
  preset = 'none',
  filter = 'none',
}) => {
  const query = getBooksQuery({ church, preset, filter })

  const res = await fetchHelper({
    query,
    variables: { church, preset, filter },
  })
  return res.data.books
}
