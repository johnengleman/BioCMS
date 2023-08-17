import * as S from './styles'
import ImageGlobal from '../../../global/ImageGlobal/ImageGlobal'
// import PhotosModal from '../ImagesModal/ImagesModal'

// type Props = {
//   image: String
// }
const ImageMain = ({ images, name }) => {
  if (!images) {
    return null
  }

  const [image1, image2, image3, image4, image5] = images

  https: return (
    <S.ImageContainer>
      <div className="image1">
        <ImageGlobal
          fill={true}
          alt={
            image1?.directus_files_id?.description ||
            `Image of ${name}, the eastern orthodox saint`
          }
          src={`https://saints-cms.onrender.com/assets/${image1?.directus_files_id.id}?key=profile`}
        />
        {/* <PhotosModal images={images} /> */}
      </div>
      {image2 && (
        <div className="image image2">
          <ImageGlobal
            fill={true}
            alt={
              image2?.directus_files_id?.description ||
              `Image of ${name}, the eastern orthodox saint`
            }
            src={`https://saints-cms.onrender.com/assets/${image2?.directus_files_id.id}?key=profile`}
          />
        </div>
      )}
      {image3 && (
        <div className="image image3">
          <ImageGlobal
            fill={true}
            alt={
              image3?.directus_files_id?.description ||
              `Image of ${name}, the eastern orthodox saint`
            }
            src={`https://saints-cms.onrender.com/assets/${image3.directus_files_id.id}?key=profile`}
          />
        </div>
      )}
      {image4 && (
        <div className="image image4">
          <ImageGlobal
            fill={true}
            alt={
              image4?.directus_files_id?.description ||
              `Image of ${name}, the eastern orthodox saint`
            }
            src={`https://saints-cms.onrender.com/assets/${image4.directus_files_id.id}?key=profile`}
          />
        </div>
      )}
      {image5 && (
        <div className="image image5">
          <ImageGlobal
            fill={true}
            alt={
              image5?.directus_files_id?.description ||
              `Image of ${name}, the eastern orthodox saint`
            }
            src={`https://saints-cms.onrender.com/assets/${image5.directus_files_id.id}?key=profile`}
          />
        </div>
      )}
    </S.ImageContainer>
  )
}

export default ImageMain
