import styles from './styles.module.scss'

const SectionTitle = ({ children }) => {
  return (
    <div className={styles.sectionTitle}>
      <div
        className={`${styles.line} ${styles.line1}`}
      ></div>
      <div className={styles.title}>{children}</div>
      <div
        className={`${styles.line} ${styles.line2}`}
      ></div>
    </div>
  )
}

export default SectionTitle
