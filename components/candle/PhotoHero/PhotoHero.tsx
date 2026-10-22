import { ReactNode } from 'react'
import styles from './styles.module.scss'

// A calm beige banner at the top of the simple pages (about, updates,
// not found). List pages use NightHero and the saints list TodayBand.
const PhotoHero = ({
  children,
  align = 'left',
}: {
  children: ReactNode
  align?: 'left' | 'center'
}) => (
  <div className={styles.shell}>
    <section className={`${styles.hero} ${styles[align]}`}>
      {children}
    </section>
  </div>
)

export default PhotoHero
