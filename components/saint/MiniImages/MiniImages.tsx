import ImageGlobal from '../../global/ImageGlobal/ImageGlobal'
import styles from './styles.module.scss'

const MiniImages = ({ images, name }) => {
  if (!images[1]) {
    return null
  }

  return (
    <div className={styles.MiniImages}>
      {images.map((image, i) => {
        if (0 < i) {
          return (
            <div
              className={styles.image}
              key={i}
            >
              <ImageGlobal
                fill={false}
                width={145}
                height={200}
                whiteBorder={false}
                alt={
                  image?.directus_files_id?.description ||
                  `Image of the orthodox and catholic saint ${name}`
                }
                src={`${process.env.NEXT_PUBLIC_DOMAIN}/assets/${image?.directus_files_id.id}?key=profile`}
              />
            </div>
          )
        }
      })}
    </div>
  )
}

export default MiniImages
