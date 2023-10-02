import styles from './styles.module.scss'

type Props = {
  name: string
}

const SectionHeader = ({ name }: Props) => {
  if (name) {
    return (
      <div className={styles.sectionHeader}>
        <h2>{name}</h2>
      </div>
    )
  }
  return null
}

export default SectionHeader
