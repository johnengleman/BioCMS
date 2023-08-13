import Head from 'next/head'
import {
  dehydrate,
  QueryClient,
  useQuery,
} from '@tanstack/react-query'
import { Book } from '../../components/books/BookSummary/interface'
import { getBooks } from '../../queries/getBooks'
import BookSummary from '../../components/books/BookSummary/BookSummary'
import Page from '../../components/global/Page/Page'
import * as S from './styles'

const Home = () => {
  const { data } = useQuery(['books'], getBooks)

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
            content={`Discover a diverse collection of books, including writings by revered Eastern Orthodox saints sharing their insights and teachings, as well as detailed accounts about their spiritual journeys and legacies. Embark on a literary pilgrimage through faith, history, and enlightenment.`}
          />
        </Head>
        <Page>
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
