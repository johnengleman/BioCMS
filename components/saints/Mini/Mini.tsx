import Link from 'next/link'
import ImageGlobal from '../../global/ImageGlobal/ImageGlobal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCross } from '@fortawesome/pro-duotone-svg-icons'
import * as S from './styles'

const Mini = ({ slug, death_year, photos, name }) => (
  <S.Mini>
    <Link
      className="saint-mini"
      href={`/saints/${slug}`}
    >
      <div className="death">
        {death_year}
        <FontAwesomeIcon icon={faCross} />
      </div>
      <div className="image">
        <ImageGlobal
          alt={
            photos[0]?.directus_files_id?.description ||
            `Image of ${name}, the eastern orthodox saint`
          }
          src={`https://saints-cms.onrender.com/assets/${photos[0]?.directus_files_id?.id}?key=summary`}
          fill={true}
        />
      </div>
      <div className="name">{name}</div>
    </Link>
  </S.Mini>
)

export default Mini
