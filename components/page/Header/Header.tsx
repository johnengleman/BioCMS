import Link from 'next/link'
import { useRouter } from 'next/router'
import Search from '../Search/Search'
import SMButtons from '../SMButtons/SMButtons'
import styles from './styles.module.scss'

const Header = ({ searchData, navData }) => {
  const router = useRouter()
  const isSaintsPage =
    router.pathname.startsWith('/saints/')

  const saintsCount =
    navData?.saints_aggregated?.[0]?.count?.id
  const miraclesCount =
    navData?.miracles_aggregated?.[0]?.count?.id
  const teachingsCount =
    navData?.teachings_aggregated?.[0]?.count?.id
  const booksCount =
    navData?.books_aggregated?.[0]?.count?.id
  const quotesCount =
    navData?.quotes_aggregated?.[0]?.count?.id

  return (
    <div
      className={`${styles.header} ${
        isSaintsPage ? styles.transparent : ''
      }
}`}
    >
      <div className={styles.row}>
        <div className={styles.content}>
          <div className={`${styles.col} ${styles.left}`}>
            <div className={styles.navigation}>
              <Link href="/saints">
                {saintsCount && (
                  <span className={styles.count}>
                    {saintsCount}
                  </span>
                )}
                Saints
              </Link>
              {teachingsCount ? (
                <Link href="/teachings">
                  <span className={styles.count}>
                    {teachingsCount}
                  </span>
                  Teachings & Legacy
                </Link>
              ) : (
                ''
              )}
              {miraclesCount ? (
                <Link href="/miracles">
                  <span className={styles.count}>
                    {miraclesCount}
                  </span>
                  Miracles
                </Link>
              ) : (
                ''
              )}
              {quotesCount ? (
                <Link href="/quotes">
                  <span className={styles.count}>
                    {quotesCount}
                  </span>
                  Quotes
                </Link>
              ) : (
                ''
              )}
              <Link href="/books">
                {booksCount && (
                  <span className={styles.count}>
                    {booksCount}
                  </span>
                )}
                Books
              </Link>
            </div>
          </div>
          <div className={`${styles.col} ${styles.right}`}>
            <Search searchData={searchData} />
            <SMButtons transparent={isSaintsPage} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
