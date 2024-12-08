'use client'

import { useRef } from 'react'
import TableOfContentsText from '../TableOfContentsText/TableOfContentsText'
import styles from './styles.module.scss'

interface ClientProps {
  leftRail: React.ReactNode
  children: React.ReactNode
  rightRail?: React.ReactNode // Optional prop with ?
}

const Client = ({
  leftRail,
  children,
  rightRail,
}: ClientProps) => {
  const refElement = useRef(null)

  return (
    <div className={styles.content}>
      <div className={styles.leftRail}>
        {leftRail}
        <TableOfContentsText />
      </div>
      <div className={styles.main}>{children}</div>
      <div className={styles.rightRail}>{rightRail}</div>
    </div>
  )
}

export default Client
