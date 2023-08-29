import {
  dehydrate,
  QueryClient,
  useQuery,
} from '@tanstack/react-query'
import { useState } from 'react'
import Head from 'next/head'
import { getSaints } from '../../queries/getSaints'
import SaintSummary from '../../components/saints/summary/SaintSummary'
import Page from '../../components/global/Page/Page'
import Filter from '../../components/global/Filter/Filter'
import Masonry from 'react-masonry-css'
import useBreakpoints from '../../components/hooks/useBreakPoints'
import { fetchAPIQuery } from '../../queries/fetchApiQuery'

const options = [
  'All',
  'Fools-for-Christ',
  'Holy-Women',
  'Hermits',
  'Bishops',
  'Monastics',
  'Confessors',
  'Warriors',
  'Fools-for-Christ',
  'Holy-Women',
  'Hermits',
  'Bishops',
  'Monastics',
  'Confessors',
  'Warriors',
  'Fools-for-Christ',
  'Holy-Women',
  'Hermits',
  'Bishops',
  'Monastics',
  'Confessors',
  'Warriors',
]

const Saints = (props) => {
  const { data } = useQuery(['saints'], getSaints)
  const [filter, setFilter] = useState('All')
  const { mostRecentlyUpdatedSaints } = props
  const {
    isMobileS,
    isMobileM,
    isMobileL,
    isTablet,
    isLaptop,
  } = useBreakpoints()

  console.log(process.env.NEXT_PUBLIC_DOMAIN)

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

  const filterSaints = (saint) => {
    if (filter === 'All') {
      return true
    } else if (
      saint.tags.some(
        (tag) => tag === filter,
      )
    ) {
      return true
    }
    return false
  }

  if (data) {
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
            content="Explore the lives and legacies of Orthodox saints. From teachings to miracles, delve into their spiritual journeys."
          />
          <meta
            name="keywords"
            content="Eastern Orthodox, saints, spiritual journeys, miracles, teachings, holy figures, books, Orthodox literature, religious sayings, saintly quotes, Orthodox teachings, church history, faith, spirituality, Christianity"
          />
        </Head>
        <Page saints={data}>
          {/* <RecentlyUpdated title="Newest Saint Profiles">
            {mostRecentlyUpdatedSaints?.map((saint, i) => (
              <Mini
                key={i}
                {...saint}
              />
            ))}
          </RecentlyUpdated> */}
          <Filter
            setFilter={setFilter}
            selectedFilter={filter}
            options={options}
            title="Explore all the Orthodox Saints"
          />
          <Masonry
            breakpointCols={getColumnsToRender()}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {data
              ?.filter(filterSaints)
              ?.sort((a, b) => a.death_year - b.death_year)
              ?.map((saint, i: number) => (
                <SaintSummary
                  {...saint}
                  key={i}
                  transitionName={`saint-${i}`}
                  priority={i < 8 ? true : false}
                />
              ))}
          </Masonry>
        </Page>
      </>
    )
  }
}

export async function getStaticProps() {
  let mostRecentlyUpdatedSaints
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery(['saints'], getSaints)

  const today = new Date()
  today.setDate(today.getDate() - 14)
  const twoWeeksAgoDateTimeString = today
    .toISOString()
    .slice(0, 19)

  try {
    mostRecentlyUpdatedSaints = await fetchAPIQuery(
      'getMostRecentlyUpdatedSaints',
    )
  } catch (error) {
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
