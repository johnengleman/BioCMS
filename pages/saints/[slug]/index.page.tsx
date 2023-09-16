import { useRef } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import {
  dehydrate,
  QueryClient,
  useQuery,
} from '@tanstack/react-query'
import { Saint } from '../../../types/types'
import styles from './styles.module.scss'
import { getSaint } from '../../../queries/getSaint'
import Page from '../../../components/page/Page/Page'
import ImageMain from '../../../components/saint/ImageMain/ImageMain'
import Books from '../../../components/saint/Books/Books'
import RelatedPeople from '../../../components/saint/RelatedPeople/RelatedPeople'
import Tomb from '../../../components/saint/Tomb/Tomb'
import ErrorPage from 'next/error'
import NameTag from '../../../components/saint/NameTag/NameTag'
import Summary from '../../../components/saint/Summary/Summary'
import TableOfContentFeatures from '../../../components/saint/TableOfContentsFeatures/TableOfContentsFeatures'
import BentoSection from '../../../components/saint/BentoSection/BentoSection'
import SectionTitle from '../../../components/saint/SectionTitle/SectionTitle'
import {
  fetchAPIQuery,
  APIResponse,
} from '../../../queries/fetchApiQuery'

const SaintBio = (props) => {
  const router = useRouter()

  const slug = Array.isArray(router?.query?.slug)
    ? router?.query?.slug[0]
    : router?.query?.slug

  const { data = null } = useQuery(['saints', slug], () =>
    getSaint(slug),
  )

  if (!router.isFallback && !data) {
    return <ErrorPage statusCode={404} />
  }

  const { relatedSaints = null } = props

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: data?.name,
    birthDate: data?.birth_year,
    deathDate: data?.death_year,
    birthPlace: data?.birth_location,
    deathPlace: data?.death_location,
    description: data?.summary,
    affiliation: 'Eastern Orthodox Church',
  }

  return (
    <>
      <Head>
        <title>
          {`${data?.name}: Life, Legacy, and Teachings`}
        </title>
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_SITE_URL}/saints/${slug}`}
        />
        <meta
          key="description"
          name="description"
          content={`Discover ${data?.name}'s spiritual journey in the Eastern Orthodox tradition. Explore their sayings, images, and related books.`}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </Head>
      <Page>
        <div className={styles.SaintSingle}>
          <div className={styles.hero}>
            <div className={styles.heroContent}>
              <ImageMain
                images={data?.images}
                name={data?.name}
                limit={1}
              />
              <div className={styles.heroText}>
                <NameTag
                  name={data?.name}
                  tags={data?.categories}
                  birthYear={data?.birth_year}
                  deathYear={data?.death_year}
                />
                <Summary summary={data?.summary} />
              </div>
            </div>
          </div>

          <div className={styles.content}>
            <div className={styles.leftRail}>
              <TableOfContentFeatures />
            </div>
            <div className={styles.main}>
              <div>
                <SectionTitle
                  inRightRail={false}
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
              {data?.teachings[0] && (
                <div>
                  <SectionTitle
                    inRightRail={false}
                    id="section-teachings"
                    dataSection="teachings"
                  >
                    Teachings
                  </SectionTitle>
                  <BentoSection
                    data={data?.teachings[0].teaching}
                    link={`/saints/${slug}/teachings`}
                  />
                </div>
              )}
              {data?.miracles && (
                <div>
                  <SectionTitle
                    inRightRail={false}
                    id="section-miracles"
                    dataSection="miracles"
                  >
                    Miracles
                  </SectionTitle>
                  <BentoSection
                    data={data.miracles}
                    link={`/saints/${slug}/miracles`}
                  />
                </div>
              )}

              {data?.legacy_influence && (
                <div>
                  <SectionTitle
                    inRightRail={false}
                    id="section-legacy"
                    dataSection="legacy"
                  >
                    Legacy
                  </SectionTitle>
                  <BentoSection
                    data={data.legacy_influence}
                    link={`/saints/${slug}/legacy`}
                  />
                </div>
              )}
              {data?.books && (
                <Books
                  inRightRail={false}
                  books={data?.books}
                />
              )}
              {/* <Tomb
                imageId={data?.tomb?.id}
                location={data?.tomb_location}
                church={data?.tomb_church_name}
              /> */}
              <RelatedPeople data={relatedSaints} />
            </div>
          </div>
        </div>
      </Page>
    </>
  )
}

export const getStaticProps = async ({ params }) => {
  let relatedSaints: APIResponse = []

  const slug = Array.isArray(params?.slug)
    ? params?.slug[0]
    : params?.slug

  const queryClient = new QueryClient()
  await queryClient.prefetchQuery(['saints', slug], () =>
    getSaint(slug),
  )
  const saintData: Saint = queryClient.getQueryData([
    'saints',
    slug,
  ]) as Saint

  try {
    const saintsResponse = await fetchAPIQuery(
      'getRelatedSaints',
      { categories: saintData?.categories },
    )
    relatedSaints = saintsResponse || []
  } catch (error) {
    console.error(error)
  }

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      relatedSaints: relatedSaints
        ?.filter((saint) => saint.slug !== slug)
        .sort(() => Math.random() - 0.5)
        .slice(0, 4),
    },
    revalidate: 60,
  }
}

export const getStaticPaths = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_DOMAIN}/graphql`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query {
            saints {
              slug
            }
          }
        `,
      }),
    },
  )

  if (res.ok) {
    const resData = await res.json()

    const paths = resData.data.saints.map((saint) => ({
      params: { slug: saint.slug },
    }))

    return {
      paths,
      fallback: true,
    }
  }
  const error = await res.text()
  console.log(error)
}

export default SaintBio
