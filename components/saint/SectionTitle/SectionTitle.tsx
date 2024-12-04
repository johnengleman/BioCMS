import { ReactNode } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft } from '@fortawesome/sharp-solid-svg-icons'
import styles from './styles.module.scss'

const SectionTitle = ({
  children,
  inRightRail,
  id,
  dataSection,
  border,
}: {
  children: ReactNode
  id: string
  dataSection: string
  inRightRail?: boolean
  border?: boolean
}) => (
  <div
    id={id}
    data-section={dataSection}
    className={`${styles.sectionTitle} ${
      inRightRail ? styles.inRightRail : ''
    } ${border ? styles.border : ''}`}
  >
    <h2 className={styles.title}>{children}</h2>
  </div>
)

export default SectionTitle
