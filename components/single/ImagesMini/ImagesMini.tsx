import Image from 'next/image'
import * as S from './styles'
import ButtonAction from '../../global/Buttons/ButtonAction/ButtonAction'

type Props = {
  imageIds: {
    directus_files_id: {
      id: string
      width: number
      height: number
    }
  }[]
}

const ImagesMini = ({ imageIds }: Props) => (
  <S.PicturesContainer>
    <ButtonAction text="Show All Photos" />
    <S.Pictures>
      {imageIds.map((image, i) => (
        <div
          key={i}
          className="image-container"
          style={{
            position: 'relative',
            height: '140px',
            aspectRatio: `${
              image.directus_files_id.width /
              image.directus_files_id.height
            }`,
          }}
        >
          <Image
            src={`https://saints-cms.onrender.com/assets/${image.directus_files_id.id}`}
            fill={true}
            alt=""
            unoptimized={true}
          />
        </div>
      ))}
    </S.Pictures>
  </S.PicturesContainer>
)

export default ImagesMini
