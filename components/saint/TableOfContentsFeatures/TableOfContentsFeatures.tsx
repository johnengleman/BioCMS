import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBrightness,
  faBooks,
  faFamily,
  faStarChristmas,
  faFeather,
  faWind,
  faFlowerTulip,
} from '@fortawesome/pro-regular-svg-icons'
import styles from './styles.module.scss'

const tocConfig = {
  biography: {
    backgroundColor: '#7d7b2e',
    icon: faFlowerTulip,
    name: 'Biography',
  },
  miracles: {
    backgroundColor: '#e61c18',
    icon: faStarChristmas,
    name: 'Miracles',
  },
  teachings: {
    backgroundColor: '#2b335d',
    icon: faFeather,
    name: 'Teachings',
  },
  legacy: {
    backgroundColor: '#2b5d51',
    icon: faWind,
    name: 'Legacy',
  },
  similarSaints: {
    backgroundColor: '#92a729',
    icon: faFamily,
    name: 'Similar Saints',
  },
  books: {
    backgroundColor: '#3e6f2b',
    icon: faBooks,
    name: 'Books',
  },
}

const TableOfContentFeatures = () => {
  const [elements, setElements] = useState<HTMLElement[]>(
    [],
  )
  const [activeHeading, setActiveHeading] = useState('')

  useEffect(() => {
    const nodeList = document.querySelectorAll<HTMLElement>(
      '[id*="section"]',
    )
    const elementsArray = Array.from(nodeList)
    setElements(elementsArray)
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
        {elements.map((element, i) => {
          const section = element.dataset.section

          if (section) {
            return (
              <li
                key={i}
                className={
                  activeHeading === `${element.id}`
                    ? styles.active
                    : ''
                }
              >
                <a href={`#${element.id}`}>
                  <div
                    className={styles.icon}
                    style={{
                      backgroundColor:
                        tocConfig[section]?.backgroundColor,
                    }}
                  >
                    <FontAwesomeIcon
                      icon={tocConfig[section]?.icon}
                      style={{
                        color: `#fff`,
                        fontSize: '16px',
                      }}
                    />
                  </div>
                  {tocConfig[section]?.name}
                </a>
              </li>
            )
          }
        })}
      </ul>
    </div>
  )
}

export default TableOfContentFeatures
