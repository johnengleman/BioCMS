import Link from 'next/link'
import Image from 'next/image'
import { ReactNode } from 'react'
import PhotoHero from '../PhotoHero/PhotoHero'
import Contents from '../Contents/Contents'
import styles from './reading.module.scss'

// Shared parts of the long reading pages (biography, miracles,
// teachings): the header, the contents column and the next links.

const assets = process.env.NEXT_PUBLIC_DIRECTUS_ASSETS

export const ReadingHeader = ({
  eyebrow,
  title,
  meta,
  image,
  backHref,
}: {
  eyebrow: string
  title: string
  meta: string[]
  image?: { id: string } | null
  backHref: string
}) => (
  <PhotoHero>
    <div className={styles.header}>
      {image?.id && (
        <Link
          href={backHref}
          className={styles.thumb}
          aria-label={`Back to ${title}`}
        >
          <Image
            src={`${assets}/assets/${image.id}?width=320&height=320&fit=cover&format=webp&quality=80`}
            alt=""
            width={160}
            height={160}
            priority
          />
        </Link>
      )}
      <div>
        <p className={styles.eyebrow}>{eyebrow}</p>
        <h1 className={styles.title}>{title}</h1>
        {meta.length > 0 && (
          <p className={styles.meta}>{meta.join(' · ')}</p>
        )}
      </div>
    </div>
  </PhotoHero>
)

type Item = {
  id: string
  title: string
  numbered?: boolean
}

// Contents beside the text on desktop; a tap-to-open panel on phones.
export const ReadingLayout = ({
  contents,
  contentsTitle = 'Contents',
  articleId,
  children,
}: {
  contents: Item[]
  contentsTitle?: string
  articleId?: string
  children: ReactNode
}) => {
  const showContents = contents.length > 1
  return (
    <div className={styles.layout}>
      {showContents && (
        <aside className={styles.aside}>
          <div className={styles.contentsCard}>
            <Contents
              title={contentsTitle}
              items={contents}
            />
          </div>
        </aside>
      )}
      <article
        id={articleId}
        className={styles.article}
      >
        {showContents && (
          <details className={styles.phoneContents}>
            <summary>{contentsTitle}</summary>
            <Contents
              title={contentsTitle}
              items={contents}
            />
          </details>
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
