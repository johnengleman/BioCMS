'use client'

import { useEffect } from 'react'
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar'
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
        {children}
        <ProgressBar
          height="3px"
          color="#ccad00"
          options={{
            showSpinner: false, // Hide spinner for cleaner UI
            speed: 400, // Animation speed for the progress bar
            minimum: 0.2, // Minimum progress bar length
          }}
          shallowRouting={true}
          delay={200} // Delay before showing the progress bar
        />
      </ChurchProvider>
    </>
  )
}
