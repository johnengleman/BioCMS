import Link from 'next/link'
import Image from 'next/image'
import styles from './styles.module.scss'

export default function ChurchSummary(props) {
  const { name, image, website, city, country } = props

  return (
    <Link href={website}>
      <div>
        <div className="image">
          <Image
            alt="profile"
            src={`${process.env.NEXT_PUBLIC_DOMAIN}/assets/${image?.id}`}
            fill={true}
          />
        </div>
        <p className="name">{name}</p>
        <p className="location">
          {city}, {country}
        </p>
      </div>
    </Link>
  )
}
