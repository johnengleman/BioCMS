import React from 'react'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookOpenReader } from '@fortawesome/pro-duotone-svg-icons'
import * as cheerio from 'cheerio'
import styles from './styles.module.scss'

const getFirstWords = (htmlString: string) => {
  const $ = cheerio.load(htmlString)
  let htmlParts: string[] = []
  let paragraphCount = 0

  $('body')
    .contents()
    .each(function processNode(this: cheerio.Element) {
      if (this.type === 'tag' && this.tagName === 'p') {
        paragraphCount++
      }

      if (paragraphCount > 3) {
        return false
      }

      htmlParts.push($.html(this))
    })

  return htmlParts.join('')
}

function extractH2s(htmlString: string): string[] {
  const $ = cheerio.load(htmlString)
  const h2s: string[] = []

  $('h2').each((index, element) => {
    h2s.push($(element).text())
  })

  return h2s
}

interface BentoSectionProps {
  data?: string
  link?: string
  theme?: string
}

const BentoSection: React.FC<BentoSectionProps> = ({
  data,
  link,
  theme,
}) => {
  if (!data) {
    return null
  }

  const firstWords = getFirstWords(data)
  const h2s = extractH2s(data)

  return (
    <div
      className={`${styles.bentoSection} ${styles.theme}`}
    >
      <div className={styles.content}>
        <div className={styles.previewContainer}>
          <div
            className={styles.preview}
            dangerouslySetInnerHTML={{
              __html: firstWords,
            }}
          ></div>
        </div>
        <div className={styles.header}>
          <div className={styles.chapters}>
            {h2s.map((h2, i) => (
              <h2
                key={i}
                className={styles.chapter}
              >
                {i + 1}. {h2}
              </h2>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.footer}>
        <Link href={link || ''}>
          <button>
            <FontAwesomeIcon
              icon={faBookOpenReader}
              style={{
                color:
                  theme === 'dark'
                    ? `var(--gold)`
                    : `var(--violet)`,
                fontSize: '15px',
              }}
            />
            Continue Reading
          </button>
        </Link>
      </div>
    </div>
  )
}

export default BentoSection
