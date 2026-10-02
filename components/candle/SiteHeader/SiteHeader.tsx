import Link from 'next/link'
import Search from '../../page/Search/Search.server'
import Logo from '../Logo/Logo'
import ScrollState from './ScrollState'
import { APP_URL } from '../../../utils/site'
import styles from './styles.module.scss'

const LINKS = [
  { href: '/saints', label: 'Saints' },
  { href: '/miracles', label: 'Miracles' },
  { href: '/novenas', label: 'Novenas' },
  { href: '/teachings', label: 'Teachings' },
  { href: '/quotes', label: 'Quotes' },
  { href: '/books', label: 'Books' },
]

const MORE = [
  { href: '/about', label: 'About' },
  { href: '/updates', label: 'Recent updates' },
]

const SearchIcon = () => (
  <svg
    width="19"
    height="19"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.9"
    strokeLinecap="round"
    aria-hidden="true"
  >
    <circle
      cx="11"
      cy="11"
      r="7"
    />
    <path d="M20 20l-4-4" />
  </svg>
)

const PhoneIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    aria-hidden="true"
  >
    <rect
      x="6"
      y="2.5"
      width="12"
      height="19"
      rx="2.5"
    />
    <path d="M11 18h2" />
  </svg>
)

// The site header. By default it is a frosted bar at the top of the
// page. With `overlay`, it sits over a hero photo with light text and
// glass controls, and turns into the frosted bar once the visitor
// scrolls (see ScrollState).
const SiteHeader = ({
  searchParams,
  active,
  overlay = false,
}: {
  searchParams: any
  active?: string
  overlay?: boolean
}) => (
  <>
    {overlay && <ScrollState />}
    <header
      className={`${styles.header} ${overlay ? styles.overlay : ''}`}
    >
      <div className={styles.row}>
        <span className={styles.logoDark}>
          <Logo />
        </span>
        {overlay && (
          <span className={styles.logoLight}>
            <Logo tone="light" />
          </span>
        )}

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

        <div className={styles.tools}>
          <a
            href={APP_URL}
            className={styles.app}
          >
            <PhoneIcon />
            <span>Get the app</span>
          </a>

          <details className={styles.panel}>
            <summary aria-label="Search saints">
              <SearchIcon />
            </summary>
            <div
              className={`${styles.panelBody} ${styles.searchPanel}`}
            >
              <Search searchParams={searchParams} />
            </div>
          </details>

          {/* Phones and tablets: the menu opens as a panel. */}
          <details className={`${styles.panel} ${styles.menu}`}>
            <summary aria-label="Menu">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
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
  </>
)

export default SiteHeader
