import {
  dehydrate,
  QueryClient,
  useQuery,
} from '@tanstack/react-query'
import Head from 'next/head'
import { Saint } from '../../components/saints/summary/interfaces'
import { getSaints } from '../../queries/getSaints'
import SaintSummary from '../../components/saints/summary/SaintSummary'
import Page from '../../components/global/Page/Page'
import Masonry from 'react-masonry-css'
import useBreakpoints from '../../components/hooks/useBreakPoints'

const Home = () => {
  const { data } = useQuery(['saints'], getSaints)
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

  if (data) {
    return (
      <>
        <Head>
          <title key="title">
            Eastern Orthodox Saints: Spiritual Journeys,
            Books, and Quotes
          </title>
          <meta
            key="description"
            name="description"
            content="Discover the rich histories and inspiring stories of Orthodox saints. Dive deep into their lives, their contributions to the faith, and their enduring legacies. From their teachings to miracles, our comprehensive profiles provide a window into the spiritual journeys of these holy figures"
          />
          <meta
            name="keywords"
            content="Eastern Orthodox, saints, spiritual journeys, miracles, teachings, holy figures, books, Orthodox literature, religious quotes, saintly quotes, Orthodox teachings, church history, faith, spirituality, Christianity"
          />
        </Head>
        <Page>
          <Masonry
            breakpointCols={getColumnsToRender()}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {data?.map((saint, i: number) => (
              <SaintSummary
                {...saint}
                key={i}
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
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery(['saints'], getSaints)

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 60,
  }
}

export default Home
