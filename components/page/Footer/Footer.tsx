'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import ChurchToggle from '../ChurchToggle/ChurchToggle'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCircleQuestion,
  faSparkles,
  faMessagePen,
} from '@fortawesome/pro-regular-svg-icons'
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
            <FontAwesomeIcon
              icon={faCircleQuestion}
              size="lg"
            />
            About
          </Link>
          {/* <Link href="/feedback">
            <FontAwesomeIcon
              icon={faMessagePen}
              size="lg"
            />
            Feedback
          </Link> */}
          <Link href="/updates">
            <FontAwesomeIcon
              icon={faSparkles}
              size="lg"
            />
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
