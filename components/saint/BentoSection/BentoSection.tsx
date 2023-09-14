import React from 'react'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBrightness,
  faStarChristmas,
} from '@fortawesome/pro-duotone-svg-icons'
import { load } from 'cheerio'
import count from 'word-count'
import styles from './styles.module.scss'

function extractH2s(htmlString) {
  const $ = load(htmlString)
  const h2s = []

  $('h2').each((index, element) => {
    h2s.push($(element).text())
  })

  return h2s
}

const getIcon = (title) => {
  if (title === 'My Life') {
    return (
      <FontAwesomeIcon
        icon={faBrightness}
        style={{
          color: `#77788a`,
          fontSize: '20px',
        }}
      />
    )
  }
  if (title === 'My Miracles') {
    return (
      <FontAwesomeIcon
        icon={faStarChristmas}
        style={{
          color: `#77788a`,
          fontSize: '20px',
        }}
      />
    )
  }
}

interface BentoSectionProps {
  title: string
  data?: string
  link?: string
  full?: boolean
}

const BentoSection: React.FC<BentoSectionProps> = ({
  title,
  data,
  link,
  full,
}) => {
  if (!data) {
    return null
  }

  const wordCount = count(data)
  const h2s = extractH2s(data)

  return (
    <div
      className={`${styles.bentoSection} ${
        full ? styles.bentoSectionFull : ''
      }`}
    >
      <div className={styles.header}>
        <h3>{title}</h3>
        {getIcon(title)}
      </div>
      <div className={styles.toc}>
        {h2s.map((h2, i) => (
          <div key={i}>
            <span className={styles.dash}>{i + 1}. </span>
            <span className={styles.h2}>{h2}</span>
          </div>
        ))}
      </div>

      <div className={styles.footer}>
        <Link href={link || ''}>
          <button>Read</button>
        </Link>
        <span className={styles.wordCount}>
          {wordCount} words
        </span>
      </div>
    </div>
  )
}

export default BentoSection
