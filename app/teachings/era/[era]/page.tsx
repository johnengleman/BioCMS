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
  listFilterParams('teachings', 'era')

type Props = { params: Promise<{ era: string }> }

export const generateMetadata = async ({ params }: Props) =>
  listMetadata('teachings', (await params).era)

const Page = async ({ params }: Props) => {
  const { era: filter } = await params
  if (!isListFilter('teachings', filter)) notFound()
  return <ContentListPage kind="teachings" filter={filter} />
}

export default Page
