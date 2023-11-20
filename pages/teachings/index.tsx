import Head from 'next/head'
import { useRouter } from 'next/router'
import {
  dehydrate,
  QueryClient,
  useQuery,
} from '@tanstack/react-query'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFaceFrownSlight } from '@fortawesome/pro-duotone-svg-icons'
import { getTeachings } from '../../queries/getTeachings'
import { getSearchData } from '../../queries/getSearchData'
import { getNav } from '../../queries/getNav'
import Page from '../../components/page/Page/Page'
import ErrorPage from 'next/error'
import SaintDetail from '../../components/global/SaintDetail/SaintDetail'
import HeroSimple from '../../components/global/HeroSimple/HeroSimple'
import { getTeachingFilters } from '../../queries/getTeachingFilters'
import capitalize from '../../utils/capitalize'
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
      getTeachingFilters(
        Array.isArray(church) ? church[0] : church,
      ),
    {
      initialData: {},
    },
  )

  const {
    data: teachingsData,
    isFetching,
    isError,
  } = useQuery(
    ['teachings', church, filter],
    () =>
      getTeachings({
        church,
        filter,
      }),
    {
      initialData: [],
    },
  )

  if (!router.isFallback && !teachingsData) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <>
      <Head>
        <title>
          {`Journey through Christian History: Teachings &
          Legacies of Catholic and Orthodox Saints ${
            filter === 'all'
              ? `from the
          Apostolic to Modern Era`
              : `in the ${capitalize(filter)}`
          }`}
        </title>
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_SITE_URL}/teachings`}
        />
        <meta
          key="description"
          name="description"
          content={`Embark on a spiritual exploration of Catholic and Orthodox saints ${
            filter === 'all'
              ? `from the Apostolic Era to the present`
              : `in the ${capitalize(filter)}`
          }. Our site delves into the Patristic Age, navigates the Medieval period, crosses the Late Medieval/Pre-Renaissance era, and embraces Modern and Contemporary insights. Discover the profound teachings and enduring legacies of revered saints across centuries. Uncover the rich tapestry of Christian wisdom and faith through history.`}
        />
        <meta
          name="keywords"
          content="Apostolic Era saints, Patristic Age, Medieval Christian saints, Late Medieval saints, Modern Christian saints, Orthodox teachings, Catholic legacies, Christian history, spiritual teachings, saint biographies, religious wisdom, faith through ages, Christian spirituality, historical saints"
        />
      </Head>
      <Page
        searchData={searchData}
        navData={navData}
      >
        <HeroSimple
          title="Teachings & Legacy"
          filtersCount={filtersCount}
          type="teachings"
        />
        <div className={styles.page}>
          {isFetching ? (
            <p className="status">Fetching teachings...</p>
          ) : isError ? (
            <p className="status">
              Error.{' '}
              <FontAwesomeIcon icon={faFaceFrownSlight} />
            </p>
          ) : !isFetching && teachingsData?.length ? (
            teachingsData.map((teaching, i) => (
              <SaintDetail
                key={i}
                saint={teaching.saint}
                data={teaching.teachings}
                link={`/saints/${teaching.saint.slug}/teachings`}
              />
            ))
          ) : (
            <p className="status">
              No teachings found.{' '}
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
  const filter = context.query.filter || 'all'
  const teachingPreset = context.query.preset || 'none'
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
    ['teachings', church, filter],
    () =>
      getTeachings({
        church,
        filter,
      }),
  )

  await queryClient.prefetchQuery(['filters', church], () =>
    getTeachingFilters(church),
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
