import Image from 'next/image'
import styles from './styles.module.scss'

const Relics = ({ image, description, location }) => {
  return (
    <div className={styles.relics}>
      <div className={styles.content}>
        <h4 className={styles.title}>
          History of the Relics
        </h4>
        <div className={styles.description}>
          {description}
        </div>
      </div>
      <div className={styles.image}>
        <Image
          src={`${process.env.NEXT_PUBLIC_DIRECTUS_ASSETS}/assets/${image.id}?fit=cover&height=300&width=500`}
          height="300"
          width="500"
          alt=""
        />
        <div className={styles.location}>{location}</div>
      </div>
    </div>
  )
}

export default Relics
