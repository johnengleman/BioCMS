import * as S from './styles'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCross } from '@fortawesome/free-solid-svg-icons'
import ImageGlobal from '../../global/ImageGlobal/ImageGlobal'
import {
  faBook,
  faQuoteLeft,
} from '@fortawesome/free-solid-svg-icons'

import { Saint } from './interfaces'

export default function SaintSummary(props) {
  const {
    name,
    birth_year,
    death_year,
    photos,
    categories,
    summary,
    quotes,
    books,
    slug,
    priority,
    transitionName,
  } = props

  const getYear = (date: string): number => {
    const newDate = new Date(date)
    return newDate.getFullYear()
  }

  return (
    <S.SaintSummary
      style={{ viewTransitionName: transitionName }}
    >
      <Link
        className="saint-summary"
        href={`/saints/${slug}`}
      >
        <div className="death">
          {death_year}
          <FontAwesomeIcon
            icon={faCross}
            fontSize="10px"
            style={{ color: '#fff' }}
          />
        </div>
        <div className="image">
          <ImageGlobal
            alt={
              photos[0]?.directus_files_id?.description ||
              `Image of ${name}, the eastern orthodox saint`
            }
            src={`https://saints-cms.onrender.com/assets/${photos[0]?.directus_files_id?.id}?key=summary`}
            fill={true}
            priority={priority}
          />
        </div>
        <div className="name">{name}</div>

        <div className="bioContainer">
          <div className="summary">{summary}</div>
        </div>
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
        <div className="footer">
          <div className="footer-button">
            <FontAwesomeIcon icon={faBook} />
            <S.Count>{books?.length}</S.Count>
          </div>
          <div className="footer-button"></div>
          <div className="footer-button">
            <FontAwesomeIcon icon={faQuoteLeft} />
            <S.Count>{quotes?.length}</S.Count>
          </div>
        </div>
      </Link>
    </S.SaintSummary>
  )
}
