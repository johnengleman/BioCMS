import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCross,
  faDove,
  faCalendarDays,
} from '@fortawesome/pro-duotone-svg-icons'
import styles from './styles.module.scss'

const NameTag = ({
  name,
  tags,
  birthYear,
  deathYear,
  feastDay,
}) => {
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

  const date = new Date(feastDay)
  const month = date.getMonth()
  const day = date.getDate()

  return (
    <div className={styles.nameTag}>
      <div>
        <h1 className={styles.name}>Who was {name}?</h1>
        <div className={styles.info}>
          <FontAwesomeIcon icon={faCross} />
          <span className={styles.date}>
            {birthYear}-{deathYear}
          </span>
          {tags?.map((tag, i) => (
            <div
              key={i}
              className={styles.tag}
            >
              {tag.replace(/-/g, ' ')}
            </div>
          ))}
        </div>
      </div>

      {day && month && (
        <div className={styles.feastDay}>
          <div className={styles.row}>
            <div className={styles.day}>{day}</div>
          </div>
          <div className={styles.month}>
            {monthNames[month]}
          </div>
          {/* <FontAwesomeIcon icon={faCalendarDays} size='sm' /> */}
        </div>
      )}
    </div>
  )
}

export default NameTag
