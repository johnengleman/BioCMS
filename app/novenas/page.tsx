import ContentListPage, {
  listMetadata,
} from '../../components/candle/pages/ContentListPage'

// Built ahead of time and refreshed every four minutes.
export const revalidate = 240

export const metadata = listMetadata('prayers')

const Page = () => <ContentListPage kind="prayers" />

export default Page
