import { useEffect, useState } from 'react'
import PageButton from '../PageButton/PageButton'
import styles from './styles.module.scss'

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
              <li key={i}>
                <a href={`#${element.id}`}>
                  <PageButton
                    type={section}
                    active={
                      activeHeading === `${element.id}`
                    }
                  />
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
