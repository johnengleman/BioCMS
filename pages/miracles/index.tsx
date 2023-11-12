import Head from 'next/head'
import { useRouter } from 'next/router'
import {
  dehydrate,
  QueryClient,
  useQuery,
} from '@tanstack/react-query'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFaceFrownSlight } from '@fortawesome/pro-duotone-svg-icons'
import { getMiracles } from '../../queries/getMiracles'
import { getMiraclesFilters } from '../../queries/getMiraclesFilters'
import { getSearchData } from '../../queries/getSearchData'
import { getNav } from '../../queries/getNav'
import Page from '../../components/page/Page/Page'
import ErrorPage from 'next/error'
import SaintDetail from '../../components/global/SaintDetail/SaintDetail'
import HeroSimple from '../../components/global/HeroSimple/HeroSimple'
import useCookie from '../../hooks/useCookie'
import styles from './styles.module.scss'

export const config = {
  runtime: 'experimental-edge',
}

const Teachings = () => {
  useCookie()
  const router = useRouter()
  const church = Array.isArray(router.query.church)
    ? router.query.church[0]
    : router.query.church || 'all'
  const filter = Array.isArray(router.query.filter)
    ? router.query.filter[0]
    : router.query.filter || 'none'
  const miraclesPreset = Array.isArray(router.query.preset)
    ? router.query.preset[0]
    : router.query.preset || 'none'

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

  const { data: filtersCount } = useQuery(
    ['filters', church],
    () =>
      getMiraclesFilters(
        Array.isArray(church) ? church[0] : church,
      ),
    {
      initialData: {},
    },
  )

  const {
    data: miraclesData,
    isError,
    isFetching,
  } = useQuery(
    ['miracles', church, filter, miraclesPreset],
    () =>
      getMiracles({
        church,
        filter,
        miraclesPreset,
      }),
    {
      initialData: [],
    },
  )

  if (!router.isFallback && !miraclesData) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <>
      <Head>
        <title>
          Miracles of the most influential Catholic Saints
        </title>
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_SITE_URL}/miracles`}
        />
        <meta
          key="description"
          name="description"
          content="Discover the most famous miracles of Roman Catholic Saints"
        />
      </Head>
      <Page
        searchData={searchData}
        navData={navData}
      >
        <HeroSimple
          title="Miracles"
          filtersCount={filtersCount}
        />
        <div className={styles.miracles}>
          {isFetching ? (
            <p className="status">Fetching miracles...</p>
          ) : isError ? (
            <p className="status">
              Error.{' '}
              <FontAwesomeIcon icon={faFaceFrownSlight} />
            </p>
          ) : !isFetching && miraclesData?.length ? (
            miraclesData.map((miracle, i) => (
              <SaintDetail
                key={i}
                saint={miracle.saint}
                data={miracle.miracles}
                link={`/saints/${miracle.saint.slug}/miracles`}
              />
            ))
          ) : (
            <p className="status">
              No miracles found.{' '}
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
  const miraclesPreset = context.query.preset || 'none'
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
    ['miracles', church, filter, miraclesPreset],
    () =>
      getMiracles({
        church,
        filter,
        miraclesPreset,
      }),
  )

  await queryClient.prefetchQuery(['filters', church], () =>
    getMiraclesFilters(church),
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

export default Teachings
