import Head from 'next/head'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFaceFrownSlight } from '@fortawesome/pro-duotone-svg-icons'
import { getMiracles } from '../../queries/getMiracles'
import Page from '../../components/page/Page/Page'
import SaintDetail from '../../components/global/SaintDetail/SaintDetail'
import HeroSimple from '../../components/global/HeroSimple/HeroSimple'
import { getChurch } from '../../hooks/getChurch'
import capitalize from '../../utils/capitalize'
import ScrollUp from '../../components/global/ScrollUp/ScrollUp'
import MiraclesClient from '../../components/miracles/MiraclesClient/MiraclesClient'
import styles from './styles.module.scss'

import { NextPageProps } from '../../types/nextjs'

export const runtime = 'edge'

const Teachings = async (props: NextPageProps) => {
  const searchParams = await props.searchParams
  const filter = searchParams.filter || "all"
  const miraclesPreset = searchParams.preset || ''
  const church = await getChurch(searchParams)

  const initialMiracles = await getMiracles({
    filter,
    church,
    miraclesPreset,
    offset: 0,
    limit: 10,
  })

  return (
    <>
      <Head>
        <title>
          Saints&apos; Miracles: From Apostolic to Modern
          Times
        </title>
        <link
          rel="canonical"
          href={`${
            process.env.NEXT_PUBLIC_SITE_URL
          }/miracles${
            filter !== 'all' ? `?filter=${filter}` : ''
          }`}
        />
        <meta
          key="description"
          name="description"
          content={`"Explore miracles of Catholic & Orthodox saints through history. Witness wonders from the Patristic Age to the Modern era, shaping faith across time.`}
        />
        <meta
          name="keywords"
          content="Saint miracles, Apostolic Era wonders, Patristic Age miracles, Medieval period marvels, Renaissance miracles, Modern era wonders, Catholic miracles, Orthodox saints, Christian history miracles, miraculous events, spiritual miracles, historical saints, faith and miracles, religious phenomena"
        />
      </Head>
      <Page searchParams={searchParams}>
        <HeroSimple
          title="Miracles"
          type="miracles"
          searchParams={searchParams}
        />
        <div className={styles.miracles}>
          {initialMiracles.length ? (
            <MiraclesClient
              key={JSON.stringify(initialMiracles)}
              initialMiracles={initialMiracles}
              filter={filter}
              church={church}
            />
          ) : (
            <p className="status">
              No miracles found.{' '}
              <FontAwesomeIcon icon={faFaceFrownSlight} />
            </p>
          )}
          <ScrollUp />
        </div>
      </Page>
    </>
  )
}

export default Teachings
