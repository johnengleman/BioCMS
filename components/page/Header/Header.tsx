import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBars,
  faXmark,
} from '@fortawesome/pro-duotone-svg-icons'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Search from '../Search/Search'
import SMButtons from '../SMButtons/SMButtons'
import useBreakpoints from '../../../hooks/useBreakPoints'
import ChurchToggle from '../ChurchToggle/ChurchToggle'
import styles from './styles.module.scss'

const Header = ({ searchData, navData }) => {
  const [mobileMenuIsOpen, setMobileMenuOpen] =
    useState(false)
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
  const prayersCount =
    navData?.prayers_aggregated?.[0]?.count?.id

  const { isMobile } = useBreakpoints()

  const handleToggleMenu = (open) => {
    if (open) {
      setMobileMenuOpen(true)
      const body = document.querySelector('body')
      if (body) {
        body.style.overflow = 'hidden'
      }
    } else {
      setMobileMenuOpen(false)
      const body = document.querySelector('body')
      if (body) {
        body.style.overflow = 'unset'
      }
    }
  }

  return (
    <div
      className={`${styles.header} ${
        isSaintsPage ? styles.transparent : ''
      }
}`}
    >
      <div className={styles.row}>
        <div
          className={`${styles.content} ${
            mobileMenuIsOpen ? styles.mobileMenuOpen : ''
          }`}
        >
          {mobileMenuIsOpen && (
            <div className={styles.close}>
              <FontAwesomeIcon
                icon={faXmark}
                size="2xl"
                style={{ color: '#dbdfe6' }}
                onClick={() => handleToggleMenu(false)}
              />
            </div>
          )}
          <div className={styles.colLeft}>
            {isMobile && (
              <FontAwesomeIcon
                icon={faBars}
                size="2xl"
                style={{ color: '#ccad00' }}
                onClick={() => handleToggleMenu(true)}
              />
            )}
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
              {prayersCount ? (
                <Link href="/novenas">
                  <span className={styles.count}>
                    {prayersCount}
                  </span>
                  Novenas
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
            <div className={styles.misc}>
              <Link href="/about">About</Link>
              <Link href="/feedback">Feedback</Link>
              <Link href="/updates">Recent Updates</Link>
            </div>
          </div>

          <div className={styles.colRight}>
            <Search searchData={searchData} />
            <SMButtons transparent={isSaintsPage} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
