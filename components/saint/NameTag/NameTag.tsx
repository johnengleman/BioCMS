import { FaCross } from 'react-icons/fa6'
import styles from './styles.module.scss'

interface NameTagProps {
  tags?: string[]
  birthYear?: string | number
  deathYear?: string | number
  header: string
  subHeader?: string
  summary: string
}

const NameTag: React.FC<NameTagProps> = ({
  tags,
  birthYear,
  deathYear,
  header,
  subHeader,
  summary,
}) => {
  return (
    <div className={styles.nameTag}>
      <div className={styles.info}>
        <div className={styles.date}>
          <FaCross />
          {birthYear || '?'}-{deathYear || '?'}
        </div>
        <h1 className={styles.name}>{header}</h1>
        {subHeader && (
          <h2 className={styles.subHeader}>{subHeader}</h2>
        )}
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
  )
}

export default NameTag
