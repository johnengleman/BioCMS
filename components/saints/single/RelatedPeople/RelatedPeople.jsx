import Image from 'next/image'
import Title from '../../../global/Title/Title'
import * as S from './styles'

const RelatedItem = ({
  name,
  photo,
  id,
  relationship_type,
}) => {
  return (
    <S.RelatedPerson href={id}>
      {photo ? (
        <Image
          src={`https://saints-cms.onrender.com/assets/${photo}?fit=cover&height=150&width=100`}
          height="150"
          width="100"
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
    </S.RelatedPerson>
  )
}

const RelatedPeople = ({ data }) => {
  if (data?.length) {
    return (
      <S.RelatedPeople>
        <Title>Related</Title>
        {data?.map((relatedPerson, i) => (
          <RelatedItem
            key={i}
            {...relatedPerson}
          />
        ))}
      </S.RelatedPeople>
    )
  }

  return null
}

export default RelatedPeople
