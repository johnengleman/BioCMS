import { Text, Paper, Spoiler } from '@mantine/core'
import { sanitize } from 'isomorphic-dompurify'
import Timeline from '../Timeline/Timeline'
import * as S from './styles'

type Props = {
  text: string
  birthDate: string
  birthLocation: string
  deathDate: string
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
    <Spoiler
      maxHeight={400}
      showLabel="Show more"
      hideLabel="Hide"
      transitionDuration={250}
    >
      <Timeline
        birthDate={birthDate}
        birthLocation={birthLocation}
        deathDate={deathDate}
        deathLocation={deathLocation}
      />
      <div className="summary">{summary}</div>
      <div
        className="text"
        dangerouslySetInnerHTML={{ __html: sanitize(text) }}
      />
    </Spoiler>
  </S.Bio>
)

export default Description
