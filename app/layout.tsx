// /app/layout.tsx

import { Nunito } from 'next/font/google'
import '@fortawesome/fontawesome-svg-core/styles.css'
import '../styles/variables.css'
import '../styles/globals.css'
import { config } from '@fortawesome/fontawesome-svg-core'
config.autoAddCss = false
import { ReactNode } from 'react'
import Providers from './providers'
import Script from 'next/script'

const inter = Nunito({
  subsets: ['latin'],
  variable: '--font-Inter',
  display: 'swap',
})

export const metadata = {
  title: 'Find A Saint',
  description:
    'Catholic & Orthodox Saints, their Lives, Miracles Teachings and Prayers',
  icons: {
    icon: [
      { url: '/favicons/favicon.ico' },
      {
        url: '/favicons/favicon-16x16.png',
        sizes: '16x16',
        type: 'image/png',
      },
      {
        url: '/favicons/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        url: '/favicons/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        url: '/favicons/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    apple: [{ url: '/favicons/apple-touch-icon.png' }],
  },
  manifest: '/favicons/site.webmanifest',
  verification: {
    google: 'MpAUyfDuciR572ZaxGUSNT-lQwkUN_k2QAKMiMnO9RY',
  },
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html
      lang="en"
      className={inter.className}
    >
      <body>
        <Providers>{children}</Providers>

        {/* Include external scripts */}
        <Script
          src="https://kit.fontawesome.com/76900a3b53.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}
