import * as S from './styles'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBookOpenCover,
  faCommentQuote,
  faCross,
} from '@fortawesome/pro-duotone-svg-icons'
import ImageGlobal from '../../global/ImageGlobal/ImageGlobal'

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
            <FontAwesomeIcon
              icon={faBookOpenCover}
              style={
                {
                  '--fa-primary-color': '#241e4e',
                  '--fa-secondary-color': '#241e4e',
                } as any
              }
            />
            <S.Count>{books?.length}</S.Count>
          </div>
          <div className="footer-button">
            <FontAwesomeIcon
              icon={faCommentQuote}
              flip="horizontal"
              style={
                {
                  '--fa-primary-color': '#241e4e',
                  '--fa-secondary-color': '#241e4e',
                } as any
              }
            />
            <S.Count>{quotes?.length}</S.Count>
          </div>
        </div>
      </Link>
    </S.SaintSummary>
  )
}
