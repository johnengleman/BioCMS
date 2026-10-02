import type { ListKind } from '../../../utils/listParams'

// The words and settings of each site-wide list page.
export const LIST_CONFIG: Record<
  ListKind,
  {
    title: string
    subtitle: string
    metaTitle: string
    metaDescription: string
    pageSize: number
    noun: string
    // "era" or "topic": what the filter is called in the empty text.
    filterWord: string
  }
> = {
  miracles: {
    title: 'Miracles',
    subtitle:
      'Healings and wonders attributed to the saints, with their sources.',
    metaTitle:
      'Miracles of the Saints: Catholic & Orthodox Wonders',
    metaDescription:
      'Explore miracles of Catholic and Orthodox saints through history, from the Patristic Age to the Modern era.',
    pageSize: 6,
    noun: 'miracles',
    filterWord: 'era',
  },
  teachings: {
    title: 'Teachings',
    subtitle:
      'What the saints taught, in their own words and through their lives.',
    metaTitle: 'Christian Saints: Legacy & Teachings Explored',
    metaDescription:
      'Explore teachings and legacies of Catholic and Orthodox saints from the Apostolic to Modern era.',
    pageSize: 6,
    noun: 'teachings',
    filterWord: 'era',
  },
  quotes: {
    title: 'Quotes',
    subtitle:
      'Words of the saints on faith, prayer, love and suffering.',
    metaTitle:
      'Quotes from the Saints: Wisdom on Faith, Love & Prayer',
    metaDescription:
      'Discover inspirational quotes from Catholic and Orthodox saints. Explore their wisdom on faith, love and prayer.',
    pageSize: 30,
    noun: 'quotes',
    filterWord: 'topic',
  },
  prayers: {
    title: 'Novenas',
    subtitle:
      'Nine days of prayer, asking the saints for their help.',
    metaTitle: 'Novenas to the Saints: Nine Days of Prayer',
    metaDescription:
      'Pray novenas to the Catholic and Orthodox saints, one day at a time.',
    pageSize: 12,
    noun: 'novenas',
    filterWord: 'topic',
  },
}
