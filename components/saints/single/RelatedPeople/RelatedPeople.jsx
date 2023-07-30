import Image from 'next/image'
import { Title, Flex, Spoiler } from '@mantine/core'
import * as S from './styles'

const RelatedItem = ({
  name,
  photo,
  id,
  relationship_type,
}) => {
  return (
    <S.Related href={id}>
      {photo ? (
        <Image
          src={`https://saints-cms.onrender.com/assets/${photo}?fit=cover&height=100&width=75`}
          height="100"
          width="75"
          alt=""
        />
      ) : (
        <div className="placeholder"></div>
      )}
      <div className="person-info">
        <div className="relationship">
          {relationship_type}
        </div>
        <div className="name">{name}</div>
      </div>
    </S.Related>
  )
}

const RelatedPeople = ({ data }) => {
  if (data?.length) {
    return (
      <Flex
        gap="sm"
        direction="column"
        mb="40px"
      >
        <Title order={3}>Related</Title>

        <Spoiler
          maxHeight={220}
          showLabel="Show All Related"
          hideLabel="Hide"
          transitionDuration={150}
        >
          <Flex
            gap="md"
            wrap="wrap"
          >
            {data?.map((relatedPerson, i) => (
              <RelatedItem
                key={i}
                {...relatedPerson}
              />
            ))}
          </Flex>
        </Spoiler>
      </Flex>
    )
  }

  return null
}

export default RelatedPeople
