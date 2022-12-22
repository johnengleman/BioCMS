import { Carousel } from '@mantine/carousel'
import Image from 'next/image'
import * as S from './styles'
import SectionHeader from '../../global/SectionHeader/SectionHeader'

type BookProps = {
  title: string
  author: string
  link: string
  image: {
    id: string
  }
}

const Book = ({
  title,
  author,
  link,
  image,
}: BookProps) => {
  return (
    <S.Book>
      <a
        href={link}
        className="book-image"
      >
        <Image
          src={`https://4hi7oa87.directus.app/assets/${image?.id}`}
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
        <div className="book-author">{author}</div>
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
    <S.BooksContainer>
      <SectionHeader name="Books" />
      <div className="carousel-container">
        <Carousel
          withIndicators
          slideSize="25%"
          slideGap="sm"
          align="end"
          height="190px"
          slidesToScroll={4}
        >
          {books?.map((book, i) => (
            <Carousel.Slide key={i}>
              <Book
                key={i}
                title={book?.title}
                author={book?.author}
                link={book?.link}
                image={book?.image}
              />
            </Carousel.Slide>
          ))}
        </Carousel>
      </div>
    </S.BooksContainer>
  </>
)

export default Books
