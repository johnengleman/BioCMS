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
import { getSearchData } from '../../../queries/getSearchData'
import { getRelatedSaints } from '../../../queries/getRelatedSaints'
import { getNav } from '../../../queries/getNav'
import Page from '../../../components/page/Page/Page'
import ImageMain from '../../../components/saint/ImageMain/ImageMain'
import Books from '../../../components/saint/Books/Books'
import RelatedPeople from '../../../components/saint/SimilarSaints/SimilarSaints'
import Tomb from '../../../components/saint/Tomb/Tomb'
import ErrorPage from 'next/error'
import NameTag from '../../../components/saint/NameTag/NameTag'
import Summary from '../../../components/saint/Summary/Summary'
import TableOfContentFeatures from '../../../components/saint/TableOfContentsFeatures/TableOfContentsFeatures'
import BentoSection from '../../../components/global/BentoSection/BentoSection'
import SectionTitle from '../../../components/saint/SectionTitle/SectionTitle'

export const config = {
  runtime: 'experimental-edge',
}

const SaintBio = () => {
  const router = useRouter()
  const church = Array.isArray(router.query.church)
    ? router.query.church[0]
    : router.query.church || 'all'

  const slug = Array.isArray(router?.query?.slug)
    ? router?.query?.slug[0]
    : router?.query?.slug

  const { data = null } = useQuery(['saints', slug], () =>
    getSaint(slug),
  )

  const { data: searchData } = useQuery(
    ['search', church],
    () =>
      getSearchData(
        Array.isArray(church) ? church[0] : church,
      ),
  )

  const { data: navData } = useQuery(['nav', church], () =>
    getNav({ church }),
  )

  const { data: relatedSaints } = useQuery(
    ['relatedSaints', church, slug],
    () =>
      getRelatedSaints({
        categories: data?.categories.join(),
        church,
        slug,
      }),
  )

  if (!router.isFallback && !data) {
    return <ErrorPage statusCode={404} />
  }

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
          {`${data?.name}: Life, Legacy, Miracles and Teachings`}
        </title>
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_SITE_URL}/saints/${slug}`}
        />
        <meta
          key="description"
          name="description"
          content={`Discover ${data?.name}'s spiritual journey: their life, legacy, miracles and teachings.`}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </Head>
      <Page
        searchData={searchData}
        navData={navData}
      >
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
                  feastDay={data?.feast_day}
                  type="bio"
                />
                <Summary summary={data?.summary} />
              </div>
            </div>
          </div>

          <div className={styles.content}>
            <div className={styles.leftRail}>
              <div className={styles.stickyContainer}>
                <div className={styles.sticky}>
                  <TableOfContentFeatures />
                </div>
              </div>
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
              {data?.teachings[0]?.teachings && (
                <div>
                  <SectionTitle
                    inRightRail={false}
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
              )}
              {data?.miracles[0]?.miracles && (
                <div>
                  <SectionTitle
                    inRightRail={false}
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
  const queryClient = new QueryClient()
  const church = params?.church || 'all'

  const slug = Array.isArray(params?.slug)
    ? params?.slug[0]
    : params?.slug

  await queryClient.prefetchQuery(['saints', slug], () =>
    getSaint(slug),
  )
  const saintData: Saint = queryClient.getQueryData([
    'saints',
    slug,
  ]) as Saint

  await queryClient.prefetchQuery(['search', church], () =>
    getSearchData(church),
  )

  await queryClient.prefetchQuery(['nav', church], () =>
    getNav({ church }),
  )

  await queryClient.prefetchQuery(
    ['relatedSaints', church, slug],
    () =>
      getRelatedSaints({
        categories: saintData?.categories.join(),
        church,
        slug,
      }),
  )

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 60,
  }
}

export const getStaticPaths = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT}/graphql`,
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
