// /app/layout.tsx

import {
  Cormorant_Garamond,
  Manrope,
  Newsreader,
} from 'next/font/google'
import '../styles/variables.css'
import '../styles/globals.css'
import { ReactNode } from 'react'
import Providers from './providers'

// Titles and quotations.
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  display: 'swap',
  weight: ['500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
})

// Interface text: menus, buttons, labels, numbers.
const manrope = Manrope({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-manrope',
})

// Long reading text: stories, biographies, teachings, miracle accounts.
// Variable, with an optical-size axis.
const newsreader = Newsreader({
  subsets: ['latin'],
  display: 'swap',
  style: ['normal', 'italic'],
  axes: ['opsz'],
  variable: '--font-newsreader',
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
      className={`${manrope.className} ${manrope.variable} ${cormorant.variable} ${newsreader.variable}`}
    >
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
