import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import { Saint } from '../../home/summary/interfaces'
import styles from './styles.module.scss'

type Props = {
  children: React.ReactNode
  searchData?: Saint[]
  spaceBetween?: boolean
}

const Page = ({
  children,
  searchData,
  spaceBetween,
}: Props) => (
  <div
    className={`${styles.page} ${
      spaceBetween ? styles.spaceBetween : ''
    }`}
  >
    <Header searchData={searchData} />
    <div className={styles.body}>{children}</div>
    <Footer />
  </div>
)

export default Page
