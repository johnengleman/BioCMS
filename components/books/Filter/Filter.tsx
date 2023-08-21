import * as S from './styles'

const Filter = ({
  title,
  genres,
  setSelectedGenre,
  selectedGenre,
}) => (
  <S.Filter>
    <div className="title">{title}</div>
    <div className="genres">
      {genres.map((genre, i) => (
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
