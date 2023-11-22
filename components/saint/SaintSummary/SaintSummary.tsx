import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCross,
  faCalendarDays,
} from '@fortawesome/pro-duotone-svg-icons'
import { formatDate } from '../../../utils/dates'
import ImageGlobal from '../../global/ImageGlobal/ImageGlobal'
import useBreakpoints from '../../../hooks/useBreakPoints'
import styles from './styles.module.scss'

const SaintSummary = (props) => {
  const {
    name,
    birth_year,
    death_year,
    profile_image,
    categories,
    summary,
    feast_day,
    slug,
    priority,
    transitionName,
  } = props

  const { isLaptop } = useBreakpoints()

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
        {birth_year || '?'}-{death_year || '?'}
      </div>
      <div className={styles.image}>
        <ImageGlobal
          alt={
            profile_image?.description ||
            `Image the catholic saint ${name}`
          }
          src={`${process.env.NEXT_PUBLIC_DIRECTUS_ASSETS}/assets/${profile_image.id}?key=summary`}
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
            __html: summary,
          }}
        ></div>
        <div className={styles.footer}>
          {isLaptop && (
            <button className={styles.btn}>
              <div className={styles.btnContent}>
                {feast_day && (
                  <div className={styles.feastDay}>
                    <FontAwesomeIcon
                      icon={faCalendarDays}
                      fontSize="xs"
                    />
                    {formatDate(feast_day)}
                  </div>
                )}
                <span className={styles.readMore}>
                  Read More
                </span>
              </div>
            </button>
          )}
          {!isLaptop && (
            <>
              <button className={styles.btn}>
                <div className={styles.btnContent}>
                  {feast_day && (
                    <div className={styles.feastDay}>
                      <FontAwesomeIcon
                        icon={faCalendarDays}
                        fontSize="xs"
                      />
                      {formatDate(feast_day)}
                    </div>
                  )}
                </div>
              </button>
              <button className={styles.btn}>
                <div className={styles.btnContent}>
                  <span className={styles.readMore}>
                    Read More
                  </span>
                </div>
              </button>
            </>
          )}
        </div>
      </div>
    </Link>
  )
}

export default SaintSummary
