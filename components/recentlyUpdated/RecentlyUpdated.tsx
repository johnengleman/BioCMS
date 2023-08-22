import Carousel from '../global/Carousel/Caorusel'
import * as S from './styles'
import Header from '../global/Header/Header'

const RecentlyUpdated = ({
  children = [],
  title = '',
  options = {},
}) => (
  <S.RecentlyUpdated>
    <div className="header-container">
      <Header>{title}</Header>
    </div>
    <Carousel options={options}>{children}</Carousel>
  </S.RecentlyUpdated>
)

export default RecentlyUpdated
