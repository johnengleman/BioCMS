import type { MetadataRoute } from 'next'

const site = process.env.NEXT_PUBLIC_SITE_URL

const robots = (): MetadataRoute.Robots => ({
  // The API is for the site's own pages, not for crawlers.
  rules: { userAgent: '*', allow: '/', disallow: '/api/' },
  host: site,
  sitemap: `${site}/sitemap.xml`,
})

export default robots
