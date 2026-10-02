import { properties } from './utils/properties.js'

// Old filter links (/miracles?filter=modern_era) moved to real pages
// (/miracles/era/modern_era). Only known values are redirected.
const either = (values) => values.map((v) => v.toLowerCase()).join('|')
const queryIs = (key, name, values) => [
  { type: 'query', key, value: `(?<${name}>${either(values)})` },
]

const categories = properties.saints.filters.category
const months = properties.saints.filters.month

// path, the word in the new address, the old query key, the filters
const LISTS = [
  ['/miracles', 'era', properties.miracles.filters],
  ['/teachings', 'era', properties.teachings.filters],
  ['/quotes', 'topic', properties.quotes.filters],
  ['/novenas', 'topic', properties.prayers.filters],
]

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  sassOptions: {
    silenceDeprecations: ['legacy-js-api'],
  },
  async redirects() {
    return [
      // The home page is the saints list.
      { source: '/', destination: '/saints', permanent: false },

      {
        source: '/saints',
        has: queryIs('filter', 'category', categories),
        destination: '/saints/category/:category',
        permanent: true,
      },
      {
        source: '/saints',
        has: queryIs('filter', 'month', months),
        // Next.js keeps the old query, so without this the redirect
        // would match its own result again and loop.
        missing: [{ type: 'query', key: 'month' }],
        destination: '/saints?month=:month',
        permanent: true,
      },
      ...LISTS.map(([path, word, filters]) => ({
        source: path,
        has: queryIs(
          'filter',
          'filter',
          filters.filter((f) => f !== 'all'),
        ),
        destination: `${path}/${word}/:filter`,
        permanent: true,
      })),
      {
        source: '/books',
        has: queryIs('preset', 'genre', properties.books.presets),
        destination: '/books/genre/:genre',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
