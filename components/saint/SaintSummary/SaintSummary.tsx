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
import styles from './styles.module.scss'

const ArrowIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    aria-hidden="true"
  >
    <path d="M7 17L17 7M9 7h8v8" />
  </svg>
)

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
  if (saint.death_year >= 1900)
    return { label: '20th century', feast: false }
  return null
}

// A saint in the waterfall ("Travel" design): a dark card with a fixed
// 16:10 image at the top, so photographs and icons look like one set.
// Below it: role and place, the name, the saint's summary, and three
// facts. Also used for "Related saints".
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
  const facts = [
    { label: 'Feast', value: feastShort(feast) },
    {
      label: 'Lived',
      value: yearsLabel(saint.birth_year, saint.death_year),
    },
    { label: 'Church', value: churchLabel(saint.venerated_in) },
  ].filter((fact) => fact.value)
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
        <h3 className={styles.name}>{name}</h3>
        {summary && (
          <div
            className={styles.summary}
            dangerouslySetInnerHTML={{ __html: summary }}
          />
        )}
        <div className={styles.facts}>
          {facts.map((fact) => (
            <div key={fact.label}>
              <small>{fact.label}</small>
              <span>{fact.value}</span>
            </div>
          ))}
          <span className={styles.go}>
            <ArrowIcon />
          </span>
        </div>
      </div>
    </Link>
  )
}

export default SaintSummary
