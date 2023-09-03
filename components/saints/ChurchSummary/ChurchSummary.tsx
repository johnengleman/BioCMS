import Link from 'next/link'
import Image from 'next/image'
import * as S from './styles'

export default function ChurchSummary(props) {
  const { name, image, website, city, country } = props

  return (
    <Link href={website}>
      <S.ChurchSummary>
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
      </S.ChurchSummary>
    </Link>
  )
}
