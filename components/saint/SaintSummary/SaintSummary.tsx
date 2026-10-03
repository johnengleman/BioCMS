'use client'

import Link from 'next/link'
import { useMounted } from '../../../hooks/useMounted'
import { useTradition } from '../../../hooks/useTradition'
import {
  churchLabel,
  daysUntilFeast,
  feastFor,
  feastShort,
  placeLabel,
  roleLabel,
  yearsLabel,
} from '../../../utils/saintCard'
import { splitSaintName } from '../../../utils/saintNames'
import smartQuotes from '../../../utils/smartQuotes'
import styles from './styles.module.scss'

const LONG_NAME = 28

const badgeFor = (
  saint,
  feast: string | null | undefined,
  mounted: boolean,
) => {
  // Feast badges depend on today's date, so they wait for the browser.
  const days = mounted ? daysUntilFeast(feast) : null
  if (days === 0) return { label: 'Feast today', feast: true }
  if (days !== null && days <= 7)
    return { label: 'Feast this week', feast: false }
  return null
}

// A saint in the waterfall ("Travel" design): a dark card with a fixed
// 16:10 image at the top, so photographs and icons look like one set.
// Below it: role and place, the short name, the first lines of the
// saint's summary, and one line of facts (feast · years · church). Only
// a near feast day gets a badge. Also used for "Related saints".
const SaintSummary = ({ data }: { data: any }) => {
  const { church } = useTradition()
  const mounted = useMounted()
  const saint = data || {}
  const { name, profile_image, summary, slug } = saint
  const feast = feastFor(saint, church)
  const badge = badgeFor(saint, feast, mounted)
  const kicker = [roleLabel(saint.categories), placeLabel(saint)]
    .filter(Boolean)
    .join(' · ')
  const feastLabel = feastShort(feast)
  const facts = [
    yearsLabel(saint.birth_year, saint.death_year),
    churchLabel(saint.venerated_in).replace(
      'Both',
      'Catholic and Orthodox',
    ),
  ].filter(Boolean)
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
        {badge && (
          <span
            className={`${styles.badge} ${badge.feast ? styles.feastBadge : ''}`}
          >
            {badge.label}
          </span>
        )}
      </div>
      <div className={styles.body}>
        {kicker && <div className={styles.kicker}>{kicker}</div>}
        <h3 className={styles.name}>{shortName}</h3>
        {summary && (
          <div
            className={styles.summary}
            dangerouslySetInnerHTML={{ __html: smartQuotes(summary) }}
          />
        )}
        {(feastLabel || facts.length > 0) && (
          <p className={styles.facts}>
            {feastLabel && (
              <b>
                <span className="visually-hidden">Feast day </span>
                {feastLabel}
              </b>
            )}
            {facts.map((fact) => (
              <span key={fact}>{fact}</span>
            ))}
          </p>
        )}
      </div>
    </Link>
  )
}

export default SaintSummary
