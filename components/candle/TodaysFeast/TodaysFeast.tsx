'use client'

import { useMemo, useSyncExternalStore } from 'react'
import Link from 'next/link'
import { daysUntilFeast, feastFor } from '../../../utils/saintCard'
import type { FeastSaint } from '../../../queries/getTodaysFeast'

// False on the server and during hydration, true in the browser after.
// "Today" depends on the visitor's own clock, so it can only be worked
// out in the browser.
const subscribe = () => () => {}
const useMounted = () =>
  useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  )

// "Feast of St. Thérèse of Lisieux  Today": the saint whose feast is
// on the visitor's own calendar day. Shows nothing on days without one.
const TodaysFeast = ({
  saints,
  church,
  className,
}: {
  saints: FeastSaint[]
  church: string
  className?: string
}) => {
  const mounted = useMounted()

  const today = useMemo(
    () =>
      mounted
        ? saints.find(
            (saint) =>
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
