import React from 'react'
import Header from '../Header/Header.server'
import Footer from '../Footer/Footer'
import styles from './styles.module.scss'

type Props = {
  children: React.ReactNode
  navData?: {}
  spaceBetween?: boolean
  searchParams
}

const Page = ({
  children,
  spaceBetween,
  searchParams,
}: Props) => {
  return (
    <div
      className={`${styles.page} ${
        spaceBetween ? styles.spaceBetween : ''
      }`}
    >
      <Header searchParams={searchParams} />
      <div className={styles.body}>{children}</div>
      <Footer />
    </div>
  )
}

export default Page
