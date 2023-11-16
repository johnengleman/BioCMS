import Head from 'next/head'
import { useRouter } from 'next/router'
import {
  dehydrate,
  QueryClient,
  useQuery,
} from '@tanstack/react-query'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFaceFrownSlight } from '@fortawesome/pro-duotone-svg-icons'
import { getPrayers } from '../../queries/getPrayers'
import { getPrayersFilters } from '../../queries/getPrayersFilters'
import { getSearchData } from '../../queries/getSearchData'
import { getNav } from '../../queries/getNav'
import Page from '../../components/page/Page/Page'
import NovenaDetail from '../../components/novenas/NovenaDetail/NovenaDetail'
import ErrorPage from 'next/error'
import HeroSimple from '../../components/global/HeroSimple/HeroSimple'
import useCookie from '../../hooks/useCookie'
import styles from './styles.module.scss'

export const config = {
  runtime: 'experimental-edge',
}

const NovenasPage = () => {
  useCookie()
  const router = useRouter()
  const church = Array.isArray(router.query.church)
    ? router.query.church[0]
    : router.query.church || 'all'
  const filter = Array.isArray(router.query.filter)
    ? router.query.filter[0]
    : router.query.filter || 'none'

  const { data: searchData } = useQuery(
    ['search', church],
    () =>
      getSearchData(
        Array.isArray(church) ? church[0] : church,
      ),
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

  const { data: filtersCount } = useQuery(
    ['filters', church],
    () =>
      getPrayersFilters(
        Array.isArray(church) ? church[0] : church,
      ),
    {
      initialData: {},
    },
  )

  const {
    data: prayersData,
    isFetching,
    isError,
  } = useQuery(
    ['novenas', church, filter],
    () =>
      getPrayers({
        church,
        filter,
      }),
    {
      initialData: [],
    },
  )

  if (!router.isFallback && !prayersData) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <>
      <Head>
        <title>Roman Catholic Novenas</title>
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_SITE_URL}/novenas`}
        />
        <meta
          key="description"
          name="description"
          content="Roman Catholic Novenas"
        />
      </Head>
      <Page
        searchData={searchData}
        navData={navData}
      >
        <HeroSimple
          title="Novenas"
          type="prayers"
          filtersCount={filtersCount}
        />
        <div className={styles.page}>
          {isFetching ? (
            <p className="status">Fetching novenas...</p>
          ) : isError ? (
            <p className="status">
              Error.{' '}
              <FontAwesomeIcon icon={faFaceFrownSlight} />
            </p>
          ) : !isFetching && prayersData?.length ? (
            prayersData.map((prayer, i) => (
              <NovenaDetail
                key={i}
                {...prayer}
              />
            ))
          ) : (
            <p className="status">
              No novenas found.{' '}
              <FontAwesomeIcon icon={faFaceFrownSlight} />
            </p>
          )}
        </div>
      </Page>
    </>
  )
}

export const getServerSideProps = async (context) => {
  const queryClient = new QueryClient()
  const filter = context.query.filter || 'none'
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

  await queryClient.prefetchQuery(['search', church], () =>
    getSearchData(church),
  )

  await queryClient.prefetchQuery(
    ['prayers', church, filter],
    () =>
      getPrayers({
        church,
        filter,
      }),
  )

  await queryClient.prefetchQuery(['filters', church], () =>
    getPrayersFilters(church),
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

export default NovenasPage
