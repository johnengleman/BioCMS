import * as S from './styles'

type QuotesProps = {
  quotes: QuoteData[]
}

type QuoteData = {
  text: string
  topics: string[]
}

const Quote = ({
  text,
  topics,
  quoteIndex,
  quoteTotal,
}) => {
  return (
    <S.Quote>
      <p className="c-text">{text}</p>
      <div className="footer">
        <div className="c-topics">
          {topics?.map((topic, index) => (
            <div
              key={index}
              className="topic"
            >
              {topic}
            </div>
          ))}
        </div>
        <div className="quoteNumber">
          <p>{`${quoteIndex}/${quoteTotal}`}</p>
        </div>
      </div>
    </S.Quote>
  )
}

const Quotes = ({ quotes }: QuotesProps) => {
  if (quotes?.length > 3) {
    return (
      <S.SlideContainer>
        {quotes?.map((quote: QuoteData, i) => (
          <Quote
            key={i}
            text={quote.text}
            topics={quote.topics}
            quoteIndex={i + 1}
            quoteTotal={quotes.length}
          />
        ))}
      </S.SlideContainer>
    )
  }

  return (
    <>
      {quotes?.map((quote: QuoteData, i) => (
        <Quote
          key={i}
          text={quote.text}
          topics={quote.topics}
          quoteIndex={i + 1}
          quoteTotal={quotes.length}
        />
      ))}
    </>
  )
}

export default Quotes
