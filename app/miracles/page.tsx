import type { Metadata } from 'next'
import { getMiracles } from '../../queries/getMiracles'
import { withPreview } from '../../utils/listPreview'
import { getChurch } from '../../hooks/getChurch'
import ListPage from '../../components/candle/ListPage/ListPage'
import ContentList from '../../components/candle/ContentList/ContentList'

export const runtime = 'edge'

import { NextPageProps } from '../../types/nextjs'

const PAGE_SIZE = 6

export const generateMetadata = async (
  props: NextPageProps,
): Promise<Metadata> => {
  const searchParams = await props.searchParams
  const filter = searchParams.filter || 'all'
  return {
    title:
      'Miracles of the Saints: Catholic & Orthodox Wonders',
    description:
      'Explore miracles of Catholic and Orthodox saints through history, from the Patristic Age to the Modern era.',
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/miracles${
        filter !== 'all' ? `?filter=${filter}` : ''
      }`,
    },
  }
}

const Miracles = async (props: NextPageProps) => {
  const searchParams = await props.searchParams
  const filter = searchParams.filter || 'all'
  const church = await getChurch(searchParams)

  const items = withPreview(
    'miracles',
    await getMiracles({
      church,
      filter,
      offset: 0,
      limit: PAGE_SIZE,
    }),
  )

  return (
    <ListPage
      kind="miracles"
      path="/miracles"
      title="Miracles"
      subtitle="Healings and wonders attributed to the saints, with their sources."
      church={church}
      filter={filter}
      searchParams={searchParams}
    >
      <ContentList
        key={`${church}-${filter}`}
        kind="miracles"
        initialItems={items || []}
        church={church}
        filter={filter}
        pageSize={PAGE_SIZE}
        emptyText={
          filter === 'all'
            ? 'No miracles yet. They will appear here as we add each saint.'
            : 'No miracles match this filter yet. Choose another era or tradition.'
        }
      />
    </ListPage>
  )
}

export default Miracles
