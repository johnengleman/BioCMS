import Head from 'next/head'
import Page from '../components/page/Page/Page'
import AboutComponent from '../components/global/About/About'

const About = () => {
  return (
    <>
      <Head>
        <title>
          Browse and discover all the Catholic Saints:
          Spiritual Biographies, Teachings, Sayings,
          Miracles Books, and Quotes
        </title>
        <meta
          key="description"
          name="description"
          content="Explore the lives and legacies of Catholic saints. From teachings to miracles, delve into their spiritual journeys."
        />
        <meta
          name="keywords"
          content="Roman Catholic, spiritual journeys, miracles, teachings, holy figures, books, Orthodox literature, religious sayings, saintly quotes, Orthodox teachings, church history, faith, spirituality, Christianity"
        />
      </Head>
      <Page spaceBetween={true}>
        <AboutComponent showImage={true} />
      </Page>
    </>
  )
}

export default About
