import ContentListPage, {
  listMetadata,
} from '../../components/candle/pages/ContentListPage'

// Built ahead of time and refreshed every five minutes.
export const revalidate = 300
// Fail the build if anything here needs the request (cookies,
// headers, searchParams): every page must be built ahead of time.
export const dynamic = 'error'

export const metadata = listMetadata('prayers')

const Page = () => <ContentListPage kind="prayers" />

export default Page
