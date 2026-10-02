'use client'

import Link from 'next/link'
import { useMounted } from '../../../hooks/useMounted'
import { useTradition } from '../../../hooks/useTradition'
import { inTradition } from '../../../utils/site'
import { feastParts } from '../../../utils/saintCard'
import { splitSaintName } from '../../../utils/saintNames'
import type { FeastSaint } from '../../../queries/getTodaysFeast'
import styles from './styles.module.scss'

type Day = { month: number; day: number }

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

const on = (date: string | null | undefined, today: Day) => {
  const parts = feastParts(date)
  return (
    !!parts && parts.month === today.month && parts.day === today.day
  )
}

const shortName = (name = '') =>
  name.length > 28 ? splitSaintName(name).title : name

// Every saint whose feast is today in the visitor's tradition, as a
// row of small links. Many saints share a day, so none is singled out.
//
// The built page uses the day it was built (UTC) and both traditions,
// so the HTML is the same for everyone. After it loads, the browser
// uses the visitor's own date and tradition. Shows nothing on a day
// with no feast.
const FeastsToday = ({
  saints,
  builtOn,
}: {
  saints: FeastSaint[]
  builtOn: Day
}) => {
  const { church } = useTradition()
  const mounted = useMounted()
  const now = new Date()
  const today = mounted
    ? { month: now.getMonth() + 1, day: now.getDate() }
    : builtOn

  const feasts = saints
    .filter((saint) => inTradition(saint.venerated_in, church))
    .map((saint) => {
      const catholic =
        church !== 'orthodox' && on(saint.feast_day_catholic, today)
      const orthodox =
        church !== 'catholic' && on(saint.feast_day_orthodox, today)
      return { saint, catholic, orthodox }
    })
    .filter((feast) => feast.catholic || feast.orthodox)

  if (!feasts.length) return null

  return (
    <section
      className={styles.feasts}
      aria-labelledby="feasts-today"
    >
      <h2
        id="feasts-today"
        className={styles.head}
      >
        Feasts today
        <span>
          {MONTHS[today.month - 1]} {today.day}
        </span>
      </h2>
      <ul className={styles.row}>
        {feasts.map(({ saint, catholic, orthodox }) => (
          <li key={saint.slug}>
            <Link
              href={`/saints/${saint.slug}`}
              className={styles.saint}
            >
              <span className={styles.portrait}>
                {saint.profile_image?.id && (
                  // Directus resizes the image; next/image is unoptimized.
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={`${process.env.NEXT_PUBLIC_DIRECTUS_ASSETS}/assets/${saint.profile_image.id}?width=96&height=96&fit=cover&format=webp&quality=78`}
                    alt=""
                    width={40}
                    height={40}
                    loading="lazy"
                  />
                )}
              </span>
              <span className={styles.text}>
                <span className={styles.name}>
                  {shortName(saint.name)}
                </span>
                <span className={styles.calendar}>
                  {catholic && orthodox
                    ? 'Catholic and Orthodox'
                    : catholic
                      ? 'Catholic calendar'
                      : 'Orthodox calendar'}
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default FeastsToday
