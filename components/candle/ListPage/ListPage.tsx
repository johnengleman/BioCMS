import type { ReactNode } from 'react'
import SiteHeader from '../SiteHeader/SiteHeader'
import SiteFooter from '../SiteFooter/SiteFooter'
import ListHero from '../ListHero/ListHero'
import { TraditionShowing } from '../TraditionText/TraditionText'
import TraditionWelcome from '../TraditionWelcome/TraditionWelcome'
import type { ListKind } from '../../../utils/listParams'
import styles from './styles.module.scss'

// The frame of a site-wide list page (teachings, miracles, quotes,
// novenas): header, hero with filters, the list and the footer.
const ListPage = ({
  kind,
  path,
  title,
  subtitle,
  filter,
  children,
}: {
  kind: ListKind
  path: string
  title: string
  subtitle: string
  filter: string
  children: ReactNode
}) => (
  <div className={styles.page}>
    <SiteHeader
      active={path}
      overlay
    />
    <main>
      <ListHero
        kind={kind}
        title={title}
        subtitle={subtitle}
        filter={filter}
      />
      <p className={styles.showing}>
        <TraditionShowing />
      </p>
      <div className={styles.list}>{children}</div>
    </main>
    <SiteFooter />
    <TraditionWelcome />
  </div>
)

export default ListPage
