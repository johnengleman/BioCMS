import type { Metadata } from 'next'
import { getQuotes } from '../../queries/getQuotes'
import { getChurch } from '../../hooks/getChurch'
import ListPage from '../../components/candle/ListPage/ListPage'
import ContentList from '../../components/candle/ContentList/ContentList'

import { NextPageProps } from '../../types/nextjs'

const PAGE_SIZE = 30

export const generateMetadata = async (
  props: NextPageProps,
): Promise<Metadata> => {
  const searchParams = await props.searchParams
  const filter = searchParams.filter || 'all'
  return {
    title:
      'Quotes from the Saints: Wisdom on Faith, Love & Prayer',
    description:
      'Discover inspirational quotes from Catholic and Orthodox saints. Explore their wisdom on faith, love and prayer.',
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/quotes${
        filter !== 'all' ? `?filter=${filter}` : ''
      }`,
    },
  }
}

const Quotes = async (props: NextPageProps) => {
  const searchParams = await props.searchParams
  const filter = searchParams.filter || 'all'
  const church = await getChurch(searchParams)

  const items = await getQuotes({
    church,
    filter,
    offset: 0,
    limit: PAGE_SIZE,
  })

  return (
    <ListPage
      kind="quotes"
      path="/quotes"
      title="Quotes"
      subtitle="Words of the saints on faith, prayer, love and suffering."
      church={church}
      filter={filter}
      searchParams={searchParams}
    >
      <ContentList
        key={`${church}-${filter}`}
        kind="quotes"
        initialItems={items || []}
        church={church}
        filter={filter}
        pageSize={PAGE_SIZE}
        emptyText={
          filter === 'all'
            ? 'No quotes yet. They will appear here as we add each saint.'
            : 'No quotes match this topic yet. Choose another topic or tradition.'
        }
      />
    </ListPage>
  )
}

export default Quotes
