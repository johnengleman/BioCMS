import { useRouter } from 'next/router'
import { GetServerSideProps } from 'next'
import {
  dehydrate,
  QueryClient,
  useQuery,
} from '@tanstack/react-query'
import * as S from './styles'
import { getSaint } from '../../queries/getSaint'
import Page from '../../components/Page/Page'
import HeaderSummary from '../../components/HeaderSummary/HeaderSummary'
import HeaderImage from '../../components/HeaderImage/HeaderImage'
import HeaderImages from '../../components/HeaderImages/HeaderImages'

const SaintBio = () => {
  const router = useRouter()
  const id = Array.isArray(router?.query?.id)
    ? router?.query?.id[0]
    : router?.query?.id

  const { data } = useQuery(['saint', id], () =>
    getSaint(id),
  )

  return (
    <Page>
      <S.Saint>
        <div className="header">
          <HeaderImage
            imageId={data?.photos[0]?.directus_files_id?.id}
            name={data?.name}
          />
          <HeaderSummary />
          <HeaderImages
            imageIds={[
              data?.photos[1]?.directus_files_id?.id,
              data?.photos[2]?.directus_files_id?.id,
              data?.photos[3]?.directus_files_id?.id,
            ]}
          />
        </div>
        <div className="body"></div>
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
