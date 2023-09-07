import {
  dehydrate,
  QueryClient,
  useQuery,
} from '@tanstack/react-query'
import { useRouter } from 'next/router'
import * as S from './styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFaceFrownSlight } from '@fortawesome/pro-duotone-svg-icons'
import Head from 'next/head'
import { getSaints } from '../../queries/getSaints'
import SaintSummary from '../../components/saints/summary/SaintSummary'
import Page from '../../components/page/Page/Page'
import Filter from '../../components/global/Filter/Filter'
import Masonry from 'react-masonry-css'
import useBreakpoints from '../../hooks/useBreakPoints'
import { fetchAPIQuery } from '../../queries/fetchApiQuery'
import { properties } from '../../properties'

const Saints = (props) => {
  const router = useRouter()
  const church = router.query.church || 'all'
  const saintCategory = router.query.category || 'all'
  const sort = router.query.sort || 'chronological-asc'

  const { data, isError, isLoading } = useQuery(
    ['saints', church, saintCategory, sort],
    () =>
      getSaints(
        Array.isArray(church) ? church[0] : church,
        Array.isArray(saintCategory)
          ? saintCategory[0]
          : saintCategory,
        Array.isArray(sort) ? sort[0] : sort,
      ),
    {
      enabled: !!saintCategory || !!church, // This ensures the query is run only when the category is available
    },
  )

  const { mostRecentlyUpdatedSaints } = props
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

  const handleSetSaintCategory = (category) => {
    const newQuery = {
      ...router.query,
      category: category.toLowerCase(),
    }
    router.push(
      {
        pathname: router.pathname,
        query: newQuery,
      },
      undefined,
      { shallow: true },
    )
  }

  return (
    <>
      <Head>
        <title key="title">
          Eastern Orthodox Saints: Spiritual Biographies,
          Books, and Quotes
        </title>
        <meta
          key="description"
          name="description"
          content="Explore the lives and legacies of Catholic and Orthodox saints. From teachings to miracles, delve into their spiritual journeys."
        />
        <meta
          name="keywords"
          content="Eastern Orthodox, saints, spiritual journeys, miracles, teachings, holy figures, books, Orthodox literature, religious sayings, saintly quotes, Orthodox teachings, church history, faith, spirituality, Christianity"
        />
      </Head>
      <Page saints={data}>
        <Filter
          setFilter={(church) =>
            handleSetSaintCategory(church)
          }
          selectedFilter={saintCategory}
          options={properties.saintCategories}
          title={
            properties[
              !Array.isArray(church) ? church : 'all'
            ].filterTitle
          }
        />
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
      </Page>
    </>
  )
}

export async function getStaticProps({ query }) {
  const church = query?.church || 'all'
  const saintCategory = query?.category || 'all'
  const sort = query?.sort || 'chronological-asc'
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery(
    ['saints', church, saintCategory, sort],
    () => getSaints(church, saintCategory, sort),
  )

  let mostRecentlyUpdatedSaints

  try {
    mostRecentlyUpdatedSaints = await fetchAPIQuery(
      'getMostRecentlyUpdatedSaints',
    )
  } catch (error) {
    console.log(error)
    mostRecentlyUpdatedSaints = []
  }

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      mostRecentlyUpdatedSaints,
    },
    revalidate: 60,
  }
}

export default Saints
