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
  const isMobile = useMediaQuery('(max-width: 768px)')
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
  const isTabletPlus = useMediaQuery('(min-width: 767px)')
  const isLaptopMinus = useMediaQuery('(max-width: 1025px)')
  const isLaptop = useMediaQuery(
    '(min-width: 1025px) and (max-width: 1260px)',
  )
  const isLaptopL = useMediaQuery(
    '(min-width: 1261px) and (max-width: 1440px)',
  )
  const isDesktop = useMediaQuery('(min-width: 1441px)')

  const breakpoints = useMemo(() => {
    return {
      isMobile,
      isMobileS,
      isMobileM,
      isMobileL,
      isTablet,
      isTabletPlus,
      isLaptopMinus,
      isLaptop,
      isLaptopL,
      isDesktop,
    }
  }, [
    isMobile,
    isMobileS,
    isMobileM,
    isMobileL,
    isTablet,
    isLaptopMinus,
    isTabletPlus,
    isLaptop,
    isLaptopL,
    isDesktop,
  ])

  return breakpoints
}
