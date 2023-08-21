import Head from 'next/head'
import { useRouter } from 'next/router'
import {
  dehydrate,
  QueryClient,
  useQuery,
} from '@tanstack/react-query'
import * as S from './styles'
import { getSaint } from '../../queries/getSaint'
import Page from '../../components/global/Page/Page'
import ImageMain from '../../components/saints/single/ImageMain/ImageMain'
import Quotes from '../../components/saints/single/Quotes/Quotes'
import Biography from '../../components/saints/single/Biography/Biography'
import TextSection from '../../components/saints/single/TextSection/TextSecton'
import Books from '../../components/saints/single/Books/Books'
import RelatedPeople from '../../components/saints/single/RelatedPeople/RelatedPeople'
import Tomb from '../../components/saints/single/Tomb/Tomb'
import NameTag from '../../components/saints/single/NameTag/NameTag'
import ErrorPage from 'next/error'
import { getSaints } from '../../queries/getSaints'
import { fetchAPIQuery } from '../../queries/fetchApiQuery'

const SaintBio = (props) => {
  const router = useRouter()

  const slug = Array.isArray(router?.query?.slug)
    ? router?.query?.slug[0]
    : router?.query?.slug

  const { data = null } = useQuery(['saints', slug], () =>
    getSaint(slug),
  )
  const { data: saintsData } = useQuery(
    ['saints'],
    getSaints,
  )

  if (!router.isFallback && !data) {
    return <ErrorPage statusCode={404} />
  }

  const { relatedSaints = null } = props

  if (data) {
    return (
      <>
        <Head>
          <title key="title">
            {data.name}: Life, Legacy, and Teachings
          </title>
          <meta
            key="description"
            name="description"
            content={`Discover ${data.name}'s spiritual journey in the Eastern Orthodox tradition. Explore their quotes, images, and related books.`}
          />
        </Head>
        <Page saints={saintsData}>
          <S.Saint>
            <div className="header">
              <NameTag
                name={data?.name}
                birth={data?.birth_year}
                death={data?.death_year}
                tags={data?.categories}
              />
              <ImageMain
                images={data?.photos}
                name={data.name}
              />
            </div>
            <div className="body">
              <div className="main">
                <Biography
                  text={data?.biography}
                  birthDate={data?.birth_year}
                  birthLocation={data?.birth_location}
                  deathDate={data?.death_year}
                  deathLocation={data?.death_location}
                  summary={data?.summary}
                />
                <TextSection
                  title="Miracles"
                  text={data?.miracles}
                />
                <TextSection
                  title="Legacy and Influence"
                  text={data?.legacy_and_influence}
                />
              </div>
              <div className="rightRail">
                <Books books={data?.books} />
                <Tomb
                  imageId={data?.tomb?.id}
                  location={data?.tomb_location}
                  church={data?.tomb_church_name}
                />
                <RelatedPeople data={relatedSaints} />
                {/* <Quotes quotes={data?.quotes} /> */}
              </div>
            </div>
          </S.Saint>
        </Page>
      </>
    )
  }
}

export const getStaticProps = async ({ params }) => {
  const slug = Array.isArray(params?.slug)
    ? params?.slug[0]
    : params?.slug

  const queryClient = new QueryClient()
  await queryClient.prefetchQuery(['saints', slug], () =>
    getSaint(slug),
  )

  await queryClient.prefetchQuery(['saints'], getSaints)
  const relatedSaints = await fetchAPIQuery(
    `getRelatedSaints/?slug=${slug}`,
  )

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
    'https://saints-cms.onrender.com/graphql',
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
      fallback: 'blocking',
    }
  }
  const error = await res.text()
  console.log(error)
}

export default SaintBio
