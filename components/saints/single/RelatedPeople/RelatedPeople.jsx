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
  categories,
  summary,
}) => {
  return (
    <S.RelatedPerson>
      <Link href={slug}>
        <ImageGlobal
          src={`${process.env.NEXT_PUBLIC_DOMAIN}/assets/${images[0].directus_files_id.id}?fit=cover&height=175&width=125`}
          height="175"
          width="125"
          fill={false}
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
          <div className="summary">{summary}</div>
        </div>
      </Link>
    </S.RelatedPerson>
  )
}

const RelatedPeople = ({ data }) => {
  if (data?.length) {
    return (
      <S.RelatedPeople>
        <h3>Similar Saints</h3>
        <div className="similar-saints-container">
          {data?.map((relatedPerson, i) => (
            <RelatedItem
              key={i}
              {...relatedPerson}
            />
          ))}
        </div>
      </S.RelatedPeople>
    )
  }

  return null
}

export default RelatedPeople
