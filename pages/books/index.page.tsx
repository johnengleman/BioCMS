import Head from 'next/head'
import {
  dehydrate,
  QueryClient,
  useQuery,
} from '@tanstack/react-query'
import { useState } from 'react'
import { Book } from '../../queries/getBooks'
import { getBooks } from '../../queries/getBooks'
import BookSummary from '../../components/books/BookSummary/BookSummary'
import Page from '../../components/global/Page/Page'
import { fetchAPIQuery } from '../../queries/fetchApiQuery'
import RecentlyUpdated from '../../components/recentlyUpdated/RecentlyUpdated'
import Slide from '../../components/books/Slide/Slide'
import Filter from '../../components/books/Filter/Filter'
import TopAuthor from '../../components/books/TopAuthor/TopAuthor'
import * as S from './styles'

const Home = (props) => {
  const { mostRecentlyCreatedBooks, topAuthors } = props
  const { data } = useQuery(['books'], getBooks)
  const [selectedGenre, setSelectedGenre] =
    useState('All Genres')

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
          <RecentlyUpdated
            title="Latest Added"
            options={{}}
          >
            {mostRecentlyCreatedBooks?.map((book, i) => (
              <Slide
                key={i}
                {...book}
              />
            ))}
          </RecentlyUpdated>

          <S.Container>
            <S.ByAuthor>
              <h3>Top Authors</h3>
              <S.TopAuthorsContainer>
                {topAuthors.map((author, i) => (
                  <TopAuthor
                    key={i}
                    {...author}
                  />
                ))}
              </S.TopAuthorsContainer>
            </S.ByAuthor>

            <S.ByGenre>
              <Filter
                title="Popular by Genre"
                genres={[
                  'All Genres',
                  'Homilies',
                  'Hymns',
                  'Biography',
                  'Commentary',
                ]}
                selectedGenre={selectedGenre}
                setSelectedGenre={setSelectedGenre}
              />
              <S.Books>
                {data
                  ?.filter(
                    (book) =>
                      selectedGenre === 'All Genres' ||
                      book.genre ===
                        selectedGenre.toLowerCase(),
                  )
                  .map((book: Book, i: number) => (
                    <BookSummary
                      key={i}
                      {...book}
                    />
                  ))}
              </S.Books>
            </S.ByGenre>
          </S.Container>
        </Page>
      </>
    )
  }
}

export async function getStaticProps() {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery(['books'], getBooks)
  const mostRecentlyCreatedBooks = await fetchAPIQuery(
    'getMostRecentlyCreatedBooks',
  )
  const topAuthors = await fetchAPIQuery('getTopAuthors', {
    limit: 5,
  })

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      mostRecentlyCreatedBooks,
      topAuthors,
    },
    revalidate: 60,
  }
}

export default Home
