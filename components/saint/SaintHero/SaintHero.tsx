import Link from 'next/link'
import { ReactNode } from 'react'
import { LuChevronLeft, LuGrip, LuMapPin } from 'react-icons/lu'
import ShareButton from '../../candle/ShareButton/ShareButton'
import styles from './styles.module.scss'

type Img = {
  id: string
  width?: number
  height?: number
  description?: string
  metadata?: any
}

const assets = process.env.NEXT_PUBLIC_DIRECTUS_ASSETS
const src = (img: Img, width: number) =>
  `${assets}/assets/${img.id}?width=${width}&format=webp&quality=82`
const altOf = (img: Img, name: string) =>
  img.metadata?.alt_text || img.description || `Image of ${name}`

// The top of a saint's page. The layout follows the number of images:
//  1 image:  the portrait is shown whole on a beige panel, with the
//            name beside it (icons keep their edges and writing).
//  2–3:      a large photo with the name on it, and 1–2 beside it.
//  4 or more: a large photo and four small ones.
// On phones, every layout but the first shows one full-width photo.
const SaintHero = ({
  name,
  images,
  place,
  kicker,
  summary,
  actions,
}: {
  name: string
  images: Img[]
  place?: string
  kicker?: string
  summary?: string
  actions?: ReactNode
}) => {
  const [main, ...rest] = images

  if (!main || images.length === 1) {
    return (
      <section className={`${styles.hero} ${styles.single}`}>
        {main && (
          <figure className={styles.portrait}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src(main, 900)}
              alt={altOf(main, name)}
              width={main.width}
              height={main.height}
              fetchPriority="high"
            />
          </figure>
        )}
        <div className={styles.copy}>
          {kicker && (
            <p className={styles.kicker}>
              <LuMapPin aria-hidden="true" />
              {kicker}
            </p>
          )}
          <h1 className={styles.singleTitle}>{name}</h1>
          {summary && <p className={styles.summary}>{summary}</p>}
          <div className={styles.actions}>
            {actions}
            <ShareButton
              title={name}
              className={styles.round}
            />
          </div>
        </div>
      </section>
    )
  }

  const side = rest.slice(0, 4)
  const layout =
    images.length >= 5 ? styles.n5 : images.length >= 3 ? styles.n3 : styles.n2
  const shown = Math.min(images.length, images.length >= 5 ? 5 : 3)
  const hidden = images.length - shown

  return (
    <section className={`${styles.hero} ${layout}`}>
      <div className={`${styles.tile} ${styles.main}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src(main, 1400)}
          alt={altOf(main, name)}
          fetchPriority="high"
        />
        <div className={styles.over}>
          {place && (
            <p className={styles.place}>
              <LuMapPin aria-hidden="true" />
              {place}
            </p>
          )}
          <h1 className={styles.title}>{name}</h1>
          <a
            href="#images"
            className={styles.count}
          >
            <LuGrip aria-hidden="true" />
            {images.length} images
          </a>
        </div>
        <Link
          href="/saints"
          className={`${styles.glass} ${styles.back}`}
          aria-label="All saints"
        >
          <LuChevronLeft aria-hidden="true" />
        </Link>
        <ShareButton
          title={name}
          className={`${styles.glass} ${styles.share}`}
        />
      </div>
      {side.slice(0, shown - 1).map((img, i) => (
        <div
          key={img.id}
          className={styles.tile}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src(img, 700)}
            alt={altOf(img, name)}
            loading="lazy"
          />
          {hidden > 0 && i === shown - 2 && (
            <a
              href="#images"
              className={styles.more}
            >
              +{hidden} {hidden === 1 ? 'image' : 'images'}
            </a>
          )}
        </div>
      ))}
    </section>
  )
}

export default SaintHero
