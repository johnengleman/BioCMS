import styles from './styles.module.scss'

export default function QuoteSummary(props) {
  const { text, topics, author, source } = props

  return (
    <div className={styles.quoteSummary}>
      {topics && <div className="topic">{topics}</div>}
      <p className="text">{text}</p>
      <p className="source">{author.name}</p>
    </div>
  )
}
