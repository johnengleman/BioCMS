import ButtonCategory from '../../global/Buttons/ButtonCategory/ButtonCategory'
import * as S from './styles'

type Props = {
  data?: []
}

const Categories = ({ data }: Props) => (
  <S.Powers>
    {data?.map((category, i) => (
      <ButtonCategory
        text={category}
        bg="#E4EDFB"
        key={i}
      />
    ))}
  </S.Powers>
)

export default Categories
