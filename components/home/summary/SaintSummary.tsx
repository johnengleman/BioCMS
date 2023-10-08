import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCross } from '@fortawesome/pro-duotone-svg-icons'
import {
  faBooks,
  faCommentQuote,
  faStarChristmas,
  faPersonPraying,
} from '@fortawesome/sharp-solid-svg-icons'
import ImageGlobal from '../../global/ImageGlobal/ImageGlobal'
import styles from './styles.module.scss'

export default function SaintSummary(props) {
  const {
    name,
    birth_year,
    death_year,
    images,
    categories,
    summary,
    sayings,
    books,
    slug,
    priority,
    transitionName,
  } = props

  const getYear = (date: string): number => {
    const newDate = new Date(date)
    return newDate.getFullYear()
  }

  return (
    <Link
      className={styles.saintSummary}
      href={`/saints/${slug}`}
      style={{ viewTransitionName: transitionName }}
    >
      <div className={styles.death}>
        <FontAwesomeIcon icon={faCross} />
        {death_year}
      </div>
      <div className={styles.image}>
        <ImageGlobal
          alt={
            images[0]?.directus_files_id?.description ||
            `Image of ${name}, the eastern orthodox saint`
          }
          src={`${process.env.NEXT_PUBLIC_DIRECTUS_ASSETS}/assets/${images[0]?.directus_files_id.id}?key=summary`}
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
        <div
          className={styles.summary}
          dangerouslySetInnerHTML={{
            __html: summary.concat('<span>..</span>'),
          }}
        ></div>
        <div className={styles.footer}>
          <div className={styles.count}>
            <FontAwesomeIcon
              icon={faBooks}
              style={{ color: '#555555' }}
            />
            <span className={styles.number}>
              {books?.length}
            </span>
          </div>
          <div className={styles.count}>
            <FontAwesomeIcon
              icon={faStarChristmas}
              style={{ color: '#555555' }}
            />
            <span className={styles.number}>
              {books?.length}
            </span>
          </div>
          <div className={styles.count}>
            <FontAwesomeIcon
              icon={faCommentQuote}
              style={{ color: '#555555' }}
            />
            <span className={styles.number}>
              {sayings?.length}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
