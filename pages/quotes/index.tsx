import Head from 'next/head'
import { useRouter } from 'next/router'
import {
  dehydrate,
  QueryClient,
  useQuery,
} from '@tanstack/react-query'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFaceFrownSlight } from '@fortawesome/pro-duotone-svg-icons'
import { getQuotes } from '../../queries/getQuotes'
import { getSearchData } from '../../queries/getSearchData'
import { getNav } from '../../queries/getNav'
import Page from '../../components/page/Page/Page'
import ErrorPage from 'next/error'
import HeroSimple from '../../components/global/HeroSimple/HeroSimple'
import { getQuotesFilters } from '../../queries/getQuoteFilters'
import Quotes from '../../components/saint/Quotes/Quotes'
import useCookie from '../../hooks/useCookie'
import capitalize from '../../utils/capitalize'
import styles from './styles.module.scss'

export const config = {
  runtime: 'experimental-edge',
}

const QuotesPage = () => {
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
      getQuotesFilters(
        Array.isArray(church) ? church[0] : church,
      ),
    {
      initialData: {},
    },
  )

  const {
    data: quoteData,
    isFetching,
    isError,
  } = useQuery(
    ['quotes', church, filter],
    () =>
      getQuotes({
        church,
        filter,
      }),
    {
      onSuccess: () => {
        const element = document.getElementById('toggle')
        element?.scrollIntoView()
      },
      initialData: [],
    },
  )

  if (!router.isFallback && !quoteData) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <>
      <Head>
        <title>
          {`Inspirational Quotes ${
            filter === 'all'
              ? ''
              : `about ${capitalize(filter)}`
          } by Catholic and Orthodox
          Saints: Wisdom on Faith, Love, Prayer, and More`}
        </title>
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_SITE_URL}/quotes`}
        />
        <meta
          key="description"
          name="description"
          content={`Explore a curated collection of profound quotes ${
            filter === 'all'
              ? ''
              : `about ${capitalize(filter)}`
          } by Catholic and Orthodox saints, covering a spectrum of spiritual themes including faith, hope, love, prayer, charity, and more. Our resource allows you to filter quotes by topics like suffering, forgiveness, humility, joy, wisdom, and numerous others, helping you find the perfect words of wisdom for any moment in your spiritual journey. Dive into the depths of saintly insights and be inspired.`}
        />
        <meta
          name="keywords"
          content="saint quotes, spiritual wisdom, faith quotes, hope quotes, love quotes, prayer quotes, charity quotes, suffering wisdom, forgiveness insights, humility quotes, peace and joy, wisdom from saints, patience and courage, gratitude sayings, justice and truth, mercy in words, devotion and unity, passions and Mary, saints on sin, inspirational quotes, religious quotes, Christian wisdom"
        />
      </Head>
      <Page
        searchData={searchData}
        navData={navData}
      >
        <HeroSimple
          title="Quotes"
          type="quotes"
          filtersCount={filtersCount}
        />
        <div className={styles.quotes}>
          {isFetching ? (
            <p className="status">Fetching quotes...</p>
          ) : isError ? (
            <p className="status">
              Error.{' '}
              <FontAwesomeIcon icon={faFaceFrownSlight} />
            </p>
          ) : !isFetching && quoteData?.length ? (
            <Quotes
              quotes={quoteData}
              showAuthor={true}
            />
          ) : (
            <p className="status">
              No quotes found.{' '}
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
    ['quotes', church, filter],
    () =>
      getQuotes({
        church,
        filter,
      }),
  )

  await queryClient.prefetchQuery(['filters', church], () =>
    getQuotesFilters(church),
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

export default QuotesPage
