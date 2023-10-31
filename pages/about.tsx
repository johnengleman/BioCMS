import { useEffect } from 'react'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Page from '../components/page/Page/Page'
import AboutComponent from '../components/global/About/About'
import {
  QueryClient,
  useQuery,
  dehydrate,
} from '@tanstack/react-query'
import { getNav } from '../queries/getNav'
import { getSearchData } from '../queries/getSearchData'

export const config = {
  runtime: 'experimental-edge',
}

const About = () => {
  const router = useRouter()
  const church = Array.isArray(router.query.church)
    ? router.query.church[0]
    : router.query.church || 'all'

  const { data: searchData } = useQuery(
    ['search', church],
    () => getSearchData(church),
  )

  const { data: navData } = useQuery(['nav', church], () =>
    getNav({ church }),
  )

  useEffect(() => {
    const cookie = Cookies.get('findasaint.com')

    if (cookie) {
      try {
        const data = JSON.parse(cookie)

        const newQuery = {
          ...router.query,
          church: data.church,
        }
        router.push(
          {
            pathname: router.pathname,
            query: newQuery,
          },
          undefined,
          { shallow: true },
        )
      } catch (err) {
        console.error(err)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Head>
        <title>
          Browse and discover all the Catholic Saints:
          Spiritual Biographies, Teachings, Sayings,
          Miracles Books, and Quotes
        </title>
        <meta
          key="description"
          name="description"
          content="Explore the lives and legacies of Catholic saints. From teachings to miracles, delve into their spiritual journeys."
        />
        <meta
          name="keywords"
          content="Roman Catholic, spiritual journeys, miracles, teachings, holy figures, books, Orthodox literature, religious sayings, saintly quotes, Orthodox teachings, church history, faith, spirituality, Christianity"
        />
      </Head>
      <Page
        spaceBetween={true}
        searchData={searchData}
        navData={navData}
      >
        <AboutComponent showImage={true} />
      </Page>
    </>
  )
}

export async function getServerSideProps(context) {
  const cookie = context.req.headers.cookie
  let church = 'all'

  if (cookie) {
    const parsedCookie = cookie
      .split('; ')
      .find((row) => row.startsWith('findasaint.com='))
      ?.split('=')[1]

    if (parsedCookie) {
      const data = JSON.parse(
        decodeURIComponent(parsedCookie),
      )
      church = data.church
    }
  }

  // Now use the church value to make the initial data request
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 60 * 1000, // 1 hour in milliseconds
        cacheTime: 60 * 60 * 1000, // 1 hour in milliseconds
      },
    },
  })

  await queryClient.prefetchQuery(['search', church], () =>
    getSearchData(church),
  )

  await queryClient.prefetchQuery(['nav', church], () =>
    getNav({ church }),
  )

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

export default About
