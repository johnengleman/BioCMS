'use client'

import { useEffect } from 'react'
import NextNProgress from 'nextjs-progressbar'
import { usePathname } from 'next/navigation'
import { initGA4 } from '../utils/g4a'
import ReactGA from 'react-ga4'
import { ReactNode } from 'react'
import { ChurchProvider } from '../context/SiteContext'

export default function Providers({
  children,
}: {
  children: ReactNode
}) {
  const pathname = usePathname()

  useEffect(() => {
    initGA4() // Initialize GA4
  }, [])

  useEffect(() => {
    ReactGA.send({ hitType: 'pageview', page: pathname })
  }, [pathname])

  return (
    <>
      <ChurchProvider>
        <NextNProgress />
        {children}
      </ChurchProvider>
    </>
  )
}
