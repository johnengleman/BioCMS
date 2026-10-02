import ContentListPage, {
  listMetadata,
} from '../../components/candle/pages/ContentListPage'

// Built ahead of time and refreshed every four minutes.
export const revalidate = 240

export const metadata = listMetadata('teachings')

const Page = () => <ContentListPage kind="teachings" />

export default Page
