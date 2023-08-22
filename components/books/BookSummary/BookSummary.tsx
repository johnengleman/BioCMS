import Link from 'next/link'
import * as S from './styles'
import useBreakpoints from '../../hooks/useBreakPoints'

export default function BookSummary(props) {
  const {
    id,
    link,
    title,
    pages,
    author,
    date_created,
    description_part_1,
    description_part_2,
    book_image,
    genre,
    topics,
  } = props

  const { isTablet } = useBreakpoints()

  return (
    <S.BookSummary>
      <div className="content">
        <div className="dots">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
        <div className="col col-1">
          <div
            className="image"
            dangerouslySetInnerHTML={{
              __html: book_image,
            }}
          ></div>
          <Link href={link || ''}>
            <button className="book-link">
              See the Book
            </button>
          </Link>
        </div>

        <div className="info">
          <h2 className="title">{title}</h2>
          <h3 className="author">by {author}</h3>
          {/* <StarRating rating={rating} /> */}
          <div
            className="description"
            dangerouslySetInnerHTML={{
              __html: description_part_1,
            }}
          />
          {!isTablet && (
            <div
              className="description"
              dangerouslySetInnerHTML={{
                __html: description_part_2,
              }}
            />
          )}
        </div>
      </div>
    </S.BookSummary>
  )
}
