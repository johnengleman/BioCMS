import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBrightness,
  faBooks,
  faFamily,
} from '@fortawesome/pro-regular-svg-icons'
import styles from './styles.module.scss'

const TableOfContentFeatures = () => {
  const [elements, setElements] = useState([])
  const [activeHeading, setActiveHeading] = useState(null)

  useEffect(() => {
    const nodeList = document.querySelectorAll('h2')
    const elementsArray: [] = [...nodeList]
    setElements(elementsArray)

    nodeList.forEach((h2, index) => {
      h2.id = `heading-${index}`
    })
  }, [])

  useEffect(() => {
    const options = {
      rootMargin: '0px 0px -60% 0px',
      threshold: 1.0,
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveHeading(entry.target.id)
        }
      })
    }, options)

    elements.forEach((element) => observer.observe(element))

    return () => {
      elements.forEach((element) =>
        observer.unobserve(element),
      )
    }
  }, [elements])

  return (
    <div className={styles.stickyContainer}>
      <ul className={styles.TableOfContentsFeatures}>
        <li
          className={
            activeHeading === `heading-0`
              ? styles.active
              : ''
          }
        >
          <a href="#heading-0">
            <div
              className={styles.icon}
              style={{ backgroundColor: '#7d7b2e' }}
            >
              <FontAwesomeIcon
                icon={faBrightness}
                style={{
                  color: `#fff`,
                  fontSize: '16px',
                }}
              />
            </div>
            About Me
          </a>
        </li>
        <li
          className={
            activeHeading === `heading-1`
              ? styles.active
              : ''
          }
        >
          <a href="#heading-1">
            <div
              className={styles.icon}
              style={{ backgroundColor: '#066681' }}
            >
              <FontAwesomeIcon
                icon={faBooks}
                style={{
                  color: `#fff`,
                  fontSize: '16px',
                }}
              />
            </div>
            My Books
          </a>
        </li>
        <li
          className={
            activeHeading === `heading-2`
              ? styles.active
              : ''
          }
        >
          <a href="#heading-2">
            <div
              className={styles.icon}
              style={{ backgroundColor: '#c54e4e' }}
            >
              <FontAwesomeIcon
                icon={faFamily}
                style={{
                  color: `#fff`,
                  fontSize: '16px',
                }}
              />
            </div>
            Related Saints
          </a>
        </li>
      </ul>
    </div>
  )
}

export default TableOfContentFeatures
