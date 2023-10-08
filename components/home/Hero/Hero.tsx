import Filter from './../Filter/Filter'
import { Typewriter } from 'react-simple-typewriter'
import styles from './styles.module.scss'

const Hero = ({ filtersCount }) => {
  return (
    <div className={styles.hero}>
      <div className={styles.contentContainer}>
        <h1>
          Find a Saint, find a
          <span className={styles.metaphor}>
            <Typewriter
              words={[
                'Light in the Darkness.',
                'Pillar of Faith.',
                'Soldier for Christ.',
                'Temple of the Holy Spirit.',
                'Light to the World.',
                'Friend.',
              ]}
              deleteSpeed={20}
              delaySpeed={3000}
              loop
            />
          </span>
        </h1>
        <Filter filtersCount={filtersCount} />
      </div>
    </div>
  )
}

export default Hero
