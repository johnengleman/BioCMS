import Link from 'next/link'
import { ReactNode } from 'react'
import { LuArrowLeft } from 'react-icons/lu'
import Contents from '../Contents/Contents'
import ShareButton from '../ShareButton/ShareButton'
import styles from './reading.module.scss'

// Shared parts of the long reading pages (biography, miracles,
// teachings, novenas): the saint banner, the contents rail and the
// next links.

const assets = process.env.NEXT_PUBLIC_DIRECTUS_ASSETS

// "322 accounts" → { value: "322", label: "Accounts" }. Items without
// a leading number show as a line under the title.
const toStat = (text: string) => {
  const match = text.match(/^([\d,.]+)\s+(.*)$/)
  return match
    ? {
        value: match[1],
        label: match[2].charAt(0).toUpperCase() + match[2].slice(1),
      }
    : null
}

// A beige panel with the saint's portrait shown whole, the page kind
// ("The miracles of"), the name, and its figures.
export const ReadingHeader = ({
  eyebrow,
  title,
  meta,
  image,
  backHref,
  backLabel = 'Back to the saint',
}: {
  eyebrow: string
  title: string
  meta: string[]
  image?: { id: string } | null
  backHref: string
  backLabel?: string
}) => {
  const stats = meta.map(toStat).filter(Boolean) as {
    value: string
    label: string
  }[]
  const lines = meta.filter((m) => !toStat(m))
  return (
    <div className={styles.bannerShell}>
      <section className={styles.banner}>
        {image?.id && (
          <Link
            href={backHref}
            className={styles.portrait}
            aria-label={backLabel}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${assets}/assets/${image.id}?width=360&format=webp&quality=80`}
              alt=""
            />
          </Link>
        )}
        <div className={styles.bannerCopy}>
          <p className={styles.eyebrow}>{eyebrow}</p>
          <h1 className={styles.title}>{title}</h1>
          {lines.length > 0 && (
            <p className={styles.meta}>{lines.join(' · ')}</p>
          )}
          {stats.length > 0 && (
            <div className={styles.stats}>
              {stats.map((s) => (
                <div key={s.label}>
                  <b>{s.value}</b>
                  <span>{s.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className={styles.bannerActions}>
          <Link
            href={backHref}
            className={styles.bannerButton}
          >
            <LuArrowLeft aria-hidden="true" />
            {backLabel}
          </Link>
          <ShareButton
            title={title}
            className={styles.bannerButton}
            label="Share"
          />
        </div>
      </section>
    </div>
  )
}

type Item = {
  id: string
  title: string
  numbered?: boolean
}

// A contents rail beside the text on wide screens (with reading
// progress); a sticky row of chips above the text on phones.
export const ReadingLayout = ({
  contents,
  contentsTitle = 'Contents',
  articleId,
  aside,
  children,
}: {
  contents: Item[]
  contentsTitle?: string
  articleId?: string
  aside?: ReactNode
  children: ReactNode
}) => {
  const showContents = contents.length > 1
  return (
    <div
      className={`${styles.layout} ${showContents || aside ? '' : styles.single}`}
    >
      {(showContents || aside) && (
        <aside className={styles.aside}>
          {showContents && (
            <Contents
              title={contentsTitle}
              items={contents}
            />
          )}
          {aside}
        </aside>
      )}
      <article
        id={articleId}
        className={styles.article}
      >
        {showContents && (
          <div className={styles.phoneContents}>
            <Contents
              title={contentsTitle}
              items={contents}
              variant="chips"
            />
          </div>
        )}
        {children}
      </article>
    </div>
  )
}

export const NextCards = ({
  cards,
}: {
  cards: { href: string; label: string; detail: string }[]
}) =>
  cards.length ? (
    <nav
      className={styles.next}
      aria-label="Continue reading"
    >
      {cards.map((n) => (
        <Link
          key={n.href}
          href={n.href}
        >
          <span className={styles.nextLabel}>
            {n.label}
          </span>
          <span className={styles.nextDetail}>
            {n.detail}
          </span>
          <span
            className={styles.nextChevron}
            aria-hidden="true"
          >
            ›
          </span>
        </Link>
      ))}
    </nav>
  ) : null

export const NotesCard = ({
  sections,
}: {
  sections: { id: string; title: string; html: string }[]
}) =>
  sections.length ? (
    <div className={styles.notes}>
      {sections.map((s) => (
        <section key={s.id || s.title}>
          <h2 id={s.id}>{s.title}</h2>
          <div
            className={styles.notesText}
            dangerouslySetInnerHTML={{ __html: s.html }}
          />
        </section>
      ))}
    </div>
  ) : null

// "account" / "accounts"
export const plural = (
  n: number,
  one: string,
  many: string,
) => `${n} ${n === 1 ? one : many}`
