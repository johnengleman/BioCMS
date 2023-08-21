import * as S from './styles'

const ReadMore = ({ onClick, readMore }) => (
  <S.ReadMore onClick={onClick}>
    {!readMore ? 'Read More' : 'Collapse'}
  </S.ReadMore>
)

export default ReadMore
