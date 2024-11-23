import Head from 'next/head'
import Page from '../../components/page/Page/Page'
import { getUpdates } from '../../queries/getUpdates'
import Update from '../../components/global/Update/Update'

export const runtime = 'edge'

const About = async ({ searchParams }) => {
  const updateData = await getUpdates()

  return (
    <>
      <Head>
        <title>Updates</title>
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_SITE_URL}/updates`}
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
        {updateData.map((update, i) => (
          <Update
            key={i}
            {...update}
          />
        ))}
      </Page>
    </>
  )
}

export default About
