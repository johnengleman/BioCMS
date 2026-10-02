import type { Metadata } from 'next'
import { loadList } from '../../../queries/loadList'
import {
  LIST_ROUTES,
  filtersFor,
  listHref,
  type ListKind,
} from '../../../utils/listParams'
import ListPage from '../ListPage/ListPage'
import ContentList from '../ContentList/ContentList'
import { LIST_CONFIG } from './listConfig'

// "apostolic_era" -> "Apostolic era"
const words = (value: string) => {
  const text = value.replace(/_/g, ' ')
  return text.charAt(0).toUpperCase() + text.slice(1)
}

export const listMetadata = (
  kind: ListKind,
  filter = 'all',
): Metadata => {
  const config = LIST_CONFIG[kind]
  return {
    title:
      filter === 'all'
        ? config.metaTitle
        : `${config.title}: ${words(filter)}`,
    description: config.metaDescription,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}${listHref(kind, filter)}`,
    },
  }
}

// Filters that get their own page, for generateStaticParams.
export const listFilterParams = (kind: ListKind, name: string) =>
  filtersFor(kind)
    .filter((filter) => filter !== 'all')
    .map((filter) => ({ [name]: filter }))

export const isListFilter = (kind: ListKind, filter: string) =>
  filter !== 'all' && filtersFor(kind).includes(filter)

// A site-wide list (miracles, teachings, quotes, novenas), for its main
// page and for each filter page. Built ahead of time for "Both
// traditions"; the browser loads other traditions from the cached API.
const ContentListPage = async ({
  kind,
  filter = 'all',
}: {
  kind: ListKind
  filter?: string
}) => {
  const config = LIST_CONFIG[kind]
  const items = await loadList(kind, {
    church: 'all',
    filter,
    offset: 0,
    limit: config.pageSize,
  })

  return (
    <ListPage
      kind={kind}
      path={LIST_ROUTES[kind].path}
      title={config.title}
      subtitle={config.subtitle}
      filter={filter}
    >
      <ContentList
        kind={kind}
        initialItems={items || []}
        filter={filter}
        pageSize={config.pageSize}
        emptyText={
          filter === 'all'
            ? `No ${config.noun} yet. They will appear here as we add each saint.`
            : `No ${config.noun} match this filter yet. Choose another ${config.filterWord} or tradition.`
        }
      />
    </ListPage>
  )
}

export default ContentListPage
