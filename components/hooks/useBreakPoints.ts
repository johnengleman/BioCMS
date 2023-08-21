import { useEffect, useState, useMemo } from 'react'

function useMediaQuery(query) {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia(query)
      const handler = (event) => setMatches(event.matches)

      setMatches(mediaQuery.matches)

      mediaQuery.addEventListener('change', handler)

      return () =>
        mediaQuery.removeEventListener('change', handler)
    }
  }, [query])

  return matches
}

export default function useBreakpoints() {
  const isMobileS = useMediaQuery('(max-width: 375px)')
  const isMobileM = useMediaQuery(
    '(min-width: 376px) and (max-width: 425px)',
  )
  const isMobileL = useMediaQuery(
    '(min-width: 426px) and (max-width: 768px)',
  )
  const isTablet = useMediaQuery(
    '(min-width: 767px) and (max-width: 1024px)',
  )
   const isTabletPlus = useMediaQuery(
     '(min-width: 767px)',
   )
  const isLaptop = useMediaQuery(
    '(min-width: 1025px) and (max-width: 1260px)',
  )
  const isLaptopL = useMediaQuery(
    '(min-width: 1261px) and (max-width: 1440px)',
  )
  const isDesktop = useMediaQuery('(min-width: 1441px)')

  const breakpoints = useMemo(() => {
    let active = 'mobile'

    if (isMobileS) {
      active = 'mobileS'
    } else if (isMobileM) {
      active = 'mobileM'
    } else if (isMobileL) {
      active = 'mobileL'
    } else if (isTablet) {
      active = 'tablet'
    } else if (isLaptop) {
      active = 'laptop'
    } else if (isLaptopL) {
      active = 'laptopL'
    } else if (isDesktop) {
      active = 'desktop'
    }

    return {
      isMobileS,
      isMobileM,
      isMobileL,
      isTablet,
      isTabletPlus,
      isLaptop,
      isLaptopL,
      isDesktop,
      active,
    }
  }, [
    isMobileS,
    isMobileM,
    isMobileL,
    isTablet,
    isTabletPlus,
    isLaptop,
    isLaptopL,
    isDesktop,
  ])

  return breakpoints
}
