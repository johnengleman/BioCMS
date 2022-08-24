import ShowMore from '../ShowMore/ShowMore'
import * as S from './styles'

type Props = {
  text: string
}

const Bio = ({ text }: Props) => (
  <S.Bio>
    <div
      className="text"
      dangerouslySetInnerHTML={{ __html: text }}
    />
    <ShowMore />
  </S.Bio>
)

export default Bio
