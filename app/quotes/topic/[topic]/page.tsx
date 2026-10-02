import { notFound } from 'next/navigation'
import ContentListPage, {
  isListFilter,
  listFilterParams,
  listMetadata,
} from '../../../../components/candle/pages/ContentListPage'

// One page per filter, built ahead of time and refreshed every four
// minutes. Any other value is a 404.
export const revalidate = 240
export const dynamicParams = false
export const generateStaticParams = () =>
  listFilterParams('quotes', 'topic')

type Props = { params: Promise<{ topic: string }> }

export const generateMetadata = async ({ params }: Props) =>
  listMetadata('quotes', (await params).topic)

const Page = async ({ params }: Props) => {
  const { topic: filter } = await params
  if (!isListFilter('quotes', filter)) notFound()
  return <ContentListPage kind="quotes" filter={filter} />
}

export default Page
