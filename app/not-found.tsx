import Link from 'next/link'
import SiteHeader from '../components/candle/SiteHeader/SiteHeader'
import SiteFooter from '../components/candle/SiteFooter/SiteFooter'
import PhotoHero from '../components/candle/PhotoHero/PhotoHero'
import styles from './not-found.module.scss'

export default function NotFound() {
  return (
    <div className={styles.page}>
      <SiteHeader />
      <main>
        <PhotoHero align="center">
          <p className={styles.eyebrow}>Page not found</p>
          <h1 className={styles.title}>
            We could not find this page
          </h1>
          <p className={styles.subtitle}>
            The link may be old, or the saint may not be on
            the site yet.
          </p>
          <div className={styles.actions}>
            <Link
              href="/saints"
              className={styles.primary}
            >
              Browse the saints
            </Link>
          </div>
        </PhotoHero>
      </main>
      <SiteFooter />
    </div>
  )
}
