import Head from 'next/head'
import {
  dehydrate,
  QueryClient,
  useQuery,
} from '@tanstack/react-query'
import { useState } from 'react'
import { Book } from '../../components/books/BookSummary/interface'
import { getBooks } from '../../queries/getBooks'
import BookSummary from '../../components/books/BookSummary/BookSummary'
import Page from '../../components/global/Page/Page'
import Filter from '../../components/global/Filter/Filter'
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
  const { data } = useQuery(['books'], getBooks)
  const [filter, setFilter] = useState('All')

  if (data) {
    return (
      <>
        <Head>
          <title key="title">
            Wisdom Written: Books by Orthodox Saints and
            Tales about Their Lives
          </title>
          <meta
            key="description"
            name="description"
            content="Explore books by Eastern Orthodox saints. Dive into their teachings, journeys, and legacies. A literary pilgrimage of faith."
          />
        </Head>
        <Page>
          <Filter
            setFilter={setFilter}
            selectedFilter={filter}
            options={options}
            title="Explore the Orthodox Books"
          />
          <S.Books>
            {data?.map((book: Book, i: number) => (
              <BookSummary
                key={i}
                {...book}
              />
            ))}
          </S.Books>
        </Page>
      </>
    )
  }
}

export async function getStaticProps() {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery(['books'], getBooks)

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 60,
  }
}

export default Home
