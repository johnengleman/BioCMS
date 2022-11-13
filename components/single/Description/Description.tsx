import ShowMore from '../../global/ShowMore/ShowMore'
import * as S from './styles'

type Props = {
  text: string
}

const Description = ({ text }: Props) => (
  <S.Bio>
    <div
      className="text"
      dangerouslySetInnerHTML={{ __html: text }}
    />
    <ShowMore />
  </S.Bio>
)

export default Description;
