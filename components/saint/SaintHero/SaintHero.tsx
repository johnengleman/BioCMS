import { ReactNode } from 'react'
import { LuMapPin } from 'react-icons/lu'
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

// The top of a saint's page: the profile portrait shown whole on a
// beige panel (icons keep their edges and writing), with the name, the
// summary and the actions beside it. Every saint has the same layout;
// more images go in the Images section further down the page.
const SaintHero = ({
  name,
  image,
  kicker,
  summary,
  actions,
}: {
  name: string
  image?: Img | null
  kicker?: string
  summary?: string
  actions?: ReactNode
}) => (
  <section className={`${styles.hero} ${styles.single}`}>
    {image?.id && (
      <figure className={styles.portrait}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${assets}/assets/${image.id}?width=900&format=webp&quality=82`}
          alt={
            image.metadata?.alt_text ||
            image.description ||
            `Image of ${name}`
          }
          width={image.width}
          height={image.height}
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

export default SaintHero
