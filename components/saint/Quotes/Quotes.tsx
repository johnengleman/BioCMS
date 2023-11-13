import ImageGlobal from '../../global/ImageGlobal/ImageGlobal'
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
                  width={35}
                  height={35}
                />
              </div>
            )}
            <div className={styles.author}>
              {saint?.name}
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
  return (
    <div className={styles.quotesContainer}>
      {quotes?.map((quote: QuotesData, i) => (
        <Quote
          key={i}
          text={quote.text}
          topics={quote.topics}
          saint={quote.saint}
          showAuthor={showAuthor}
        />
      ))}
    </div>
  )
}

export default Quotes
