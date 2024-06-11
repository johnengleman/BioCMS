import SaintSummary from '../../saint/SaintSummary/SaintSummary'
import BentoSection from '../BentoSection/BentoSection'
import ImageGlobal from '../ImageGlobal/ImageGlobal'
import styles from './styles.module.scss'

const SaintDetail = ({ saint, data, link }) => {
  return (
    <div className={styles.saintDetail}>
      <div className={styles.header}>
        <div className={styles.image}>
          <ImageGlobal
            alt={
              saint.profile_image?.description ||
              `Image the saint ${saint.name}`
            }
            src={`${process.env.NEXT_PUBLIC_DIRECTUS_ASSETS}/assets/${saint.profile_image.id}?key=summary`}
            fill={true}
          />
        </div>
        <div className={styles.content}>
          <div className={styles.row}>
            <h2>{saint.name}</h2>
            <div className={styles.death}>
              ({saint.birth_year || '?'}-
              {saint.death_year || '?'})
            </div>
          </div>

          <div className={styles.tags}>
            {saint.categories?.map((category, index) => (
              <div
                key={index}
                className={styles.tag}
              >
                {category}
              </div>
            ))}
          </div>
          <p
            dangerouslySetInnerHTML={{
              __html: saint.summary,
            }}
          ></p>
        </div>
      </div>
    </div>
  )
}

export default SaintDetail
