import Link from 'next/link'
import * as S from './styles'
import Summary from '../../global/Summary/Summary'

export default function ChurchSummary(props) {
  const { name, image, website, city, country } = props

  return (
    <Link href={website}>
      <S.ChurchSummary>
        <Summary
          name={name}
          photo={image.id}
        >
          <p>
            {city}, {country}
          </p>
        </Summary>
      </S.ChurchSummary>
    </Link>
  )
}
