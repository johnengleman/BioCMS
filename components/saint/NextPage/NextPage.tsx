import Link from 'next/link'
import styles from './styles.module.scss'
import { useRouter } from 'next/router'
import PageButton from '../PageButton/PageButton'

const NextPage = ({ data }) => {
  const router = useRouter()
  const slug = router.query.slug
  const route = router.pathname

  return (
    <div className={styles.nextPage}>
      {data?.biography && !route.includes('biography') && (
        <Link href={`/saints/${slug}/biography`}>
          <PageButton
            type="biography"
            active={true}
          />
        </Link>
      )}
      {data?.miracles && !route.includes('miracles') && (
        <Link href={`/saints/${slug}/miracles`}>
          <PageButton
            type="miracles"
            active={true}
          />
        </Link>
      )}
      {data?.teachings?.length > 0 &&
        !route.includes('teachings') && (
          <Link href={`/saints/${slug}/teachings`}>
            <PageButton
              type="teachings"
              active={true}
            />
          </Link>
        )}
      {data?.legacy_influence?.length > 0 &&
        !route.includes('legacy') && (
          <Link href={`/saints/${slug}/legacy`}>
            <PageButton
              type="legacy"
              active={true}
            />
          </Link>
        )}
    </div>
  )
}

export default NextPage
