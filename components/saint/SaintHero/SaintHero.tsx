import Link from 'next/link'
import { ReactNode } from 'react'
import ShareButton from '../../candle/ShareButton/ShareButton'
import { splitSaintName, toRoman } from '../../../utils/saintNames'
import styles from './styles.module.scss'
import { imageUrl } from '../../../utils/imageUrl'

type Img = {
  id: string
  width?: number
  height?: number
  description?: string
  metadata?: any
}

export type Fact = {
  label: string
  value: ReactNode
  detail?: ReactNode
}

export type Moment = {
  // The chapter's number in the biography (1-based).
  number: number
  title: string
  href: string
}

// The top of a saint's page, on night: the portrait lit from above,
// the inscription line (feast, tradition, years), the name with its
// epithet in italic, the summary and the actions. Under it, the fact
// strip and the life in moments, so the whole life can be taken in
// before the first paragraph. Every saint has the same layout.
const SaintHero = ({
  name,
  image,
  inscription,
  summary,
  primary,
  secondary,
  facts,
  moments,
  momentsLabel,
  crumbs,
}: {
  name: string
  image?: Img | null
  // Short items for the inscription line, in order.
  inscription: ReactNode[]
  summary?: string
  // The one lit button, and a quiet one beside it.
  primary?: { href: string; label: string }
  secondary?: { href: string; label: string }
  facts: Fact[]
  moments: Moment[]
  momentsLabel?: string
  crumbs?: ReactNode
}) => {
  const parts = splitSaintName(name)
  return (
    <section
      className={styles.band}
      aria-labelledby="saint-name"
    >
      {crumbs && <div className={styles.bar}>{crumbs}</div>}
      <div className={styles.hero}>
        {image?.id && (
          <figure className={styles.portrait}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imageUrl(image, { width: 900, quality: 82 })}
              alt={
                image.metadata?.alt_text ||
                image.description ||
                `Image of ${name}`
              }
              width={image.width}
              height={image.height}
              fetchPriority="high"
            />
          </figure>
        )}
        <div className={styles.copy}>
          <p className={styles.inscription}>
            {inscription.filter(Boolean).map((item, i) => (
              <span key={i}>{item}</span>
            ))}
          </p>
          <h1
            id="saint-name"
            className={styles.name}
          >
            {parts.subtitle ? (
              <>
                {parts.title}
                <em>{parts.subtitle}</em>
              </>
            ) : (
              name
            )}
          </h1>
          {summary && <p className={styles.summary}>{summary}</p>}
          <div className={styles.actions}>
            {primary && (
              <Link
                href={primary.href}
                className={styles.primary}
              >
                {primary.label}
              </Link>
            )}
            {secondary && (
              <Link
                href={secondary.href}
                className={styles.ghost}
              >
                {secondary.label}
              </Link>
            )}
            <ShareButton
              title={name}
              className={styles.ghost}
              label="Share"
            />
          </div>
        </div>
      </div>

      {facts.length > 0 && (
        <dl className={styles.facts}>
          {facts.map((fact) => (
            <div key={fact.label}>
              <dt>{fact.label}</dt>
              <dd>
                {fact.value}
                {fact.detail && <small>{fact.detail}</small>}
              </dd>
            </div>
          ))}
        </dl>
      )}

      {moments.length > 1 && (
        <nav
          className={styles.moments}
          aria-label={momentsLabel || 'The life in moments'}
        >
          <p className={styles.momentsLabel}>
            {momentsLabel || 'The life in moments'}
          </p>
          <ol>
            {moments.map((m) => (
              <li key={m.number}>
                <Link href={m.href}>
                  <b>{toRoman(m.number)}</b>
                  <span>{m.title}</span>
                </Link>
              </li>
            ))}
          </ol>
        </nav>
      )}
    </section>
  )
}

export default SaintHero
