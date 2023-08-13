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
import Bio from '../../components/saints/single/Description/Description'
import Books from '../../components/saints/single/Books/Books'
import RelatedPeople from '../../components/saints/single/RelatedPeople/RelatedPeople'
import Tomb from '../../components/saints/single/Tomb/Tomb'
import NameTag from '../../components/saints/single/NameTag/NameTag'
import ErrorPage from 'next/error'

// export const runtime = 'experimental-edge'

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

  if (data) {
    return (
      <Page>
        <S.Saint>
          <div className="header">
            <NameTag
              name={data?.name}
              birth={data?.birth_year}
              death={data?.death_year}
            />
            <ImageMain images={data?.photos} />
          </div>
          <div className="body">
            <div className="main">
              <Bio
                text={data?.biography}
                birthDate={data?.birth_year}
                birthLocation={data?.birth_location}
                deathDate={data?.death_year}
                deathLocation={data?.death_location}
                summary={data?.summary}
              />
              {/* <Quotes quotes={data?.quotes} /> */}
              <Books books={data?.books} />
            </div>
            <div className="rightRail">
              <RelatedPeople data={relatedSaints} />
              <Tomb
                imageId={data?.tomb?.id}
                location={data?.tomb_location}
                church={data?.tomb_church_name}
              />
            </div>
          </div>
        </S.Saint>
      </Page>
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

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/getRelatedSaints/?slug=${slug}`,
  )
  const relatedSaints = await res.json()

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      relatedSaints: relatedSaints
        .filter((saint) => saint.slug !== slug)
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

  if (res.headers['content-type'] === 'text/html') {
    return null
  }

  const resData = await res.json()

  const paths = resData.data.saints.map((saint) => ({
    params: { slug: saint.slug },
  }))

  return {
    paths,
    fallback: 'blocking',
  }
}

export default SaintBio
