import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import { Saint } from '../../saint/SaintSummary/interfaces'
import ErrorBoundary from '../../global/ErrorBoundary/ErrorBoundary'
import styles from './styles.module.scss'

type Props = {
  children: React.ReactNode
  searchData?: Saint[]
  navData?: {}
  spaceBetween?: boolean
}

const Page = ({
  children,
  searchData,
  navData,
  spaceBetween,
}: Props) => {
  return (
    <ErrorBoundary>
      <div
        className={`${styles.page} ${
          spaceBetween ? styles.spaceBetween : ''
        }`}
      >
        <Header
          searchData={searchData}
          navData={navData}
        />
        <div className={styles.body}>{children}</div>
        <Footer />
      </div>
    </ErrorBoundary>
  )
}

export default Page
