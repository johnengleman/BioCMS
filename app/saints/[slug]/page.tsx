import Head from 'next/head'
import styles from './styles.module.scss'
import { getSaint } from '../../../queries/getSaint'
import Page from '../../../components/page/Page/Page'
import ImageMain from '../../../components/saint/ImageMain/ImageMain'
import RelatedPeople from '../../../components/saint/SimilarSaints/SimilarSaints.server'
import Relics from '../../../components/saint/Relics/Relics'
import NameTag from '../../../components/saint/NameTag/NameTag'
import Quotes from '../../../components/saint/Quotes/Quotes'
import Summary from '../../../components/saint/Summary/Summary'
import TableOfContentFeatures from '../../../components/saint/TableOfContentsFeatures/TableOfContentsFeatures'
import BentoSection from '../../../components/global/BentoSection/BentoSection'
import PrayersC from '../../../components/saint/PrayersC/PrayersC'
import SectionTitle from '../../../components/saint/SectionTitle/SectionTitle'
import ExtraInfo from '../../../components/saint/ExtraInfo/ExtraInfo'
import ScrollUp from '../../../components/global/ScrollUp/ScrollUp'

export const runtime = 'edge'

import { NextPageProps } from '../../../types/nextjs'

const SaintBio = async (props: NextPageProps) => {
  const searchParams = await props.searchParams
  const params = await props.params
  const slug = params.slug

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
        <title>
          {`${data?.name}: Life, Teachings, Miracles, Quotes, and More`}
        </title>
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_SITE_URL}/saints/${slug}`}
        />
        <meta
          key="description"
          name="description"
          content={`Explore ${data.name}'s in-depth biography, theological teachings and divine miracles. Read their inspirational quotes, prayers, and books that illuminate their spiritual journey.`}
        />
        <meta
          name="keywords"
          content={`${data.name}, Catholic saints, Orthodox Saints, saint biography, religious teachings, saintly miracles, inspirational quotes, saint relics, novenas, spiritual books, Little Flower, Christian spirituality, religious inspiration, faith resources, saint legacy`}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </Head>
      <Page searchParams={searchParams}>
        <div className={styles.SaintSingle}>
          <div className={styles.hero}>
            <div className={styles.heroContent}>
              <ImageMain
                image1={data?.profile_image}
                image2={data?.other_images[0]}
                image3={data?.other_images[1]}
                name={data?.name}
              />
              <div className={styles.heroText}>
                <div className={styles.row1}>
                  <NameTag
                    tags={data?.categories}
                    birthYear={data?.birth_year}
                    deathYear={data?.death_year}
                    header={`${data?.name}`}
                    summary={data?.summary}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className={styles.content}>
            <div className={styles.leftRail}>
              <ExtraInfo
                orthodoxFeastDay={data?.feast_day_orthodox}
                catholicFeastDay={data?.feast_day_catholic}
                patron={data?.patron}
              />
              <div className={styles.stickyContainer}>
                <div className={styles.sticky}>
                  <TableOfContentFeatures />
                </div>
              </div>
            </div>
            <div className={styles.main}>
              <div>
                <SectionTitle
                  id="section-bio"
                  dataSection="biography"
                >
                  Biography
                </SectionTitle>
                <BentoSection
                  data={data?.biography}
                  link={`/saints/${slug}/biography`}
                />
              </div>
              {data?.teachings[0]?.teachings ? (
                <div>
                  <SectionTitle
                    id="section-teachings"
                    dataSection="teachings"
                  >
                    Teachings & Legacy
                  </SectionTitle>
                  <BentoSection
                    data={data?.teachings[0]?.teachings}
                    link={`/saints/${slug}/teachings`}
                  />
                </div>
              ) : (
                ''
              )}
              {data?.miracles[0]?.miracles ? (
                <div>
                  <SectionTitle
                    id="section-miracles"
                    dataSection="miracles"
                  >
                    Miracles
                  </SectionTitle>
                  <BentoSection
                    data={data?.miracles[0]?.miracles}
                    link={`/saints/${slug}/miracles`}
                  />
                </div>
              ) : (
                ''
              )}
              {data?.relic_image ? (
                <div>
                  <SectionTitle
                    id="section-relics"
                    dataSection="relics"
                    border={true}
                  >
                    Relics
                  </SectionTitle>
                  <Relics
                    image={data?.relic_image}
                    description={data?.relic_description}
                    location={data?.relic_location}
                  />
                </div>
              ) : (
                ''
              )}
              {data?.prayers.length ? (
                <div>
                  <SectionTitle
                    id="section-novenas"
                    dataSection="novenas"
                    border={true}
                  >
                    Novenas
                  </SectionTitle>
                  <PrayersC
                    allPrayers={data?.prayers}
                    saint={slug}
                  />
                </div>
              ) : (
                ''
              )}
              {data?.quotes.length ? (
                <div>
                  <SectionTitle
                    id="section-quotes"
                    dataSection="quotes"
                    border={true}
                  >
                    Quotes
                  </SectionTitle>
                  <Quotes quoteData={data?.quotes} />
                </div>
              ) : (
                ''
              )}
              {/* {data?.books ? (
                <Books
                  inRightRail={false}
                  books={data?.books}
                />
              ) : (
                ''
              )} */}
              <RelatedPeople
                searchParams={searchParams}
                params={params}
                categories={data.categories}
              />
              <ScrollUp />
            </div>
          </div>
        </div>
      </Page>
    </>
  )
}

export default SaintBio
