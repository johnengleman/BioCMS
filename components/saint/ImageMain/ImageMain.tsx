import Image from 'next/image'
import styles from './styles.module.scss'

interface ImageMainProps {
  image1: {
    id: string
    description?: string
  }
  image2?: {
    directus_files_id?: {
      id: string
      description?: string
    }
  }
  image3?: {
    directus_files_id?: {
      id: string
      description?: string
    }
  }
  name: string
  leftRail?: boolean
}

const ImageMain: React.FC<ImageMainProps> = ({
  image1,
  image2,
  image3,
  name,
  leftRail,
}) => {
  const id_2 = image2?.directus_files_id?.id || null
  const description_2 =
    image2?.directus_files_id?.description || null
  const id_3 = image3?.directus_files_id?.id || null
  const description_3 =
    image3?.directus_files_id?.description || null

  return (
    <div
      className={`${styles.imageContainer} ${
        leftRail ? styles.leftRail : ''
      }`}
    >
      <div className={styles.image1}>
        <Image
          width={400}
          height={500}
          alt={
            image1?.description ||
            `Image of the roman catholic saint ${name}`
          }
          src={`${process.env.NEXT_PUBLIC_DIRECTUS_ASSETS}/assets/${image1?.id}?key=profile-image1`}
        />
      </div>
      {id_2 && (
        <div className={styles.image2}>
          <Image
            width={200}
            height={250}
            alt={
              description_2 ||
              `Image of the roman catholic saint ${name}`
            }
            src={`${process.env.NEXT_PUBLIC_DIRECTUS_ASSETS}/assets/${id_2}?key=other-images1`}
          />
        </div>
      )}
      {id_3 && (
        <div className={styles.image3}>
          <Image
            width={200}
            height={250}
            alt={
              description_3 ||
              `Image of the roman catholic saint ${name}`
            }
            src={`${process.env.NEXT_PUBLIC_DIRECTUS_ASSETS}/assets/${id_3}?key=other-images1`}
          />
        </div>
      )}
    </div>
  )
}

export default ImageMain
