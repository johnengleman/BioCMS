import { useMounted } from './useMounted'
import type { Day } from '../utils/feasts'

// The visitor's own date in the browser. Until the page has loaded
// (and in the static HTML) it is the day the page was built, so the
// server and browser render the same thing.
export const useToday = (builtOn: Day): Day => {
  const mounted = useMounted()
  if (!mounted) return builtOn
  const now = new Date()
  return { month: now.getMonth() + 1, day: now.getDate() }
}
