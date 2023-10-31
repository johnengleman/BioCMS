import { useEffect } from 'react'
import Cookies from 'js-cookie'
import Head from 'next/head'
import { useRouter } from 'next/router'
import {
  dehydrate,
  QueryClient,
  useQuery,
} from '@tanstack/react-query'
import Hero from '../../components/books/Hero/Hero'
import { getSearchData } from '../../queries/getSearchData'
import { getNav } from '../../queries/getNav'
import { getNewestBooks } from '../../queries/getNewestBooks'
import { getTopAuthors } from '../../queries/getTopAuthors'
import { getTopGenres } from '../../queries/GetTopGenres'
import { getBooks } from '../../queries/getBooks'
import Page from '../../components/page/Page/Page'
import BookSummary from '../../components/books/BookSummary/BookSummary'
import styles from './styles.module.scss'
import SectionTitle from '../../components/books/SectionTitle/SectionTitle'

export const config = {
  runtime: 'experimental-edge',
}

const Books = () => {
  const router = useRouter()
  const church = Array.isArray(router.query.church)
    ? router.query.church[0]
    : router.query.church || 'all'
  const preset = Array.isArray(router.query.preset)
    ? router.query.preset[0]
    : router.query.preset || 'none'
  const filter = Array.isArray(router.query.filter)
    ? router.query.filter[0]
    : router.query.filter || 'none'

  const bookCategory =
    preset !== 'none'
      ? preset.replace(/and/g, '&').replace(/_/g, ' ')
      : ''
  const bookFilter = filter !== 'none' ? `${filter}` : ''

  const { data: searchData } = useQuery(
    ['search', church],
    () => getSearchData(church),
  )

  const { data: navData } = useQuery(['nav', church], () =>
    getNav({ church }),
  )

  const { data: newestBookData } = useQuery(
    ['newestBooks', church, preset],
    () => getNewestBooks({ church, preset }),
  )

  const { data: bookData } = useQuery(
    ['books', church, preset, filter],
    () => getBooks({ church, preset, filter }),
  )

  const { data: authorData } = useQuery(
    ['authors', church, preset],
    () => getTopAuthors({ church, preset }),
  )

  const { data: genreData } = useQuery(
    ['genres', church],
    () => getTopGenres(church),
  )

  useEffect(() => {
    const cookie = Cookies.get('findasaint.com')

    if (cookie) {
      try {
        const data = JSON.parse(cookie)

        const newQuery = {
          ...router.query,
          church: data.church,
        }
        router.push(
          {
            pathname: router.pathname,
            query: newQuery,
          },
          undefined,
          { shallow: true },
        )
      } catch (err) {
        console.error(err)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Head>
        <title>Books about Roman Catholic Saints</title>
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_SITE_URL}/books`}
        />
        <meta
          key="description"
          name="description"
          content="Discover the most famous miracles of Roman Catholic Saints"
        />
      </Head>
      <Page
        searchData={searchData}
        navData={navData}
      >
        <Hero
          authorData={authorData}
          genreData={genreData}
        />
        <div className={styles.books}>
          {!bookFilter && (
            <SectionTitle>
              Newest {bookCategory}
            </SectionTitle>
          )}
          {!bookFilter && (
            <div className={styles.newest}>
              {newestBookData?.map((book, i) => (
                <BookSummary
                  key={i}
                  data={book}
                  showDescription={false}
                />
              ))}
            </div>
          )}

          <SectionTitle>
            All {bookFilter || bookCategory}
          </SectionTitle>
          <div className={styles.allBooks}>
            {bookData?.map((book, i) => (
              <BookSummary
                key={i}
                data={book}
                showDescription={true}
              />
            ))}
          </div>
        </div>
      </Page>
    </>
  )
}

export const getServerSideProps = async (context) => {
  const queryClient = new QueryClient()
  const preset = context.query.preset || 'none'
  const filter = context.query.filter || 'none'

  const cookie = context.req.headers.cookie
  let church = 'all'

  if (cookie) {
    const parsedCookie = cookie
      .split('; ')
      .find((row) => row.startsWith('findasaint.com='))
      ?.split('=')[1]

    if (parsedCookie) {
      const data = JSON.parse(
        decodeURIComponent(parsedCookie),
      )
      church = data.church
    }
  }

  await queryClient.prefetchQuery(['search', church], () =>
    getSearchData(church),
  )

  await queryClient.prefetchQuery(['nav', church], () =>
    getNav({ church }),
  )

  await queryClient.prefetchQuery(
    ['newestBooks', church, preset],
    () => getNewestBooks({ church, preset }),
  )

  await queryClient.prefetchQuery(
    ['authors', church, preset],
    () => getTopAuthors({ church, preset }),
  )

  await queryClient.prefetchQuery(
    ['books', church, preset, filter],
    () => getBooks({ church, preset, filter }),
  )

  await queryClient.prefetchQuery(['genres', church], () =>
    getTopGenres(church),
  )

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

export default Books
