import { getSaintSlugs } from '../../../../queries/getSaintSlugs'
import { notFound } from 'next/navigation'
import { saintMetadata } from '../../../../utils/saintMetadata'
import { getSaint } from '../../../../queries/getSaint'
import {
  countWords,
  getBiography,
  getChapters,
  getMiracles,
  getSources,
  splitSaintName,
} from '../../../../utils/saintContent'
import SiteHeader from '../../../../components/candle/SiteHeader/SiteHeader'
import SiteFooter from '../../../../components/candle/SiteFooter/SiteFooter'
import ReadingProgress from '../../../../components/candle/ReadingProgress/ReadingProgress'
import {
  NextCards,
  NotesCard,
  ReadingHeader,
  ReadingLayout,
  plural,
} from '../../../../components/candle/Reading/ReadingParts'
import styles from '../../../../components/candle/Reading/reading.module.scss'

import { NextPageProps } from '../../../../types/nextjs'

// Built ahead of time and refreshed every four minutes. Saints not
// built yet are built on the first visit.
export const revalidate = 240
export const generateStaticParams = async () =>
  (await getSaintSlugs()).map((slug) => ({ slug }))

export const generateMetadata = async (
  props: NextPageProps,
) => {
  const { slug } = await props.params
  return saintMetadata(slug, 'biography')
}

const WORDS_PER_MINUTE = 230
const LONG_NAME = 28

const Biography = async (props: NextPageProps) => {
  const { slug } = await props.params

  const data = await getSaint(slug)
  if (!data) notFound()

  const base = `/saints/${slug}`
  const { intro, chapters, backMatter } = getBiography(
    data.biography,
  )
  const sources = getSources(data.biography)
  const minutes = Math.max(
    1,
    Math.round(
      countWords(data.biography) / WORDS_PER_MINUTE,
    ),
  )
  const miracles = getMiracles(data.miracles?.[0]?.miracles)
  const teachings = getChapters(
    data.teachings?.[0]?.teachings,
  )

  const parts = splitSaintName(data.name)
  const title =
    data.name.length > LONG_NAME ? parts.title : data.name

  const meta = [
    chapters.length
      ? plural(chapters.length, 'chapter', 'chapters')
      : '',
    `${minutes} min read`,
    sources.count ? `${sources.count} sources` : '',
  ].filter(Boolean)

  const contents = [
    ...chapters
      .filter((c) => c.id)
      .map((c) => ({ id: c.id, title: c.title })),
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
    miracles.length && {
      href: `${base}/miracles`,
      label: 'Miracles',
      detail: plural(
        miracles.length,
        'account',
        'accounts',
      ),
    },
    teachings.length && {
      href: `${base}/teachings`,
      label: 'Teachings',
      detail: plural(
        teachings.length,
        'section',
        'sections',
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
      <SiteHeader active="/saints" />
      <ReadingProgress targetId="life-text" />
      <main>
        <ReadingHeader
          eyebrow="The life of"
          title={title}
          meta={meta}
          image={data.profile_image}
          backHref={base}
        />
        <ReadingLayout
          contents={contents}
          articleId="life-text"
        >
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
              The life of this saint has not been written
              yet.
            </p>
          )}

          <NotesCard sections={backMatter} />
          <NextCards cards={next} />
        </ReadingLayout>
      </main>
      <SiteFooter />
    </div>
  )
}

export default Biography
