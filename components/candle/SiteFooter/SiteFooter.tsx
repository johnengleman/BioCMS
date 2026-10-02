import Link from 'next/link'
import Logo from '../Logo/Logo'
import TraditionControl from '../TraditionControl/TraditionControl'
import { APP_URL } from '../../../utils/site'
import styles from './styles.module.scss'

const COLUMNS = [
  {
    title: 'Explore',
    links: [
      { href: '/saints', label: 'Saints' },
      { href: '/miracles', label: 'Miracles' },
      { href: '/teachings', label: 'Teachings' },
      { href: '/quotes', label: 'Quotes' },
      { href: '/novenas', label: 'Prayers and novenas' },
      { href: '/books', label: 'Books' },
    ],
  },
  {
    title: 'About',
    links: [
      { href: '/about', label: 'About the site' },
      { href: '/updates', label: 'Recent updates' },
    ],
  },
]

// The site footer. It holds the Catholic / Orthodox choice for the
// whole site. The choice is read in the browser (TraditionControl).
const SiteFooter = () => {
  return (
    <footer
      className={styles.footer}
      id="site-footer"
    >
      <div className={styles.inner}>
        <div className={styles.tradition}>
          <div>
            <h2 className={styles.kicker}>Show saints from</h2>
            <p>
              Your choice applies to every page. You can change it at
              any time.
            </p>
          </div>
          <TraditionControl tone="dark" />
        </div>

        <div className={styles.main}>
          <div className={styles.brand}>
            <Logo tone="light" />
            <p>
              The lives, miracles, and prayers of the Catholic and
              Orthodox saints. Every fact has its source.
            </p>
            <a
              href={APP_URL}
              className={styles.app}
            >
              Get the prayer app
            </a>
          </div>
          {COLUMNS.map((column) => (
            <nav
              key={column.title}
              className={styles.column}
              aria-label={column.title}
            >
              <h2 className={styles.kicker}>{column.title}</h2>
              {column.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          ))}
        </div>

        <div className={styles.bottom}>
          <span>© {new Date().getFullYear()} Find a Saint</span>
          <span>
            Saint images and photos are credited where they appear.
          </span>
        </div>
      </div>
    </footer>
  )
}

export default SiteFooter
