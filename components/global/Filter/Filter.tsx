import * as S from './styles'
import { Carousel } from '@trendyol-js/react-carousel';

const Filter = () => {
  const filters = [
    'Martyrs',
    'Missionaries',
    'Fools-for-Christ',
    'Holy-Women',
    'Hermits',
    'Bishops',
    'Monastics',
    'Confessors',
    'Miracle Workers',
    'Patron Saints',
    'Converts',
    'Fathers of the Church',
    'Married',
    'Mothers',
    'Warriors',
  ]

  return (
    <S.Filter>
      <Carousel show={3} slide={1}>
          {
            filters.map((filter, i) => <div key={i}>{filter}</div>)
          }
      </Carousel>
    </S.Filter>
  )
}

export default Filter
