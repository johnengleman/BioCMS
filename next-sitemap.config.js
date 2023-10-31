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
                miracles {
                  date_updated
                }
                miracles_func {
                  count
                }
                teachings {
                  date_updated
                }
                teachings_func {
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
  async additionalPaths(config) {
    const data = await getSlugs()
    const dynamicPaths = data.saints.flatMap((saint) => {
      const baseLoc = `${config.siteUrl}/saints/${saint.slug}`
      const paths = [
        {
          loc: baseLoc,
          lastmod: saint.date_updated,
        },
        {
          loc: `${baseLoc}/biography`,
          lastmod: saint.date_updated,
        },
      ];

      ['teachings', 'miracles'].forEach((key) => {
        if (saint[`${key}_func`].count) {
          paths.push({
            loc: `${baseLoc}/${key}`,
            lastmod: saint[key][0].date_updated,
          })
        }
      })

      return paths
    })

    return [...dynamicPaths]
  },
}
