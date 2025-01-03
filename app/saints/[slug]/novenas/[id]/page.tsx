import { Fragment } from 'react'
import Head from 'next/head'
import { getSaint } from '../../../../../queries/getSaint'
import Page from '../../../../../components/page/Page/Page'
import ImageMain from '../../../../../components/saint/ImageMain/ImageMain'
import RelatedPeople from '../../../../../components/saint/SimilarSaints/SimilarSaints.server'
import NameTag from '../../../../../components/saint/NameTag/NameTag'
import ReadMoreLinks from '../../../../../components/saint/ReadMoreLinks/ReadMoreLinks'
import NextPage from '../../../../../components/saint/NextPage/NextPage'
import About from '../../../../../components/global/About/About'
import ScrollUp from '../../../../../components/global/ScrollUp/ScrollUp'
import Content from '../../../../../components/saint/Content/Content.Client'
import styles from '../../styles.module.scss'

export const runtime = 'edge'

import { NextPageProps } from '../../../../../types/nextjs'

const SaintNovena = async (props: NextPageProps) => {
  const searchParams = await props.searchParams
  const params = await props.params
  const id = searchParams.id
  const days = [
    'One',
    'Two',
    'Three',
    'Four',
    'Five',
    'Six',
    'Seven',
    'Eight',
    'Nine',
  ]

  const slug = searchParams.slug

  const data = await getSaint(slug)

  const novena = data.prayers.find(
    (prayer) => prayer.prayer_slug === id,
  )

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
        <title>{`${data.name}: ${novena.prayer_title}`}</title>
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_SITE_URL}/saints/${slug}/novenas/${data.name}`}
        />
        <meta
          key="description"
          name="description"
          content={`Discover the full Novena of ${data.name} for spiritual growth. Connect deeply with her teachings and faith through this powerful nine-day prayer`}
        />
        <meta
          name="keywords"
          content={`${data.name} Novena, Novena prayers, ${data.name} devotion, Catholic novenas, spiritual prayer texts, devotional practices, Christian prayers, prayer for guidance, nine-day prayer, religious devotion, saintly intercession, spiritual connection`}
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
              header={`${data.name}: ${novena.prayer_title}`}
              summary={data?.summary}
            />
            <div id="text">
              {data?.prayers[0].prayers.map((prayer, i) => (
                <Fragment key={i}>
                  <h2
                    id={`heading-${i + 1}`}
                    className={styles.novena_heading}
                  >
                    Day {days[i]}
                  </h2>
                  <div
                    className={styles.text}
                    dangerouslySetInnerHTML={{
                      __html: prayer.prayer_section || '',
                    }}
                  />
                </Fragment>
              ))}
            </div>

            {/* {data?.books && isLaptopMinus && (
                <Books
                  books={data?.books}
                  inRightRail={false}
                />
              )} */}
            <NextPage data={data} />
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

export default SaintNovena
