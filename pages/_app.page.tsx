import { useState } from 'react'
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { MantineProvider } from '@mantine/core'
import NextApp, { AppProps, AppContext } from 'next/app'
import Head from 'next/head'

import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
    >
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Head>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0"
            />
          </Head>
          <Component {...pageProps} />
        </Hydrate>
      </QueryClientProvider>
    </MantineProvider>
  )
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await NextApp.getInitialProps(appContext)
  return {
    ...appProps,
    colorScheme:
      //   getCookie('mantine-color-scheme', appContext.ctx) ||
      'dark',
  }
}

export default MyApp
