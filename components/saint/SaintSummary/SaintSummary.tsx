import Link from 'next/link'
import Image from 'next/image'
import { splitSaintName } from '../../../utils/saintNames'
import styles from './styles.module.scss'

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

// Reads "2000-07-02" as text, so the day never shifts with time zones.
const formatFeast = (date?: string | null) => {
  const match = date?.match(/^\d{4}-(\d{2})-(\d{2})/)
  return match
    ? `${MONTHS[Number(match[1]) - 1]} ${Number(match[2])}`
    : ''
}

// A saint in the waterfall (Candlelight design): the icon in a slim
// gilded frame, then the feast date, name, years and a short summary.
const SaintSummary = ({ data }) => {
  const {
    name,
    birth_year,
    death_year,
    profile_image,
    summary,
    feast_day_catholic,
    feast_day_orthodox,
    slug,
    priority,
  } = data || {}

  const feast =
    formatFeast(feast_day_catholic) ||
    formatFeast(feast_day_orthodox)
  const years =
    birth_year || death_year
      ? `${birth_year || '?'}–${death_year || '?'}`
      : ''
  // Long names: "St. John Maximovitch" large, "of Shanghai and San
  // Francisco" small. Short names ("St. Thérèse of Lisieux") stay whole.
  const LONG_NAME = 28
  const parts = splitSaintName(name)
  const title =
    name?.length > LONG_NAME ? parts.title : name
  const place =
    name?.length > LONG_NAME ? parts.subtitle : ''

  // Keep each icon's own shape, within limits, so cards vary in height.
  const ratio =
    profile_image?.width && profile_image?.height
      ? Math.min(
          1.5,
          Math.max(
            0.9,
            profile_image.height / profile_image.width,
          ),
        )
      : 1.25

  return (
    <Link
      className={styles.saintSummary}
      href={`/saints/${slug}`}
    >
      {profile_image?.id && (
        <div className={styles.frame}>
          <Image
            alt={
              profile_image?.description ||
              `Image of the saint ${name}`
            }
            src={`${process.env.NEXT_PUBLIC_DIRECTUS_ASSETS}/assets/${profile_image?.id}?width=500&format=webp&quality=80`}
            width={400}
            height={Math.round(400 * ratio)}
            style={{ aspectRatio: `1 / ${ratio}` }}
            priority={priority}
          />
        </div>
      )}
      <div className={styles.bioContainer}>
        {feast && (
          <div className={styles.feast}>{feast}</div>
        )}
        <div className={styles.name}>{title}</div>
        {place && (
          <div className={styles.place}>{place}</div>
        )}
        {years && (
          <div className={styles.years}>{years}</div>
        )}
        {summary && (
          <div
            className={styles.summary}
            dangerouslySetInnerHTML={{
              __html: summary,
            }}
          ></div>
        )}
      </div>
    </Link>
  )
}

export default SaintSummary
