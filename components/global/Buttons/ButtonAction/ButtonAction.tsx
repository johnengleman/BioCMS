import * as S from './styles'

type Props = {
  text: String
}

const ButtonAction = ({ text }: Props) => (
  <S.Button>
    <S.Hamburger>
      <div />
      <div />
      <div />
    </S.Hamburger>
    {text}
  </S.Button>
)

export default ButtonAction
