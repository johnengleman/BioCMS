import Head from 'next/head'
import { useRouter } from 'next/router'
import {
  dehydrate,
  QueryClient,
  useQuery,
} from '@tanstack/react-query'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFaceFrownSlight } from '@fortawesome/pro-duotone-svg-icons'
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
import capitalize from '../../utils/capitalize'
import ScrollUp from '../../components/global/ScrollUp/ScrollUp'
import useCookie from '../../hooks/useCookie'

export const config = {
  runtime: 'experimental-edge',
}

const Books = () => {
  useCookie()
  const router = useRouter()
  const church = Array.isArray(router.query.church)
    ? router.query.church[0]
    : router.query.church || 'all'
  const preset = Array.isArray(router.query.preset)
    ? router.query.preset[0]
    : router.query.preset || 'none'
  const filter = Array.isArray(router.query.filter)
    ? router.query.filter[0]
    : router.query.filter || 'all'

  const bookCategory =
    preset !== 'none'
      ? preset.replace(/and/g, '&').replace(/_/g, ' ')
      : ''
  const bookFilter = filter !== 'all' ? `${filter}` : ''

  const { data: searchData } = useQuery(
    ['search', church],
    () => getSearchData(church),
    {
      initialData: [],
    },
  )

  const { data: navData } = useQuery(
    ['nav', church],
    () => getNav({ church }),
    {
      initialData: {},
    },
  )

  const {
    data: newestBookData,
    isFetching: isFetchingNew,
    isError: isErrorNew,
  } = useQuery(
    ['newestBooks', church, preset],
    () => getNewestBooks({ church, preset }),
    {
      initialData: [],
    },
  )

  const {
    data: bookData,
    isFetching: isFetchingAll,
    isError: isErrorAll,
  } = useQuery(
    ['books', church, preset, filter],
    () => getBooks({ church, preset, filter }),
    {
      onSuccess: () => {
        if (filter !== 'all') {
          const element = document.getElementById('toggle')
          element?.scrollIntoView()
        }
      },
      initialData: [],
    },
  )

  const { data: authorData } = useQuery(
    ['authors', church, preset],
    () => getTopAuthors({ church, preset }),
    {
      initialData: [],
    },
  )

  const { data: genreData } = useQuery(
    ['genres', church],
    () => getTopGenres(church),
    {
      initialData: [],
    },
  )

  return (
    <>
      <Head>
        <title>
          Books on Saints: Lives, Teachings & Journeys
        </title>
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_SITE_URL}/books${
            filter !== 'all'
              ? `?filter=${filter}`
              : ''
          }`}
        />
        <meta
          key="description"
          name="description"
          content={`Discover books on Catholic and Orthodox saints, spanning theology, spiritual writings, history, and devotions. Find enlightening reads for your faith journey.`}
        />
        <meta
          name="keywords"
          content="saint books, theology and dogma, spiritual writings, ascetic literature, church history, saint biographies, prayer books, devotional literature, religious books, Christian saints, Catholic authors, Orthodox writers, spiritual reading, faith literature"
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
          {!bookFilter &&
            (isFetchingNew ? (
              <p className="status">
                Fetching newest books...
              </p>
            ) : isErrorNew ? (
              <p className="status">
                Error.{' '}
                <FontAwesomeIcon icon={faFaceFrownSlight} />
              </p>
            ) : !isFetchingNew && newestBookData?.length ? (
              <div className={styles.newest}>
                {newestBookData?.map((book, i) => (
                  <BookSummary
                    key={i}
                    data={book}
                    showDescription={false}
                  />
                ))}
              </div>
            ) : (
              <p className="status">
                No new books found.{' '}
                <FontAwesomeIcon icon={faFaceFrownSlight} />
              </p>
            ))}

          <SectionTitle>
            All {bookFilter || bookCategory}
          </SectionTitle>

          {isFetchingAll ? (
            <p className="status">Fetching all books...</p>
          ) : isErrorAll ? (
            <p className="status">
              Error.{' '}
              <FontAwesomeIcon icon={faFaceFrownSlight} />
            </p>
          ) : !isFetchingAll && bookData?.length ? (
            <div className={styles.allBooks}>
              {bookData?.map((book, i) => (
                <BookSummary
                  key={i}
                  data={book}
                  showDescription={true}
                />
              ))}
            </div>
          ) : (
            <p className="status">
              No books found.{' '}
              <FontAwesomeIcon icon={faFaceFrownSlight} />
            </p>
          )}
          <ScrollUp />
        </div>
      </Page>
    </>
  )
}

export const getServerSideProps = async (context) => {
  const queryClient = new QueryClient()
  const preset = context.query.preset || 'none'
  const filter = context.query.filter || 'all'

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
