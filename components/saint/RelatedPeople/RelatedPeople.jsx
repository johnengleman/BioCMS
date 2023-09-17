import Link from 'next/link'
import ImageGlobal from '../../global/ImageGlobal/ImageGlobal'
import SectionTitle from '../SectionTitle/SectionTitle'
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
          src={`${process.env.NEXT_PUBLIC_DOMAIN}/assets/${images[0].directus_files_id.id}?fit=cover&height=225&width=150`}
          height="225"
          width="150"
          fill={false}
          alt={
            images[0]?.directus_files_id?.description ||
            `Image of the orthodox and catholic saint ${name}`
          }
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
          <div
            className="summary"
            dangerouslySetInnerHTML={{
              __html: summary,
            }}
          ></div>
        </div>
      </Link>
    </S.RelatedPerson>
  )
}

const RelatedPeople = ({ data }) => {
  if (data?.length) {
    return (
      <S.RelatedPeople>
        <SectionTitle
          id="section-similar-saints"
          dataSection="similarSaints"
        >
          Similar Saints
        </SectionTitle>
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
