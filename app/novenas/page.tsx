import type { Metadata } from 'next'
import { getPrayers } from '../../queries/getPrayers'
import { getChurch } from '../../hooks/getChurch'
import ListPage from '../../components/candle/ListPage/ListPage'
import ContentList from '../../components/candle/ContentList/ContentList'

export const runtime = 'edge'

import { NextPageProps } from '../../types/nextjs'

const PAGE_SIZE = 12

export const generateMetadata = async (
  props: NextPageProps,
): Promise<Metadata> => {
  const searchParams = await props.searchParams
  const filter = searchParams.filter || 'all'
  return {
    title: 'Novenas to the Saints: Nine Days of Prayer',
    description:
      'Pray novenas to the Catholic and Orthodox saints, one day at a time.',
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/novenas${
        filter !== 'all' ? `?filter=${filter}` : ''
      }`,
    },
  }
}

const Novenas = async (props: NextPageProps) => {
  const searchParams = await props.searchParams
  const filter = searchParams.filter || 'all'
  const church = await getChurch(searchParams)

  const items = await getPrayers({
    church,
    filter,
    offset: 0,
    limit: PAGE_SIZE,
  })

  return (
    <ListPage
      kind="prayers"
      path="/novenas"
      title="Novenas"
      subtitle="Nine days of prayer, asking the saints for their help."
      church={church}
      filter={filter}
      searchParams={searchParams}
    >
      <ContentList
        key={`${church}-${filter}`}
        kind="prayers"
        initialItems={items || []}
        church={church}
        filter={filter}
        pageSize={PAGE_SIZE}
        emptyText={
          filter === 'all'
            ? 'No novenas yet. They will appear here as we add each saint.'
            : 'No novenas match this filter yet. Choose another topic or tradition.'
        }
      />
    </ListPage>
  )
}

export default Novenas
