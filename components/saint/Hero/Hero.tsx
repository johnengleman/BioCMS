import Filter from '../Filter/Filter.server'
import TypeWriter from '../Typewriter/Typewriter'
import styles from './styles.module.scss'

const Hero = ({ searchParams }) => {
  return (
    <div className={styles.hero}>
      <div className={styles.contentContainer}>
        <h1>
          Find a Saint, find a
          <span className={styles.metaphor}>
            <TypeWriter />
          </span>
        </h1>
        <Filter searchParams={searchParams} />
      </div>
    </div>
  )
}

export default Hero
