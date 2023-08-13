import Head from 'next/head'
import {
  dehydrate,
  QueryClient,
  useQuery,
} from '@tanstack/react-query'
import { Quote } from '../../components/quotes/QuoteSummary/interface'
import { getQuotes } from '../../queries/getQuotes'
import QuoteSummary from '../../components/quotes/QuoteSummary/QuoteSummary'
import Page from '../../components/global/Page/Page'
import * as S from './styles'

const Home = () => {
  const { data } = useQuery(['quotes'], getQuotes)

  if (data) {
    return (
      <>
        <Head>
          <title key="title">
            Wisdom of the Ages: Quotes from Eastern Orthodox
            Saints
          </title>
          <meta
            key="description"
            name="description"
            content={`Dive into a curated collection of profound quotes from revered Eastern Orthodox saints. Discover timeless wisdom, spiritual teachings, and reflections that illuminate the essence of faith and devotion.`}
          />
        </Head>
        <Page>
          {data?.map((quote: Quote, i: number) => (
            <QuoteSummary
              key={i}
              {...quote}
            />
          ))}
        </Page>
      </>
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
