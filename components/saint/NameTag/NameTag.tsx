import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCross } from '@fortawesome/pro-duotone-svg-icons'
import styles from './styles.module.scss'

const NameTag = ({
  tags,
  birthYear,
  deathYear,
  header,
}) => {
  return (
    <div className={styles.nameTag}>
      <div>
        <h1 className={styles.name}>{header}</h1>
        <div className={styles.info}>
          <FontAwesomeIcon icon={faCross} />
          <span className={styles.date}>
            {birthYear || '?'}-{deathYear || '?'}
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
    </div>
  )
}

export default NameTag
