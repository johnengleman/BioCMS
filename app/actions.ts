'use server'

import { getMiracles } from '../queries/getMiracles'
import { getPrayers } from '../queries/getPrayers'
import { getQuotes } from '../queries/getQuotes'
import { getTeachings } from '../queries/getTeachings'
import { withPreview } from '../utils/listPreview'

// "Load more" for the list pages runs on the server, so the browser
// never calls Directus directly (which CORS blocks).

type ListArgs = {
  church?: string
  filter?: string
  offset: number
  limit: number
}

export const loadMoreTeachings = async (args: ListArgs) =>
  withPreview('teachings', await getTeachings(args))

export const loadMoreMiracles = async (args: ListArgs) =>
  withPreview('miracles', await getMiracles(args))

export const loadMoreQuotes = async (args: ListArgs) =>
  (await getQuotes(args)) || []

export const loadMorePrayers = async (args: ListArgs) =>
  (await getPrayers(args)) || []
