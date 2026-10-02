import ContentListPage, {
  listMetadata,
} from '../../components/candle/pages/ContentListPage'

// Built ahead of time and refreshed every five minutes.
export const revalidate = 300

export const metadata = listMetadata('quotes')

const Page = () => <ContentListPage kind="quotes" />

export default Page
