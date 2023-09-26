import { useState } from 'react'
import Head from 'next/head'
import {
  dehydrate,
  QueryClient,
  useQuery,
} from '@tanstack/react-query'
import { Quote } from '../../components/quotes/QuoteSummary/interface'
import { getSayings } from '../../queries/getQuotes'
import QuoteSummary from '../../components/quotes/QuoteSummary/QuoteSummary'
import Page from '../../components/page/Page/Page'
import Filter from '../../components/home/Filter/Filter'
import * as S from './styles'

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

const Home = () => {
  const { data } = useQuery(['quotes'], getSayings)
  const [filter, setFilter] = useState('All')

  if (data) {
    return (
      <>
        <Head>
          <title>
            Wisdom of the Ages: Quotes from Eastern Orthodox
            Saints
          </title>
          <meta
            key="description"
            name="description"
            content={`Explore profound quotes from Eastern Orthodox saints. Discover timeless wisdom and the essence of faith.`}
          />
        </Head>
        <Page>
          {/* <Filter
            selectedFilter={filter}
            options={options}
            title="Explore the Orthodox Quotes"
          /> */}
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
  await queryClient.prefetchQuery(['quotes'], getSayings)

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 60,
  }
}

export default Home
