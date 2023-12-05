import SaintSummary from '../../saint/SaintSummary/SaintSummary'
import BentoSection from '../BentoSection/BentoSection'
import styles from './styles.module.scss'

const SaintDetail = ({ saint, data, link }) => {
  return (
    <div className={styles.saintDetail}>
      <div className={styles.summary}>
        <SaintSummary
          {...saint}
          mini={true}
        />
      </div>
      <div className={styles.teachings}>
        <BentoSection
          data={data}
          link={link}
        />
      </div>
    </div>
  )
}

export default SaintDetail
