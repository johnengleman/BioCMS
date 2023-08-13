import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import Image from 'next/image'
import Link from 'next/link'
import * as S from './styles'

export default function BookSummary(props) {
  const {
    link,
    title,
    book_cover,
    pages,
    category,
    author,
  } = props

  return (
    <S.BookSummary>
      <Link href={link || ''}>
        <div className="image">
          <Image
            alt="profile"
            src={`https://saints-cms.onrender.com/assets/${book_cover?.id}?key=book`}
            fill={true}
          />
        </div>
        <div className="info">
          <p className="title">{title}</p>
          <p className="author">{author}</p>
        </div>

        <div className="amazon">
          <FontAwesomeIcon
            icon={faCartShopping}
            fontSize="12px"
            style={{ color: '#fff' }}
          />
          <p>Buy on Amazon</p>
        </div>
      </Link>
    </S.BookSummary>
  )
}
