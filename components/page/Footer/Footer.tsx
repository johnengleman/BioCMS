import Link from 'next/link'
import ChurchToggle from '../ChurchToggle/ChurchToggle'
import styles from './styles.module.scss'

const Footer = () => (
  <div className={styles.footer}>
    <div className={styles.content}>
      <div className={`${styles.row} ${styles.left}`}>
        <Link href="/teachings">About</Link>
        <Link href="/teachings">Contact</Link>
      </div>
      <div
        className={`${styles.row} ${styles.center}`}
      ></div>
      <div className={`${styles.row} ${styles.right}`}>
        <ChurchToggle />
      </div>
    </div>
  </div>
)

export default Footer
