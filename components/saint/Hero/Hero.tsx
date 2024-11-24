import Filter from '../Filter/Filter.server'
import styles from './styles.module.scss'

const Hero = ({ searchParams }) => {
  return (
    <div className={styles.hero}>
      <div className={styles.contentContainer}>
        <Filter searchParams={searchParams} />
      </div>
    </div>
  )
}

export default Hero
