'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { daysUntilFeast, feastFor } from '../../../utils/saintCard'
import type { FeastSaint } from '../../../queries/getTodaysFeast'

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
  const [today, setToday] = useState<FeastSaint | null>(null)

  useEffect(() => {
    setToday(
      saints.find(
        (saint) => daysUntilFeast(feastFor(saint, church)) === 0,
      ) || null,
    )
  }, [saints, church])

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
