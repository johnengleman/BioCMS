import Head from 'next/head'
import styles from '../styles.module.scss'
import { getSaint } from '../../../../queries/getSaint'
import Page from '../../../../components/page/Page/Page'
import ImageMain from '../../../../components/saint/ImageMain/ImageMain'
import RelatedPeople from '../../../../components/saint/SimilarSaints/SimilarSaints.server'
import NameTag from '../../../../components/saint/NameTag/NameTag'
import NextSection from '../../../../components/saint/NextPage/NextPage'
import About from '../../../../components/global/About/About'
import ScrollUp from '../../../../components/global/ScrollUp/ScrollUp'
import Content from '../../../../components/saint/Content/Content.Client'

export const runtime = 'edge'

import { NextPageProps } from '../../../../types/nextjs'

const SaintBio = async (props: NextPageProps) => {
  const searchParams = await props.searchParams
  const params = await props.params
  const slug = searchParams.slug

  const data = await getSaint(slug)

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: data?.name,
    birthDate: data?.birth_year,
    deathDate: data?.death_year,
    birthPlace: data?.birth_location,
    deathPlace: data?.death_location,
    description: data?.summary,
  }

  return (
    <>
      <Head>
        <title>{`${data.name}: Miracles and Unexplained Events`}</title>
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_SITE_URL}/saints/${slug}/miracles`}
        />
        <meta
          key="description"
          name="description"
          content={`Discover the miraculous legacy of ${data.name}. Read detailed stories of healing and spiritual marvels that define her enduring impact.`}
        />
        <meta
          name="keywords"
          content={`${data.name} miracles, miraculous events, divine wonders, saintly intercession, Catholic miracles, Orthodox Miracles, spiritual phenomena, religious miracles, Christian faith miracles, healing miracles, supernatural events, religious inspiration`}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </Head>
      <Page searchParams={searchParams}>
        <div className={styles.SaintBio}>
          <Content
            leftRail={
              <ImageMain
                image1={data?.profile_image}
                name={data?.name}
                leftRail={true}
              />
            }
          >
            <NameTag
              tags={data?.categories}
              birthYear={data?.birth_year}
              deathYear={data?.death_year}
              header={`${data?.name}`}
              subHeader="Miracles"
              summary={data?.summary}
            />
            <div
              className={styles.text}
              dangerouslySetInnerHTML={{
                __html: data.miracles[0]?.miracles || '',
              }}
            />
            <NextSection data={data} />
          </Content>
          <RelatedPeople
            searchParams={searchParams}
            params={params}
            categories={data.categories}
          />
          <ScrollUp />
        </div>
      </Page>
    </>
  )
}

export default SaintBio
