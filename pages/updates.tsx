import { useRouter } from 'next/router'
import Head from 'next/head'
import Page from '../components/page/Page/Page'
import {
  QueryClient,
  useQuery,
  dehydrate,
} from '@tanstack/react-query'
import { getNav } from '../queries/getNav'
import { getSearchData } from '../queries/getSearchData'
import { getUpdates } from '../queries/getUpdates'
import useCookie from '../hooks/useCookie'
import Update from '../components/global/Update/Update'

export const config = {
  runtime: 'experimental-edge',
}

const About = () => {
  useCookie()
  const router = useRouter()
  const church = Array.isArray(router.query.church)
    ? router.query.church[0]
    : router.query.church || 'all'

  const { data: searchData } = useQuery(
    ['search', church],
    () => getSearchData(church),
    {
      initialData: [],
    },
  )

  const { data: navData } = useQuery(
    ['nav', church],
    () => getNav({ church }),
    {
      initialData: {},
    },
  )

  const { data: updateData } = useQuery(
    ['updates'],
    () => getUpdates(),
    {
      initialData: [],
    },
  )

  console.log(updateData)

  return (
    <>
      <Head>
        <title>Updates</title>
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_SITE_URL}/about`}
        />
        <meta
          key="description"
          name="description"
          content="Explore the lives and legacies of Catholic saints. From teachings to miracles, delve into their spiritual journeys."
        />
        <meta
          name="keywords"
          content="Roman Catholic, spiritual journeys, miracles, teachings, holy figures, books, Orthodox literature, religious quotes, saintly quotes, Orthodox teachings, church history, faith, spirituality, Christianity"
        />
      </Head>
      <Page
        spaceBetween={true}
        searchData={searchData}
        navData={navData}
      >
        {updateData.map((update, i) => (
          <Update
            key={i}
            {...update}
          />
        ))}
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

  await queryClient.prefetchQuery(['updates'], () =>
    getUpdates(),
  )

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

export default About
