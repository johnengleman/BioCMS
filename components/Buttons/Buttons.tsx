import * as S from './styles'

type Props = {
  text: String
  bg: String
}

const Button = ({ text, bg }: Props) => {
  return <S.Button bg={bg}>{text}</S.Button>
}

export default Button
