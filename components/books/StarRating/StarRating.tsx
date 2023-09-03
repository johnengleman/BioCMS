import ReactStars from 'react-stars'
import * as S from './styles'

const StarRating = ({ rating }) => (
  <S.Rating>
    <ReactStars
      count={5}
      size={16}
      value={rating}
      color2={'#ffd700'}
      edit={false}
    />
    <p>{rating}</p>
  </S.Rating>
)

export default StarRating
