import Image from 'next/image'
import { Title, Flex } from '@mantine/core'
import * as S from './styles'

type ChurchProps = {
  name: string
  website: string
  image: {
    id: string
  }
  city?: string
  country: string
}

const Church = ({
  name,
  image,
  website,
  city,
  country,
}: ChurchProps) => {
  return (
    <S.Church href={website}>
      {image?.id ? (
        <Image
          src={`https://saints-cms.onrender.com/assets/${image?.id}?fit=contain&height=175&width=300`}
          height="175"
          width="300"
          alt=""
        />
      ) : (
        <div className="image-placeholder"></div>
      )}
      <div className="name">{name}</div>
      <div className="location">
        {city}, {country}
      </div>
    </S.Church>
  )
}

type ChurchesProps = {
  churches: ChurchProps[]
}

const Churches = ({ churches }: ChurchesProps) => {
  if (churches.length) {
    return (
      <>
        <Title
          order={3}
          mb={10}
        >
          Churches
        </Title>

        <Flex
          gap="md"
          wrap="wrap"
          justify="space-between"
          mb="50px"
        >
          {churches?.map((church, i) => (
            <Church
              key={i}
              {...church}
            />
          ))}
        </Flex>
      </>
    )
  }

  return null
}

export default Churches
