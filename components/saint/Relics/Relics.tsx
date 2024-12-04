import Image from 'next/image'
import styles from './styles.module.scss'

const Relics = ({ image, description, location }) => {
  return (
    <div className={styles.relics}>
      <div className={styles.description}>
        {description}
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
