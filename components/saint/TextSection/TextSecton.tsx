import styles from './styles.module.scss'

const TextSection = ({ title, text }) => {
  if (!text) {
    return null
  }

  return (
    <div className={styles.textSection}>
      <h2 className="title">{title}</h2>
      <div
        className="text"
        dangerouslySetInnerHTML={{
          __html: text,
        }}
      ></div>
    </div>
  )
}

export default TextSection
