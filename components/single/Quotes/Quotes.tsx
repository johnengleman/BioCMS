import { Carousel } from '@mantine/carousel'
import * as S from './styles'
import ButtonCategory from '../../global/Buttons/ButtonCategory/ButtonCategory'
import ShowMore from '../../global/ShowMore/ShowMore'

type QuoteProps = {
  text: String
  topic: String
}

const Quote = ({ text, topic }: QuoteProps) => (
  <S.Quote>
    <div className="text">{text}</div>
    <div className="footer">
      <ButtonCategory
        text="topic"
        bg="#CCEBD9"
      />
    </div>
  </S.Quote>
)

type QuotesProps = {
  quotes: QuoteProps[]
}

const Quotes = ({ quotes }: QuotesProps) => {
  if (quotes.length > 3) {
    return (
      <Carousel
        withIndicators
        slideSize="33.333333%"
        slideGap="md"
        loop
        align="start"
        slidesToScroll={3}
      >
        {quotes.map((quote: QuoteProps, i) => (
          <Carousel.Slide key={i}>
            <Quote
              text={quote.text}
              topic={quote.topic}
            />
          </Carousel.Slide>
        ))}
      </Carousel>
    )
  }

  return (
    <>
      {quotes.map((quote: QuoteProps, i) => (
        <Quote
          key={i}
          text={quote.text}
          topic={quote.topic}
        />
      ))}
    </>
  )
}

export default Quotes
