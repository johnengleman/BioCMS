import { getSaints } from '../../../queries/getSaints'
import { getSaintCounts } from '../../../queries/getSaintCounts'
import { getTodaysFeast } from '../../../queries/getTodaysFeast'
import { properties } from '../../../utils/properties'
import SaintsListClient from '../../saint/SaintsList/SaintsListClient'
import SiteHeader from '../SiteHeader/SiteHeader'
import SiteFooter from '../SiteFooter/SiteFooter'
import HomeHero from '../HomeHero/HomeHero'
import Search from '../../page/Search/Search'
import FeastsToday from '../FeastsToday/FeastsToday'
import TraditionText from '../TraditionText/TraditionText'
import TraditionWelcome from '../TraditionWelcome/TraditionWelcome'
import {
  SaintsCount,
  SaintsMenus,
  SaintsPills,
} from '../SaintsFilters/SaintsFilters'
import { DEFAULT_SAINT_SORT } from '../../../utils/listParams'
import styles from '../../../app/saints/candle.module.scss'

const SUBTITLES = {
  all: 'The lives, miracles, and prayers of the Catholic and Orthodox saints. Every fact has its source.',
  catholic:
    'The lives, miracles, and prayers of the saints of the Catholic Church. Every fact has its source.',
  orthodox:
    'The lives, miracles, and prayers of the saints of the Orthodox Church. Every fact has its source.',
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
  // The day the page was built; FeastsToday switches to the visitor's
  // own date once it loads.
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
        <FeastsToday
          saints={todays}
          builtOn={builtOn}
        />
        <div className={styles.toolbar}>
          <SaintsPills
            category={category}
            counts={counts}
            categories={CATEGORIES}
            tone="light"
          />
          <SaintsMenus
            category={category}
            className={styles.menus}
          />
        </div>
        <SaintsCount
          category={category}
          counts={counts}
          className={styles.count}
        />
        <div className={styles.list}>
          <SaintsListClient
            initialSaints={initialSaints || []}
            category={category}
          />
        </div>
      </main>
      <SiteFooter />
      <TraditionWelcome />
    </div>
  )
}

export default SaintsPage
