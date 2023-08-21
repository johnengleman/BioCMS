import { useState } from 'react'
import Timeline from '../Timeline/Timeline'
import ReadMore from '../../../global/ReadMore/ReadMore'
import * as S from './styles'

type Props = {
  text: string
  birthDate: number
  birthLocation: string
  deathDate: number
  deathLocation: string
  summary: string
}

const Biography = ({
  text,
  birthDate,
  birthLocation,
  deathDate,
  deathLocation,
  summary,
}: Props) => {
  const [readMore, setReadMore] = useState(false)

  return (
    <S.Bio $readMore={readMore}>
      <h2 className="title">Life</h2>
      <Timeline
        birthDate={birthDate}
        birthLocation={birthLocation}
        deathDate={deathDate}
        deathLocation={deathLocation}
      />
      <div
        className="text"
        dangerouslySetInnerHTML={{ __html: text }}
      />
      <div className="footer">
        <ReadMore
          onClick={() => setReadMore(!readMore)}
          readMore={readMore}
        />
      </div>
    </S.Bio>
  )
}

export default Biography
