import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import {
  faChurch,
  faPenLine,
  faPersonPraying,
  faEarthAmerica,
} from '@fortawesome/pro-duotone-svg-icons'
import ButtonPreset from '../../global/ButtonPreset/ButtonPreset'
import ButtonFilter from '../../global/ButtonFilter/ButtonFilter'
import styles from './styles.module.scss'

const Filter = ({ authorData, genreData }) => {
  const router = useRouter()
  const church = router.query.church || 'all'

  const [selectedChurch, setSelectedChurch] =
    useState('all')

  useEffect(() => {
    const cookie = Cookies.get('findasaint.com')

    if (cookie) {
      try {
        const data = JSON.parse(cookie)
        setSelectedChurch(data.church)
      } catch (err) {
        console.error(err)
      }
    }
  }, [church])

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
            // const selectedF =
            //   author?.toLowerCase() === selectedFilter
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

const Hero = ({ authorData, genreData }) => {
  return (
    <div className={styles.hero}>
      <div className={styles.contentContainer}>
        <Filter
          authorData={authorData}
          genreData={genreData}
        />
      </div>
    </div>
  )
}

export default Hero
