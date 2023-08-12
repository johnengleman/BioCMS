import Image from 'next/image'
import Link from 'next/link'
import Title from '../../../global/Title/Title'
import * as S from './styles'

const RelatedItem = ({
  name,
  birth_year,
  death_year,
  photos,
  id,
  categories,
}) => {
  return (
    <Link href={id}>
      <S.RelatedPerson>
        <Image
          src={`https://saints-cms.onrender.com/assets/${photos[0].directus_files_id.id}?fit=cover&height=150&width=100`}
          height="150"
          width="100"
          alt=""
        />
        <div className="person-info">
          <div className="name">{name}</div>
          <div className="dates">
            {birth_year || '?'}-{death_year || '?'}
          </div>
          <div className="tags">
            {categories.map((category, i) => (
              <div
                className="tag"
                key={i}
              >
                {category.replace(/-/g, ' ')}
              </div>
            ))}
          </div>
        </div>
      </S.RelatedPerson>
    </Link>
  )
}

const RelatedPeople = ({ data }) => {
  if (data?.length) {
    return (
      <S.RelatedPeople>
        <Title>Related Saints</Title>
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
