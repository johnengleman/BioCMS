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
import Relics from '../../../components/saint/Relics/Relics'
import ErrorPage from 'next/error'
import NameTag from '../../../components/saint/NameTag/NameTag'
import Quotes from '../../../components/saint/Quotes/Quotes'
import Summary from '../../../components/saint/Summary/Summary'
import TableOfContentFeatures from '../../../components/saint/TableOfContentsFeatures/TableOfContentsFeatures'
import BentoSection from '../../../components/global/BentoSection/BentoSection'
import PrayersC from '../../../components/saint/PrayersC/PrayersC'
import SectionTitle from '../../../components/saint/SectionTitle/SectionTitle'
import ExtraInfo from '../../../components/saint/ExtraInfo/ExtraInfo'
import ScrollUp from '../../../components/global/ScrollUp/ScrollUp'

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

  const { data = null } = useQuery(
    ['saints', slug],
    () => getSaint(slug),
    {
      initialData: [],
    },
  )

  const { data: searchData } = useQuery(
    ['search', church],
    () =>
      getSearchData(
        Array.isArray(church) ? church[0] : church,
      ),
    {
      initialData: [],
    },
  )

  const { data: navData } = useQuery(
    ['nav', church],
    () => getNav({ church }),
    {
      initialData: {},
    },
  )

  const { data: relatedSaints } = useQuery(
    ['relatedSaints', church, slug],
    () =>
      getRelatedSaints({
        categories: data?.categories.join(),
        church,
        slug,
      }),
    {
      initialData: [],
    },
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
      <Page
        searchData={searchData}
        navData={navData}
      >
        <div className={styles.SaintSingle}>
          <div className={styles.hero}>
            <div className={styles.heroContent}>
              <ImageMain
                image={data?.profile_image}
                name={data?.name}
              />
              <div className={styles.heroText}>
                <div className={styles.row1}>
                  <NameTag
                    tags={data?.categories}
                    birthYear={data?.birth_year}
                    deathYear={data?.death_year}
                    header={`Who was ${data?.name}?`}
                  />
                  <Summary summary={data?.summary} />
                </div>

                <ExtraInfo
                  orthodoxFeastDay={
                    data?.feast_day_orthodox
                  }
                  catholicFeastDay={
                    data?.feast_day_catholic
                  }
                  patron={data?.patron}
                />
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
                  <Quotes quotes={data?.quotes} />
                </div>
              ) : (
                ''
              )}
              {data?.books ? (
                <Books
                  inRightRail={false}
                  books={data?.books}
                />
              ) : (
                ''
              )}
              <RelatedPeople data={relatedSaints} />
              <ScrollUp />
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
