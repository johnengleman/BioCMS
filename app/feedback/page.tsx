import Head from 'next/head'
import Page from '../../components/page/Page/Page'
import FeedBackForm from '../../components/feedback/FeedbackForm'

export const runtime = 'edge'

const Feedback = ({ searchParams }) => {
  return (
    <>
      <Head>
        <title>Feedback</title>
        <meta
          key="description"
          name="description"
          content="Explore the lives and legacies of Catholic saints. From teachings to miracles, delve into their spiritual journeys."
        />
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_SITE_URL}/feedback`}
        />
        <meta
          name="keywords"
          content="Roman Catholic, spiritual journeys, miracles, teachings, holy figures, books, Orthodox literature, religious quotes, saintly quotes, Orthodox teachings, church history, faith, spirituality, Christianity"
        />
      </Head>
      <Page
        spaceBetween={true}
        searchParams={searchParams}
      >
        <FeedBackForm />
      </Page>
    </>
  )
}

export default Feedback
