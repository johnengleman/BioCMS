import Image from 'next/image'
import { Title, Flex } from '@mantine/core'
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
        <Title
          order={3}
          mb={10}
        >
          Tomb
        </Title>
        <S.Tomb>
          <Image
            src={`https://saints-cms.onrender.com/assets/${imageId}?fit=cover&height=125&width=300`}
            height="125"
            width="300"
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
