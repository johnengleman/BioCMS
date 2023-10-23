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
              {/* <Link href="/books">Books</Link> */}
              <Link href="/teachings">
                {teachingsCount && (
                  <span className={styles.count}>
                    {teachingsCount}
                  </span>
                )}
                Teachings
              </Link>
              <Link href="/miracles">
                {miraclesCount && (
                  <span className={styles.count}>
                    {miraclesCount}
                  </span>
                )}
                Miracles
              </Link>
            </div>
          </div>
          <div
            className={`${styles.col} ${styles.center}`}
          ></div>
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
