'use client'

import {
  faChurch,
  faPenLine,
  faPersonPraying,
  faEarthAmerica,
} from '@fortawesome/pro-duotone-svg-icons'
import ButtonPreset from '../../global/ButtonPreset/ButtonPreset'
import ButtonFilter from '../../global/ButtonFilter/ButtonFilter'
import styles from './styles.module.scss'

const HeroClient = ({ authorData, genreData }) => {
  const getIcon = (genre) => {
    if (genre === 'theology_and_dogma') {
      return faChurch
    }
    if (genre === 'spiritual_and_ascetic_writings') {
      return faPenLine
    }
    if (genre === 'church_history_and_biography') {
      return faEarthAmerica
    }
    if (genre === 'prayer_and_devotionals') {
      return faPersonPraying
    }
  }

  return (
    <div className={styles.filter}>
      <p className={styles.instructions}>
        Filter by genre?
      </p>
      <div className={styles.presetContainer}>
        {genreData?.map((genre, i) => {
          const count = genre[1].length

          if (count) {
            return (
              <ButtonPreset
                key={i}
                icon={getIcon(genre[0])}
                value={genre[0]}
                count={count}
              />
            )
          }
        })}
      </div>

      <p className={styles.instructions}>
        Filter by popular saint?
      </p>
      <div className={styles.slideContainer}>
        {authorData
          ?.sort((a, b) => b.books.length - a.books.length)
          ?.map((author, i) => {
            const count = author.books.length
            if (count) {
              return (
                <ButtonFilter
                  key={i}
                  filter={author.name}
                  count={count}
                />
              )
            }
          })}
      </div>
    </div>
  )
}

export default HeroClient
