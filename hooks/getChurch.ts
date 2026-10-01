import { cookies } from 'next/headers'

const CHURCHES = ['catholic', 'orthodox', 'all']

// The visitor's tradition: the ?church= address parameter first (so
// shared links show what the sender saw), then the saved cookie, then
// Catholic.
export async function getChurch(searchParams: {
  church?: string
}) {
  const fromUrl = searchParams?.church
  if (fromUrl && CHURCHES.includes(fromUrl)) return fromUrl

  try {
    const cookieStore = await cookies()
    const cookie = cookieStore.get('findasaint.com')
    if (cookie) {
      const data = JSON.parse(decodeURIComponent(cookie.value))
      if (CHURCHES.includes(data.church)) return data.church
    }
  } catch (error) {
    console.error('Error retrieving or parsing church data:', error)
  }

  return 'catholic'
}
