import { getSaintFilters } from './getSaintFilters'
import type { Church } from '../utils/site'

export type SaintCounts = {
  total: number
  presets: Record<string, number>
  // Categories and feast months, lowercase ("fathers_of_the_church").
  filters: Record<string, number>
}

const CHURCHES: Church[] = ['all', 'catholic', 'orthodox']
const PRESETS = ['20th_century_saints', 'patron_saints']

const one = (list: any) => list?.[0]?.count?.id || 0

// Saint counts for every tradition, so the page can show the right
// numbers after the browser reads the visitor's choice.
export const getSaintCounts = async (): Promise<
  Record<Church, SaintCounts>
> => {
  const entries = await Promise.all(
    CHURCHES.map(async (church) => {
      const data: Record<string, any> = (await getSaintFilters({ church }))[church]
      const none: Record<string, any> = data.none || {}
      const filters: Record<string, number> = {}
      Object.keys(none).forEach((key) => {
        if (key !== 'all_all') filters[key.toLowerCase()] = one(none[key])
      })
      const presets: Record<string, number> = {}
      PRESETS.forEach((preset) => {
        presets[preset] = one(data[preset]?.[`all_${preset}`])
      })
      return [
        church,
        { total: one(none.all_all), presets, filters },
      ] as const
    }),
  )
  return Object.fromEntries(entries) as Record<Church, SaintCounts>
}
