import {
  dehydrate,
  QueryClient,
  useQuery,
} from '@tanstack/react-query'
import { Quote } from '../../components/quotes/QuoteSummary/interface'
import { getQuotes } from '../../queries/getQuotes'
import QuoteSummary from '../../components/quotes/QuoteSummary/QuoteSummary'
import Page from '../../components/global/Page/Page'

const Home = () => {
  const { data } = useQuery(['quotes'], getQuotes)

  if (data) {
    return (
      <Page>
        {data?.map((quote: Quote, i: number) => (
          <QuoteSummary
            key={i}
            {...quote}
          />
        ))}
      </Page>
    )
  }
}

export async function getStaticProps() {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery(['quotes'], getQuotes)

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 60,
  }
}

export default Home
