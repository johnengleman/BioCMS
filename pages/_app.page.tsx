import { useState } from 'react'
import NextNProgress from 'nextjs-progressbar'
import { Analytics } from '@vercel/analytics/react'
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { AppProps } from 'next/app'
import { Inter } from 'next/font/google'
import Head from 'next/head'

import '../styles/globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Head>
          <meta
            name="google-site-verification"
            content="WyfYuxG-VseN6Coy0vRff1FC3vaQgyDTyD15brOmylE"
          />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
        </Head>
        <NextNProgress />
        <main className={inter.className}>
          <Component {...pageProps} />
          <Analytics />
        </main>
      </Hydrate>
    </QueryClientProvider>
  )
}

export default MyApp
