import { getSaintSlugs } from '../../../../queries/getSaintSlugs'
import { notFound } from 'next/navigation'
import { saintMetadata } from '../../../../utils/saintMetadata'
import { getSaint } from '../../../../queries/getSaint'
import {
  getBiography,
  getChapters,
  getMiracles,
  splitSaintName,
} from '../../../../utils/saintContent'
import SiteHeader from '../../../../components/candle/SiteHeader/SiteHeader'
import SiteFooter from '../../../../components/candle/SiteFooter/SiteFooter'
import {
  NextCards,
  NotesCard,
  ReadingHeader,
  ReadingLayout,
  plural,
} from '../../../../components/candle/Reading/ReadingParts'
import styles from '../../../../components/candle/Reading/reading.module.scss'

import { NextPageProps } from '../../../../types/nextjs'

// Built ahead of time and refreshed every five minutes. Saints not
// built yet are built on the first visit.
export const revalidate = 300
export const generateStaticParams = async () =>
  (await getSaintSlugs()).map((slug) => ({ slug }))

export const generateMetadata = async (
  props: NextPageProps,
) => {
  const { slug } = await props.params
  return saintMetadata(slug, 'teachings')
}

const LONG_NAME = 28
const QUOTES_SHOWN = 6

const SaintTeachings = async (props: NextPageProps) => {
  const { slug } = await props.params

  const data = await getSaint(slug)
  if (!data) notFound()

  const base = `/saints/${slug}`
  // Teachings use the same structure as a biography: an opening,
  // one <h2> per teaching, then notes.
  const { intro, chapters, backMatter } = getBiography(
    data.teachings?.[0]?.teachings,
  )
  const quotes = (data.quotes || []).filter((q) => q.text)
  const lifeChapters = getChapters(data.biography)
  const miracles = getMiracles(data.miracles?.[0]?.miracles)

  const parts = splitSaintName(data.name)
  const title =
    data.name.length > LONG_NAME ? parts.title : data.name

  const meta = [
    chapters.length
      ? plural(chapters.length, 'teaching', 'teachings')
      : '',
    quotes.length
      ? plural(quotes.length, 'quote', 'quotes')
      : '',
  ].filter(Boolean)

  const contents = [
    ...chapters
      .filter((c) => c.id)
      .map((c) => ({ id: c.id, title: c.title })),
    ...(quotes.length
      ? [
          {
            id: 'own-words',
            title: 'In their own words',
            numbered: false,
          },
        ]
      : []),
    ...(backMatter[0]?.id
      ? [
          {
            id: backMatter[0].id,
            title: 'Notes and sources',
            numbered: false,
          },
        ]
      : []),
  ]

  const next = [
    lifeChapters.length && {
      href: `${base}/biography`,
      label: 'Life',
      detail: plural(
        lifeChapters.length,
        'chapter',
        'chapters',
      ),
    },
    miracles.length && {
      href: `${base}/miracles`,
      label: 'Miracles',
      detail: plural(
        miracles.length,
        'account',
        'accounts',
      ),
    },
    { href: base, label: 'Overview', detail: title },
  ].filter(Boolean) as {
    href: string
    label: string
    detail: string
  }[]

  return (
    <div className={styles.page}>
      <SiteHeader active="/teachings" />
      <main>
        <ReadingHeader
          eyebrow="The teachings of"
          title={title}
          meta={meta}
          image={data.profile_image}
          backHref={base}
        />
        <ReadingLayout contents={contents}>
          {intro && (
            <div
              className={`${styles.prose} ${styles.opening}`}
              dangerouslySetInnerHTML={{ __html: intro }}
            />
          )}

          {chapters.map((chapter, i) => (
            <section
              key={chapter.id || i}
              className={styles.chapter}
            >
              <p className={styles.chapterLabel}>
                {String(i + 1).padStart(2, '0')}
              </p>
              <h2
                id={chapter.id}
                className={styles.chapterTitle}
              >
                {chapter.title}
              </h2>
              <div
                className={styles.prose}
                dangerouslySetInnerHTML={{
                  __html: chapter.html,
                }}
              />
            </section>
          ))}

          {chapters.length === 0 && !intro && (
            <p className="emptyState">
              No teachings have been added for this saint
              yet.
            </p>
          )}

          {quotes.length > 0 && (
            <section className={styles.chapter}>
              <h2
                id="own-words"
                className={styles.chapterTitle}
              >
                In their own words
              </h2>
              <div className={styles.quotes}>
                {quotes
                  .slice(0, QUOTES_SHOWN)
                  .map((q, i) => (
                    <blockquote key={i}>
                      {q.text}
                    </blockquote>
                  ))}
              </div>
            </section>
          )}

          <NotesCard sections={backMatter} />
          <NextCards cards={next} />
        </ReadingLayout>
      </main>
      <SiteFooter />
    </div>
  )
}

export default SaintTeachings
