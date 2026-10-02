import { ReactNode } from 'react'
import HeroPhoto, { HeroCredit } from './HeroPhoto'
import styles from './styles.module.scss'

// The photo header of the list pages, like a travel site. The photo
// follows the visitor's tradition (HeroPhoto). The site header
// floats over the top of it (SiteHeader `overlay`). Filters sit along
// the bottom edge of the photo.
//
// `size="split"` is the saints list: a shorter photo band with the
// title at the bottom left and the search at the bottom right, so the
// cards start higher on the screen.
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
  size?: 'large' | 'short' | 'split'
}) => {
  if (size === 'split')
    return (
      <div className={styles.shell}>
        <section className={`${styles.hero} ${styles.split}`}>
          <HeroPhoto />
          <HeroCredit className={styles.credit} />
          <div className={styles.splitBody}>
            <div className={styles.splitText}>
              <h1 className={styles.title}>{title}</h1>
              {subtitle && (
                <p className={styles.subtitle}>{subtitle}</p>
              )}
            </div>
            {search && (
              <div className={styles.splitSearch}>{search}</div>
            )}
          </div>
        </section>
      </div>
    )

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
