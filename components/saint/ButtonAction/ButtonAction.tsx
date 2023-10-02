import React from 'react'
import styles from './styles.module.scss'

type Props = {
  text: string
}

const ButtonAction = ({ text }: Props) => (
  <div className={styles.button}>
    <div className={styles.hamburger}>
      <div />
      <div />
      <div />
    </div>
    {text}
  </div>
)

export default ButtonAction
