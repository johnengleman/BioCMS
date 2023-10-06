import Head from 'next/head'
import {
  dehydrate,
  QueryClient,
  useQuery,
} from '@tanstack/react-query'
import { useState } from 'react'
import { Book, getBooks } from '../../queries/getBooks'
import BookSummary from '../../components/books/BookSummary/BookSummary'
import Page from '../../components/page/Page/Page'
import RecentlyUpdated from '../../components/books/recentlyUpdated/RecentlyUpdated'
import Slide from '../../components/books/Slide/Slide'
import Filter from '../../components/books/Filter/Filter'
import TopAuthor from '../../components/books/TopAuthor/TopAuthor'
import styles from './styles.module.scss'

const Home = (props) => {
  const { mostRecentlyCreatedBooks = [], topAuthors = [] } =
    props
  const { data } = useQuery(['books'], getBooks)
  const [selectedGenre, setSelectedGenre] =
    useState('All Genres')

  if (data) {
    return (
      <>
        <Head>
          <title>
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
          <RecentlyUpdated title="Latest Added">
            {mostRecentlyCreatedBooks?.map((book, i) => (
              <Slide
                key={i}
                {...book}
              />
            ))}
          </RecentlyUpdated>

          <div className={styles.container}>
            <div className={styles.byAuthor}>
              <h3>Top Authors</h3>
              <div className={styles.topAuthorsContainer}>
                {topAuthors?.map((author, i) => (
                  <TopAuthor
                    key={i}
                    {...author}
                  />
                ))}
              </div>
            </div>

            <div>
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
              <div className={styles.books}>
                {data
                  ?.filter(
                    (book) =>
                      selectedGenre === 'All Genres' ||
                      book.genre ===
                        selectedGenre?.toLowerCase(),
                  )
                  ?.map((book: Book, i: number) => (
                    <BookSummary
                      key={i}
                      {...book}
                    />
                  ))}
              </div>
            </div>
          </div>
        </Page>
      </>
    )
  }
}

export async function getStaticProps() {
  let mostRecentlyCreatedBooks, topAuthors

  const queryClient = new QueryClient()
  await queryClient.prefetchQuery(['books'], getBooks)

  // try {
  //   mostRecentlyCreatedBooks = await fetchAPIQuery(
  //     'getMostRecentlyCreatedBooks',
  //   )
  // } catch (error) {
  //   mostRecentlyCreatedBooks = []
  // }

  // try {
  //   topAuthors = await fetchAPIQuery(
  //     `getTopAuthors?limit=books`,
  //   )
  // } catch (error) {
  //   topAuthors = []
  // }

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      // mostRecentlyCreatedBooks,
      // topAuthors,
    },
    revalidate: 60,
  }
}

export default Home
