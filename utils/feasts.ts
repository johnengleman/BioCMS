import { inTradition } from './site'
import { feastParts } from './saintCard'

export type Day = { month: number; day: number }

const on = (date: string | null | undefined, today: Day) => {
  const parts = feastParts(date)
  return (
    !!parts && parts.month === today.month && parts.day === today.day
  )
}

// Saints whose feast is `today` in the visitor's tradition. "all"
// counts a feast on either calendar.
export const feastsOn = <
  T extends {
    venerated_in?: any
    feast_day_catholic?: string | null
    feast_day_orthodox?: string | null
  },
>(
  saints: T[],
  church: string,
  today: Day,
) =>
  saints.filter(
    (saint) =>
      inTradition(saint.venerated_in, church) &&
      ((church !== 'orthodox' && on(saint.feast_day_catholic, today)) ||
        (church !== 'catholic' && on(saint.feast_day_orthodox, today))),
  )
