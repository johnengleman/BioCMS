import React from 'react'
import styles from './styles.module.scss'

type FilterProps = {
  title: string
  genres: string[]
  setSelectedGenre: (genre: string) => void
  selectedGenre?: string
}

const Filter: React.FC<FilterProps> = ({
  title = '',
  genres = [],
  setSelectedGenre,
  selectedGenre = '',
}) => (
  <div className={styles.Filter}>
    <div className="title">{title}</div>
    <div className="genres">
      {genres?.map((genre, i) => (
        <div
          key={i}
          className={`genre ${
            selectedGenre === genre ? 'selected' : ''
          }`}
          onClick={() => setSelectedGenre(genre)}
        >
          {genre}
        </div>
      ))}
    </div>
  </div>
)

export default Filter
