import { getTopGenres } from '../../../queries/GetTopGenres'
import { getTopAuthors } from '../../../queries/getTopAuthors'
import HeroClient from './Hero.client'
import styles from './styles.module.scss'

const HeroServer = async ({ church, preset }) => {
  const authorData = await getTopAuthors({ church, preset })
  const genreData = await getTopGenres({
    church,
  })

  return (
    <div className={styles.hero}>
      <div className={styles.contentContainer}>
        <HeroClient
          authorData={authorData}
          genreData={genreData}
        />
      </div>
    </div>
  )
}

export default HeroServer
