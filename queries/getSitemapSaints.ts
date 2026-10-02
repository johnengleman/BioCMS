import fetchHelper from './fetchHelper'

type Dated = { date_updated?: string; date_created?: string }

export type SitemapSaint = Dated & {
  slug: string
  miracles_func?: { count: number }
  teachings_func?: { count: number }
  miracles: Dated[]
  teachings: Dated[]
  prayers: (Dated & { prayer_slug: string })[]
}

// Every saint with the dates of their content, for the sitemap.
// limit: -1 means all (Directus returns only 100 rows by default).
export const getSitemapSaints = async (): Promise<SitemapSaint[]> => {
  try {
    const response = await fetchHelper<{ saints: SitemapSaint[] }>({
      query: `query getSitemapSaints {
        saints(limit: -1) {
          slug
          date_updated
          date_created
          miracles { date_updated date_created }
          miracles_func { count }
          teachings { date_updated date_created }
          teachings_func { count }
          prayers { date_updated date_created prayer_slug }
        }
      }`,
    })
    return response?.data?.saints || []
  } catch (error) {
    console.error('Error fetching saints for the sitemap:', error)
    return []
  }
}
