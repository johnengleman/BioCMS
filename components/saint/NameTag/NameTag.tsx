import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCross } from '@fortawesome/pro-duotone-svg-icons'
import styles from './styles.module.scss'

const NameTag = ({
  name,
  tags,
  birthYear,
  deathYear,
  type,
}) => {
  const header = {
    bio: 'Who was ',
    teachings: 'What were the teachings of ',
    miracles: 'What were the miracles of',
    legacy: 'What was the legacy of',
  }

  return (
    <div className={styles.nameTag}>
      <div>
        <h1 className={styles.name}>
          {header[type]} {name}?
        </h1>
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
