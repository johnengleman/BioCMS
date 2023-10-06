import { useEffect } from 'react'
import Cookies from 'js-cookie'
import {
  QueryClient,
  useQuery,
  dehydrate,
} from '@tanstack/react-query'
import { useRouter } from 'next/router'
import styles from './styles.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFaceFrownSlight } from '@fortawesome/pro-duotone-svg-icons'
import Head from 'next/head'
import { getSaints } from '../../queries/getSaints'
import { getSearchData } from '../../queries/getSearchData'
import SaintSummary from '../../components/home/summary/SaintSummary'
import Page from '../../components/page/Page/Page'
import Masonry from 'react-masonry-css'
import useBreakpoints from '../../hooks/useBreakPoints'
import { fetchAPIQuery } from '../../queries/fetchApiQuery'
import Hero from '../../components/home/Hero/Hero'

const Saints = () => {
  const router = useRouter()
  const church = router.query.church || 'all'
  const saintFilter = router.query.filter || 'none'
  const saintPreset = router.query.preset || 'none'
  const sort = router.query.sort || 'chronological-asc'

  const { data, isError, isLoading } = useQuery(
    ['saints', church, saintFilter, saintPreset, sort],
    () =>
      getSaints(
        Array.isArray(church) ? church[0] : church,
        Array.isArray(saintFilter)
          ? saintFilter[0]
          : saintFilter,
        Array.isArray(saintPreset)
          ? saintPreset[0]
          : saintPreset,
        Array.isArray(sort) ? sort[0] : sort,
      ),
    {
      enabled: !!saintFilter || !!church || !!saintPreset, // This ensures the query is run only when the category is available
    },
  )

  const { data: filtersCount } = useQuery(
    ['filters', church],
    () => fetchAPIQuery(`getFilters?church=${church}`),
  )

  const { data: searchData } = useQuery(
    ['search', church],
    () =>
      getSearchData(
        Array.isArray(church) ? church[0] : church,
      ),
  )

  const {
    isMobileS,
    isMobileM,
    isMobileL,
    isTablet,
    isLaptop,
  } = useBreakpoints()

  const getColumnsToRender = () => {
    if (isMobileS || isMobileM) {
      return 1
    }
    if (isMobileL) {
      return 2
    }
    if (isTablet) {
      return 3
    }
    if (isLaptop) {
      return 4
    }
    return 5
  }

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
          content="Roman Catholic, Eastern Orthodox saints, spiritual journeys, miracles, teachings, holy figures, books, Orthodox literature, religious sayings, saintly quotes, Orthodox teachings, church history, faith, spirituality, Christianity"
        />
      </Head>
      <Page searchData={searchData}>
        <Hero filtersCount={filtersCount} />
        {isLoading && (
          <p className="error">Fetching Saints</p>
        )}
        {!isLoading && !data?.length && (
          <p className="error">
            No saints found.{' '}
            <FontAwesomeIcon icon={faFaceFrownSlight} />
          </p>
        )}
        {isError && (
          <p className="error">
            Error.{' '}
            <FontAwesomeIcon icon={faFaceFrownSlight} />
          </p>
        )}
        <div className={styles.saintHome}>
          {data && (
            <Masonry
              breakpointCols={getColumnsToRender()}
              className="my-masonry-grid"
              columnClassName="my-masonry-grid_column"
            >
              {data?.map((saint, i: number) => (
                <SaintSummary
                  {...saint}
                  key={i}
                  transitionName={`saint-${i}`}
                  priority={i < 8 ? true : false}
                />
              ))}
            </Masonry>
          )}
        </div>
      </Page>
    </>
  )
}

export async function getServerSideProps(context) {
  // Get the cookie from the request headers
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
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery(['saints', church], () =>
    getSaints(church),
  )
  await queryClient.prefetchQuery(['search', church], () =>
    getSearchData(church),
  )
  await queryClient.prefetchQuery(['filters', church], () =>
    fetchAPIQuery(`getFilters?church=${church}`),
  )

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

export default Saints
