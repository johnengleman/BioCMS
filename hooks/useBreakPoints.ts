'use client'

import { useEffect, useState, useMemo } from 'react'

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia(query)
      const handler = (event: MediaQueryListEvent) =>
        setMatches(event.matches)

      setMatches(mediaQuery.matches) // Initial match check

      mediaQuery.addEventListener('change', handler)

      return () =>
        mediaQuery.removeEventListener('change', handler)
    }
  }, [query])

  return matches
}

export default function useBreakpoints() {
  const isMobileS = useMediaQuery('(max-width: 374px)') // Small mobile
  const isMobileM = useMediaQuery(
    '(min-width: 375px) and (max-width: 424px)',
  ) // Medium mobile
  const isMobileL = useMediaQuery(
    '(min-width: 425px) and (max-width: 767px)',
  ) // Large mobile
  const isTablet = useMediaQuery(
    '(min-width: 768px) and (max-width: 1024px)',
  ) // Tablet
  const isLaptop = useMediaQuery(
    '(min-width: 1025px) and (max-width: 1440px)',
  ) // Laptop
  const isDesktop = useMediaQuery('(min-width: 1441px)') // Desktop

  // Derived states for broader ranges
  const isMobile = useMediaQuery('(max-width: 767px)') // All mobile sizes
  const isTabletPlus = useMediaQuery('(min-width: 768px)') // Tablet and larger
  const isLaptopMinus = useMediaQuery('(max-width: 1024px)') // Laptop and smaller

  const breakpoints = useMemo(
    () => ({
      isMobileS,
      isMobileM,
      isMobileL,
      isMobile,
      isTablet,
      isTabletPlus,
      isLaptopMinus,
      isLaptop,
      isDesktop,
    }),
    [
      isMobileS,
      isMobileM,
      isMobileL,
      isMobile,
      isTablet,
      isTabletPlus,
      isLaptopMinus,
      isLaptop,
      isDesktop,
    ],
  )

  return breakpoints
}
