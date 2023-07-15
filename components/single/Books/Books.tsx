import { Carousel } from '@mantine/carousel'
import Image from 'next/image'
import * as S from './styles'
import SectionHeader from '../../global/SectionHeader/SectionHeader'

type BookProps = {
  title: string
  author: {
    name: string
  }
  link: string
  pages?: string
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
    <S.Book>
      <a
        href={link}
        className="book-image"
      >
        <Image
          src={`https://saints-cms.onrender.com/assets/${book_cover?.id}`}
          height="150"
          width="140"
          alt=""
        />
      </a>
      <a
        href={link}
        className="book-info"
      >
        <div className="book-name">{title}</div>
        <div className="book-author">{author.name}</div>
        <div className="book-link">Buy On Amazon</div>
      </a>
    </S.Book>
  )
}

type BooksProps = {
  books: BookProps[]
}

const Books = ({ books }: BooksProps) => (
  <>
    <SectionHeader name="Books" />
    <div className="carousel-container">
      <Carousel
        slideSize="25%"
        slideGap="sm"
        align="start"
        height="190px"
        slidesToScroll={1}
        breakpoints={[
          {
            maxWidth: 'md',
            slideSize: '100%',
          },
        ]}
      >
        {books?.map((book, i) => (
          <Carousel.Slide key={i}>
            <Book
              key={i}
              title={book?.title}
              author={book?.author}
              link={book?.link}
              book_cover={book?.book_cover}
            />
          </Carousel.Slide>
        ))}
      </Carousel>
    </div>
  </>
)

export default Books
