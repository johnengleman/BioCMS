import ImageGlobal from '../../global/ImageGlobal/ImageGlobal'
import useBreakpoints from '../../../hooks/useBreakPoints'
import styles from './styles.module.scss'

const ImageMain = ({ images, name, limit = 1 }) => {
  const { isTablet } = useBreakpoints()

  if (!images) {
    return null
  }

  return (
    <div className={styles.imageContainer}>
      {images.map((image, i) => {
        if (i < limit) {
          return (
            <ImageGlobal
              key={i}
              fill={false}
              width={isTablet ? 200 : 300}
              height={isTablet ? 264 : 400}
              alt={
                image?.directus_files_id?.description ||
                `Image of the orthodox and catholic saint ${name}`
              }
              src={`${process.env.NEXT_PUBLIC_DOMAIN}/assets/${image?.directus_files_id.id}?key=profile`}
            />
          )
        }
      })}
    </div>
  )
}

export default ImageMain
