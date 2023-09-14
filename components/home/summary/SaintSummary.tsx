import * as S from './styles'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCross } from '@fortawesome/pro-duotone-svg-icons'
import {
  faBooks,
  faCommentQuote,
  faStarChristmas,
  faPersonPraying,
} from '@fortawesome/sharp-solid-svg-icons'
import ImageGlobal from '../../global/ImageGlobal/ImageGlobal'

import { Saint } from './interfaces'

export default function SaintSummary(props) {
  const {
    name,
    birth_year,
    death_year,
    images,
    categories,
    summary,
    sayings,
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
          <FontAwesomeIcon icon={faCross} />
          {death_year}
        </div>
        <div className="image">
          <ImageGlobal
            alt={
              images[0]?.directus_files_id?.description ||
              `Image of ${name}, the eastern orthodox saint`
            }
            src={`${process.env.NEXT_PUBLIC_DOMAIN}/assets/${images[0]?.directus_files_id.id}?key=summary`}
            fill={true}
            priority={priority}
          />
          <div className="name">{name}</div>
        </div>
        <div className="bioContainer">
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
          <div className="summary">{summary}</div>
        </div>
        <div className="footer">
          <div className="count">
            <FontAwesomeIcon
              icon={faBooks}
              style={{ color: '#555555' }}
            />
            <span className="number">{books?.length}</span>
          </div>
          <div className="count">
            <FontAwesomeIcon
              icon={faStarChristmas}
              style={{ color: '#555555' }}
            />
            <span className="number">{books?.length}</span>
          </div>
          <div className="count">
            <FontAwesomeIcon
              icon={faCommentQuote}
              style={{ color: '#555555' }}
            />
            <span className="number">
              {sayings?.length}
            </span>
          </div>
        </div>
      </Link>
    </S.SaintSummary>
  )
}
