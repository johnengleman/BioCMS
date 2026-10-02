import { getBooksBundle } from '../../../queries/getBooksBundle'
import SiteHeader from '../SiteHeader/SiteHeader'
import SiteFooter from '../SiteFooter/SiteFooter'
import HomeHero from '../HomeHero/HomeHero'
import { TraditionShowing } from '../TraditionText/TraditionText'
import TraditionWelcome from '../TraditionWelcome/TraditionWelcome'
import {
  BooksContent,
  BooksPills,
  BooksProvider,
  BooksSaintMenu,
} from '../BooksView/BooksView'
import styles from '../../../app/books/candle.module.scss'

// The books page, for /books and for each /books/genre/<name>. Built
// ahead of time for "Both traditions"; the browser loads another
// tradition, or one saint, from the cached API.
const BooksPage = async ({ genre = '' }: { genre?: string }) => {
  const initial = await getBooksBundle({
    church: 'all',
    preset: genre || 'none',
    filter: 'all',
  })

  return (
    <BooksProvider
      genre={genre}
      initial={initial}
    >
      <div className={styles.page}>
        <SiteHeader
          active="/books"
          overlay
        />
        <main>
          <HomeHero
            size="short"
            title="Books"
            subtitle="Lives, writings, and devotions to read next, chosen for each saint."
            filters={<BooksPills />}
          />
          <div className={styles.results}>
            <span>
              <TraditionShowing prefix="Showing books for" />
            </span>
            <BooksSaintMenu />
          </div>
          <BooksContent
            className={styles.content}
            newestClassName={styles.newest}
            gridClassName={styles.grid}
            emptyClassName={styles.empty}
          />
        </main>
        <SiteFooter />
        <TraditionWelcome />
      </div>
    </BooksProvider>
  )
}

export default BooksPage
