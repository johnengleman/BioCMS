import React from 'react'
import * as S from './styles'

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
  <S.Filter>
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
  </S.Filter>
)

export default Filter
