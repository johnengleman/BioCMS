// pages/saints/index.tsx (Server Component)
import { getSaints } from '../../queries/getSaints'
import SaintsListClient from '../../components/saint/SaintsList/SaintsListClient'
import { getChurch } from '../../hooks/getChurch'
import { properties } from '../../utils/properties'
import Head from 'next/head'
import Hero from '../../components/saint/Hero/Hero'
import Page from '../../components/page/Page/Page'

export const runtime = 'edge'

import { NextPageProps } from '../../types/nextjs'

const Saints = async (props: NextPageProps) => {
  const searchParams = await props.searchParams
  const church = await getChurch(searchParams)
  const filter = searchParams.filter || ''
  const saintPreset = searchParams.preset
  const sort = searchParams.sort

  const initialSaints = await getSaints({
    church,
    filter,
    saintPreset,
    sort,
    offset: 0,
    limit: 50,
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
          content={`Explore the enriching lives of Catholic and
          Orthodox saints. Delve into their miraculous tales,
          teachings, and spiritual prayers with our extensive
          resources.`}
        />
        <meta
          name="keywords"
          content={`${properties.saints.title[filter]} Saints,
          catholic saints, orthodox saints, saint biographies,
          religious teachings, saint miracles, spiritual prayers,
          novenas, saint quotes, religious books, spiritual wisdom,
          christian spirituality, saint legacies, religious
          education, faith resources`}
        />
      </Head>
      <Page searchParams={searchParams}>
        <Hero searchParams={searchParams} />
        <SaintsListClient
          key={JSON.stringify(initialSaints)}
          initialSaints={initialSaints}
          filter={filter}
          sort={sort}
          saintPreset={saintPreset}
          church={church}
        />
      </Page>
    </>
  )
}

export default Saints
