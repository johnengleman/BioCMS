import { useRouter } from 'next/router'

import {
  dehydrate,
  QueryClient,
  useQuery,
  useQueries,
} from '@tanstack/react-query'
import * as S from './styles'
import { getSaint } from '../../queries/getSaint'
import { getSaints } from '../../queries/getSaints'
import Page from '../../components/global/Page/Page'
import ImageMain from '../../components/saints/single/ImageMain/ImageMain'
import Quotes from '../../components/saints/single/Quotes/Quotes'
import Bio from '../../components/saints/single/Description/Description'
import Books from '../../components/saints/single/Books/Books'
import Churches from '../../components/saints/single/Churches/Churches'
import RelatedPeople from '../../components/saints/single/RelatedPeople/RelatedPeople'
import Tomb from '../../components/saints/single/Tomb/Tomb'
import NameTag from '../../components/saints/single/NameTag/NameTag'

export const runtime = 'experimental-edge';

const SaintBio = () => {
  const router = useRouter()
  const id = Array.isArray(router?.query?.id)
    ? router?.query?.id[0]
    : router?.query?.id

  const { data } = useQuery(['saint', id], () =>
    getSaint(id),
  )

  const relatedSaints = data?.related_to || []
  const relatedSaintQueries = useQueries({
    queries: relatedSaints?.map((relationship) => ({
      queryKey: ['saint', relationship.saint.key],
      queryFn: () =>
        getSaint(relationship.saint.key.toString()),
    })),
  })

  const relatedSaintsWithName = relatedSaints.map(
    (saint, i) => ({
      name: relatedSaintQueries[i]?.data?.name,
      photo:
        relatedSaintQueries[i]?.data?.photos[0]
          ?.directus_files_id.id,
      id: saint.saint.key,
      relationship_type: saint.relationship_type,
    }),
  )

  const rightRailNoContent =
    !data?.tomb?.id && !relatedSaintsWithName.length

  if (data) {
    return (
      <Page>
        <S.Saint>
          <div className="header">
            <NameTag
              name={data.name}
              birth={data.birth_date}
              death={data.death_date}
            />
            <ImageMain images={data.photos} />
          </div>
          <div
            className={`body ${
              rightRailNoContent ? 'rightRailNoContent' : ''
            }`}
          >
            <div className="main">
              <Bio
                text={data?.biography}
                birthDate={data?.birth_date}
                birthLocation={data?.birth_location}
                deathDate={data?.death_date}
                deathLocation={data?.death_location}
                summary={data?.summary}
              />
              <Quotes quotes={data?.quotes} />
              <Books books={data?.books} />
              <Churches churches={data?.churches} />
            </div>
            <div className="rightRail">
              <RelatedPeople data={relatedSaintsWithName} />
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

export const getStaticProps =
  async ({ params }) => {
    const id = Array.isArray(params?.id)
      ? params?.id[0]
      : params?.id

    const queryClient = new QueryClient()
    await queryClient.prefetchQuery(['saint', id], () =>
      getSaint(id),
    )

    return {
      props: {
        dehydratedState: dehydrate(queryClient),
      },
    }
  }

  export const getStaticPaths = async () => {
    return {
      paths: [],
      fallback: "blocking"
    };
  };

export default SaintBio
