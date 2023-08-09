import Image from 'next/image'
import Title from '../../../global/Title/Title'
import * as S from './styles'

type BookProps = {
  title: string
  author: string
  link: string
  pages?: number
  description: string
  book_cover: {
    id: string
  }
}

const Book = ({
  title,
  author,
  link,
  pages,
  book_cover,
  description,
}: BookProps) => {
  return (
    <S.Book href={link}>
      {book_cover?.id ? (
        <Image
          src={`https://saints-cms.onrender.com/assets/${book_cover?.id}?fit=contain&height=200&width=150`}
          height="200"
          width="150"
          alt=""
        />
      ) : (
        <div
          className="placeholder"
          style={{
            height: '170px',
            width: '140px',
            minWidth: '140px',
            borderRadius: '5px',
            background: 'lightgray',
          }}
        ></div>
      )}
      <div className="book-info">
        <div className="book-name">{title}</div>
        <div className="book-author">{author}</div>
        <div className="book-description">
          {description}
        </div>
        <div className="book-link">Buy On Amazon</div>
      </div>
    </S.Book>
  )
}

type BooksProps = {
  books: BookProps[]
}

const Books = ({ books }: BooksProps) => {
  if (books.length) {
    return (
      <>
        <Title>Books</Title>
        <S.Books>
          {books?.map((book, i) => (
            <Book
              key={i}
              {...book}
            />
          ))}
        </S.Books>
      </>
    )
  }

  return null
}

export default Books
