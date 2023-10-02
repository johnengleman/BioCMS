import ReactStars from 'react-stars'
import styles from './styles.module.scss'

const StarRating = ({ rating }) => (
  <div className={styles.rating}>
    <ReactStars
      count={5}
      size={16}
      value={rating}
      color2={'#ffd700'}
      edit={false}
    />
    <p>{rating}</p>
  </div>
)

export default StarRating
