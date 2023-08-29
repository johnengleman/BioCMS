import * as S from './styles'

type SayingsProps = {
  sayings: SayingData[]
}

type SayingData = {
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

const Quotes = ({ sayings }: SayingsProps) => {
  if (sayings?.length > 3) {
    return (
      <S.SlideContainer>
        {sayings?.map((quote: SayingData, i) => (
          <Quote
            key={i}
            text={quote.text}
            topics={quote.topics}
            quoteIndex={i + 1}
            quoteTotal={sayings.length}
          />
        ))}
      </S.SlideContainer>
    )
  }

  return (
    <>
      {sayings?.map((saying: SayingData, i) => (
        <Quote
          key={i}
          text={saying.text}
          topics={saying.topics}
          quoteIndex={i + 1}
          quoteTotal={sayings?.length}
        />
      ))}
    </>
  )
}

export default Quotes
