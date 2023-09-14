import styles from './styles.module.scss'

const Summary = ({ summary }) => (
  <div
    className={styles.summary}
    dangerouslySetInnerHTML={{
      __html: summary,
    }}
  ></div>
)

export default Summary
