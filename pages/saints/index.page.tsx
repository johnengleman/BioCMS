import Link from 'next/link'
import {
  dehydrate,
  QueryClient,
  useQuery,
} from '@tanstack/react-query'
import { Saint } from '../../components/saints/summary/interfaces'
import { getSaints } from '../../queries/getSaints'
import SaintSummary from '../../components/saints/summary/SaintSummary'
import Page from '../../components/global/Page/Page'

const Home = () => {
  const { data } = useQuery(['saints'], getSaints)

  return (
    <Page>
      {data?.map((saint: Saint, i: number) => (
        <Link
          key={i}
          href={`/saints/${saint?.id}`}
        >
          <SaintSummary {...saint} />
        </Link>
      ))}
    </Page>
  )
}

export async function getServerSideProps() {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery(['saints'], getSaints)

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

export default Home
