import { useState } from 'react'
import NextNProgress from 'nextjs-progressbar'
import { SiteProvider } from '../context/SiteContext'
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { AppProps } from 'next/app'
import { Inter } from 'next/font/google'
import Head from 'next/head'

import { config } from '@fortawesome/fontawesome-svg-core'
config.autoAddCss = false
import '@fortawesome/fontawesome-svg-core/styles.css'
import '../styles/variables.css'
import '../styles/globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-Inter',
  display: 'swap',
})

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <SiteProvider>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Head>
            <meta
              name="google-site-verification"
              content="MpAUyfDuciR572ZaxGUSNT-lQwkUN_k2QAKMiMnO9RY"
            />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0"
            />
          </Head>
          <NextNProgress />
          <main className={inter.className}>
            <Component {...pageProps} />
          </main>
        </Hydrate>
      </QueryClientProvider>
    </SiteProvider>
  )
}

export default MyApp
