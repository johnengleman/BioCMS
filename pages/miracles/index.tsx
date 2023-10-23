import Head from 'next/head'
import { useRouter } from 'next/router'
import {
  dehydrate,
  QueryClient,
  useQuery,
} from '@tanstack/react-query'
import { getMiracles } from '../../queries/getMiracles'
import { getMiraclesFilters } from '../../queries/getMiraclesFilters'
import { getSearchData } from '../../queries/getSearchData'
import { getNav } from '../../queries/getNav'
import Page from '../../components/page/Page/Page'
import ErrorPage from 'next/error'
import SaintDetail from '../../components/global/SaintDetail/SaintDetail'
import styles from './styles.module.scss'
import HeroSimple from '../../components/global/HeroSimple/HeroSimple'

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
  const miraclesPreset = Array.isArray(router.query.preset)
    ? router.query.preset[0]
    : router.query.preset || 'none'

  const { data: searchData } = useQuery(
    ['search', church],
    () => getSearchData(church),
  )

  const { data: navData } = useQuery(['nav', church], () =>
    getNav({ church }),
  )

  const { data: filtersCount } = useQuery(
    ['filters', church],
    () =>
      getMiraclesFilters(
        Array.isArray(church) ? church[0] : church,
      ),
  )

  const { data: miraclesData } = useQuery(
    ['miracles', church, category, miraclesPreset],
    () =>
      getMiracles({
        church,
        category,
        miraclesPreset,
      }),
  )

  if (!router.isFallback && !miraclesData) {
    return <ErrorPage statusCode={404} />
  }

  // const structuredData = {
  //   '@context': 'https://schema.org',
  //   '@type': 'Person',
  //   name: data?.name,
  //   birthDate: data?.birth_year,
  //   deathDate: data?.death_year,
  //   birthPlace: data?.birth_location,
  //   deathPlace: data?.death_location,
  //   description: data?.summary,
  //   affiliation: 'Eastern Orthodox Church',
  // }

  return (
    <>
      <Head>
        <title>
          Teachings of the most influential Catholic Saints
        </title>
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_SITE_URL}/teachings}`}
        />
        <meta
          key="description"
          name="description"
          content={`Discover the teachings of the most influential Catholic Saints`}
        />
        {/* <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        /> */}
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
          {miraclesData.map((miracle, i) => (
            <SaintDetail
              key={i}
              saint={miracle.saint}
              data={miracle.miracles}
              link={`/saints/${miracle.saint.slug}/miracles`}
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
    ['miracles', church, category, miraclesPreset],
    () =>
      getMiracles({
        church,
        category,
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
