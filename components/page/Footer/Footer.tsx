import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import ChurchToggle from '../ChurchToggle/ChurchToggle'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCircleQuestion,
  faMessageQuestion,
  faSparkles
} from '@fortawesome/pro-regular-svg-icons'
import styles from './styles.module.scss'

const Footer = () => {
  const [inView, setInView] = useState(false)
  const router = useRouter()
  const animateFooter =
    router.pathname === '/saints' || router.pathname === '/'

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
        <div className={`${styles.row} ${styles.left}`}>
          <Link href="/about">
            <FontAwesomeIcon
              icon={faCircleQuestion}
              size="lg"
            />
            About
          </Link>
          <Link href="/feedback">
            <FontAwesomeIcon
              icon={faMessageQuestion}
              size="lg"
            />
            Feedback
          </Link>
          <Link href="/updates">
            <FontAwesomeIcon
              icon={faSparkles}
              size="lg"
            />
            Recent Updates
          </Link>
        </div>
        <div
          className={`${styles.row} ${styles.center}`}
        ></div>
        <div className={`${styles.row} ${styles.right}`}>
          <ChurchToggle />
        </div>
      </div>
    </div>
  )
}

export default Footer
