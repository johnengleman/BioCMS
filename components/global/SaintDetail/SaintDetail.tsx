import SaintSummary from '../../saint/SaintSummary/SaintSummary'
import BentoSection from '../BentoSection/BentoSection'
import styles from './styles.module.scss'

const SaintDetail = ({ data }) => {
  const { teachings, saint, link } = data || {}

  return (
    <div className={styles.saintDetail}>
      <div className={styles.summary}>
        <SaintSummary data={{ ...saint, mini: true }} />
      </div>
      <div className={styles.teachings}>
        <BentoSection
          data={teachings}
          link={link}
        />
      </div>
    </div>
  )
}

export default SaintDetail
