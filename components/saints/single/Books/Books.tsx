import Image from 'next/image'
import { Title, Flex } from '@mantine/core'
import * as S from './styles'

type BookProps = {
  title: string
  author: string
  link: string
  pages?: number
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
}: BookProps) => {
  return (
    <S.Book href={link}>
      {book_cover?.id ? (
        <Image
          src={`https://saints-cms.onrender.com/assets/${book_cover?.id}?fit=contain&height=170&width=140`}
          height="170"
          width="140"
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
        <Title
          order={3}
          mb={10}
        >
          Books
        </Title>

        <Flex
          gap="md"
          wrap="wrap"
          justify="space-between"
          mb="50px"
        >
          {books?.map((book, i) => (
            <Book
              key={i}
              {...book}
            />
          ))}
        </Flex>
      </>
    )
  }

  return null
}

export default Books
