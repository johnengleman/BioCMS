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

  const wordCount =
    typeof data === 'string' ? count(data) : ''
  const h2s = extractH2s(data)

  return (
    <div className={styles.bentoSection}>
      {!!h2s.length && (
        <div className={styles.toc}>
          <div className={styles.header}>
            Chapters
            <span className={styles.wordCount}>
              ({wordCount} words)
            </span>
          </div>
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
        </div>
      )}
      <div
        className={`${styles.text} ${
          !h2s.length ? styles.full : ''
        }`}
      >
        <div className={styles.header}>
          {h2s.length ? (
            h2s[0]
          ) : (
            <span className={styles.wordCount}>
              ({wordCount} words)
            </span>
          )}
        </div>
        <div className={styles.previewContainer}>
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
  )
}

export default BentoSection
