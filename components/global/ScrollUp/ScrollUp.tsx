import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDownFromLine } from '@fortawesome/pro-duotone-svg-icons'
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
      <FontAwesomeIcon
        icon={faArrowDownFromLine}
        rotation={180}
        style={{
          fontSize: '30px',
          '--fa-primary-color': '#ccad00',
          '--fa-secondary-color': '#ccad00',
        }}
      />
    </button>
  )
}

export default ScrollUp
