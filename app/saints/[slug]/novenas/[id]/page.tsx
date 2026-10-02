import { notFound } from 'next/navigation'
import { saintMetadata } from '../../../../../utils/saintMetadata'
import { getSaint } from '../../../../../queries/getSaint'
import parseList from '../../../../../utils/parseList'
import { splitSaintName } from '../../../../../utils/saintContent'
import SiteHeader from '../../../../../components/candle/SiteHeader/SiteHeader'
import SiteFooter from '../../../../../components/candle/SiteFooter/SiteFooter'
import NovenaDays from '../../../../../components/candle/Reading/NovenaDays'
import {
  NextCards,
  ReadingHeader,
} from '../../../../../components/candle/Reading/ReadingParts'
import styles from '../../../../../components/candle/Reading/reading.module.scss'

import { NextPageProps } from '../../../../../types/nextjs'

// Built the first time someone opens the page, then refreshed every
// five minutes.
export const revalidate = 300
// Fail the build if anything here needs the request (cookies,
// headers, searchParams): every page must be built ahead of time.
export const dynamic = 'error'
export const generateStaticParams = async () => []


export const generateMetadata = async (
  props: NextPageProps,
) => {
  const { slug, id } = (await props.params) as {
    slug: string
    id: string
  }
  return saintMetadata(slug, 'novena', id)
}

const LONG_NAME = 28

const SaintNovena = async (props: NextPageProps) => {
  // This route has an [id] segment as well as [slug].
  const { slug, id } = (await props.params) as {
    slug: string
    id: string
  }

  const data = await getSaint(slug)
  if (!data) notFound()

  const novena = (data.prayers || []).find(
    (prayer) => prayer.prayer_slug === id,
  )
  if (!novena) notFound()

  const base = `/saints/${slug}`
  // Each entry of the "prayers" JSON list holds one day's text.
  const days = parseList(novena.prayers)
    .map((day: any) => day?.prayer_section || '')
    .filter(Boolean)
  const others = data.prayers.filter(
    (p) => p.prayer_slug !== id,
  )

  const parts = splitSaintName(data.name)
  const saintName =
    data.name.length > LONG_NAME ? parts.title : data.name

  const next = [
    ...others.map((p) => ({
      href: `${base}/novenas/${p.prayer_slug}`,
      label: p.prayer_title,
      detail: 'Another prayer',
    })),
    {
      href: base,
      label: saintName,
      detail: 'Back to the saint',
    },
  ]

  return (
    <div className={styles.page}>
      <SiteHeader />
      <main>
        <ReadingHeader
          eyebrow="Novena"
          title={novena.prayer_title}
          meta={[
            saintName,
            days.length ? `${days.length} days` : '',
          ].filter(Boolean)}
          image={data.profile_image}
          backHref={base}
        />
        <div className={`${styles.layout} ${styles.single}`}>
          <article className={styles.article}>
            {days.length > 0 ? (
              <NovenaDays days={days} />
            ) : (
              <p className="emptyState">
                The text of this novena has not been added
                yet.
              </p>
            )}
            <NextCards cards={next} />
          </article>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}

export default SaintNovena
