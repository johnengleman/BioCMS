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
import { properties } from '../../utils/properties'
import ScrollUp from '../../components/global/ScrollUp/ScrollUp'
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
    : router.query.filter || 'all'

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
      onSuccess: () => {
        if (filter !== 'all') {
          const element = document.getElementById('toggle')
          element?.scrollIntoView()
        }
      },
      initialData: [],
    },
  )

  if (!router.isFallback && !prayersData) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <>
      <Head>
        <title>
          {`Comprehensive Collection of Novenas${
            filter !== 'all'
              ? ` for ${properties.saints.title[filter]}`
              : ''
          }: Prayers to
          All Saints`}
        </title>
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_SITE_URL}/novenas`}
        />
        <meta
          key="description"
          name="description"
          content={`Explore our extensive collection of novenas${
            filter !== 'all'
              ? ` for ${properties.saints.title[filter]}`
              : ''
          }, offering powerful prayers to a diverse array of saints. Whether seeking intercession, guidance, or spiritual growth, find the perfect novena to deepen your faith journey. Our resource includes novenas for every occasion and saint, providing a rich tapestry of devotion and tradition in the Catholic and Orthodox faiths.`}
        />
        <meta
          name="keywords"
          content="novenas collection, saint prayers, catholic novenas, orthodox novenas, spiritual novenas, prayer intercession, saints devotion, novena prayers, religious novenas, comprehensive novena list, Christian prayers, faith journey, religious traditions, prayer guidance"
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
          <ScrollUp />
        </div>
      </Page>
    </>
  )
}

export const getServerSideProps = async (context) => {
  const queryClient = new QueryClient()
  const filter = context.query.filter || 'all'
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
