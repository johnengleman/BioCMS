import {
  dehydrate,
  QueryClient,
  useQuery,
} from '@tanstack/react-query'
import { Church } from '../../components/churches/ChurchSummary/interface'
import { getChurches } from '../../queries/getChurches'
import ChurchSummary from '../../components/churches/ChurchSummary/ChurchSummary'
import Page from '../../components/global/Page/Page'

const Home = () => {
  const { data } = useQuery(['churches'], getChurches)

  if (data) {
    return (
      <Page>
        {data?.map((church: Church, i: number) => (
          <ChurchSummary
            key={i}
            {...church}
          />
        ))}
      </Page>
    )
  }
}

export async function getServerSideProps() {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery(['churches'], getChurches)

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

export default Home
