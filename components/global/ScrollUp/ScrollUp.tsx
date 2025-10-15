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
      onClick={() => window.scrollTo(0, 0)}
      className={`${styles.btn} ${
        inView ? styles.inView : ''
      }`}
    >
      <FaArrowDown
        style={{
          transform: 'rotate(180deg)',
          fontSize: '30px',
          color: '#ccad00',
        }}
      />
    </button>
  )
}

export default ScrollUp
