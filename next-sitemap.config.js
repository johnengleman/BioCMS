async function getSlugs() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_DOMAIN}/graphql`,
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
    return []
  }
}

module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL,
  generateRobotsTxt: true, // (optional)
  async additionalPaths(config) {
    const data = await getSlugs()
    const dynamicPaths = data.saints.map((saint) => ({
      loc: `${config.siteUrl}/saints/${saint.slug}`,
      lastmod: new Date().toISOString(),
    }))

    const staticPaths = [
      {
        loc: `${config.siteUrl}/quotes`,
        lastmod: new Date().toISOString(),
      },
      {
        loc: `${config.siteUrl}/books`,
        lastmod: new Date().toISOString(),
      },
    ]

    return [...staticPaths, ...dynamicPaths]
  },
}
