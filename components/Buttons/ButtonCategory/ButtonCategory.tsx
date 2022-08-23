import * as S from './styles'

type Props = {
  text: String
  bg: String
}

const ButtonCategory = ({ text, bg }: Props) => {
  return <S.Button bg={bg}>{text}</S.Button>
}

export default ButtonCategory
