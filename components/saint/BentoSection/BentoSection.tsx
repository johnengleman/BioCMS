import React from 'react'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ImageGlobal from '../../global/ImageGlobal/ImageGlobal'
import {
  faBrightness,
  faStarChristmas,
  faBookOpenReader,
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

type Image = {
  directus_files_id: {
    id: string
  }
}

interface BentoSectionProps {
  data?: string
  link?: string
  image?: Image
}

const BentoSection: React.FC<BentoSectionProps> = ({
  data,
  link,
  image,
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
            {image && (
              <div className={styles.image}>
                <ImageGlobal
                  src={`${process.env.NEXT_PUBLIC_DOMAIN}/assets/${image?.directus_files_id.id}?key=profile`}
                  fill={false}
                  width={200}
                  height={250}
                />
              </div>
            )}
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
