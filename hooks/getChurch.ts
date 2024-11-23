import { cookies } from 'next/headers'

export async function getChurch(searchParams: {
  church?: string
}) {
  let church = 'catholic' // Set a default value for church

  try {
    const cookieStore = await cookies()
    const cookie = cookieStore.get('findasaint.com')

    if (cookie) {
      // Parse the cookie value if it exists
      const data = JSON.parse(
        decodeURIComponent(cookie.value),
      )
      church = data.church || church
    } else {
      if (
        searchParams?.church &&
        searchParams.church !== 'all'
      ) {
        church = searchParams.church
      }
    }
  } catch (error) {
    console.error(
      'Error retrieving or parsing church data:',
      error,
    )
  }

  return church
}
