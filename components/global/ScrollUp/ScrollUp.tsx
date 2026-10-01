'use client'

import { useEffect, useState } from 'react'
import { FaArrowDown } from 'react-icons/fa'
import styles from './styles.module.scss'

const ScrollUp = () => {
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setInView(true)
      } else {
        setInView(false)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo(0, 0)}
      className={`${styles.btn} ${
        inView ? styles.inView : ''
      }`}
    >
      <FaArrowDown
        style={{
          transform: 'rotate(180deg)',
          fontSize: '22px',
          color: 'var(--wine)',
        }}
        aria-hidden="true"
      />
    </button>
  )
}

export default ScrollUp
