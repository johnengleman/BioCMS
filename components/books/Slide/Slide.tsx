import Link from 'next/link'
import * as S from './styles'

const Mini = ({
  store_link,
  title,
  author,
  amazon_book_cover,
  description_part_1,
}) => {
  return (
    <S.Slide>
      <div className="content">
        <div
          className="image"
          dangerouslySetInnerHTML={{
            __html: amazon_book_cover,
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
          <Link href={store_link || ''}>
            <button className="book-link">
              Check Current Price
            </button>
          </Link>
        </div>
      </div>
    </S.Slide>
  )
}

export default Mini
