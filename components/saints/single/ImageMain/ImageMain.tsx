import Image from 'next/image'
import * as S from './styles'
// import PhotosModal from '../ImagesModal/ImagesModal'

// type Props = {
//   image: String
// }
const ImageMain = ({ images }) => {
  const [image1, image2, image3, image4, image5] = images

  return (
    <S.ImageContainer>
      <div className="image1">
        <Image
          src={`https://saints-cms.onrender.com/assets/${image1?.directus_files_id.id}`}
          fill={true}
          alt=""
        />
        {/* <PhotosModal images={images} /> */}
      </div>
      {image2 && (
        <div className="image image2">
          <Image
            src={`https://saints-cms.onrender.com/assets/${image2?.directus_files_id.id}`}
            fill={true}
            alt=""
          />
        </div>
      )}
      {image3 && (
        <div className="image image3">
          <Image
            src={`https://saints-cms.onrender.com/assets/${image3.directus_files_id.id}`}
            fill={true}
            alt=""
          />
        </div>
      )}
      {image4 && (
        <div className="image image4">
          <Image
            src={`https://saints-cms.onrender.com/assets/${image4.directus_files_id.id}`}
            fill={true}
            alt=""
          />
        </div>
      )}
      {image5 && (
        <div className="image image5">
          <Image
            src={`https://saints-cms.onrender.com/assets/${image5.directus_files_id.id}`}
            fill={true}
            alt=""
          />
        </div>
      )}
    </S.ImageContainer>
  )
}

export default ImageMain
