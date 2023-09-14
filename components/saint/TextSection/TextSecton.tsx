import { useState } from 'react'
import * as S from './styles'
import ReadMore from '../ReadMore/ReadMore'

const TextSection = ({ title, text }) => {
  const [readMore, setReadMore] = useState(false)

  if (!text) {
    return null
  }

  return (
    <S.TextSection $readMore={readMore}>
      <h2 className="title">{title}</h2>
      <div
        className="text"
        dangerouslySetInnerHTML={{
          __html: text,
        }}
      ></div>
      <div className="footer">
        <ReadMore
          onClick={() => setReadMore(!readMore)}
          readMore={readMore}
        />
      </div>
    </S.TextSection>
  )
}

export default TextSection
