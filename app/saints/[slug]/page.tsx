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
import StatusPill from '../../../components/candle/StatusPill/StatusPill'
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

const MIRACLES_SHOWN = 4
const QUOTES_SHOWN = 4

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
  const groups = miracleBook.groups.filter(
    (g) => g.title && g.entries.length,
  )
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

  const tabs = [
    { href: '#story', label: 'Life' },
    miracles.length && {
      href: '#miracles',
      label: 'Miracles',
      count: miracles.length,
    },
    prayers.length && {
      href: '#prayers',
      label: 'Prayers',
      count: prayers.length,
    },
    teachings.length && {
      href: '#teachings',
      label: 'Teachings',
      count: teachings.length,
    },
    quotes.length && {
      href: '#quotes',
      label: 'Quotes',
      count: quotes.length,
    },
    hasRelic && { href: '#relics', label: 'Relics' },
    galleryImages.length && {
      href: '#images',
      label: 'Images',
      count: images.length,
    },
  ].filter(Boolean) as { href: string; label: string; count?: number }[]

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

  const largestGroup = Math.max(
    1,
    ...groups.map((g) => g.entries.length),
  )

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
          images={images}
          place={place}
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
              {t.count ? <em>{t.count}</em> : null}
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
              <div className={styles.blockHead}>
                <h2 id="story-title">The story</h2>
              </div>
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
                          <LuChevronRight aria-hidden="true" />
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
          </div>

          <aside className={styles.side}>
            <div className={styles.sideCard}>
              {hasFeast && (
                <div className={styles.sideTop}>
                  <div>
                    <p className={styles.eyebrow}>Feast day</p>
                    <b>{feastValue}</b>
                    {bothFeasts && (
                      <small>
                        Catholic {catholicFeast} · Orthodox{' '}
                        {orthodoxFeast}
                      </small>
                    )}
                  </div>
                </div>
              )}
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
              <div className={styles.rows}>
                {data.patron && (
                  <div>
                    <span>Patron of</span>
                    <span>{data.patron}</span>
                  </div>
                )}
                {data.birth_location && (
                  <div>
                    <span>Born</span>
                    <span>
                      {[data.birth_year, data.birth_location]
                        .filter(Boolean)
                        .join(', ')}
                    </span>
                  </div>
                )}
                {data.death_location && (
                  <div>
                    <span>Died</span>
                    <span>
                      {[data.death_year, data.death_location]
                        .filter(Boolean)
                        .join(', ')}
                    </span>
                  </div>
                )}
                {tradition && (
                  <div>
                    <span>Venerated</span>
                    <span>
                      {tradition === 'Both'
                        ? 'Catholic and Orthodox'
                        : tradition}
                    </span>
                  </div>
                )}
                {data.relic_location && (
                  <div>
                    <span>Relics</span>
                    <span>{data.relic_location}</span>
                  </div>
                )}
              </div>
            </div>
          </aside>
        </div>

        <div className={styles.rest}>

            {miracles.length > 0 && (
              <section
                className={styles.block}
                id="miracles"
                aria-labelledby="miracles-title"
              >
                <div className={styles.blockHead}>
                  <h2 id="miracles-title">Miracles</h2>
                </div>
                {groups.length > 1 && (
                  <div className={styles.groups}>
                    {groups.slice(0, 4).map((g) => (
                      <Link
                        key={g.id || g.title}
                        href={`${base}/miracles#${g.id}`}
                      >
                        <small>{g.title}</small>
                        <b>{g.entries.length}</b>
                        <span className={styles.bar}>
                          <i
                            style={{
                              width: `${Math.max(
                                4,
                                (g.entries.length / largestGroup) *
                                  100,
                              )}%`,
                            }}
                          />
                        </span>
                      </Link>
                    ))}
                  </div>
                )}
                <ol className={styles.miracles}>
                  {miracles.slice(0, MIRACLES_SHOWN).map((m) => (
                    <li key={m.id || m.number}>
                      <Link href={`${base}/miracles#${m.id}`}>
                        <span className={styles.miracleNo}>
                          {m.number}
                        </span>
                        <span>
                          <span className={styles.miracleTitle}>
                            {m.title}
                          </span>
                          {m.status && (
                            <StatusPill
                              status={m.status}
                              short
                            />
                          )}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ol>
                <Link
                  href={`${base}/miracles`}
                  className={styles.outline}
                >
                  {miracles.length > MIRACLES_SHOWN
                    ? `Show all ${miracles.length.toLocaleString('en-US')} accounts`
                    : 'Read the accounts'}
                  <LuArrowRight aria-hidden="true" />
                </Link>
              </section>
            )}

            {prayers.length > 0 && (
              <section
                className={`${styles.block} ${styles.prayersBlock}`}
                id="prayers"
                aria-labelledby="prayers-title"
              >
                <div className={styles.blockHead}>
                  <h2 id="prayers-title">Prayers</h2>
                </div>
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

            {teachings.length > 0 && (
              <section
                className={styles.block}
                id="teachings"
                aria-labelledby="teachings-title"
              >
                <div className={styles.blockHead}>
                  <h2 id="teachings-title">Teachings</h2>
                </div>
                <ol className={styles.chapters}>
                  {teachings.map((t, i) => (
                    <li key={t.id || i}>
                      <Link href={`${base}/teachings#${t.id}`}>
                        <span className={styles.chapterNo}>
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span className={styles.chapterTitle}>
                          {t.title}
                        </span>
                        <LuChevronRight aria-hidden="true" />
                      </Link>
                    </li>
                  ))}
                </ol>
              </section>
            )}

            {quotes.length > 0 && (
              <section
                className={styles.block}
                id="quotes"
                aria-labelledby="quotes-title"
              >
                <div className={styles.blockHead}>
                  <h2 id="quotes-title">Quotes</h2>
                </div>
                <div className={styles.quotes}>
                  {quotes.slice(0, QUOTES_SHOWN).map((q, i) => (
                    <blockquote key={i}>{q.text}</blockquote>
                  ))}
                </div>
                {quotes.length > QUOTES_SHOWN && (
                  <Link
                    href="/quotes"
                    className={styles.outline}
                  >
                    All {quotes.length} quotes
                    <LuArrowRight aria-hidden="true" />
                  </Link>
                )}
              </section>
            )}

            {hasRelic && (
              <section
                className={styles.block}
                id="relics"
                aria-labelledby="relics-title"
              >
                <div className={styles.blockHead}>
                  <h2 id="relics-title">Relics</h2>
                </div>
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
                <div className={styles.blockHead}>
                  <h2 id="images-title">Images</h2>
                </div>
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
            {images.length === 1 && image && (
              <figure className={styles.credit}>
                <ImageCredit image={image} />
              </figure>
            )}
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
