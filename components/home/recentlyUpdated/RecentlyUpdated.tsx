import Carousel from '../../global/Carousel/Caorusel'
import * as S from './styles'

const RecentlyUpdated = ({
  children = [],
  title = '',
  options = {},
}) => (
  <S.RecentlyUpdated>
    <div className="header-container"></div>
    <Carousel options={options}>{children}</Carousel>
  </S.RecentlyUpdated>
)

export default RecentlyUpdated
