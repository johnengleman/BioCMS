import Link from 'next/link'
import { useRouter } from 'next/router'
import Search from '../Search/Search'
import SMButtons from '../SMButtons/SMButtons'
import styles from './styles.module.scss'

const Header = ({ searchData }) => {
  const router = useRouter()
  const isSaintsPage =
    router.pathname.startsWith('/saints/')
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
              <Link href="/saints">Saints</Link>
              {/* <Link href="/books">Books</Link>
              <Link href="/teachings">Teachings</Link> */}
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
