import Head from 'next/head'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFaceFrownSlight } from '@fortawesome/pro-duotone-svg-icons'
import { getPrayers } from '../../queries/getPrayers'
import Page from '../../components/page/Page/Page'
import NovenaDetail from '../../components/novenas/NovenaDetail/NovenaDetail'
import HeroSimple from '../../components/global/HeroSimple/HeroSimple'
import ScrollUp from '../../components/global/ScrollUp/ScrollUp'
import { getChurch } from '../../hooks/getChurch'
import styles from './styles.module.scss'

export const runtime = 'edge'

import { NextPageProps } from '../../types/nextjs'

const NovenasPage = async (props: NextPageProps) => {
  const searchParams = await props.searchParams
  const filter = searchParams.filter
  const church = await getChurch(searchParams)

  const prayersData = await getPrayers({ church, filter })

  return (
    <>
      <Head>
        <title>
          Novenas for All Saints: Prayerful Guidance
        </title>
        <link
          rel="canonical"
          href={`${
            process.env.NEXT_PUBLIC_SITE_URL
          }/novenas${
            filter !== 'all' ? `?filter=${filter}` : ''
          }`}
        />
        <meta
          key="description"
          name="description"
          content={`Find solace and inspiration in our curated novenas. From personal growth to seeking intercession, connect with saints' enduring wisdom.`}
        />
        <meta
          name="keywords"
          content="novenas collection, saint prayers, catholic novenas, orthodox novenas, spiritual novenas, prayer intercession, saints devotion, novena prayers, religious novenas, comprehensive novena list, Christian prayers, faith journey, religious traditions, prayer guidance"
        />
      </Head>
      <Page searchParams={searchParams}>
        <HeroSimple
          title="Novenas"
          type="prayers"
          searchParams={searchParams}
        />
        <div className={styles.page}>
          {prayersData?.length ? (
            prayersData.map((prayer, i) => (
              <NovenaDetail
                key={i}
                {...prayer}
              />
            ))
          ) : (
            <p className="status">
              No novenas found.{' '}
              <FontAwesomeIcon icon={faFaceFrownSlight} />
            </p>
          )}
          <ScrollUp />
        </div>
      </Page>
    </>
  )
}

export default NovenasPage
