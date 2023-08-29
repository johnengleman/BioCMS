import Image from 'next/image'
import Link from 'next/link'
import Title from '../../../global/Title/Title'
import ImageGlobal from '../../../global/ImageGlobal/ImageGlobal'
import * as S from './styles'

const RelatedItem = ({
  name,
  birth_year,
  death_year,
  images,
  slug,
  tags,
}) => {
  return (
    <S.RelatedPerson>
      <Link href={slug}>
        <ImageGlobal
          src={`${process.env.NEXT_PUBLIC_DOMAIN}/assets/${images[0].directus_files_id.id}?fit=cover&height=150&width=100`}
          height="150"
          width="100"
          fill={false}
          alt=""
        />
        <div className="person-info">
          <div className="name">{name}</div>
          <div className="dates">
            {birth_year || '?'}-{death_year || '?'}
          </div>
          <div className="tags">
            {tags.map((category, i) => (
              <div
                className="tag"
                key={i}
              >
                {category.replace(/-/g, ' ')}
              </div>
            ))}
          </div>
        </div>
      </Link>
    </S.RelatedPerson>
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
