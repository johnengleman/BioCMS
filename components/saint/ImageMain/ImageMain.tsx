import * as S from './styles'
import ImageGlobal from '../../global/ImageGlobal/ImageGlobal'

const ImageMain = ({ images, name, limit = 1 }) => {
  if (!images) {
    return null
  }

  return (
    <S.ImageContainer>
      {images.map((image, i) => {
        if (i < limit) {
          return (
            <ImageGlobal
              key={i}
              fill={false}
              width={300}
              height={400}
              alt={
                image?.directus_files_id?.description ||
                `Image of ${name}, the eastern orthodox saint`
              }
              src={`${process.env.NEXT_PUBLIC_DOMAIN}/assets/${image?.directus_files_id.id}?key=profile`}
            />
          )
        }
      })}
    </S.ImageContainer>
  )
}

export default ImageMain
