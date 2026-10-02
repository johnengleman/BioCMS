import { properties } from '../../../utils/properties'
import { getQuotesFilters } from '../../../queries/getQuoteFilters'
import { getMiraclesFilters } from '../../../queries/getMiraclesFilters'
import { getTeachingFilters } from '../../../queries/getTeachingFilters'
import { getPrayersFilters } from '../../../queries/getPrayersFilters'
import HomeHero from '../HomeHero/HomeHero'
import FilterPills from '../FilterPills/FilterPills'

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

// The top of a list page: a short photo hero (the photo follows the
// visitor's tradition), the title, and one row of glass filter pills
// with counts. Filters with no items are left out. The tradition
// choice itself is in the site footer.
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
      count: f === 'all' ? undefined : countOf(f),
    }))

  return (
    <HomeHero
      church={church}
      size="short"
      title={title}
      subtitle={subtitle}
      filters={
        pills.length > 1 && (
          <FilterPills
            label={`Filter ${title.toLowerCase()}`}
            pills={pills}
            tone="glass"
          />
        )
      }
    />
  )
}

export default ListHero
