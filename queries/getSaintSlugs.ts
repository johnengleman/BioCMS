import fetchHelper from './fetchHelper'

// How many saint pages are built ahead of time. Other saints are built
// the first time someone opens them, then cached like the rest.
export const PREBUILT_SAINTS = 200

// Slugs of the most recently updated saints, for generateStaticParams.
// If Directus is down at build time, nothing is prebuilt and every
// saint page is built on first visit instead of failing the build.
export const getSaintSlugs = async (
  limit: number = PREBUILT_SAINTS,
): Promise<string[]> => {
  try {
    const response = await fetchHelper<{
      saints: { slug: string }[]
    }>({
      query: `query getSaintSlugs($limit: Int!) {
        saints(limit: $limit, sort: "-date_updated") { slug }
      }`,
      variables: { limit },
    })
    return (response?.data?.saints || [])
      .map((saint) => saint.slug)
      .filter(Boolean)
  } catch {
    return []
  }
}
