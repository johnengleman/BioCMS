import { useRouter } from 'next/router'
import { GetServerSideProps } from 'next'

import {
  dehydrate,
  QueryClient,
  useQuery,
} from '@tanstack/react-query'
import * as S from './styles'
import { getSaint } from '../../queries/getSaint'
import Page from '../../components/global/Page/Page'
import { Powers } from '../../components/single/Categories/styles'
import HeaderImage from '../../components/single/ImageMain/ImageMain'
import HeaderImages from '../../components/single/Images/Images'
import Quotes from '../../components/single/Quotes/Quotes'
import Bio from '../../components/single/Description/Description'

const SaintBio = () => {
  const router = useRouter()
  const id = Array.isArray(router?.query?.id)
    ? router?.query?.id[0]
    : router?.query?.id

  const { data } = useQuery(['saint', id], () =>
    getSaint(id),
  )

  console.log(data)

  return (
    <Page>
      <S.Saint>
        <div className="header">
          <HeaderImage
            imageId={data?.photos[0]?.directus_files_id?.id}
            name={data?.name}
          />
          <div className="summary">
            Sit at pellentesque eu egestas placerat commodo.
            Et quam luctus posuere feugiat. Pulvinar fusce
            odio tortor, sit sit. In habitant volutpat netus
            sit sed.
          </div>
          <Powers />
          <HeaderImages
            imageIds={[
              data?.photos[1]?.directus_files_id?.id,
              data?.photos[2]?.directus_files_id?.id,
              data?.photos[3]?.directus_files_id?.id,
            ]}
          />
        </div>
        <div className="body">
          <div className="quotes">
            <Quotes quotes={data?.saint_quotes} />
          </div>
          <Bio text={data?.biography} />
        </div>
      </S.Saint>
    </Page>
  )
}

export const getServerSideProps: GetServerSideProps =
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

export default SaintBio
