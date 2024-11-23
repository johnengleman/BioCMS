import Head from 'next/head'
import Page from '../../components/page/Page/Page'
import AboutComponent from '../../components/global/About/About'

export const runtime = 'edge'

const About = ({ searchParams }) => {
  return (
    <>
      <Head>
        <title>
          Browse and discover all the Catholic Saints:
          Spiritual Biographies, Teachings, quotes, Miracles
          Books, and Quotes
        </title>
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_SITE_URL}/about`}
        />
        <meta
          key="description"
          name="description"
          content="Explore the lives and legacies of Catholic saints. From teachings to miracles, delve into their spiritual journeys."
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
        <AboutComponent showImage={true} />
      </Page>
    </>
  )
}

export default About
