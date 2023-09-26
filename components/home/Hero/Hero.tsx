import Typewriter from 'typewriter-effect'
import Filter from './../Filter/Filter'
import { properties } from '../../../properties'
import styles from './styles.module.scss'

const Hero = ({
  handleSetSaintFilter,
  saintFilter,
  handleSetSaintPreset,
  saintPreset,
  church,
}) => {
  return (
    <div className={styles.hero}>
      <div className={styles.contentContainer}>
        <h1>
          Find a Saint, find a
          <span className={styles.metaphor}>
            <Typewriter
              options={
                {
                  strings: [
                    'Light in the Darkness.',
                    'Pillar of Faith.',
                    'Soldier for Christ.',
                    'Temple of the Holy Spirit.',
                    'Light to the World.',
                    'Friend.',
                  ],
                  cursor: '',
                  deleteSpeed: 20,
                  delay: 80,
                  pauseFor: 3000,
                  autoStart: true,
                  loop: true,
                } as any
              }
            />
          </span>
        </h1>
        <Filter
          setSaintFilter={(saintFilter) => handleSetSaintFilter(saintFilter)}
          setSaintPreset={(saintPreset) => handleSetSaintPreset(saintPreset)}
          selectedFilter={saintFilter}
          selectedPreset={saintPreset}
          options={properties.saintFilters}
          title={
            properties[
              !Array.isArray(church) ? church : 'all'
            ]?.filterTitle
          }
        />
      </div>
    </div>
  )
}

export default Hero
