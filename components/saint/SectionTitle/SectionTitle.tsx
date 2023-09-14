import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft } from '@fortawesome/sharp-solid-svg-icons'
import styles from './styles.module.scss'

const SectionTitle = ({ children, inRightRail }) => (
  <div
    className={`${styles.sectionTitle} ${
      inRightRail ? styles.inRightRail : ''
    }`}
  >
    <h2 className={styles.title}>{children}</h2>
    <FontAwesomeIcon
      icon={faAngleLeft}
      rotation={180}
      size="2xl"
      style={{ color: 'rgba(36, 30, 78, 1)' }}
    />
  </div>
)

export default SectionTitle
