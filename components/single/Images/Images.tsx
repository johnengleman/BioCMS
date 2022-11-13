import Image from 'next/image'
import * as S from './styles'
import ButtonAction from '../../global/Buttons/ButtonAction/ButtonAction'

type Props = {
  imageIds: string[]
}

const Images = ({ imageIds }: Props) => (
  <S.Pictures>
    {imageIds.map((id, i) => (
      <Image
        key={i}
        src={`https://4hi7oa87.directus.app/assets/${id}`}
        height="140"
        width="125"
        layout="fixed"
        alt=""
      />
    ))}
    <ButtonAction text="Show All Photos" />
  </S.Pictures>
)

export default Images
