import ImageGlobal from '../../global/ImageGlobal/ImageGlobal'
import Masonry from 'react-masonry-css'
import useBreakpoints from '../../../hooks/useBreakPoints'
import styles from './styles.module.scss'

type QuotesProps = {
  quotes: QuotesData[]
  showAuthor?: boolean
}

type QuotesData = {
  text: string
  topics: string[]
  showAuthor?: boolean
  saint: {
    name: string
    death_year: string
    birth_year: string
    profile_image: {
      description: string
      id: string
    }
  }
}

const Quote = ({ text, topics, saint, showAuthor }) => {
  return (
    <div className={styles.quote}>
      <p className={styles.text}>{text}</p>
      <div className={styles.footer}>
        {showAuthor && (
          <div className={styles.authorContainer}>
            {saint?.profile_image && (
              <div className={styles.profile}>
                <ImageGlobal
                  src={`${process.env.NEXT_PUBLIC_DIRECTUS_ASSETS}/assets/${saint?.profile_image.id}?key=search`}
                  fill={false}
                  width={50}
                  height={50}
                />
              </div>
            )}
            <div className={styles.author}>
              <p>{saint?.name}</p>
              <p className={styles.dates}>
                {saint?.birth_year}-{saint?.death_year}
              </p>
            </div>
          </div>
        )}
        <div className={styles.topics}>
          {topics?.map((topic, index) => (
            <div
              key={index}
              className={styles.topic}
            >
              {topic}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const Quotes = ({ quotes, showAuthor }: QuotesProps) => {
  const { isMobileS, isMobileM, isMobileL, isTablet } =
    useBreakpoints()

  const getColumnsToRender = () => {
    if (isMobileS || isMobileM || isMobileL) {
      return 1
    }
    if (isTablet) {
      return 2
    }
    return 3
  }

  return (
    <div className={styles.quotesContainer}>
      <Masonry
        breakpointCols={getColumnsToRender()}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {quotes?.map((quote: QuotesData, i) => (
          <Quote
            key={i}
            text={quote.text}
            topics={quote.topics}
            saint={quote.saint}
            showAuthor={showAuthor}
          />
        ))}
      </Masonry>
    </div>
  )
}

export default Quotes
