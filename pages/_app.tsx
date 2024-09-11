import { useState, useEffect } from 'react'
import Router from 'next/router'
import NextNProgress from 'nextjs-progressbar'
import { initGA4 } from '../utils/g4a'
import ReactGA from 'react-ga4'
import { SiteProvider } from '../context/SiteContext'
import ErrorBoundary from '../components/global/ErrorBoundary/ErrorBoundary'
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

  useEffect(() => {
    initGA4() // Initialize GA4
    const handleRouteChange = (url) => {
      ReactGA.send({ hitType: 'pageview', page: url })
    }
    Router.events.on(
      'routeChangeComplete',
      handleRouteChange,
    )
    return () => {
      Router.events.off(
        'routeChangeComplete',
        handleRouteChange,
      )
    }
  }, [])

  return (
    <ErrorBoundary>
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
    </ErrorBoundary>
  )
}

export default MyApp
