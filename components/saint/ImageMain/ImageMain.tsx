import ImageGlobal from '../../global/ImageGlobal/ImageGlobal'
import useBreakpoints from '../../../hooks/useBreakPoints'
import styles from './styles.module.scss'

const ImageMain = ({ image, name }) => {
  const { isTablet } = useBreakpoints()

  if (!image) {
    return null
  }

  return (
    <div className={styles.imageContainer}>
      <ImageGlobal
        fill={false}
        width={isTablet ? 200 : 300}
        height={isTablet ? 264 : 400}
        whiteBorder={true}
        alt={
          image?.description ||
          `Image of the roman catholic saint ${name}`
        }
        src={`${process.env.NEXT_PUBLIC_DIRECTUS_ASSETS}/assets/${image?.id}?key=profile`}
      />
    </div>
  )
}

export default ImageMain
