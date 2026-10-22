import type { ReactNode } from 'react'
import styles from './styles.module.scss'

// The top of a list page (miracles, teachings, quotes, novenas, books)
// on night: the title, one line under it, and the filters.
const NightHero = ({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow?: ReactNode
  title: string
  subtitle?: ReactNode
  children?: ReactNode
}) => (
  <section className={styles.band}>
    <div className={styles.inner}>
      {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
      <h1 className={styles.title}>{title}</h1>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      {children && <div className={styles.filters}>{children}</div>}
    </div>
  </section>
)

export default NightHero
