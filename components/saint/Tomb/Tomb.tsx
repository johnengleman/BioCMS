import Image from 'next/image'
import Title from '../../global/Title/Title'
import styles from './styles.module.scss'

type TombProps = {
  imageId: string
  location: string
  church: string
}

const Tomb = ({ imageId, location, church }: TombProps) => {
  if (imageId) {
    return (
      <>
        <Title>Relics</Title>
        <div className={styles.tomb}>
          <Image
            src={`${process.env.NEXT_PUBLIC_DIRECTUS_ASSETS}/assets/${imageId}?fit=cover&height=150&width=350`}
            height="150"
            width="350"
            alt=""
          />
          {church && <p className="church">{church}</p>}
          {location && (
            <p className="location">{location}</p>
          )}
        </div>
      </>
    )
  }
}

export default Tomb
