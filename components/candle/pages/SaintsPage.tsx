import { getSaints } from '../../../queries/getSaints'
import { getSaintCounts } from '../../../queries/getSaintCounts'
import { getTodaysFeast } from '../../../queries/getTodaysFeast'
import { properties } from '../../../utils/properties'
import SaintsListClient from '../../saint/SaintsList/SaintsListClient'
import SiteHeader from '../SiteHeader/SiteHeader'
import SiteFooter from '../SiteFooter/SiteFooter'
import HomeHero from '../HomeHero/HomeHero'
import Search from '../../page/Search/Search'
import TraditionText from '../TraditionText/TraditionText'
import TraditionWelcome from '../TraditionWelcome/TraditionWelcome'
import { SaintsFilterBar } from '../SaintsFilters/SaintsFilters'
import { DEFAULT_SAINT_SORT } from '../../../utils/listParams'
import styles from '../../../app/saints/candle.module.scss'

const SUBTITLES = {
  all: 'The lives, miracles, and prayers of the Catholic and Orthodox saints.',
  catholic:
    'The lives, miracles, and prayers of the saints of the Catholic Church.',
  orthodox:
    'The lives, miracles, and prayers of the saints of the Orthodox Church.',
}

// "Fathers_of_the_Church" -> "Fathers of the Church"
const label = (value: string) =>
  value
    .replace(/_/g, ' ')
    .replace(/\bOf\b/g, 'of')
    .replace(/\bThe\b/g, 'the')

const CATEGORIES = properties.saints.filters.category.map(
  (c: string) => ({ value: c.toLowerCase(), label: label(c) }),
)

// The saints list, for /saints and for each /saints/category/<name>.
// Built ahead of time for "Both traditions", newest first. The tradition,
// preset, feast month and sort are applied in the browser.
const SaintsPage = async ({ category = '' }: { category?: string }) => {
  const [initialSaints, counts, todays] = await Promise.all([
    getSaints({
      church: 'all',
      filter: category || 'all',
      saintPreset: 'none',
      sort: DEFAULT_SAINT_SORT,
      offset: 0,
      limit: 30,
    }),
    getSaintCounts(),
    getTodaysFeast(),
  ])
  // The day the page was built. The Feast today filter switches to the
  // visitor's own date once the page loads.
  const now = new Date()
  const builtOn = { month: now.getUTCMonth() + 1, day: now.getUTCDate() }

  return (
    <div className={styles.page}>
      <SiteHeader
        active="/saints"
        overlay
        search={false}
      />
      <main>
        <HomeHero
          size="split"
          title="Discover the saints"
          subtitle={
            <TraditionText
              all={SUBTITLES.all}
              catholic={SUBTITLES.catholic}
              orthodox={SUBTITLES.orthodox}
            />
          }
          search={<Search variant="hero" />}
        />
        <SaintsFilterBar
          category={category}
          counts={counts}
          categories={CATEGORIES}
          todays={todays}
          builtOn={builtOn}
        />
        <div className={styles.list}>
          <SaintsListClient
            initialSaints={initialSaints || []}
            category={category}
            todays={todays}
            builtOn={builtOn}
          />
        </div>
      </main>
      <SiteFooter />
      <TraditionWelcome />
    </div>
  )
}

export default SaintsPage
