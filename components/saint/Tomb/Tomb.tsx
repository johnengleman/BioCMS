import Image from 'next/image'
import Title from '../../global/Title/Title'
import * as S from './styles'

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
        <S.Tomb>
          <Image
            src={`${process.env.NEXT_PUBLIC_DOMAIN}/assets/${imageId}?fit=cover&height=150&width=350`}
            height="150"
            width="350"
            alt=""
          />
          {church && <p className="church">{church}</p>}
          {location && (
            <p className="location">{location}</p>
          )}
        </S.Tomb>
      </>
    )
  }
}

export default Tomb
