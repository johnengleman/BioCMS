import * as S from './styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBook,
  faChurch,
  faQuoteRight,
} from '@fortawesome/free-solid-svg-icons'
import Summary from '../../global/Summary/Summary'

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
  } = props

  const getYear = (date: string): number => {
    const newDate = new Date(date)
    return newDate.getFullYear()
  }

  const age = getYear(death_date) - getYear(birth_date)

  return (
    <S.SaintSummary>
      <Summary
        name={name}
        photo={photos[0]?.directus_files_id?.id}
        summary={summary}
      >
        <S.Tags>
          {categories?.map((category, index) => (
            <div
              key={index}
              className="tag"
            >
              {category}
            </div>
          ))}
        </S.Tags>
        {/* <div className="dates">
          {getYear(birth_date)}-{getYear(death_date)} AD,{' '}
          {age} years
        </div> */}

        <S.Footer>
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
        </S.Footer>
      </Summary>
    </S.SaintSummary>
  )
}
