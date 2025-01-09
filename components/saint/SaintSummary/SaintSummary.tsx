import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCross,
  faCalendarDays,
} from '@fortawesome/pro-duotone-svg-icons'
import { formatDate } from '../../../utils/dates'
import Image from 'next/image'
import styles from './styles.module.scss'

const SaintSummary = ({ data }) => {
  const {
    name,
    birth_year,
    death_year,
    profile_image,
    categories,
    summary,
    feast_day_catholic,
    feast_day_orthodox,
    slug,
    priority,
    mini,
  } = data || {}

  const getYear = (date: string): number => {
    const newDate = new Date(date)
    return newDate.getFullYear()
  }

  return (
    <Link
      className={`${styles.saintSummary} ${
        mini ? styles.mini : ''
      }`}
      href={`/saints/${slug}`}
    >
      <div className={styles.death}>
        <FontAwesomeIcon icon={faCross} />
        {birth_year || '?'}-{death_year || '?'}
      </div>
      <div className={styles.image}>
        <Image
          alt={
            profile_image?.description ||
            `Image the catholic saint ${name}`
          }
          src={`${process.env.NEXT_PUBLIC_DIRECTUS_ASSETS}/assets/${profile_image?.id}?key=summary`}
          fill={true}
          priority={priority}
        />
      </div>
      <div className={styles.bioContainer}>
        <div className={styles.name}>{name}</div>
        <div className={styles.tags}>
          {categories?.map((category, index) => (
            <div
              key={index}
              className={styles.tag}
            >
              {category}
            </div>
          ))}
        </div>
        {summary && (
          <div
            className={styles.summary}
            dangerouslySetInnerHTML={{
              __html: summary,
            }}
          ></div>
        )}
        <div className={styles.feastDays}>
          {feast_day_catholic && (
            <div className={styles.feastDay}>
              <FontAwesomeIcon icon={faCalendarDays} />
              Catholic: {formatDate(feast_day_catholic)}
            </div>
          )}
          {feast_day_orthodox && (
            <div className={styles.feastDay}>
              <FontAwesomeIcon icon={faCalendarDays} />
              Orthodox: {formatDate(feast_day_orthodox)}
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}

export default SaintSummary
