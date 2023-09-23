import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCross } from '@fortawesome/pro-duotone-svg-icons'
import styles from './styles.module.scss'

const NameTag = ({ name, tags, birthYear, deathYear }) => {
  return (
    <div className={styles.nameTag}>
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
  )
}

export default NameTag
