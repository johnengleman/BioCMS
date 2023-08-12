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

export const runtime = 'experimental-edge'

const SaintBio = (props) => {
  const router = useRouter()
  const id = Array.isArray(router?.query?.id)
    ? router?.query?.id[0]
    : router?.query?.id

  const { data } = useQuery(['saint', id], () =>
    getSaint(id),
  )

  const { relatedSaints } = props

  if (data) {
    return (
      <Page>
        <S.Saint>
          <div className="header">
            <NameTag
              name={data.name}
              birth={data.birth_year}
              death={data.death_year}
            />
            <ImageMain images={data.photos} />
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
  const id = Array.isArray(params?.id)
    ? params?.id[0]
    : params?.id

  const queryClient = new QueryClient()
  await queryClient.prefetchQuery(['saint', id], () =>
    getSaint(id),
  )

  const res = await fetch(
    `${process.env.PUBLIC_API_URL}/api/getRelatedSaints/?id=${id}`,
  )
  const relatedSaints = await res.json()

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      relatedSaints: relatedSaints
        .filter((saint) => saint.id !== id)
        .sort(() => Math.random() - 0.5)
        .slice(0, 4),
    },
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
              id
            }
          }
        `,
      }),
    },
  )

  const resData = await res.json()
  const paths = resData.data.saints.map((saint) => ({
    params: { id: saint.id },
  }))

  return {
    paths,
    fallback: 'blocking',
  }
}

export default SaintBio
