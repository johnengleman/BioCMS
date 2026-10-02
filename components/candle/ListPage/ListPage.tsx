import type { ReactNode } from 'react'
import SiteHeader from '../SiteHeader/SiteHeader'
import SiteFooter from '../SiteFooter/SiteFooter'
import ListHero from '../ListHero/ListHero'
import styles from './styles.module.scss'

// The frame of a site-wide list page (teachings, miracles, quotes,
// novenas): header, hero with filters, the list and the footer.
const ListPage = ({
  kind,
  path,
  title,
  subtitle,
  church,
  filter,
  searchParams,
  children,
}: {
  kind: 'teachings' | 'miracles' | 'quotes' | 'prayers'
  path: string
  title: string
  subtitle: string
  church: string
  filter: string
  searchParams: any
  children: ReactNode
}) => (
  <div className={styles.page}>
    <SiteHeader
      searchParams={searchParams}
      active={path}
    />
    <main>
      <ListHero
        kind={kind}
        path={path}
        title={title}
        subtitle={subtitle}
        church={church}
        filter={filter}
      />
      <div className={styles.list}>{children}</div>
    </main>
    <SiteFooter church={church} />
  </div>
)

export default ListPage
