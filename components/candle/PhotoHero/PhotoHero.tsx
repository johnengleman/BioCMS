import { ReactNode } from 'react'
import styles from './styles.module.scss'

// The candlelight photo behind the top of a page. It starts under the
// frosted header and fades into the cream page.
// public/images/candlelight-church.webp is a PLACEHOLDER: replace it
// with a licensed photograph of a church in candlelight.
const PhotoHero = ({
  children,
  align = 'left',
}: {
  children: ReactNode
  align?: 'left' | 'center'
}) => (
  <section className={`${styles.hero} ${styles[align]}`}>
    <div
      className={styles.photo}
      aria-hidden="true"
    />
    <div className={styles.inner}>{children}</div>
  </section>
)

export default PhotoHero
