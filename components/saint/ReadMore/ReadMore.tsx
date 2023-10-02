import styles from './styles.module.scss'

const ReadMore = ({ onClick, readMore }) => (
  <div
    className={styles.readMore}
    onClick={onClick}
  >
    {!readMore ? 'Read More' : 'Collapse'}
  </div>
)

export default ReadMore
