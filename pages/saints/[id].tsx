import { useRouter } from 'next/router'
import { GetServerSideProps } from 'next'
import Image from 'next/image'
import {
  dehydrate,
  QueryClient,
  useQuery,
} from '@tanstack/react-query'
import * as S from './styles'
import { getSaint } from '../../queries/getSaint'
import Page from '../../components/Page/Page'
import Powers from '../../components/Powers/Powers'
import Name from '../../components/Name/Name'
import ButtonAction from '../../components/Buttons/ButtonAction/ButtonAction'

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
      <div>
        <S.Header>
          <S.ImageContainer>
            <S.Image>
              <Image
                src={`https://4hi7oa87.directus.app/assets/${data?.photos[0]?.directus_files_id?.id}`}
                height="275"
                width="225"
                layout="fixed"
                alt=""
              />
            </S.Image>
            <Name name={data?.name} />
          </S.ImageContainer>
          <S.SummaryContainer>
            <S.Summary>
              Sit at pellentesque eu egestas placerat
              commodo. Et quam luctus posuere feugiat.
              Pulvinar fusce odio tortor, sit sit. In
              habitant volutpat netus sit sed.
            </S.Summary>
            <Powers />
          </S.SummaryContainer>
          <S.Pictures>
            <Image
              src={`https://4hi7oa87.directus.app/assets/${data?.photos[1]?.directus_files_id?.id}?key=profile`}
              height="125"
              width="115"
              layout="fixed"
              alt=""
            />
            <Image
              src={`https://4hi7oa87.directus.app/assets/${data?.photos[2]?.directus_files_id?.id}?key=profile`}
              height="125"
              width="115"
              layout="fixed"
              alt=""
            />
            <Image
              src={`https://4hi7oa87.directus.app/assets/${data?.photos[3]?.directus_files_id?.id}?key=profile`}
              height="125"
              width="115"
              layout="fixed"
              alt=""
            />
            <ButtonAction text="Show All Photos" />
          </S.Pictures>
        </S.Header>
      </div>
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
