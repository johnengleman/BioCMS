import Head from 'next/head'
import Page from '../../components/page/Page/Page'
import HeroSimple from '../../components/global/HeroSimple/HeroSimple'
import Quotes from '../../components/saint/Quotes/QuotesClient'
import { getChurch } from '../../hooks/getChurch'
import { getQuotes } from '../../queries/getQuotes'
import ScrollUp from '../../components/global/ScrollUp/ScrollUp'
import styles from './styles.module.scss'

export const runtime = 'edge'

import { NextPageProps } from '../../types/nextjs'

const QuotesPage = async (props: NextPageProps) => {
  const searchParams = await props.searchParams
  const filter = searchParams.filter || '' || ''
  const church = await getChurch(searchParams)
  const initialQuotes = await getQuotes({
    church,
    filter,
    offset: 0,
    limit: 40,
  })

  return (
    <>
      <Head>
        <title>
          Saintly Wisdom: Quotes on Faith, Love, & Prayer
        </title>
        <link
          rel="canonical"
          href={`${
            process.env.NEXT_PUBLIC_SITE_URL
          }/quotes${
            filter !== 'all' ? `?filter=${filter}` : ''
          }`}
        />
        <meta
          key="description"
          name="description"
          content={`Discover inspirational quotes from Catholic and Orthodox saints. Explore their wisdom on faith, love, and prayer, with a versatile range of spiritual themes.`}
        />
        <meta
          name="keywords"
          content="saint quotes, spiritual wisdom, faith quotes, hope quotes, love quotes, prayer quotes, charity quotes, suffering wisdom, forgiveness insights, humility quotes, peace and joy, wisdom from saints, patience and courage, gratitude sayings, justice and truth, mercy in words, devotion and unity, passions and Mary, saints on sin, inspirational quotes, religious quotes, Christian wisdom"
        />
      </Head>
      <Page searchParams={searchParams}>
        <HeroSimple
          searchParams={searchParams}
          title="Quotes"
          type="quotes"
        />
        <div className={styles.quotes}>
          <Quotes
            key={JSON.stringify(initialQuotes)}
            initialQuotes={initialQuotes}
            church={church}
            filter={filter}
          />
          <ScrollUp />
        </div>
      </Page>
    </>
  )
}

export default QuotesPage
