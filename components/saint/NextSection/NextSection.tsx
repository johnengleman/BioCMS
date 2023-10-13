import Link from 'next/link'
import styles from './styles.module.scss'
import { useRouter } from 'next/router'

const NextSection = ({ data }) => {
  const router = useRouter()
  const slug = router.query.slug
  const route = router.pathname

  return (
    <div className={styles.nextSection}>
      {data?.miracles && !route.includes('miracles') && (
        <Link href={`/saints/${slug}/miracles`}>
          <button className={styles.button}>
            Miracles
          </button>
        </Link>
      )}
      {data?.teachings?.length > 0 &&
        !route.includes('teachings') && (
          <Link href={`/saints/${slug}/teachings`}>
            <button className={styles.button}>
              Teachings
            </button>
          </Link>
        )}
      {data?.legacy_influence?.length > 0 &&
        !route.includes('legacy') && (
          <Link href={`/saints/${slug}/legacy`}>
            <button className={styles.button}>
              Legacy
            </button>
          </Link>
        )}
      {data?.biography && !route.includes('biography') && (
        <Link href={`/saints/${slug}/biography`}>
          <button className={styles.button}>
            Biography
          </button>
        </Link>
      )}
    </div>
  )
}

export default NextSection
