'use client'

import Link from 'next/link'
import {
  placeLabel,
  roleLabel,
  yearsLabel,
} from '../../../utils/saintCard'
import { splitSaintName } from '../../../utils/saintNames'
import smartQuotes from '../../../utils/smartQuotes'
import styles from './styles.module.scss'

const LONG_NAME = 28

// A saint in the waterfall ("Travel" design): a dark card with a fixed
// 16:10 image at the top, so photographs and icons look like one set.
// Below it: the years (in gold, first, because how recent a saint is,
// is the first thing a reader scans for), role and place, the short
// name, and the whole summary. Summaries keep their own length, so the
// cards have different heights and the waterfall stays lively. There is
// no footer; the feast day and the rest are on the saint page. Also
// used for "Related saints".
const SaintSummary = ({ data }: { data: any }) => {
  const saint = data || {}
  const { name, profile_image, summary, slug } = saint
  const kicker = [roleLabel(saint.categories), placeLabel(saint)]
    .filter(Boolean)
    .join(' · ')
  const years = yearsLabel(saint.birth_year, saint.death_year)
  const shortName =
    name?.length > LONG_NAME ? splitSaintName(name).title : name
  const position =
    profile_image?.metadata?.object_position || 'center 22%'

  return (
    <Link
      className={styles.card}
      href={`/saints/${slug}`}
    >
      <div className={styles.photo}>
        {profile_image?.id && (
          // Directus resizes the image; next/image is unoptimized.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={`${process.env.NEXT_PUBLIC_DIRECTUS_ASSETS}/assets/${profile_image.id}?width=720&format=webp&quality=80`}
            alt={
              profile_image?.metadata?.alt_text ||
              profile_image?.description ||
              `Image of ${name}`
            }
            width={720}
            height={450}
            loading="lazy"
            style={{ objectPosition: position }}
          />
        )}
      </div>
      <div className={styles.body}>
        {(years || kicker) && (
          <div className={styles.kicker}>
            {years && (
              <span className={styles.year}>
                <span className="visually-hidden">Lived </span>
                {years}
              </span>
            )}
            {years && kicker && (
              <span
                className={styles.dot}
                aria-hidden="true"
              >
                ·
              </span>
            )}
            {kicker}
          </div>
        )}
        <h3 className={styles.name}>{shortName}</h3>
        {summary && (
          <div
            className={styles.summary}
            dangerouslySetInnerHTML={{ __html: smartQuotes(summary) }}
          />
        )}
      </div>
    </Link>
  )
}

export default SaintSummary
