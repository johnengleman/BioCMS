import { useState } from 'react'
import { ThemeProvider } from 'styled-components'
import { useLocalStorage } from 'usehooks-ts'
import { defaultTheme } from '../components/themes/defaultTheme'
import { GlobalStyle } from '../components/themes/GlobalStyle'
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

// import { config } from '@fortawesome/fontawesome-svg-core'
// config.autoAddCss = false
// import '@fortawesome/fontawesome-svg-core/styles.css'
import '../styles/globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

function MyApp({ Component, pageProps }: AppProps) {
  const [theme] = useLocalStorage('theme', defaultTheme)
  const [queryClient] = useState(() => new QueryClient())

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
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
            <Analytics />
          </main>
        </Hydrate>
      </QueryClientProvider>
    </ThemeProvider>
  )
}

export default MyApp
