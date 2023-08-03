import {
  dehydrate,
  QueryClient,
  useQuery,
} from '@tanstack/react-query'
import { Book } from '../../components/books/BookSummary/interface'
import { getBooks } from '../../queries/getBooks'
import BookSummary from '../../components/books/BookSummary/BookSummary'
import Page from '../../components/global/Page/Page'

const Home = () => {
  const { data } = useQuery(['churches'], getBooks)

  if (data) {
    return (
      <Page>
        {data?.map((book: Book, i: number) => (
          <BookSummary
            key={i}
            {...book}
          />
        ))}
      </Page>
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
    revalidate: 10
  }
}

export default Home
