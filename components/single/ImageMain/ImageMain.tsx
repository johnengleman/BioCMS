import Image from 'next/image'
import * as S from './styles'
import Name from '../../global/Name/Name'

type Props = {
  name: String
  imageId: String
}

const ImageMain = ({ imageId, name }: Props) => (
  <S.ImageContainer>
    <div className="image">
      <Image
        src={`https://4hi7oa87.directus.app/assets/${imageId}`}
        height="450"
        width="350"
        alt=""
      />
    </div>
    <Name name={name} />
  </S.ImageContainer>
)

export default ImageMain
