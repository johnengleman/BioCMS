'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import ChurchToggle from '../ChurchToggle/ChurchToggle'
import {
  FaQuestionCircle,
  FaStar,
  FaEdit,
} from 'react-icons/fa'
import useBreakpoints from '../../../hooks/useBreakPoints'
import styles from './styles.module.scss'

const Footer = () => {
  const [inView, setInView] = useState(false)
  const pathname = usePathname()
  const { isMobile } = useBreakpoints()
  const animateFooter =
    !isMobile &&
    (pathname === '/saints' || pathname === '/')

  useEffect(() => {
    if (animateFooter) {
      const handleScroll = () => {
        if (window.scrollY > 0 && window.scrollY < 1500) {
          setInView(true)
        } else if (
          window.scrollY + window.innerHeight >=
          document.body.scrollHeight
        ) {
          setInView(true)
        } else {
          setInView(false)
        }
      }

      window.addEventListener('scroll', handleScroll)

      return () => {
        window.removeEventListener('scroll', handleScroll)
      }
    }
  }, [animateFooter])

  return (
    <div
      className={`${styles.footer} ${
        animateFooter ? styles.animated : ''
      }
      } ${inView ? styles.inView : ''}`}
    >
      <div className={styles.content}>
        <div className={styles.left}>
          <Link href="/about">
            <FaQuestionCircle size={20} />
            About
          </Link>
          {/* <Link href="/feedback">
            <FaEdit
              size={20}
            />
            Feedback
          </Link> */}
          <Link href="/updates">
            <FaStar size={20} />
            Recent Updates
          </Link>
        </div>
        <div className={styles.right}>
          <ChurchToggle />
        </div>
      </div>
    </div>
  )
}

export default Footer
