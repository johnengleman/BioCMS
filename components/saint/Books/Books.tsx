import SectionTitle from '../SectionTitle/SectionTitle'
import styles from './styles.module.scss'

type BookProps = {
  title: string
  author: string
  store_link: string
  pages?: number
  description_part_1: string
  description_part_2: string
  amazon_book_cover: string
}

const Book = ({
  title,
  author,
  store_link,
  pages,
  amazon_book_cover,
  description_part_1,
}: BookProps) => {
  return (
    <div className={styles.book}>
      <div
        className={styles.image}
        dangerouslySetInnerHTML={{
          __html: amazon_book_cover,
        }}
      ></div>
      <div className={styles.bookInfo}>
        <div className={styles.bookName}>{title}</div>
        <div className={styles.bookAuthor}>{author}</div>
        <div
          className={styles.bookDescription}
          dangerouslySetInnerHTML={{
            __html: description_part_1,
          }}
        />
        <button className={styles.ctaBtn}>
          See the Price
        </button>
      </div>
    </div>
  )
}

type BooksProps = {
  books: BookProps[]
  inRightRail: boolean
}

const Books = ({ books, inRightRail }: BooksProps) => {
  if (books?.length) {
    return (
      <div
        className={`${styles.books} ${
          inRightRail ? `${styles.inRightRail}` : ''
        }`}
      >
        <SectionTitle
          inRightRail={inRightRail}
          id="section-books"
          dataSection="books"
        >
          Books
        </SectionTitle>
        <div className={styles.booksContainer}>
          {books?.map((book, i) => (
            <Book
              key={i}
              {...book}
            />
          ))}
        </div>
      </div>
    )
  }

  return null
}

export default Books
