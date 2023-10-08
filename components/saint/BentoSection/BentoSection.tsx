import React from 'react'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ImageGlobal from '../../global/ImageGlobal/ImageGlobal'
import {
  faBrightness,
  faStarChristmas,
  faBookOpenReader,
  faPersonPraying,
} from '@fortawesome/pro-duotone-svg-icons'
import { load } from 'cheerio'
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
  if (title === 'bio') {
    return (
      <FontAwesomeIcon
        icon={faBrightness}
        style={{
          color: `var(--gold)`,
          fontSize: '35px',
        }}
      />
    )
  }
  if (title === 'teachings') {
    return (
      <FontAwesomeIcon
        icon={faPersonPraying}
        style={{
          color: `var(--gold)`,
          fontSize: '35px',
        }}
      />
    )
  }
  if (title === 'legacy') {
    return (
      <FontAwesomeIcon
        icon={faBookOpenReader}
        style={{
          color: `var(--gold)`,
          fontSize: '35px',
        }}
      />
    )
  }
  if (title === 'miracles') {
    return (
      <FontAwesomeIcon
        icon={faStarChristmas}
        style={{
          color: `var(--gold)`,
          fontSize: '35px',
        }}
      />
    )
  }
  if (title === 'miracles') {
    return (
      <FontAwesomeIcon
        icon={faStarChristmas}
        style={{
          color: `var(--gold)`,
          fontSize: '35px',
        }}
      />
    )
  }
}

interface BentoSectionProps {
  data?: string
  link?: string
  title: string
}

const BentoSection: React.FC<BentoSectionProps> = ({
  data,
  link,
  title,
}) => {
  if (!data) {
    return null
  }

  const h2s = extractH2s(data)

  return (
    <div className={styles.bentoSection}>
      {!!h2s.length && (
        <div className={styles.toc}>
          <div className={styles.header}>
            Chapters
            <span className={styles.wordCount}></span>
          </div>
          <div className={styles.content}>
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
            {getIcon(title)}
          </div>
        </div>
      )}
      <div
        className={`${styles.text} ${
          !h2s.length ? styles.full : ''
        }`}
      >
        <div className={styles.header}>
          {h2s.length && h2s[0]}
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
