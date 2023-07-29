import Image from 'next/image'
import { Title, Flex } from '@mantine/core'
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
          src={`https://saints-cms.onrender.com/assets/${photo}?fit=contain&height=100&width=75`}
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

// type BooksProps = {
//   books: BookProps[]
// }

const RelatedPeople = ({ data }) => {
  if (data?.length) {
    return (
      <>
        <Title
          order={3}
          mb={10}
        >
          Related
        </Title>

        <Flex
          gap="md"
          wrap="wrap"
          mb="50px"
        >
          {data?.map((relatedPerson, i) => (
            <RelatedItem
              key={i}
              {...relatedPerson}
            />
          ))}
        </Flex>
      </>
    )
  }

  return null
}

export default RelatedPeople
