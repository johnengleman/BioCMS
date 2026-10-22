import { notFound } from 'next/navigation'
import { saintMetadata } from '../../../utils/saintMetadata'
import Link from 'next/link'
import {
  LuArrowRight,
  LuChevronRight,
  LuHandHeart,
  LuMapPin,
  LuSmartphone,
} from 'react-icons/lu'
import { getSaint } from '../../../queries/getSaint'
import { getSaintSlugs } from '../../../queries/getSaintSlugs'
import parseList from '../../../utils/parseList'
import {
  formatFeast,
  getChapters,
  getMiracleBook,
  plainText,
} from '../../../utils/saintContent'
import { firstPart, toRoman } from '../../../utils/saintNames'
import {
  churchLabel,
  yearsLabel,
} from '../../../utils/saintCard'
import { APP_URL } from '../../../utils/site'
import smartQuotes from '../../../utils/smartQuotes'
import SiteHeader from '../../../components/candle/SiteHeader/SiteHeader'
import SiteFooter from '../../../components/candle/SiteFooter/SiteFooter'
import SaintHero, {
  type Fact,
  type Moment,
} from '../../../components/saint/SaintHero/SaintHero'
import FeastValue from '../../../components/saint/FeastValue/FeastValue'
import RelatedSaints from '../../../components/saint/RelatedSaints/RelatedSaints'
import ImageCredit from '../../../components/candle/ImageCredit/ImageCredit'
import Contents from '../../../components/candle/Contents/Contents'
import styles from './candle.module.scss'

import { NextPageProps } from '../../../types/nextjs'

// Built ahead of time and refreshed every four minutes. Saints not
// built yet are built on the first visit.
export const revalidate = 240
export const generateStaticParams = async () =>
  (await getSaintSlugs()).map((slug) => ({ slug }))

export const generateMetadata = async (
  props: NextPageProps,
) => {
  const { slug } = await props.params
  return saintMetadata(slug, 'saint')
}

// "holy_women" -> "Holy Women"
const formatCategory = (value: string) =>
  value
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .replace(/\b(Of|The)\b/g, (w) => w.toLowerCase())

// Six chapters spread across the life, for the strip under the hero.
// A dated "key moments" field can replace this later; until then the
// chapter titles are the moments.
const MOMENTS = 6
const pickMoments = (
  chapters: { id: string; title: string }[],
  base: string,
): Moment[] => {
  const n = chapters.length
  const indexes =
    n <= MOMENTS
      ? chapters.map((_, i) => i)
      : Array.from({ length: MOMENTS }, (_, k) =>
          Math.round((k * (n - 1)) / (MOMENTS - 1)),
        )
  return indexes.map((i) => ({
    number: i + 1,
    title: chapters[i].title,
    href: `${base}/biography#${chapters[i].id}`,
  }))
}

const SaintPage = async (props: NextPageProps) => {
  const { slug } = await props.params

  const data = await getSaint(slug)
  if (!data) notFound()

  const base = `/saints/${slug}`
  const categories = parseList(data.categories)

  const years = yearsLabel(data.birth_year, data.death_year)

  const catholicFeast = formatFeast(data.feast_day_catholic)
  const orthodoxFeast = formatFeast(data.feast_day_orthodox)
  // The feast day follows the visitor's tradition, so it is chosen in
  // the browser (FeastValue). The page only knows whether one exists.
  const hasFeast = Boolean(catholicFeast || orthodoxFeast)
  const feastValue = (
    <FeastValue
      catholic={catholicFeast}
      orthodox={orthodoxFeast}
    />
  )
  const bothFeasts =
    catholicFeast && orthodoxFeast && catholicFeast !== orthodoxFeast

  const chapters = getChapters(data.biography)
  const miracleBook = getMiracleBook(data.miracles?.[0]?.miracles)
  const miracles = miracleBook.groups.flatMap((g) => g.entries)
  const teachings = getChapters(data.teachings?.[0]?.teachings)
  const quotes = (data.quotes || []).filter((q) => q.text)
  const prayers = data.prayers || []
  const hasRelic = Boolean(
    data.relic_location ||
      data.relic_description ||
      data.relic_image?.id,
  )

  const image = data.profile_image
  const galleryImages = (data.other_images ?? [])
    .map((o) => o?.directus_files_id)
    .filter((f) => f?.id)
  const images = [image, ...galleryImages].filter((f) => f?.id)

  const tradition = churchLabel(data.venerated_in)
  const traditionText =
    tradition === 'Both' ? 'Catholic and Orthodox' : tradition
  const summaryText = smartQuotes(plainText(data.summary))

  const wordsTitle =
    teachings.length && quotes.length
      ? 'Teachings and quotes'
      : teachings.length
        ? 'Teachings'
        : 'Quotes'

  // The inscription line: feast, tradition, years.
  const inscription = [
    hasFeast && <>Feast day {feastValue}</>,
    traditionText,
    years,
  ]

  const facts: Fact[] = []
  if (bothFeasts)
    facts.push({
      label: 'Feast day',
      value: feastValue,
      detail: `Catholic ${catholicFeast} · Orthodox ${orthodoxFeast}`,
    })
  if (data.birth_year || data.birth_location)
    facts.push({
      label: 'Born',
      value: data.birth_year ? yearsLabel(data.birth_year, null).replace(/^b\. /, '') : '—',
      detail: data.birth_location,
    })
  if (data.death_year || data.death_location)
    facts.push({
      label: 'Died',
      value: data.death_year ? yearsLabel(null, data.death_year).replace(/^d\. /, '') : '—',
      detail: data.death_location,
    })
  if (data.patron)
    facts.push({ label: 'Patron of', value: data.patron })
  if (data.relic_location)
    facts.push({
      label: 'Relics',
      value: firstPart(data.relic_location),
      detail: data.relic_location.includes(',')
        ? data.relic_location.split(',').slice(1).join(',').trim()
        : undefined,
    })
  const onSite = [
    chapters.length && `${chapters.length} chapters`,
    miracles.length &&
      `${miracles.length} ${miracles.length === 1 ? 'miracle' : 'miracles'}`,
    quotes.length &&
      `${quotes.length} ${quotes.length === 1 ? 'quote' : 'quotes'}`,
    prayers.length &&
      `${prayers.length} ${prayers.length === 1 ? 'novena' : 'novenas'}`,
  ].filter(Boolean) as string[]
  if (onSite.length)
    facts.push({
      label: 'On this site',
      value: onSite
        .slice(0, 3)
        .map((s) => s.split(' ')[0])
        .join(' · '),
      detail: onSite
        .slice(0, 3)
        .map((s) => s.split(' ').slice(1).join(' '))
        .join(' · '),
    })

  const moments = pickMoments(chapters, base)

  // The person first; miracles last.
  const sections = [
    { id: 'story', title: 'The story' },
    prayers.length && { id: 'prayers', title: 'Prayers' },
    (teachings.length || quotes.length) && {
      id: 'teachings',
      title: teachings.length ? 'Teachings' : 'Quotes',
    },
    hasRelic && { id: 'relics', title: 'Relics' },
    galleryImages.length && { id: 'images', title: 'Images' },
    miracles.length && {
      id: 'miracles',
      title: `Miracles (${miracles.length})`,
    },
  ].filter(Boolean) as { id: string; title: string }[]

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: data.name,
    birthDate: data.birth_year,
    deathDate: data.death_year,
    birthPlace: data.birth_location,
    deathPlace: data.death_location,
    description: data.summary,
  }

  return (
    <div className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <SiteHeader active="/saints" />
      <main>
        <SaintHero
          name={data.name}
          image={image}
          inscription={inscription}
          summary={summaryText}
          primary={
            chapters.length > 0
              ? {
                  href: `${base}/biography`,
                  label: `Read the life · ${chapters.length} chapters`,
                }
              : undefined
          }
          secondary={
            prayers[0]
              ? {
                  href: `${base}/novenas/${prayers[0].prayer_slug}`,
                  label: 'Pray a novena',
                }
              : miracles.length
                ? { href: `${base}/miracles`, label: 'The miracles' }
                : undefined
          }
          facts={facts}
          moments={moments}
          momentsLabel={
            chapters.length
              ? `The life in moments · ${chapters.length} chapters`
              : undefined
          }
          crumbs={
            <nav aria-label="Breadcrumb">
              <Link href="/saints">Saints</Link>
              {categories[0] && (
                <>
                  <LuChevronRight aria-hidden="true" />
                  <Link
                    href={`/saints/category/${String(categories[0]).toLowerCase()}`}
                  >
                    {formatCategory(String(categories[0]))}
                  </Link>
                </>
              )}
              <LuChevronRight aria-hidden="true" />
              <span aria-current="page">{data.name}</span>
            </nav>
          }
        />

        <div className={styles.main}>
          <div className={styles.layout}>
            <aside className={styles.rail}>
              <Contents
                title="On this page"
                items={sections}
              />
            </aside>

            <div className={styles.content}>
              <div className={styles.phoneTabs}>
                <Contents
                  title="On this page"
                  items={sections}
                  variant="chips"
                />
              </div>

              <section
                className={styles.block}
                id="story"
                aria-labelledby="story-title"
              >
                <h2
                  id="story-title"
                  className={styles.blockTitle}
                >
                  The story
                </h2>
                {chapters.length > 0 && (
                  <>
                    <ol className={styles.chapters}>
                      {chapters.map((c, i) => (
                        <li key={c.id || i}>
                          <Link href={`${base}/biography#${c.id}`}>
                            <span className={styles.chapterNo}>
                              {toRoman(i + 1)}
                            </span>
                            <span className={styles.chapterTitle}>
                              {c.title}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ol>
                    <Link
                      href={`${base}/biography`}
                      className={styles.more}
                    >
                      Read the full life
                      <LuArrowRight aria-hidden="true" />
                    </Link>
                  </>
                )}
              </section>

              {quotes[0] && (
                <figure className={styles.quote}>
                  <blockquote>{smartQuotes(quotes[0].text)}</blockquote>
                  <figcaption>
                    {data.name}
                    {quotes.length > 1 && (
                      <>
                        {' · '}
                        <Link href="/quotes">
                          All {quotes.length} quotes
                        </Link>
                      </>
                    )}
                  </figcaption>
                </figure>
              )}

              {prayers.length > 0 && (
                <section
                  className={styles.block}
                  id="prayers"
                  aria-labelledby="prayers-title"
                >
                  <h2
                    id="prayers-title"
                    className={styles.blockTitle}
                  >
                    Prayers
                  </h2>
                  <div className={styles.prayerList}>
                    {prayers.map((p) => (
                      <Link
                        key={p.prayer_slug}
                        href={`${base}/novenas/${p.prayer_slug}`}
                      >
                        <span
                          className={styles.prayerIcon}
                          aria-hidden="true"
                        >
                          <LuHandHeart />
                        </span>
                        <span>{p.prayer_title}</span>
                        <LuChevronRight aria-hidden="true" />
                      </Link>
                    ))}
                  </div>
                </section>
              )}

              {(teachings.length > 0 || quotes.length > 1) && (
                <section
                  className={styles.block}
                  id="teachings"
                  aria-labelledby="teachings-title"
                >
                  <h2
                    id="teachings-title"
                    className={styles.blockTitle}
                  >
                    {wordsTitle}
                  </h2>
                  {teachings.length > 0 && (
                    <ol className={styles.chapters}>
                      {teachings.map((t, i) => (
                        <li key={t.id || i}>
                          <Link href={`${base}/teachings#${t.id}`}>
                            <span className={styles.chapterNo}>
                              {toRoman(i + 1)}
                            </span>
                            <span className={styles.chapterTitle}>
                              {t.title}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ol>
                  )}
                  {teachings.length > 0 && (
                    <Link
                      href={`${base}/teachings`}
                      className={styles.more}
                    >
                      Read the teachings
                      <LuArrowRight aria-hidden="true" />
                    </Link>
                  )}
                  {quotes.length > 1 && (
                    <ul className={styles.quoteList}>
                      {quotes.slice(1, 4).map((q, i) => (
                        <li key={i}>{smartQuotes(q.text)}</li>
                      ))}
                    </ul>
                  )}
                </section>
              )}

              {hasRelic && (
                <section
                  className={styles.block}
                  id="relics"
                  aria-labelledby="relics-title"
                >
                  <h2
                    id="relics-title"
                    className={styles.blockTitle}
                  >
                    Relics
                  </h2>
                  <div className={styles.relic}>
                    {data.relic_image?.id && (
                      <figure>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={`${process.env.NEXT_PUBLIC_DIRECTUS_ASSETS}/assets/${data.relic_image.id}?width=1200&format=webp&quality=82`}
                          alt={
                            data.relic_image.description ||
                            `Relics of ${data.name}`
                          }
                          loading="lazy"
                        />
                        <ImageCredit image={data.relic_image} />
                      </figure>
                    )}
                    <div>
                      {data.relic_location && (
                        <p className={styles.relicPlace}>
                          <LuMapPin aria-hidden="true" />
                          {data.relic_location}
                        </p>
                      )}
                      {data.relic_description && (
                        <div
                          className={styles.prose}
                          dangerouslySetInnerHTML={{
                            __html: data.relic_description,
                          }}
                        />
                      )}
                    </div>
                  </div>
                </section>
              )}

              {images.length > 1 && (
                <section
                  className={`${styles.block} ${styles.imagesBlock}`}
                  id="images"
                  aria-labelledby="images-title"
                >
                  <h2
                    id="images-title"
                    className={styles.blockTitle}
                  >
                    Images
                  </h2>
                  <div className={styles.gallery}>
                    {images.map((img) => (
                      <figure key={img.id}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={`${process.env.NEXT_PUBLIC_DIRECTUS_ASSETS}/assets/${img.id}?width=800&format=webp&quality=82`}
                          alt={
                            img.metadata?.alt_text ||
                            img.description ||
                            `Image of ${data.name}`
                          }
                          loading="lazy"
                        />
                        <ImageCredit image={img} />
                      </figure>
                    ))}
                  </div>
                </section>
              )}

              {/* Miracles come last and stay quiet: readers meet the
                  person first. */}
              {miracles.length > 0 && (
                <Link
                  href={`${base}/miracles`}
                  id="miracles"
                  className={styles.quietRow}
                >
                  Miracles and answered prayers
                  <span>
                    {miracles.length.toLocaleString('en-US')}{' '}
                    {miracles.length === 1 ? 'account' : 'accounts'}
                    <LuChevronRight aria-hidden="true" />
                  </span>
                </Link>
              )}

              {images.length === 1 && image && (
                <figure className={styles.credit}>
                  <ImageCredit image={image} />
                </figure>
              )}
            </div>
          </div>

          {categories.length > 0 && (
            <RelatedSaints
              slug={slug}
              categories={categories}
              className={styles.related}
              gridClassName={styles.relatedGrid}
              labelledBy="related-title"
            >
              <div className={styles.blockHead}>
                <h2 id="related-title">Related saints</h2>
                <Link
                  href="/saints"
                  className={styles.more}
                >
                  All saints
                  <LuArrowRight aria-hidden="true" />
                </Link>
              </div>
            </RelatedSaints>
          )}
        </div>
      </main>

      <div className={styles.mobileBar}>
        <div>
          <b>
            {hasFeast ? (
              <>Feast day {feastValue}</>
            ) : (
              data.name
            )}
          </b>
          <span>{years}</span>
        </div>
        <a
          href={APP_URL}
          className={styles.appButton}
        >
          <LuSmartphone aria-hidden="true" />
          Pray in the app
        </a>
      </div>
      <SiteFooter />
    </div>
  )
}

export default SaintPage
