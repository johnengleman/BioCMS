import Link from 'next/link'
import parseList from '../../../utils/parseList'
import { splitSaintName } from '../../../utils/saintNames'
import styles from './styles.module.scss'

// "spiritual_and_ascetic_writings" -> "Spiritual & ascetic writings"
export const genreLabel = (value: string) => {
  const text = value
    .replace(/_and_/g, ' & ')
    .replace(/_/g, ' ')
  return text.charAt(0).toUpperCase() + text.slice(1)
}

const shortName = (name = '') =>
  name.length > 28 ? splitSaintName(name).title : name

// One book: cover, genre, title, the saint it is about and a link to
// the store. "compact" leaves out the description (Newest row).
const BookCard = ({
  book,
  compact = false,
}: {
  book: any
  compact?: boolean
}) => {
  const genres = parseList(book.genre).map(genreLabel)
  const saint = book.saint
  const meta = [
    book.author,
    book.year,
    book.pages && `${book.pages} pages`,
  ]
    .filter(Boolean)
    .join(' · ')

  return (
    <article
      className={`${styles.book} ${compact ? styles.compact : ''}`}
    >
      {book.amazon_book_cover && (
        <div
          className={styles.cover}
          // The cover is an image snippet from the store.
          dangerouslySetInnerHTML={{
            __html: book.amazon_book_cover,
          }}
        />
      )}
      <div className={styles.text}>
        {genres.length > 0 && (
          <p className={styles.eyebrow}>
            {compact ? genres[0] : genres.join(', ')}
          </p>
        )}
        <h3 className={styles.title}>{book.title}</h3>
        {meta && <p className={styles.meta}>{meta}</p>}
        {!compact && book.description && (
          <p className={styles.description}>
            {book.description}
          </p>
        )}
        {!compact && saint?.slug && (
          <Link
            href={`/saints/${saint.slug}`}
            className={styles.saint}
          >
            {saint.profile_image?.id && (
              <img
                src={`${process.env.NEXT_PUBLIC_DIRECTUS_ASSETS}/assets/${saint.profile_image.id}?width=80&height=80&fit=cover&format=webp`}
                alt=""
                loading="lazy"
              />
            )}
            About {shortName(saint.name)}
          </Link>
        )}
        {book.store_link && (
          <a
            href={book.store_link}
            className={styles.store}
            target="_blank"
            rel="noopener noreferrer sponsored"
          >
            View the book<span aria-hidden="true"> ›</span>
          </a>
        )}
      </div>
    </article>
  )
}

export default BookCard
