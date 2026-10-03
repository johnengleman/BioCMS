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
import {
  churchLabel,
  placeLabel,
  roleLabel,
} from '../../../utils/saintCard'
import { APP_URL } from '../../../utils/site'
import SiteHeader from '../../../components/candle/SiteHeader/SiteHeader'
import SiteFooter from '../../../components/candle/SiteFooter/SiteFooter'
import SaintHero from '../../../components/saint/SaintHero/SaintHero'
import FeastValue from '../../../components/saint/FeastValue/FeastValue'
import RelatedSaints from '../../../components/saint/RelatedSaints/RelatedSaints'
import ImageCredit from '../../../components/candle/ImageCredit/ImageCredit'
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

const SaintPage = async (props: NextPageProps) => {
  const { slug } = await props.params

  const data = await getSaint(slug)
  if (!data) notFound()

  const base = `/saints/${slug}`
  const categories = parseList(data.categories)

  const years =
    data.birth_year || data.death_year
      ? `${data.birth_year || '?'}–${data.death_year || '?'}`
      : ''

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

  const role = roleLabel(data.categories)
  const place = placeLabel(data)
  const tradition = churchLabel(data.venerated_in)
  const summaryText = plainText(data.summary)

  const wordsTitle =
    teachings.length && quotes.length
      ? 'Teachings and quotes'
      : teachings.length
        ? 'Teachings'
        : 'Quotes'

  // The person first; miracles last.
  const tabs = [
    { href: '#story', label: 'Life' },
    prayers.length && { href: '#prayers', label: 'Prayers' },
    (teachings.length || quotes.length) && {
      href: '#teachings',
      label: teachings.length ? 'Teachings' : 'Quotes',
    },
    hasRelic && { href: '#relics', label: 'Relics' },
    galleryImages.length && { href: '#images', label: 'Images' },
    miracles.length && { href: '#miracles', label: 'Miracles' },
  ].filter(Boolean) as { href: string; label: string }[]

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
      <main className={styles.main}>
        <nav
          className={styles.crumbs}
          aria-label="Breadcrumb"
        >
          <Link href="/saints">Saints</Link>
          {categories[0] && (
            <>
              <LuChevronRight aria-hidden="true" />
              <Link
                href={`/saints?filter=${String(categories[0]).toLowerCase()}`}
              >
                {formatCategory(String(categories[0]))}
              </Link>
            </>
          )}
          <LuChevronRight aria-hidden="true" />
          <span aria-current="page">{data.name}</span>
        </nav>

        <SaintHero
          name={data.name}
          image={image}
          kicker={[role, place, years].filter(Boolean).join(' · ')}
          summary={summaryText}
          actions={
            <>
              {chapters.length > 0 && (
                <Link
                  href={`${base}/biography`}
                  className={styles.primary}
                >
                  Read the life
                </Link>
              )}
            </>
          }
        />

        <nav
          className={styles.tabs}
          aria-label="On this page"
        >
          {tabs.map((t, i) => (
            <a
              key={t.href}
              href={t.href}
              className={i === 0 ? styles.tabOn : undefined}
            >
              {t.label}
            </a>
          ))}
        </nav>

        <div className={styles.layout}>
          <div className={styles.content}>
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
                            {String(i + 1).padStart(2, '0')}
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

            {prayers.length > 0 && (
              <section
                className={`${styles.block} ${styles.prayersBlock}`}
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

            {(teachings.length > 0 || quotes.length > 0) && (
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
                {quotes[0] && (
                  <figure className={styles.quote}>
                    <blockquote>{quotes[0].text}</blockquote>
                    {quotes.length > 1 && (
                      <figcaption>
                        <Link href="/quotes">
                          All {quotes.length} quotes
                        </Link>
                      </figcaption>
                    )}
                  </figure>
                )}
                {teachings.length > 0 && (
                  <ul className={styles.teachings}>
                    {teachings.map((t, i) => (
                      <li key={t.id || i}>
                        <Link href={`${base}/teachings#${t.id}`}>
                          {t.title}
                        </Link>
                      </li>
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
                className={styles.block}
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

          <aside className={styles.side}>
            <div className={styles.sideCard}>
              <dl className={styles.facts}>
                {hasFeast && (
                  <div className={styles.feast}>
                    <dt>Feast day</dt>
                    <dd>
                      <b>{feastValue}</b>
                      {bothFeasts && (
                        <small>
                          Catholic {catholicFeast} · Orthodox{' '}
                          {orthodoxFeast}
                        </small>
                      )}
                    </dd>
                  </div>
                )}
                {data.birth_location && (
                  <div>
                    <dt>Born</dt>
                    <dd>
                      {[data.birth_year, data.birth_location]
                        .filter(Boolean)
                        .join(', ')}
                    </dd>
                  </div>
                )}
                {data.death_location && (
                  <div>
                    <dt>Died</dt>
                    <dd>
                      {[data.death_year, data.death_location]
                        .filter(Boolean)
                        .join(', ')}
                    </dd>
                  </div>
                )}
                {data.patron && (
                  <div>
                    <dt>Patron of</dt>
                    <dd>{data.patron}</dd>
                  </div>
                )}
                {tradition && (
                  <div>
                    <dt>Venerated</dt>
                    <dd>
                      {tradition === 'Both'
                        ? 'Catholic and Orthodox'
                        : tradition}
                    </dd>
                  </div>
                )}
              </dl>
              {prayers.length > 0 && (
                <div className={styles.sidePrayers}>
                  {prayers.slice(0, 4).map((p) => (
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
              )}
              <a
                href={APP_URL}
                className={styles.appButton}
              >
                <LuSmartphone aria-hidden="true" />
                Pray in the app
              </a>
            </div>
          </aside>
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
