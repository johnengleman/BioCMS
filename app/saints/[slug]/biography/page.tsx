import Head from 'next/head'
import styles from '../styles.module.scss'
import { getSaint } from '../../../../queries/getSaint'
import Page from '../../../../components/page/Page/Page'
import ImageMain from '../../../../components/saint/ImageMain/ImageMain'
import Books from '../../../../components/saint/Books/Books'
import RelatedPeople from '../../../../components/saint/SimilarSaints/SimilarSaints.server'
import NameTag from '../../../../components/saint/NameTag/NameTag'
import ReadMoreLinks from '../../../../components/saint/ReadMoreLinks/ReadMoreLinks'
import NextPage from '../../../../components/saint/NextPage/NextPage'
import About from '../../../../components/global/About/About'
import ScrollUp from '../../../../components/global/ScrollUp/ScrollUp'
import Content from '../../../../components/saint/Content/Content.Client'

export const runtime = 'edge'
import { NextPageProps } from '../../../../types/nextjs'

const SaintBio = async (props: NextPageProps) => {
  const searchParams = await props.searchParams
  const params = await props.params
  const slug = searchParams.slug || ''

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
        <title>{`"Life of ${data.name}: A Complete Biography`}</title>
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_SITE_URL}/saints/${slug}/biography`}
        />
        <meta
          key="description"
          name="description"
          content={`Journey through the full biography of ${data.name}. Explore their life's milestones, challenges, and their profound impact on the world.`}
        />
        <meta
          name="keywords"
          content={`${data.name}, biography, Catholic saint, Orthodox Saint, detailed life story, spiritual journey, saintly life, religious inspiration, Christian faith, Thérèse of Lisieux biography, saint of simplicity, religious figures, historical biography, Christian spirituality`}
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
              subHeader="Biography"
              summary={data?.summary}
            />
            <div
              className={styles.text}
              id="text"
              dangerouslySetInnerHTML={{
                __html: data?.biography || '',
              }}
            />
            {/* {data?.books && isLaptopMinus && (
                <Books
                  books={data?.books}
                  inRightRail={false}
                />
              )} */}
            {/* <div className={styles.updated}>
                Updated on {formatDate(data?.date_updated)}
              </div> */}
            <NextPage data={data} />
            <ReadMoreLinks links={data?.books} />
            {/* <About showImage={false} /> */}
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
