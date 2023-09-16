import React from 'react'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBrightness,
  faStarChristmas,
  faBookOpenReader,
} from '@fortawesome/pro-duotone-svg-icons'
import { load } from 'cheerio'
import count from 'word-count'
import styles from './styles.module.scss'

function extractH2s(htmlString: string): string[] {
  const $ = load(htmlString)
  const h2s: string[] = []

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
          color: `var(--gold)`,
          fontSize: '16px',
        }}
      />
    )
  }
  if (title === 'My Miracles') {
    return (
      <FontAwesomeIcon
        icon={faStarChristmas}
        style={{
          color: `var(--gold)`,
          fontSize: '16px',
        }}
      />
    )
  }
}

interface BentoSectionProps {
  data?: string
  link?: string
}

const BentoSection: React.FC<BentoSectionProps> = ({
  data,
  link,
}) => {
  if (!data) {
    return null
  }

  // if (typeof data !== 'string') {
  //   console.log(data)
  // }
  const wordCount =
    typeof data === 'string' ? count(data) : ''
  const h2s = extractH2s(data)

  return (
    <div className={styles.bentoSection}>
      <div className={styles.content}>
        <div className={styles.toc}>
          <div className={styles.chapters}>Chapters</div>
          <div className={styles.list}>
            {h2s.map((h2, i) => (
              <div
                key={i}
                className={styles.item}
              >
                <span className={styles.dash}>
                  {i + 1}.
                </span>
                <span className={styles.h2}>{h2}</span>
              </div>
            ))}
          </div>

          <div className={styles.footer}>
            <span className={styles.wordCount}>
              {wordCount} words
            </span>
          </div>
        </div>

        <div className={styles.text}>
          <div className={styles.expand}>
            <div
              className={styles.preview}
              dangerouslySetInnerHTML={{
                __html: data,
              }}
            ></div>
          </div>

          <div className={styles.footer}>
            <Link href={link || ''}>
              <button>
                <FontAwesomeIcon
                  icon={faBookOpenReader}
                  style={{
                    color: `var(--violet)`,
                    fontSize: '14px',
                  }}
                />
                Continue Reading
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BentoSection
