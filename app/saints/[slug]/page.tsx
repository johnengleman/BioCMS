import { notFound } from 'next/navigation'
import { saintMetadata } from '../../../utils/saintMetadata'
import Link from 'next/link'
import Image from 'next/image'
import { getSaint } from '../../../queries/getSaint'
import { getRelatedSaints } from '../../../queries/getRelatedSaints'
import { getChurch } from '../../../hooks/getChurch'
import parseList from '../../../utils/parseList'
import {
  formatFeast,
  getChapters,
  getMiracleBook,
  getSources,
  splitSaintName,
} from '../../../utils/saintContent'
import SiteHeader from '../../../components/candle/SiteHeader/SiteHeader'
import SiteFooter from '../../../components/candle/SiteFooter/SiteFooter'
import PhotoHero from '../../../components/candle/PhotoHero/PhotoHero'
import Section from '../../../components/candle/Section/Section'
import SaintSummary from '../../../components/saint/SaintSummary/SaintSummary'
import ImageCredit from '../../../components/candle/ImageCredit/ImageCredit'
import styles from './candle.module.scss'

export const runtime = 'edge'

import { NextPageProps } from '../../../types/nextjs'

export const generateMetadata = async (
  props: NextPageProps,
) => {
  const { slug } = await props.params
  return saintMetadata(slug, 'saint')
}

const LONG_NAME = 28
const MIRACLES_SHOWN = 6
const QUOTES_SHOWN = 6

// "holy_women" -> "Holy Women"
const formatCategory = (value: string) =>
  value
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .replace(/\b(Of|The)\b/g, (w) => w.toLowerCase())

const SaintPage = async (props: NextPageProps) => {
  const searchParams = await props.searchParams
  const { slug } = await props.params

  const data = await getSaint(slug)
  if (!data) notFound()

  const church = await getChurch(searchParams)
  const base = `/saints/${slug}`
  const categories = parseList(data.categories)

  // Title: long names show the place on the line below.
  const parts = splitSaintName(data.name)
  const title =
    data.name.length > LONG_NAME ? parts.title : data.name
  const place =
    data.name.length > LONG_NAME ? parts.subtitle : ''
  const years =
    data.birth_year || data.death_year
      ? `${data.birth_year || '?'}–${data.death_year || '?'}`
      : ''

  const catholicFeast = formatFeast(data.feast_day_catholic)
  const orthodoxFeast = formatFeast(data.feast_day_orthodox)
  const feast =
    church === 'orthodox'
      ? orthodoxFeast || catholicFeast
      : catholicFeast || orthodoxFeast

  const chapters = getChapters(data.biography)
  const sources = getSources(data.biography)
  const miracleBook = getMiracleBook(
    data.miracles?.[0]?.miracles,
  )
  const miracles = miracleBook.groups.flatMap(
    (g) => g.entries,
  )
  // Approvals for other people (e.g. her parents) say "not attributed".
  const approved = miracles.filter(
    (m) =>
      /^approved/i.test(m.status || '') &&
      !/not attributed/i.test(m.status || ''),
  ).length
  const teachings = getChapters(
    data.teachings?.[0]?.teachings,
  )
  const quotes = (data.quotes || []).filter((q) => q.text)
  const prayers = data.prayers || []
  const hasRelic = Boolean(
    data.relic_location ||
      data.relic_description ||
      data.relic_image?.id,
  )

  const related =
    categories.length > 0
      ? (await getRelatedSaints({
          categories: categories.join(),
          church,
          slug,
        })) || []
      : []

  // "At a glance": the largest figure leads, the rest follow.
  const lead = miracles.length
    ? {
        value: miracles.length,
        label:
          miracles.length === 1
            ? 'Miracle account'
            : 'Miracle accounts',
        href: `${base}/miracles`,
      }
    : chapters.length
      ? {
          value: chapters.length,
          label: 'Chapters in the life',
          href: `${base}/biography`,
        }
      : null
  const figures = [
    miracles.length && chapters.length
      ? {
          value: chapters.length,
          label: 'chapters',
          href: `${base}/biography`,
        }
      : null,
    teachings.length
      ? {
          value: teachings.length,
          label:
            teachings.length === 1
              ? 'teaching'
              : 'teachings',
          href: `${base}/teachings`,
        }
      : null,
    approved
      ? {
          value: approved,
          label: 'approved by the Church',
          href: `${base}/miracles`,
        }
      : null,
    sources.count
      ? {
          value: sources.count,
          label: 'sources',
          href: `${base}/biography#${sources.id}`,
        }
      : null,
  ].filter(Boolean) as {
    value: number
    label: string
    href: string
  }[]
  const facts = [
    feast && { label: 'Feast', value: feast },
    data.patron && { label: 'Patron', value: data.patron },
    data.death_location && {
      label: 'Died',
      value: data.death_location,
    },
  ].filter(Boolean) as { label: string; value: string }[]

  const image = data.profile_image
  const assets = process.env.NEXT_PUBLIC_DIRECTUS_ASSETS
  const ratio =
    image?.width && image?.height
      ? image.height / image.width
      : 1.3

  const galleryImages = (data.other_images ?? [])
    .map((o) => o?.directus_files_id)
    .filter((f) => f?.id)

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
      <SiteHeader
        searchParams={searchParams}
        active="/saints"
      />
      <main>
        <PhotoHero align="center">
          {categories.length > 0 && (
            <p className={styles.eyebrow}>
              {categories
                .slice(0, 3)
                .map(formatCategory)
                .join(' · ')}
            </p>
          )}
          <h1 className={styles.title}>{title}</h1>
          {(place || years) && (
            <p className={styles.subtitle}>
              {[place, years].filter(Boolean).join('. ')}
            </p>
          )}
          <div className={styles.actions}>
            {chapters.length > 0 && (
              <Link
                href={`${base}/biography`}
                className={styles.primary}
              >
                Read the life
              </Link>
            )}
            {miracles.length > 0 && (
              <Link
                href={`${base}/miracles`}
                className={styles.secondary}
              >
                See the miracles
                <span aria-hidden="true"> ›</span>
              </Link>
            )}
          </div>
          {image?.id && (
            <figure className={styles.portrait}>
              <Image
                src={`${assets}/assets/${image.id}?width=900&format=webp&quality=82`}
                alt={
                  image.description ||
                  `Image of ${data.name}`
                }
                width={440}
                height={Math.round(440 * ratio)}
                priority
              />
              <ImageCredit image={image} />
            </figure>
          )}
          {data.summary && (
            <div
              className={styles.summary}
              dangerouslySetInnerHTML={{
                __html: data.summary,
              }}
            />
          )}
        </PhotoHero>

        {(lead ||
          figures.length > 0 ||
          facts.length > 0) && (
          <Section
            id="glance"
            title="At a glance"
          >
            <div className={styles.bento}>
              {lead && (
                <Link
                  href={lead.href}
                  className={`${styles.tile} ${styles.leadTile}`}
                >
                  <span className={styles.leadValue}>
                    {lead.value}
                  </span>
                  <span className={styles.tileLabel}>
                    {lead.label}
                  </span>
                </Link>
              )}
              {figures.map((f, i) => (
                <Link
                  key={f.label}
                  href={f.href}
                  // An odd last figure fills its row, leaving no gap.
                  className={`${styles.tile} ${
                    figures.length % 2 === 1 &&
                    i === figures.length - 1
                      ? styles.wideTile
                      : ''
                  }`}
                >
                  <span className={styles.value}>
                    {f.value}
                  </span>
                  <span className={styles.tileLabel}>
                    {f.label}
                  </span>
                </Link>
              ))}
              {facts.length > 0 && (
                <div className={styles.facts}>
                  {facts.map((f) => (
                    <div
                      key={f.label}
                      className={`${styles.tile} ${styles.factTile}`}
                    >
                      <span className={styles.factLabel}>
                        {f.label}
                      </span>
                      <span className={styles.factValue}>
                        {f.value}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Section>
        )}

        {chapters.length > 0 && (
          <Section
            id="life"
            title="The life"
            link={{
              href: `${base}/biography`,
              label: 'Read from the beginning',
            }}
          >
            <ol className={styles.chapters}>
              {chapters.map((c, i) => (
                <li key={c.id || i}>
                  <Link href={`${base}/biography#${c.id}`}>
                    <span className={styles.chapterNumber}>
                      Chapter {i + 1}
                    </span>
                    <span className={styles.chapterTitle}>
                      {c.title}
                    </span>
                    <span
                      className={styles.chevron}
                      aria-hidden="true"
                    >
                      ›
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
          </Section>
        )}

        {miracles.length > 0 && (
          <Section
            id="miracles"
            title="Miracles"
            link={{
              href: `${base}/miracles`,
              label:
                miracles.length > MIRACLES_SHOWN
                  ? `All ${miracles.length} accounts`
                  : 'Read the accounts',
            }}
          >
            <ol className={styles.list}>
              {miracles
                .slice(0, MIRACLES_SHOWN)
                .map((m) => (
                  <li key={m.id || m.number}>
                    <Link href={`${base}/miracles#${m.id}`}>
                      <span className={styles.listNumber}>
                        {m.number}
                      </span>
                      <span className={styles.listText}>
                        <span className={styles.listTitle}>
                          {m.title}
                        </span>
                        {m.status && (
                          <span className={styles.listMeta}>
                            {m.status}
                          </span>
                        )}
                      </span>
                    </Link>
                  </li>
                ))}
            </ol>
          </Section>
        )}

        {teachings.length > 0 && (
          <Section
            id="teachings"
            title="Teachings"
            link={{
              href: `${base}/teachings`,
              label: 'Read the teachings',
            }}
          >
            <ol className={styles.list}>
              {teachings.map((t, i) => (
                <li key={t.id || i}>
                  <Link href={`${base}/teachings#${t.id}`}>
                    <span className={styles.listNumber}>
                      {i + 1}
                    </span>
                    <span className={styles.listText}>
                      <span className={styles.listTitle}>
                        {t.title}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
          </Section>
        )}

        {quotes.length > 0 && (
          <Section
            id="quotes"
            title="In their own words"
            link={
              quotes.length > QUOTES_SHOWN
                ? {
                    href: '/quotes',
                    label: `All ${quotes.length} quotes`,
                  }
                : undefined
            }
          >
            <div className={styles.quotes}>
              {quotes.slice(0, QUOTES_SHOWN).map((q, i) => (
                <blockquote key={i}>{q.text}</blockquote>
              ))}
            </div>
          </Section>
        )}

        {prayers.length > 0 && (
          <Section
            id="novenas"
            title="Prayers"
          >
            <div className={styles.prayers}>
              {prayers.map((p) => (
                <Link
                  key={p.prayer_slug}
                  href={`${base}/novenas/${p.prayer_slug}`}
                  className={styles.tile}
                >
                  <span className={styles.chapterTitle}>
                    {p.prayer_title}
                  </span>
                  <span className={styles.secondary}>
                    Pray<span aria-hidden="true"> ›</span>
                  </span>
                </Link>
              ))}
            </div>
          </Section>
        )}

        {hasRelic && (
          <Section
            id="relics"
            title="Relics"
          >
            <div
              className={`${styles.tile} ${styles.relic}`}
            >
              {data.relic_image?.id && (
                <figure className={styles.photo}>
                  <Image
                    src={`${assets}/assets/${data.relic_image.id}?width=1200&format=webp&quality=82`}
                    alt={
                      data.relic_image.description ||
                      `Relics of ${data.name}`
                    }
                    width={760}
                    height={Math.round(
                      760 *
                        (data.relic_image.width &&
                        data.relic_image.height
                          ? data.relic_image.height /
                            data.relic_image.width
                          : 0.667),
                    )}
                  />
                  <ImageCredit image={data.relic_image} />
                </figure>
              )}
              {data.relic_location && (
                <p>
                  <span className={styles.factLabel}>
                    Location
                  </span>
                  <span className={styles.factValue}>
                    {data.relic_location}
                  </span>
                </p>
              )}
              {data.relic_description && (
                <div
                  className={styles.relicText}
                  dangerouslySetInnerHTML={{
                    __html: data.relic_description,
                  }}
                />
              )}
            </div>
          </Section>
        )}

        {galleryImages.length > 0 && (
          <Section
            id="images"
            title="Images"
          >
            <div className={styles.gallery}>
              {galleryImages.map((img) => (
                <figure key={img.id} className={styles.photo}>
                  <Image
                    src={`${assets}/assets/${img.id}?width=900&format=webp&quality=82`}
                    alt={
                      img.description ||
                      `Image of ${data.name}`
                    }
                    width={440}
                    height={Math.round(
                      440 *
                        (img.width && img.height
                          ? img.height / img.width
                          : 0.75),
                    )}
                  />
                  <ImageCredit image={img} />
                </figure>
              ))}
            </div>
          </Section>
        )}

        {related.length > 0 && (
          <Section
            id="related"
            title="Related saints"
            link={{ href: '/saints', label: 'All saints' }}
          >
            <div className={styles.related}>
              {related.map((saint) => (
                <SaintSummary
                  key={saint.slug}
                  data={saint}
                />
              ))}
            </div>
          </Section>
        )}
      </main>
      <SiteFooter />
    </div>
  )
}

export default SaintPage
