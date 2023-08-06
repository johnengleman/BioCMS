import * as S from './styles'
import Link from 'next/link'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBook,
  faChurch,
  faQuoteRight,
} from '@fortawesome/free-solid-svg-icons'

import { Saint } from './interfaces'

export default function SaintSummary(props: Saint) {
  const {
    name,
    birth_date,
    death_date,
    photos,
    categories,
    summary,
    quotes,
    books,
    churches,
    id,
  } = props

  const getYear = (date: string): number => {
    const newDate = new Date(date)
    return newDate.getFullYear()
  }

  const age = getYear(death_date) - getYear(birth_date)

  return (
    <S.SaintSummary>
      <Link
        className="saint-summary"
        href={`/saints/${id}`}
      >
        <div className="image">
          <Image
            alt="profile"
            src={`https://saints-cms.onrender.com/assets/${photos[0]?.directus_files_id?.id}`}
            fill={true}
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
        {/* <div className="dates">
          {getYear(birth_date)}-{getYear(death_date)} AD,{' '}
          {age} years
        </div> */}

        <div className="footer">
          <div className="footer-button">
            <FontAwesomeIcon
              icon={faBook}
              fontSize="10px"
              style={{ color: '#676666c2' }}
            />
            <S.Count>{books?.length}</S.Count>
          </div>
          <div className="footer-button">
            <FontAwesomeIcon
              icon={faChurch}
              fontSize="10px"
              style={{ color: '#676666c2' }}
            />
            <S.Count>{churches?.length}</S.Count>
          </div>
          <div className="footer-button">
            <FontAwesomeIcon
              icon={faQuoteRight}
              fontSize="10px"
              style={{ color: '#676666c2' }}
            />
            <S.Count>{quotes?.length}</S.Count>
          </div>
        </div>
      </Link>
    </S.SaintSummary>
  )
}
