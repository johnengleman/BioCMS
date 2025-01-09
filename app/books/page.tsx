import Head from 'next/head'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFaceFrownSlight } from '@fortawesome/pro-duotone-svg-icons'
import Hero from '../../components/saint/Hero/Hero'
import { getNewestBooks } from '../../queries/getNewestBooks'
import { getBooks } from '../../queries/getBooks'
import Page from '../../components/page/Page/Page'
import BookSummary from '../../components/books/BookSummary/BookSummary'
import styles from './styles.module.scss'
import SectionTitle from '../../components/books/SectionTitle/SectionTitle'
import capitalize from '../../utils/capitalize'
import ScrollUp from '../../components/global/ScrollUp/ScrollUp'
import { getChurch } from '../../hooks/getChurch'

import { NextPageProps } from '../../types/nextjs'

export const runtime = 'edge'

const Books = async (props: NextPageProps) => {
  const searchParams = await props.searchParams
  const filter = searchParams.filter || "all"
  const preset = searchParams.preset || ''
  const church = await getChurch(searchParams)

  const bookCategory =
    preset !== 'none'
      ? preset.replace(/and/g, '&').replace(/_/g, ' ')
      : ''
  const bookFilter = filter !== 'all' ? `${filter}` : ''

  const newestBookData = await getNewestBooks({
    church,
    preset,
  })

  const bookData = await getBooks({
    church,
    preset,
    filter,
  })

  return (
    <>
      <Head>
        <title>
          Books on Saints: Lives, Teachings & Journeys
        </title>
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_SITE_URL}/books${
            filter !== 'all' ? `?filter=${filter}` : ''
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
      <Page searchParams={searchParams}>
        <Hero searchParams={searchParams} />
        <div className={styles.books}>
          {!bookFilter && (
            <SectionTitle>
              Newest {bookCategory}
            </SectionTitle>
          )}
          {!bookFilter &&
            (newestBookData?.length ? (
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

          {bookData?.length ? (
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

export default Books
