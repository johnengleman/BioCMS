import { getMiraclesFilters } from './getMiraclesFilters'
import { getPrayersFilters } from './getPrayersFilters'
import { getQuotesFilters } from './getQuoteFilters'
import { getTeachingFilters } from './getTeachingFilters'
import { filtersFor, type ListKind } from '../utils/listParams'
import type { Church } from '../utils/site'

const COUNTS = {
  teachings: getTeachingFilters,
  miracles: getMiraclesFilters,
  quotes: getQuotesFilters,
  prayers: getPrayersFilters,
}

const CHURCHES: Church[] = ['all', 'catholic', 'orthodox']

export type ListCounts = Record<Church, Record<string, number>>

// How many items each filter has, for every tradition, so the page can
// show the right numbers after the browser reads the visitor's choice.
export const getListCounts = async (
  kind: ListKind,
): Promise<ListCounts> => {
  const entries = await Promise.all(
    CHURCHES.map(async (church) => {
      const data = (await COUNTS[kind](church))?.[church]?.none || {}
      const counts: Record<string, number> = {}
      filtersFor(kind).forEach((filter) => {
        counts[filter] = data?.[filter]?.[0]?.count?.id || 0
      })
      return [church, counts] as const
    }),
  )
  return Object.fromEntries(entries) as ListCounts
}
