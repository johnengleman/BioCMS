import * as S from './styles'
import Carousel from '../Carousel/Caorusel'

const Filter = ({ setFilter, selectedFilter }) => {
  const filters = [
    'All',
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
      <Carousel
        options={{ slidesToScroll: 3, align: 'center' }}
      >
        {filters.map((filter, i) => (
          <div
            key={i}
            className={`embla__slide ${
              filter === selectedFilter ? 'selected' : ''
            }`}
            onClick={() => setFilter(filter)}
          >
            {filter.replace(/-/g, ' ')}
          </div>
        ))}
      </Carousel>
    </S.Filter>
  )
}

export default Filter
