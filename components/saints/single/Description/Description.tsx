import Timeline from '../Timeline/Timeline'
import * as S from './styles'

type Props = {
  text: string
  birthDate: number
  birthLocation: string
  deathDate: number
  deathLocation: string
  summary: string
}

const Description = ({
  text,
  birthDate,
  birthLocation,
  deathDate,
  deathLocation,
  summary,
}: Props) => (
  <S.Bio>
    <Timeline
      birthDate={birthDate}
      birthLocation={birthLocation}
      deathDate={deathDate}
      deathLocation={deathLocation}
    />
    <div className="summary">{summary}</div>
    {typeof window !== 'undefined' && (
      <div
        className="text"
        dangerouslySetInnerHTML={{ __html: text }}
      />
    )}
  </S.Bio>
)

export default Description
