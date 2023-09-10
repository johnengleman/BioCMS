import { useRef } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import {
  dehydrate,
  QueryClient,
  useQuery,
} from '@tanstack/react-query'
import * as S from '../styles'
import { getSaint } from '../../../queries/getSaint'
import Page from '../../../components/page/Page/Page'
import ImageMain from '../../../components/saints/single/ImageMain/ImageMain'
import Biography from '../../../components/saints/single/Biography/Biography'
import Books from '../../../components/saints/single/Books/Books'
import RelatedPeople from '../../../components/saints/single/RelatedPeople/RelatedPeople'
import Tomb from '../../../components/saints/single/Tomb/Tomb'
import ErrorPage from 'next/error'
import NameTag from '../../../components/saints/single/NameTag/NameTag'
import Summary from '../../../components/saints/single/Summary/Summary'
import TableOfContents from '../../../components/saints/single/TableOfContents/TableOfContents'
import BentoSection from '../../../components/saints/single/BentoSection/BentoSection'
import {
  fetchAPIQuery,
  APIResponse,
} from '../../../queries/fetchApiQuery'

const SaintBio = (props) => {
  const router = useRouter()
  const refElement = useRef(null)

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
          {`${data.name}: Life, Legacy, and Teachings`}
        </title>
        <link
          rel="canonical"
          href={`${process.env.SITE_URL}/saints/${slug}`}
        />
        <meta
          key="description"
          name="description"
          content={`Discover ${data.name}'s spiritual journey in the Eastern Orthodox tradition. Explore their sayings, images, and related books.`}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </Head>
      <Page>
        <S.Saint>
          <div className="leftRail">
            <ImageMain
              images={data?.images}
              name={data?.name}
              limit={4}
            />
            <Tomb
              imageId={data?.tomb?.id}
              location={data?.tomb_location}
              church={data?.tomb_church_name}
            />
          </div>
          <div
            className="main"
            ref={refElement}
          >
            <NameTag
              name={data?.name}
              tags={data?.categories}
              birthYear={data?.birth_year}
              deathYear={data?.death_year}
            />
            <Summary summary={data?.summary} />

            <div className="bento-section">
              <BentoSection
                title="My Life"
                data={data.biography}
                link={`/saints/${slug}/bio`}
              />
              <BentoSection title="My Teachings" />
              <BentoSection
                title="My Legacy"
                data={data.legacy_influence}
              />
              <BentoSection
                title="My Miracles"
                data={data.miracles}
              />
            </div>

            <Books books={data?.books} />
            <RelatedPeople data={relatedSaints} />
          </div>
        </S.Saint>
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
  const saintData = queryClient.getQueryData([
    'saints',
    slug,
  ])

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
