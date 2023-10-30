import fetchHelper from './fetchHelper'

function getNewestBooksQuery({ church, preset }) {
  // Variables declaration
  let variablesList: string[] = []
  if (church !== 'all') {
    variablesList.push('$church: String!')
  }

  if (preset !== 'none') {
    variablesList.push('$preset: String!')
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

  // Building the query
  let baseQuery = `
    query getBooks${
      variablesList.length > 0
        ? `(${variablesList.join(', ')})`
        : ''
    } {
      books(
        sort: "date_created"
        limit: 7,
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

export const getNewestBooks = async ({
  church = 'all',
  preset = 'none',
}) => {
  const query = getNewestBooksQuery({ church, preset })

  const res = await fetchHelper({
    query,
    variables: { church, preset },
  })
  return res.data.books
}
