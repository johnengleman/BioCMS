import { ReactNode } from 'react'
import HeroPhoto from './HeroPhoto'
import { HERO_PHOTOS, asChurch } from '../../../utils/site'
import styles from './styles.module.scss'

// The photo header of the list pages, like a travel site. The photo
// follows the visitor's tradition (utils/site.ts). The site header
// floats over the top of it (SiteHeader `overlay`). Filters sit along
// the bottom edge of the photo.
const HomeHero = ({
  church,
  eyebrow,
  title,
  subtitle,
  search,
  filters,
  size = 'large',
}: {
  church: string
  eyebrow?: ReactNode
  title: string
  subtitle?: ReactNode
  search?: ReactNode
  filters?: ReactNode
  size?: 'large' | 'short'
}) => {
  const photo = HERO_PHOTOS[asChurch(church)]
  return (
    <div className={styles.shell}>
      <section
        className={`${styles.hero} ${size === 'short' ? styles.short : ''}`}
      >
        <HeroPhoto photo={photo} />
        <a
          className={styles.credit}
          href={photo.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          {photo.place} · Photo: {photo.author}, {photo.license}
        </a>
        <div className={styles.middle}>
          {eyebrow}
          <h1 className={styles.title}>{title}</h1>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          {search && <div className={styles.search}>{search}</div>}
        </div>
        {filters && <div className={styles.bottom}>{filters}</div>}
      </section>
    </div>
  )
}

export default HomeHero
