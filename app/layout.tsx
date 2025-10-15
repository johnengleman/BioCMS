// /app/layout.tsx

import { Nunito, Lora } from 'next/font/google'
import '../styles/variables.css'
import '../styles/globals.css'
import { ReactNode } from 'react'
import Providers from './providers'

const lora = Lora({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-lora',
  style: ['italic'],
})

const nunito = Nunito({
  subsets: ['latin'],
  display: 'swap',
  style: ['normal', 'italic'],
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
      className={`${nunito.className} ${lora.variable}`}
    >
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
