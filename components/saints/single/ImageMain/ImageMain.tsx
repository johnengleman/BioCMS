import * as S from './styles'
import ImageGlobal from '../../../global/ImageGlobal/ImageGlobal'

const ImageMain = ({ images, name }) => {
  if (!images) {
    return null
  }

  https: return (
    <S.ImageContainer>
      {images.map((image, i) => (
        <ImageGlobal
          key={i}
          fill={false}
          width={150}
          height={200}
          alt={
            image?.directus_files_id?.description ||
            `Image of ${name}, the eastern orthodox saint`
          }
          src={`${process.env.NEXT_PUBLIC_DOMAIN}/assets/${image?.directus_files_id.id}?key=profile`}
        />
      ))}
    </S.ImageContainer>
  )
}

export default ImageMain
