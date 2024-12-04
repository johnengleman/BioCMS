import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCross } from '@fortawesome/pro-duotone-svg-icons'
import styles from './styles.module.scss'

const NameTag = ({
  tags,
  birthYear,
  deathYear,
  header,
  summary,
}) => {
  return (
    <div className={styles.nameTag}>
      <div>
        <div className={styles.info}>
          <div className={styles.date}>
            <FontAwesomeIcon icon={faCross} />
            {birthYear || '?'}-{deathYear || '?'}
          </div>
          <h1 className={styles.name}>{header}</h1>
          <div
            className={styles.summary}
            dangerouslySetInnerHTML={{
              __html: summary,
            }}
          ></div>
          <div className={styles.tags}>
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
    </div>
  )
}

export default NameTag
