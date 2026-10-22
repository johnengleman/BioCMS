'use client'

import Link from 'next/link'
import { useTradition } from '../../../hooks/useTradition'
import {
  cardSummary,
  placeLabel,
  roleLabel,
  yearsLabel,
} from '../../../utils/saintCard'
import { formatFeast, splitSaintName } from '../../../utils/saintNames'
import smartQuotes from '../../../utils/smartQuotes'
import styles from './styles.module.scss'

const LONG_NAME = 28

// A saint in the waterfall (design v4): a night card, portrait first,
// the feast day as an inscription above the name, then role, place and
// years, and the first two or three sentences of the summary. The
// summaries differ in length, so the cards differ in height and the
// waterfall stays organic. Also used for "Related saints".
const SaintSummary = ({ data }: { data: any }) => {
  const saint = data || {}
  const { church } = useTradition()
  const { name, profile_image, summary, slug } = saint
  const meta = [
    yearsLabel(saint.birth_year, saint.death_year),
    roleLabel(saint.categories),
    placeLabel(saint),
  ]
    .filter(Boolean)
    .join(' · ')
  const catholic = formatFeast(saint.feast_day_catholic)
  const orthodox = formatFeast(saint.feast_day_orthodox)
  const feast =
    church === 'orthodox' ? orthodox || catholic : catholic || orthodox
  const shortName =
    name?.length > LONG_NAME ? splitSaintName(name).title : name
  const position =
    profile_image?.metadata?.object_position || 'center 20%'
  const excerpt = cardSummary(summary)

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
            height={960}
            loading="lazy"
            style={{ objectPosition: position }}
          />
        )}
      </div>
      <div className={styles.body}>
        {feast && (
          <p className={styles.feast}>
            <span className="visually-hidden">Feast day </span>
            {feast}
          </p>
        )}
        <h3 className={styles.name}>{shortName}</h3>
        {meta && <p className={styles.meta}>{meta}</p>}
        {excerpt && (
          <p className={styles.summary}>{smartQuotes(excerpt)}</p>
        )}
      </div>
    </Link>
  )
}

export default SaintSummary
