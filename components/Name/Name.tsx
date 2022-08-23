import * as S from './styles'

type Props = {
  name: String
}

const Name = ({ name }: Props) => (
  <S.Gradient>
    <S.Name>{name}</S.Name>
  </S.Gradient>
)

export default Name
