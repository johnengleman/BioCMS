import React from 'react'
import styles from './styles.module.scss'

const Title = ({
  children,
}: {
  children: React.ReactNode
}) => (
  <div className={styles.title}>
    <h3>{children}</h3>
  </div>
)

export default Title
