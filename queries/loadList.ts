import { getMiracles } from './getMiracles'
import { getPrayers } from './getPrayers'
import { getQuotes } from './getQuotes'
import { getTeachings } from './getTeachings'
import { withPreview } from '../utils/listPreview'
import type { ListKind } from '../utils/listParams'

// One page of a site-wide list, as the cards need it. Used by the list
// pages (for the built HTML) and by /api/list (for the browser).
export const loadList = async (
  kind: ListKind,
  query: {
    church: string
    filter: string
    offset: number
    limit: number
  },
) => {
  if (kind === 'miracles')
    return withPreview('miracles', await getMiracles(query))
  if (kind === 'teachings')
    return withPreview('teachings', await getTeachings(query))
  if (kind === 'quotes') return (await getQuotes(query)) || []
  return (await getPrayers(query)) || []
}
