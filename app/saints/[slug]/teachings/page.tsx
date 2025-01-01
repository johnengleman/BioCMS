import Head from 'next/head'
import styles from '../styles.module.scss'
import { getSaint } from '../../../../queries/getSaint'
import Page from '../../../../components/page/Page/Page'
import ImageMain from '../../../../components/saint/ImageMain/ImageMain'
import RelatedPeople from '../../../../components/saint/SimilarSaints/SimilarSaints.server'
import NameTag from '../../../../components/saint/NameTag/NameTag'
import NextPage from '../../../../components/saint/NextPage/NextPage'
import ReadMoreLinks from '../../../../components/saint/ReadMoreLinks/ReadMoreLinks'
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
        <title>{`${data.name}: Profound Teachings & Lasting Legacy`}</title>
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_SITE_URL}/saints/${slug}/teachings`}
        />
        <meta
          key="description"
          name="description"
          content={`Dive into ${data.name}'s teachings. Discover their theological contributions and how they continue to guide and inspire believers."`}
        />
        <meta
          name="keywords"
          content={`${data.name} teachings, spiritual legacy, Christian teachings, religious influence, ${data.name} legacy, Catholic spirituality, Orthodox spirituality, theological insights, Christian faith impact, religious guidance, spiritual writings, saintly teachings, religious education`}
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
              header={data?.name}
              subHeader="Teachings"
              summary={data?.summary}
            />
            <div
              className={styles.text}
              id="text"
              dangerouslySetInnerHTML={{
                __html: data?.teachings[0]?.teachings || '',
              }}
            />
            <NextPage data={data} />
            <ReadMoreLinks
              links={data?.books}
              type="teachings"
            />
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
