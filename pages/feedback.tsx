import { useForm, ValidationError } from '@formspree/react'
import { useRouter } from 'next/router'
import {
  QueryClient,
  useQuery,
  dehydrate,
} from '@tanstack/react-query'
import { getNav } from '../queries/getNav'
import { getSearchData } from '../queries/getSearchData'
import Head from 'next/head'
import Page from '../components/page/Page/Page'
import useCookie from '../hooks/useCookie'
import styles from './styles.module.scss'

export const config = {
  runtime: 'experimental-edge',
}

const Feedback = () => {
  useCookie()
  const [state, handleSubmit] = useForm('maygvrkn')
  const router = useRouter()
  const church = Array.isArray(router.query.church)
    ? router.query.church[0]
    : router.query.church || 'all'

  const { data: searchData } = useQuery(
    ['search', church],
    () => getSearchData(church),
    {
      initialData: [],
    },
  )

  const { data: navData } = useQuery(
    ['nav', church],
    () => getNav({ church }),
    {
      initialData: {},
    },
  )

  return (
    <>
      <Head>
        <title>Feedback</title>
        <meta
          key="description"
          name="description"
          content="Explore the lives and legacies of Catholic saints. From teachings to miracles, delve into their spiritual journeys."
        />
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_SITE_URL}/feedback`}
        />
        <meta
          name="keywords"
          content="Roman Catholic, spiritual journeys, miracles, teachings, holy figures, books, Orthodox literature, religious quotes, saintly quotes, Orthodox teachings, church history, faith, spirituality, Christianity"
        />
      </Head>
      <Page
        spaceBetween={true}
        searchData={searchData}
        navData={navData}
      >
        <div className={styles.feedback}>
          {state.succeeded && (
            <p className={styles.thankYou}>Thank You!</p>
          )}
          {!state.succeeded && (
            <>
              <p>
                Have feedback or a suggestion? Send me a
                message!
              </p>
              <form onSubmit={handleSubmit}>
                <input
                  name="subject"
                  placeholder="Subject"
                />
                <ValidationError
                  prefix="Email"
                  field="email"
                  errors={state.errors}
                />
                <textarea
                  name="message"
                  placeholder="Message"
                />
                <ValidationError
                  prefix="Message"
                  field="message"
                  errors={state.errors}
                />
                <button
                  type="submit"
                  disabled={state.submitting}
                >
                  Submit
                </button>
              </form>
            </>
          )}
        </div>
      </Page>
    </>
  )
}

export async function getServerSideProps(context) {
  const cookie = context.req.headers.cookie
  let church = 'all'

  if (cookie) {
    const parsedCookie = cookie
      .split('; ')
      .find((row) => row.startsWith('findasaint.com='))
      ?.split('=')[1]

    if (parsedCookie) {
      const data = JSON.parse(
        decodeURIComponent(parsedCookie),
      )
      church = data.church
    }
  }

  // Now use the church value to make the initial data request
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 60 * 1000, // 1 hour in milliseconds
        cacheTime: 60 * 60 * 1000, // 1 hour in milliseconds
      },
    },
  })

  await queryClient.prefetchQuery(['search', church], () =>
    getSearchData(church),
  )

  await queryClient.prefetchQuery(['nav', church], () =>
    getNav({ church }),
  )

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

export default Feedback
