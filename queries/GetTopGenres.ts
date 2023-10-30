import fetchHelper from './fetchHelper'
import { properties } from '../components/books/Hero/properties'

const getPresetList = (filter) =>
  `{ genre: { _icontains: "${filter}" } }`

function numberOfPresetsQuery(church) {
  // Variables declaration
  let variablesList: string[] = []
  if (church !== 'all') {
    variablesList.push('$church: String!')
  }

  // Filter construction
  let churchList: string[] = []

  if (church !== 'all') {
    churchList.push('venerated_in: { _icontains: $church }')
  }

  // Building the query
  let baseQuery = `
    query getTopGenres${
      variablesList.length > 0
        ? `(${variablesList.join(', ')})`
        : ''
    } {
      ${properties.presets.map(
        (preset) => `${preset}: books(
        filter: {
          ${churchList}
          _and: [
            ${getPresetList(preset)}
          ]
        }
      ) {
       title
      }`,
      )}
    }
  `

  return baseQuery
}

const getNumberOfPresets = async ({ church = 'all' }) => {
  const res = await fetchHelper({
    query: numberOfPresetsQuery(church),
    variables: { church },
  })
  return res.data
}

export const getTopGenres = async (
  church: string = 'all',
) => {
  const presets = await getNumberOfPresets({
    church,
  })

  return Object.entries(presets) || []
}
