import type { Metadata } from 'next'
import { getUpdates } from '../../queries/getUpdates'
import SiteHeader from '../../components/candle/SiteHeader/SiteHeader'
import SiteFooter from '../../components/candle/SiteFooter/SiteFooter'
import PhotoHero from '../../components/candle/PhotoHero/PhotoHero'
import styles from './candle.module.scss'

import { NextPageProps } from '../../types/nextjs'

export const runtime = 'edge'

export const metadata: Metadata = {
  title: 'Recent updates | Find a Saint',
  description:
    'New saints and new features on Find a Saint.',
}

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

// Reads "2026-10-01" as text, so the day never shifts with the time
// zone.
const formatDate = (value = '') => {
  const [year, month, day] = value
    .slice(0, 10)
    .split('-')
    .map(Number)
  return year && month && day
    ? `${MONTHS[month - 1]} ${day}, ${year}`
    : ''
}

const Updates = async (props: NextPageProps) => {
  const searchParams = await props.searchParams
  const updates = (await getUpdates()) || []
  const sorted = [...updates].sort((a, b) =>
    String(b.date).localeCompare(String(a.date)),
  )

  return (
    <div className={styles.page}>
      <SiteHeader
        searchParams={searchParams}
        active="/updates"
      />
      <main>
        <PhotoHero>
          <h1 className={styles.title}>Recent updates</h1>
          <p className={styles.subtitle}>
            New saints and new features, newest first.
          </p>
        </PhotoHero>
        <div className={styles.content}>
          {sorted.length ? (
            <ol className={styles.timeline}>
              {sorted.map((update, i) => (
                <li
                  key={i}
                  className={styles.update}
                >
                  <time
                    className={styles.date}
                    dateTime={String(update.date).slice(
                      0,
                      10,
                    )}
                  >
                    {formatDate(update.date)}
                  </time>
                  <div className={styles.card}>
                    <h2>{update.title}</h2>
                    {update.description && (
                      <div
                        className={styles.description}
                        dangerouslySetInnerHTML={{
                          __html: update.description,
                        }}
                      />
                    )}
                  </div>
                </li>
              ))}
            </ol>
          ) : (
            <p className={styles.empty}>
              No updates yet. New saints and features will
              be listed here.
            </p>
          )}
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}

export default Updates
