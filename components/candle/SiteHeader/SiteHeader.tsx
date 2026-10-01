import Link from 'next/link'
import Search from '../../page/Search/Search.server'
import styles from './styles.module.scss'

const LINKS = [
  { href: '/saints', label: 'Saints' },
  { href: '/miracles', label: 'Miracles' },
  { href: '/teachings', label: 'Teachings' },
  { href: '/quotes', label: 'Quotes' },
  { href: '/books', label: 'Books' },
]

const MORE = [
  { href: '/novenas', label: 'Novenas' },
  { href: '/about', label: 'About' },
  { href: '/updates', label: 'Recent updates' },
]

// The frosted navigation bar. It sits over the candlelight photo at
// the top of a page and stays at the top while scrolling.
const SiteHeader = ({
  searchParams,
  active,
}: {
  searchParams: any
  active?: string
}) => (
  <header className={styles.header}>
    <div className={styles.row}>
      <Link
        href="/saints"
        className={styles.wordmark}
      >
        Find a Saint
      </Link>

      <nav
        className={styles.nav}
        aria-label="Main"
      >
        {LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            aria-current={
              active === link.href ? 'page' : undefined
            }
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <div className={styles.search}>
        <Search searchParams={searchParams} />
      </div>

      {/* Phones: search and menu open as panels below the bar. */}
      <div className={styles.phoneTools}>
        <details className={styles.panel}>
          <summary aria-label="Search">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              aria-hidden="true"
            >
              <circle
                cx="11"
                cy="11"
                r="7"
              />
              <path d="M20 20l-4-4" />
            </svg>
          </summary>
          <div
            className={`${styles.panelBody} ${styles.searchPanel}`}
          >
            <Search searchParams={searchParams} />
          </div>
        </details>
        <details className={styles.panel}>
          <summary aria-label="Menu">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              aria-hidden="true"
            >
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </summary>
          <nav
            className={styles.panelBody}
            aria-label="Main"
          >
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={styles.panelLink}
                aria-current={
                  active === link.href ? 'page' : undefined
                }
              >
                {link.label}
              </Link>
            ))}
            <hr />
            {MORE.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={styles.panelLinkSmall}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </details>
      </div>
    </div>
  </header>
)

export default SiteHeader
