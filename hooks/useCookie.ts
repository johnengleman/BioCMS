import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export const useCookie = async (req: NextRequest) => {
  const cookieStore = await cookies()
  const cookie = cookieStore.get('findasaint')

  if (cookie) {
    try {
      const data = JSON.parse(cookie.value)

      const newQuery = {
        ...req.nextUrl.searchParams,
        church: data.church,
      }

      const url = new URL(req.nextUrl.toString())
      url.search = new URLSearchParams(newQuery).toString()

      return NextResponse.redirect(url, { status: 302 })
    } catch (err) {
      console.error(err)
      return NextResponse.error()
    }
  }

  return NextResponse.next()
}

export default useCookie
