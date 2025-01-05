import React from 'react'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPersonPraying } from '@fortawesome/pro-duotone-svg-icons'
import styles from './styles.module.scss'

const NovenaSection = ({
  prayers,
  prayersSlug,
  saintSlug,
}) => {
  return (
    <div className={styles.novenaSection}>
      <div className={styles.header}>
        <div className={styles.chapters}>
          {prayers.map((prayer, i) => (
            <span
              key={i}
              className={styles.chapter}
            >
              Day {i + 1}
            </span>
          ))}
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.previewContainer}>
          <div
            className={styles.preview}
            dangerouslySetInnerHTML={{
              __html: prayers[0].prayer_section,
            }}
          ></div>
        </div>
      </div>
      <div className={styles.footer}>
        <Link
          href={`saints/${saintSlug}/novenas/${prayersSlug}`}
        >
          <button>
            <FontAwesomeIcon
              icon={faPersonPraying}
              style={{
                color: `var(--violet)`,
                fontSize: '15px',
              }}
            />
            Go To Next Day
          </button>
        </Link>
      </div>
    </div>
  )
}

export default NovenaSection
