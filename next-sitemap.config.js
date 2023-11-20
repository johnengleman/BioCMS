const { properties } = require('./utils/properties')

async function getSlugs() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT}/graphql`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `
            query {
              saints {
                slug
                date_updated
                date_created
                venerated_in
                miracles {
                  date_updated
                  date_created
                }
                miracles_func {
                  count
                }
                teachings {
                  date_updated
                  date_created
                }
                teachings_func {
                  count
                }
                prayers {
                  date_updated
                  date_created
                  prayer_slug
                }
                prayers_func {
                  count
                }
               }
             }
          `,
        }),
      },
    )

    if (res.ok) {
      const json = await res.json()
      return json.data
    } else {
      console.error(
        'Failed to fetch saints:',
        await res.text(),
      )
      return []
    }
  } catch (error) {
    console.error('Error fetching saints:', error)
    return []
  }
}

module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL,
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  async additionalPaths(config) {
    const data = await getSlugs()
    const dynamicPaths = data.saints.flatMap((saint) => {
      const baseLoc = `${config.siteUrl}/saints/${saint.slug}`
      const paths = [
        {
          loc: baseLoc,
          lastmod: saint.date_updated || saint.date_created,
        },
        {
          loc: `${baseLoc}/biography`,
          lastmod: saint.date_updated || saint.date_created,
        },
      ]

      ;['teachings', 'miracles'].forEach((key) => {
        if (saint[`${key}_func`].count) {
          paths.push({
            loc: `${baseLoc}/${key}`,
            lastmod:
              saint[key][0].date_updated ||
              saint[key][0].date_created,
          })
        }
      })

      return paths
    })

    const prayers = data.saints.flatMap((saint) => {
      const baseLoc = `${config.siteUrl}/saints/${saint.slug}`
      const paths = []

      saint.prayers.forEach((prayer) => {
        const useNovenas =
          saint.venerated_in[0] === 'roman-catholic'
        paths.push({
          loc: `${baseLoc}/${
            useNovenas ? 'novenas' : 'prayers'
          }/${prayer.prayer_slug}`,
          lastmod:
            prayer.date_updated || prayer.date_created,
        })
      })

      return paths
    })

    const teachingsPaths = properties.teachings.filters.map(
      (filter) => {
        const baseLoc = `${config.siteUrl}`

        return {
          loc: `${baseLoc}/teachings?filter=${filter.toLowerCase()}`,
          lastmod: new Date().toISOString(),
        }
      },
    )

    const miraclesPaths = properties.miracles.filters.map(
      (filter) => {
        const baseLoc = `${config.siteUrl}`

        return {
          loc: `${baseLoc}/miracles?filter=${filter.toLowerCase()}`,
          lastmod: new Date().toISOString(),
        }
      },
    )

    const prayersPaths = properties.prayers.filters.map(
      (filter) => {
        const baseLoc = `${config.siteUrl}`

        return {
          loc: `${baseLoc}/novenas?filter=${filter.toLowerCase()}`,
          lastmod: new Date().toISOString(),
        }
      },
    )

    const quotesPaths = properties.quotes.filters.map(
      (filter) => {
        const baseLoc = `${config.siteUrl}`

        return {
          loc: `${baseLoc}/quotes?filter=${filter.toLowerCase()}`,
          lastmod: new Date().toISOString(),
        }
      },
    )

    const categoryPaths =
      properties.saints.filters.category.map((filter) => {
        const baseLoc = `${config.siteUrl}`

        return {
          loc: `${baseLoc}/?filter=${filter.toLowerCase()}`,
          lastmod: new Date().toISOString(),
        }
      })

    const monthPaths = properties.saints.filters.month.map(
      (filter) => {
        const baseLoc = `${config.siteUrl}`

        return {
          loc: `${baseLoc}/?filter=${filter.toLowerCase()}`,
          lastmod: new Date().toISOString(),
        }
      },
    )

    const booksPaths = properties.books.presets.map(
      (filter) => {
        const baseLoc = `${config.siteUrl}`

        return {
          loc: `${baseLoc}/books?filter=${filter.toLowerCase()}`,
          lastmod: new Date().toISOString(),
        }
      },
    )

    return [
      ...dynamicPaths,
      ...teachingsPaths,
      ...miraclesPaths,
      ...prayersPaths,
      ...prayers,
      ...quotesPaths,
      ...categoryPaths,
      ...monthPaths,
      ...booksPaths,
    ]
  },
}
