import fetchHelper from './fetchHelper'
import { properties } from '../utils/properties'

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
    churchList.push(
      '{ saint: { venerated_in: { _icontains: $church }}}',
    )
  }

  // Building the query
  let baseQuery = `
    query getTopGenres${
      variablesList.length > 0
        ? `(${variablesList.join(', ')})`
        : ''
    } {
      ${properties.books.presets.map(
        (preset) => `${preset}: books(
        filter: {
          _and: [
            ${getPresetList(preset)}
            ${churchList}
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

type Presets = { [key: string]: unknown }

export const getTopGenres = async ({
  church,
}: {
  church: string
}) => {
  const presets: Presets = (await getNumberOfPresets({
    church,
  })) as Presets

  return Object.entries(presets) || []
}
