import ImageGlobal from '../../global/ImageGlobal/ImageGlobal'
import Link from 'next/link'
import styles from './styles.module.scss'

const Prayers = ({ allPrayers, saint }) => {
  return (
    <div className={styles.prayers}>
      {allPrayers.map((prayer, i) => (
        <div
          className={styles.prayer}
          key={i}
        >
          <div className={styles.prayerImage}>
            <ImageGlobal
              src={`${process.env.NEXT_PUBLIC_DIRECTUS_ASSETS}/assets/${prayer.prayer_image.id}`}
              fill={true}
            />
          </div>
          <div className={styles.prayerTitle}>
            <p>{prayer.prayer_title}</p>
          </div>
          <div className={styles.days}>
            {prayer.prayers.map((text, i) => (
              <Link
                key={i}
                href={`/saints/${saint}/novenas/${
                  prayer.prayer_slug
                }#heading-${i + 1}`}
              >
                Day {i + 1}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default Prayers
