import Head from 'next/head'
import { getTeachings } from '../../queries/getTeachings'
import Page from '../../components/page/Page/Page'
import HeroSimple from '../../components/global/HeroSimple/HeroSimple'
import { getChurch } from '../../hooks/getChurch'
import ScrollUp from '../../components/global/ScrollUp/ScrollUp'
import TeachingsClient from '../../components/teachings/teachings/TeachingsClient'
import styles from './styles.module.scss'

export const runtime = 'edge'

import { NextPageProps } from '../../types/nextjs'

const Teachings = async (props: NextPageProps) => {
  const searchParams = await props.searchParams
  const filter = searchParams.filter || "all"
  const church = await getChurch(searchParams)

  const initialTeachings = await getTeachings({
    church,
    filter,
    offset: 0,
    limit: 4,
  })

  return (
    <>
      <Head>
        <title>
          Christian Saints: Legacy & Teachings Explored
        </title>
        <link
          rel="canonical"
          href={`${
            process.env.NEXT_PUBLIC_SITE_URL
          }/teachings${
            filter !== 'all' ? `?filter=${filter}` : ''
          }`}
        />
        <meta
          key="description"
          name="description"
          content={`Explore teachings and legacies of Catholic and Orthodox saints from the Apostolic to Modern era.`}
        />
        <meta
          name="keywords"
          content="Apostolic Era saints, Patristic Age, Medieval Christian saints, Late Medieval saints, Modern Christian saints, Orthodox teachings, Catholic legacies, Christian history, spiritual teachings, saint biographies, religious wisdom, faith through ages, Christian spirituality, historical saints"
        />
      </Head>
      <Page searchParams={searchParams}>
        <HeroSimple
          searchParams={searchParams}
          title="Teachings & Legacy"
          type="teachings"
        />
        <div className={styles.page}>
          <TeachingsClient
            key={JSON.stringify(initialTeachings)}
            initialTeachings={initialTeachings}
            church={church}
            filter={filter}
          />
          <ScrollUp />
        </div>
      </Page>
    </>
  )
}

export default Teachings
