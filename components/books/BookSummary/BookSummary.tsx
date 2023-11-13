import Link from 'next/link'
import ImageGlobal from '../../global/ImageGlobal/ImageGlobal'
import styles from './styles.module.scss'

export default function BookSummary({
  data,
  showDescription,
}) {
  const {
    store_link,
    title,
    pages,
    date_created,
    description,
    amazon_book_cover,
    genre,
    saint,
  } = data

  const date = new Date(date_created)
  const formattedDate = `${date.toLocaleString('default', {
    month: 'long',
  })} ${date.getDate()}, ${date.getFullYear()}`

  return (
    <div className={styles.bookSummary}>
      <div className={styles.bookCover}>
        <div
          className={styles.image}
          dangerouslySetInnerHTML={{
            __html: amazon_book_cover,
          }}
        ></div>
      </div>
      <div className={styles.bookInfo}>
        <div>
          <div className={styles.titleContainer}>
            <div className={styles.genre}>
              {genre
                .replace(/and/g, '&')
                .replace(/_/g, ' ')}
            </div>
            <h2 className={styles.title}>{title}</h2>
          </div>

          {showDescription && (
            <div className={styles.authorContainer}>
              <div className={styles.profile}>
                <ImageGlobal
                  src={`${process.env.NEXT_PUBLIC_DIRECTUS_ASSETS}/assets/${saint.profile_image.id}?key=search`}
                  fill={false}
                  width={35}
                  height={35}
                />
              </div>
              <div className={styles.author}>
                {saint?.name}
              </div>
            </div>
          )}
          {showDescription && (
            <div className={styles.descriptionContainer}>
              <p className={styles.description}>
                {description}
              </p>
            </div>
          )}
        </div>
        <div>
          {showDescription && (
            <p className={styles.updated}>
              Pages: {pages || '?'}
            </p>
          )}
          <p className={styles.updated}>
            Updated: {formattedDate}
          </p>
          <Link href={store_link || ''}>
            <button className={styles.bookLink}>
              Read More
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
