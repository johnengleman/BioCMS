import Link from 'next/link'
import styles from './styles.module.scss'

const SiteFooter = () => (
  <footer className={styles.footer}>
    <div className={styles.row}>
      <div>
        <Link
          href="/saints"
          className={styles.wordmark}
        >
          Find a Saint
        </Link>
        <p className={styles.tagline}>
          Lives, miracles and prayers of the Catholic and
          Orthodox saints.
        </p>
      </div>
      <nav
        className={styles.links}
        aria-label="Footer"
      >
        <Link href="/saints">Saints</Link>
        <Link href="/miracles">Miracles</Link>
        <Link href="/teachings">Teachings</Link>
        <Link href="/quotes">Quotes</Link>
        <Link href="/books">Books</Link>
        <Link href="/novenas">Novenas</Link>
        <Link href="/about">About</Link>
        <Link href="/updates">Recent updates</Link>
      </nav>
    </div>
  </footer>
)

export default SiteFooter
