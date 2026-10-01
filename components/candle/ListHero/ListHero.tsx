import { properties } from '../../../utils/properties'
import { getQuotesFilters } from '../../../queries/getQuoteFilters'
import { getMiraclesFilters } from '../../../queries/getMiraclesFilters'
import { getTeachingFilters } from '../../../queries/getTeachingFilters'
import { getPrayersFilters } from '../../../queries/getPrayersFilters'
import PhotoHero from '../PhotoHero/PhotoHero'
import FilterPills from '../FilterPills/FilterPills'
import TraditionControl from '../TraditionControl/TraditionControl'
import styles from './styles.module.scss'

type Kind = 'teachings' | 'miracles' | 'quotes' | 'prayers'

const COUNTS = {
  teachings: getTeachingFilters,
  miracles: getMiraclesFilters,
  quotes: getQuotesFilters,
  prayers: getPrayersFilters,
}

// "apostolic_era" -> "Apostolic era"
const label = (value: string) => {
  const text = value.replace(/_/g, ' ')
  return text.charAt(0).toUpperCase() + text.slice(1)
}

// The top of a list page: title over the candlelight photo, the
// tradition control and one row of filter pills. Filters with no
// items are left out.
const ListHero = async ({
  kind,
  path,
  title,
  subtitle,
  church,
  filter,
}: {
  kind: Kind
  path: string
  title: string
  subtitle: string
  church: string
  filter: string
}) => {
  const counts =
    (await COUNTS[kind](church))?.[church]?.none || {}
  const countOf = (f: string) =>
    counts?.[f]?.[0]?.count?.id || 0

  const pills = (properties[kind]?.filters || [])
    .filter(
      (f: string) =>
        f === 'all' || f === filter || countOf(f) > 0,
    )
    .map((f: string) => ({
      key: f,
      label: f === 'all' ? 'All' : label(f),
      href: f === 'all' ? path : `${path}?filter=${f}`,
      selected: filter === f,
    }))

  return (
    <PhotoHero>
      <div className={styles.titleRow}>
        <div>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.subtitle}>{subtitle}</p>
        </div>
        <div className={styles.tradition}>
          <TraditionControl church={church} />
        </div>
      </div>
      {pills.length > 1 && (
        <div className={styles.pills}>
          <FilterPills
            label={`Filter ${title.toLowerCase()}`}
            pills={pills}
          />
        </div>
      )}
    </PhotoHero>
  )
}

export default ListHero
