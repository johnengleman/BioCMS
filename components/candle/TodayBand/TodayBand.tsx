'use client'

import { useState, type ReactNode } from 'react'
import Link from 'next/link'
import { useToday } from '../../../hooks/useToday'
import { useTradition } from '../../../hooks/useTradition'
import { feastsOn, type Day } from '../../../utils/feasts'
import type { FeastSaint } from '../../../queries/getTodaysFeast'
import { roleLabel, yearsLabel } from '../../../utils/saintCard'
import { splitSaintName } from '../../../utils/saintNames'
import { saintsHref } from '../../../utils/listParams'
import styles from './styles.module.scss'
import { imageUrl } from '../../../utils/imageUrl'

const WEEK = 7
const SHOWN = 6
const LONG_NAME = 28

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
const WEEKDAYS = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
]

// The calendar day `offset` days after `today`, in this year.
const dayAfter = (today: Day, offset: number) => {
  const date = new Date(
    new Date().getFullYear(),
    today.month - 1,
    today.day + offset,
  )
  return {
    day: { month: date.getMonth() + 1, day: date.getDate() },
    weekday: WEEKDAYS[date.getDay()],
  }
}

const CALENDAR: Record<string, string> = {
  all: 'either calendar',
  catholic: 'the Catholic calendar',
  orthodox: 'the Orthodox calendar',
}

// The top of the saints list (design v4): the site opens on today.
// The date, the saints whose feast it is in the visitor's tradition,
// and a strip of the coming week with a count per day. Choosing a day
// shows its saints. The static page shows the day it was built; the
// browser switches to the visitor's own date and tradition.
const TodayBand = ({
  todays,
  builtOn,
  subtitle,
  search,
}: {
  // Saints with a feast between yesterday and next week (UTC).
  todays: FeastSaint[]
  builtOn: Day
  subtitle?: ReactNode
  search?: ReactNode
}) => {
  const today = useToday(builtOn)
  const { church } = useTradition()
  const [offset, setOffset] = useState(0)

  const week = Array.from({ length: WEEK }, (_, i) => {
    const { day, weekday } = dayAfter(today, i)
    return {
      offset: i,
      day,
      weekday,
      saints: feastsOn(todays, church, day),
    }
  })
  const chosen = week[offset] || week[0]
  const next = week.find((d) => d.offset > chosen.offset && d.saints.length)

  return (
    <section
      className={styles.band}
      aria-labelledby="today-title"
    >
      <div className={styles.inner}>
        <div className={styles.top}>
          <div className={styles.dateBlock}>
            <p className={styles.inscription}>
              {chosen.offset === 0 ? 'Today · ' : ''}
              {chosen.weekday}
            </p>
            <h1
              id="today-title"
              className={styles.date}
            >
              <span className="visually-hidden">Saints of </span>
              {chosen.day.day} {MONTHS[chosen.day.month - 1]}
            </h1>
            {subtitle && <p className={styles.tagline}>{subtitle}</p>}
          </div>
          {search && <div className={styles.search}>{search}</div>}
        </div>

        <ol
          className={styles.week}
          aria-label="The coming week"
        >
          {week.map((d) => (
            <li key={d.offset}>
              <button
                type="button"
                aria-pressed={d.offset === chosen.offset}
                onClick={() => setOffset(d.offset)}
              >
                <span>{d.weekday.slice(0, 3)}</span>
                <b>{d.day.day}</b>
                <i aria-label={`${d.saints.length} saints`}>
                  {d.saints.length || ''}
                </i>
              </button>
            </li>
          ))}
        </ol>

        <div className={styles.saints}>
          {chosen.saints.length ? (
            <>
              <p className={styles.label}>
                {chosen.offset === 0
                  ? 'Saints of the day'
                  : `Saints of ${chosen.weekday}`}
                {chosen.saints.length > 1 && (
                  <span> · {chosen.saints.length}</span>
                )}
              </p>
              <ul>
                {chosen.saints.slice(0, SHOWN).map((saint) => {
                  const name =
                    saint.name.length > LONG_NAME
                      ? splitSaintName(saint.name).title
                      : saint.name
                  const meta = [
                    roleLabel(saint.categories),
                    yearsLabel(saint.birth_year, saint.death_year),
                  ]
                    .filter(Boolean)
                    .join(' · ')
                  return (
                    <li key={saint.slug}>
                      <Link href={`/saints/${saint.slug}`}>
                        <span className={styles.portrait}>
                          {saint.profile_image?.id && (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={imageUrl(saint.profile_image, { width: 160, quality: 78 })}
                              alt=""
                              loading="lazy"
                              style={{
                                objectPosition:
                                  saint.profile_image?.metadata
                                    ?.object_position || 'center 20%',
                              }}
                            />
                          )}
                        </span>
                        <span className={styles.who}>
                          <b>{name}</b>
                          {meta && <small>{meta}</small>}
                        </span>
                      </Link>
                    </li>
                  )
                })}
              </ul>
              {chosen.offset === 0 && chosen.saints.length > SHOWN && (
                <Link
                  href={saintsHref({ feast: true })}
                  className={styles.all}
                >
                  All {chosen.saints.length} saints of the day
                </Link>
              )}
            </>
          ) : (
            <p className={styles.none}>
              No feast on this day in {CALENDAR[church]}.
              {next && (
                <>
                  {' '}
                  <button
                    type="button"
                    onClick={() => setOffset(next.offset)}
                  >
                    {next.weekday}: {next.saints.length}{' '}
                    {next.saints.length === 1 ? 'saint' : 'saints'}
                  </button>
                </>
              )}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}

export default TodayBand
