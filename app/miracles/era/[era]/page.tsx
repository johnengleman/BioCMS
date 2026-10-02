import { notFound } from 'next/navigation'
import ContentListPage, {
  isListFilter,
  listFilterParams,
  listMetadata,
} from '../../../../components/candle/pages/ContentListPage'

// One page per filter, built ahead of time and refreshed every five
// minutes. Any other value is a 404.
export const revalidate = 300
export const dynamicParams = false
export const generateStaticParams = () =>
  listFilterParams('miracles', 'era')

type Props = { params: Promise<{ era: string }> }

export const generateMetadata = async ({ params }: Props) =>
  listMetadata('miracles', (await params).era)

const Page = async ({ params }: Props) => {
  const { era: filter } = await params
  if (!isListFilter('miracles', filter)) notFound()
  return <ContentListPage kind="miracles" filter={filter} />
}

export default Page
