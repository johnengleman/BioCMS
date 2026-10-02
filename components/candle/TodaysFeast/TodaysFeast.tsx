'use client'

import { useMemo } from 'react'
import Link from 'next/link'
import { useMounted } from '../../../hooks/useMounted'
import { useTradition } from '../../../hooks/useTradition'
import { inTradition } from '../../../utils/site'
import { daysUntilFeast, feastFor } from '../../../utils/saintCard'
import type { FeastSaint } from '../../../queries/getTodaysFeast'

// "Feast of St. Thérèse of Lisieux  Today": the saint whose feast is
// on the visitor's own calendar day. Shows nothing on days without one.
const TodaysFeast = ({
  saints,
  className,
}: {
  saints: FeastSaint[]
  className?: string
}) => {
  const { church } = useTradition()
  // "Today" depends on the visitor's own clock, so it is worked out in
  // the browser.
  const mounted = useMounted()

  const today = useMemo(
    () =>
      mounted
        ? saints.find(
            (saint) =>
              inTradition(saint.venerated_in, church) &&
              daysUntilFeast(feastFor(saint, church)) === 0,
          ) || null
        : null,
    [mounted, saints, church],
  )

  if (!today) return null
  return (
    <Link
      href={`/saints/${today.slug}`}
      className={className}
    >
      Feast of {today.name}
      <b>Today</b>
    </Link>
  )
}

export default TodaysFeast
