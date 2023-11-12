import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCalendarDays,
  faFamily,
} from '@fortawesome/pro-duotone-svg-icons'
import styles from './styles.module.scss'

const monthNames = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

const ExtraInfo = ({ feastDay, patron }) => {
  const date = new Date(feastDay)
  const month = date.getMonth()
  const day = date.getDate()

  return (
    <div className={styles.extraInfo}>
      <div className={styles.row}>
        <FontAwesomeIcon
          icon={faCalendarDays}
          style={{ fontSize: '20px' }}
        />
        <div className={styles.data}>
          {monthNames[month]} {day}
        </div>
      </div>
      {patron && (
        <div className={styles.row}>
          <FontAwesomeIcon
            icon={faFamily}
            style={{ fontSize: '20px' }}
          />
          <div className={styles.data}>{patron}</div>
        </div>
      )}
    </div>
  )
}

export default ExtraInfo
