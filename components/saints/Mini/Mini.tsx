import Link from 'next/link'
import ImageGlobal from '../../global/ImageGlobal/ImageGlobal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCross } from '@fortawesome/pro-duotone-svg-icons'
import * as S from './styles'

const Mini = ({
  slug,
  death_year,
  images,
  name,
  summary,
  categories,
}) => (
  <S.Mini>
    <Link
      className="saint-mini"
      href={`/saints/${slug}`}
    >
      <div className="image">
        <ImageGlobal
          alt={
            images[0]?.directus_files_id?.description ||
            `Image of ${name}, the eastern orthodox saint`
          }
          src={`${process.env.NEXT_PUBLIC_DOMAIN}/assets/${images[0]?.directus_files_id.id}?key=summary`}
          fill={true}
        />
      </div>
      <div className="bio">
        <h2 className="name">{name}</h2>
        <div className="header">
          <div className="location"></div>
          <div className="death">
            {death_year}
            <FontAwesomeIcon icon={faCross} />
          </div>
        </div>
        <p>{summary}</p>
        <div className="tags">
          {categories?.map((category, index) => (
            <div
              key={index}
              className="tag"
            >
              {category}
            </div>
          ))}
        </div>
      </div>
    </Link>
  </S.Mini>
)

export default Mini
