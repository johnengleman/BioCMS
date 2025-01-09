import SaintSummary from '../../saint/SaintSummary/SaintSummary'
import NovenaSection from '../NovenaSection/NovenaSection'
import styles from './styles.module.scss'

const NovenaDetail = ({ index, data, width }) => {
  const { prayers, prayer_slug, saint } = data || {}

  return (
    <div className={styles.novenaDetail}>
      <div className={styles.summary}>
        <SaintSummary
          {...saint}
          mini={true}
        />
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
