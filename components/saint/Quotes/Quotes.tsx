import ImageGlobal from '../../global/ImageGlobal/ImageGlobal'
import MasonryClient from '../Masonry/Masonry'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFaceFrownSlight } from '@fortawesome/pro-duotone-svg-icons'
import styles from './styles.module.scss'

type QuotesProps = {
  quoteData: QuoteProps[]
}

type QuoteProps = {
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

const Quotes = async ({ quoteData }: QuotesProps) => {
  return (
    <div className={styles.quotesContainer}>
      <MasonryClient>
        {quoteData?.length ? (
          quoteData?.map((quote: QuoteProps, i) => (
            <Quote
              key={i}
              text={quote.text}
              topics={quote.topics}
              saint={quote.saint}
              showAuthor={true}
            />
          ))
        ) : (
          <p className="status">
            No quotes found.{' '}
            <FontAwesomeIcon icon={faFaceFrownSlight} />
          </p>
        )}
      </MasonryClient>
    </div>
  )
}

export default Quotes
