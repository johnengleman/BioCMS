import SaintSummary from '../../saint/SaintSummary/SaintSummary'
import NovenaSection from '../NovenaSection/NovenaSection'
import styles from './styles.module.scss'

const NovenaDetail = (props) => {
  const { prayers, prayer_slug, saint } = props

  return (
    <div className={styles.novenaDetail}>
      <div className={styles.summary}>
        <SaintSummary {...saint} />
      </div>
      <div className={styles.teachings}>
        <NovenaSection
          prayers={prayers}
          prayersSlug={prayer_slug}
          saintSlug={saint.slug}
        />
      </div>
    </div>
  )
}

export default NovenaDetail
