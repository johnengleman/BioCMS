import Image from 'next/image'
import * as S from './styles'
import Name from '../Name/Name'

type Props = {
  name: String
  imageId: String
}

const HeaderImage = ({ imageId, name }: Props) => (
  <S.ImageContainer>
    <div className="image">
      <Image
        src={`https://4hi7oa87.directus.app/assets/${imageId}`}
        height="275"
        width="225"
        layout="fixed"
        alt=""
      />
    </div>
    <Name name={name} />
  </S.ImageContainer>
)

export default HeaderImage
