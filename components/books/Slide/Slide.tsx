import Link from 'next/link'
import * as S from './styles'

const Mini = ({
  link,
  title,
  author,
  book_image,
  description_part_1,
}) => {
  return (
    <S.Slide>
      <div className="content">
        <div
          className="image"
          dangerouslySetInnerHTML={{
            __html: book_image,
          }}
        />
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
          <Link href={link || ''}>
            <button className="book-link">
              See The Book
            </button>
          </Link>
        </div>
      </div>
    </S.Slide>
  )
}

export default Mini
