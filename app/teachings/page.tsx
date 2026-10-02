import type { Metadata } from 'next'
import { getTeachings } from '../../queries/getTeachings'
import { withPreview } from '../../utils/listPreview'
import { getChurch } from '../../hooks/getChurch'
import ListPage from '../../components/candle/ListPage/ListPage'
import ContentList from '../../components/candle/ContentList/ContentList'

import { NextPageProps } from '../../types/nextjs'

const PAGE_SIZE = 6

export const generateMetadata = async (
  props: NextPageProps,
): Promise<Metadata> => {
  const searchParams = await props.searchParams
  const filter = searchParams.filter || 'all'
  return {
    title: 'Christian Saints: Legacy & Teachings Explored',
    description:
      'Explore teachings and legacies of Catholic and Orthodox saints from the Apostolic to Modern era.',
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/teachings${
        filter !== 'all' ? `?filter=${filter}` : ''
      }`,
    },
  }
}

const Teachings = async (props: NextPageProps) => {
  const searchParams = await props.searchParams
  const filter = searchParams.filter || 'all'
  const church = await getChurch(searchParams)

  const items = withPreview(
    'teachings',
    await getTeachings({
      church,
      filter,
      offset: 0,
      limit: PAGE_SIZE,
    }),
  )

  return (
    <ListPage
      kind="teachings"
      path="/teachings"
      title="Teachings"
      subtitle="What the saints taught, in their own words and through their lives."
      church={church}
      filter={filter}
      searchParams={searchParams}
    >
      <ContentList
        key={`${church}-${filter}`}
        kind="teachings"
        initialItems={items || []}
        church={church}
        filter={filter}
        pageSize={PAGE_SIZE}
        emptyText={
          filter === 'all'
            ? 'No teachings yet. They will appear here as we add each saint.'
            : 'No teachings match this filter yet. Choose another era or tradition.'
        }
      />
    </ListPage>
  )
}

export default Teachings
