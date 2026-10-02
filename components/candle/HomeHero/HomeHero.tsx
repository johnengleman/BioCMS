import { ReactNode } from 'react'
import HeroPhoto, { HeroCredit } from './HeroPhoto'
import styles from './styles.module.scss'

// The photo header of the list pages, like a travel site. The photo
// follows the visitor's tradition (HeroPhoto). The site header
// floats over the top of it (SiteHeader `overlay`). Filters sit along
// the bottom edge of the photo.
const HomeHero = ({
  eyebrow,
  title,
  subtitle,
  search,
  filters,
  size = 'large',
}: {
  eyebrow?: ReactNode
  title: string
  subtitle?: ReactNode
  search?: ReactNode
  filters?: ReactNode
  size?: 'large' | 'short'
}) => {
  return (
    <div className={styles.shell}>
      <section
        className={`${styles.hero} ${size === 'short' ? styles.short : ''}`}
      >
        <HeroPhoto />
        <HeroCredit className={styles.credit} />
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
