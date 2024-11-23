import styles from './styles.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFaceFrownSlight } from '@fortawesome/pro-duotone-svg-icons'
import Head from 'next/head'
import { getSaints } from '../../queries/getSaints'
import SaintSummary from '../../components/saint/SaintSummary/SaintSummary'
import Page from '../../components/page/Page/Page'
import Hero from '../../components/saint/Hero/Hero'
import ScrollUp from '../../components/global/ScrollUp/ScrollUp'
import MasonryClient from '../../components/saint/Masonry/Masonry'
import { getChurch } from '../../hooks/getChurch'
import { properties } from '../../utils/properties'

export const runtime = 'edge'

import { NextPageProps } from '../../types/nextjs'

const Saints = async (props: NextPageProps) => {
  const searchParams = await props.searchParams
  const church = await getChurch(searchParams)
  const filter = searchParams.filter
  const saintPreset = searchParams.preset
  const sort = searchParams.sort

  const data = await getSaints({
    church,
    filter,
    saintPreset,
    sort,
  })

  return (
    <>
      <Head>
        <title>
          Catholic & Orthodox Saints: Life, Miracles,
          Prayers
        </title>
        <link
          rel="canonical"
          href={`${
            process.env.NEXT_PUBLIC_SITE_URL
          }/saints${
            filter !== 'all' ? `?filter=${filter}` : ''
          }`}
        />
        <meta
          key="description"
          name="description"
          content={`Explore the enriching lives of Catholic and Orthodox saints. Delve into their miraculous tales, teachings, and spiritual prayers with our extensive resources.`}
        />
        <meta
          name="keywords"
          content={`${properties.saints.title[filter]} Saints, catholic saints, orthodox saints, saint biographies, religious teachings, saint miracles, spiritual prayers, novenas, saint quotes, religious books, spiritual wisdom, christian spirituality, saint legacies, religious education, faith resources`}
        />
      </Head>
      <Page searchParams={searchParams}>
        <Hero searchParams={searchParams} />
        {data?.length > 0 ? (
          <div className={styles.saintHome}>
            <>
              <MasonryClient>
                {data?.map((saint, i: number) => (
                  <SaintSummary
                    {...saint}
                    key={i}
                    transitionName={`saint-${i}`}
                    priority={i < 8 ? true : false}
                  />
                ))}
              </MasonryClient>
              <ScrollUp />
            </>
          </div>
        ) : (
          <p className="status">
            No saints found.{' '}
            <FontAwesomeIcon icon={faFaceFrownSlight} />
          </p>
        )}
      </Page>
    </>
  )
}

export default Saints
