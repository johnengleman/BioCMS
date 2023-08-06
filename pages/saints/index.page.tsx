import {
  dehydrate,
  QueryClient,
  useQuery,
} from '@tanstack/react-query'
import { Saint } from '../../components/saints/summary/interfaces'
import { getSaints } from '../../queries/getSaints'
import SaintSummary from '../../components/saints/summary/SaintSummary'
import Page from '../../components/global/Page/Page'
import Masonry from 'react-masonry-css'

const Home = () => {
  const { data } = useQuery(['saints'], getSaints)

  if (data) {
    return (
      <Page>
        <Masonry
          breakpointCols={5}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {data?.map((saint: Saint, i: number) => (
            <SaintSummary
              {...saint}
              key={i}
            />
          ))}
        </Masonry>
      </Page>
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
    revalidate: 10,
  }
}

export default Home
