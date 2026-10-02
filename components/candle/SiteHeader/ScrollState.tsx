'use client'

import { useEffect } from 'react'

// Marks the page as scrolled (<html data-scrolled>), so a header that
// sits over a photo can turn solid once the visitor scrolls.
const ScrollState = () => {
  useEffect(() => {
    const root = document.documentElement
    const update = () => {
      if (window.scrollY > 24) root.dataset.scrolled = ''
      else delete root.dataset.scrolled
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => {
      window.removeEventListener('scroll', update)
      delete root.dataset.scrolled
    }
  }, [])
  return null
}

export default ScrollState
