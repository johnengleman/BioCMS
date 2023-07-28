import Image from 'next/image'
import * as S from './styles'
import ButtonAction from '../../../global/Buttons/ButtonAction/ButtonAction'

type Props = {
  imageIds?: {
    directus_files_id: {
      id: string
    }
  }[]
}

const ImagesMini = ({ imageIds }: Props) => (
  <S.PicturesContainer>
    <ButtonAction text="Show All Photos" />
    <S.Pictures>
      {imageIds?.map((image, i) => (
        <Image
          key={i}
          src={`https://saints-cms.onrender.com/assets/${image.directus_files_id.id}?fit=contain&height=150&width=125`}
          width={125}
          height={150}
          alt=""
        />
      ))}
    </S.Pictures>
  </S.PicturesContainer>
)

export default ImagesMini
