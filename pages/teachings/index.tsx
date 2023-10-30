import Head from 'next/head'
import { useRouter } from 'next/router'
import {
  dehydrate,
  QueryClient,
  useQuery,
} from '@tanstack/react-query'
import { getTeachings } from '../../queries/getTeachings'
import { getSearchData } from '../../queries/getSearchData'
import { getNav } from '../../queries/getNav'
import Page from '../../components/page/Page/Page'
import ErrorPage from 'next/error'
import SaintDetail from '../../components/global/SaintDetail/SaintDetail'
import HeroSimple from '../../components/global/HeroSimple/HeroSimple'
import { getTeachingFilters } from '../../queries/getTeachingFilters'
import styles from './styles.module.scss'

export const config = {
  runtime: 'experimental-edge',
}

const Teachings = () => {
  const router = useRouter()
  const church = Array.isArray(router.query.church)
    ? router.query.church[0]
    : router.query.church || 'all'
  const category = Array.isArray(router.query.filter)
    ? router.query.filter[0]
    : router.query.filter || 'none'
  const teachingPreset = Array.isArray(router.query.preset)
    ? router.query.preset[0]
    : router.query.preset || 'none'
  const sort = router.query.sort || 'date-asc'

  const { data: searchData } = useQuery(
    ['search', church],
    () =>
      getSearchData(
        Array.isArray(church) ? church[0] : church,
      ),
  )

  const { data: navData } = useQuery(['nav', church], () =>
    getNav({ church }),
  )

  const { data: filtersCount } = useQuery(
    ['filters', church],
    () =>
      getTeachingFilters(
        Array.isArray(church) ? church[0] : church,
      ),
  )

  const { data: teachingsData } = useQuery(
    ['teachings', church, category, teachingPreset, sort],
    () =>
      getTeachings({
        church,
        category,
        teachingPreset,
      }),
  )

  if (!router.isFallback && !teachingsData) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <>
      <Head>
        <title>
          Teachings of the most influential Roman Catholic
          Saints
        </title>
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_SITE_URL}/teachings}`}
        />
        <meta
          key="description"
          name="description"
          content="Discover the most famous teachings of Roman Catholic Saints"
        />
      </Head>
      <Page
        searchData={searchData}
        navData={navData}
      >
        <HeroSimple
          title="Teachings"
          filtersCount={filtersCount}
        />
        <div className={styles.teachings}>
          {teachingsData.map((teaching, i) => (
            <SaintDetail
              key={i}
              saint={teaching.saint}
              data={teaching.teachings}
              link={`/saints/${teaching.saint.slug}/teachings`}
            />
          ))}
        </div>
      </Page>
    </>
  )
}

export const getServerSideProps = async (context) => {
  const queryClient = new QueryClient()
  const category = context.query.filter || 'none'
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
    ['teachings', church, category, teachingPreset],
    () =>
      getTeachings({
        church,
        category,
        teachingPreset,
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
