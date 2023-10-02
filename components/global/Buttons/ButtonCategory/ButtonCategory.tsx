import styles from './styles.module.scss'

type Props = {
  text: string
  bg: string
}

const ButtonCategory = ({ text, bg }: Props) => {
  return <div className={styles.button}>{text}</div>
}

export default ButtonCategory
