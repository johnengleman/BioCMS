import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import ChurchToggle from '../ChurchToggle/ChurchToggle'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleQuestion } from '@fortawesome/pro-regular-svg-icons'
import styles from './styles.module.scss'

const Footer = () => {
  const router = useRouter()

  const [inView, setInView] = useState(false)
  useEffect(() => {
    if (router.pathname === '/saints') {
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
  }, [router.pathname])

  return (
    <div
      className={`${styles.footer} ${
        router.pathname === '/saints' ? styles.animated : ''
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
          {/* <Link href="/">
          <FontAwesomeIcon
            icon={faCircleQuestion}
            size="lg"
          />
          About
        </Link> */}
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
