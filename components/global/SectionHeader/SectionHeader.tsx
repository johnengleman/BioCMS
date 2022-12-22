import * as S from './styles'

type Props = {
  name: string
}

const SectionHeader = ({ name }: Props) => {
  if (name) {
    return <S.SectionHeader>{name}</S.SectionHeader>
  }
  return null
}

export default SectionHeader
