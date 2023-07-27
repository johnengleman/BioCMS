import { Text, Paper, Spoiler } from '@mantine/core'
import { sanitize } from 'isomorphic-dompurify'
import Timeline from '../Timeline/Timeline'

type Props = {
  text: string
  birthDate: string
  birthLocation: string
  deathDate: string
  deathLocation: string
}

const Description = ({
  text,
  birthDate,
  birthLocation,
  deathDate,
  deathLocation,
}: Props) => (
  <Paper
    shadow="md"
    p="lg"
    mb={30}
    withBorder
  >
    <Spoiler
      maxHeight={150}
      showLabel="Show more"
      hideLabel="Hide"
      transitionDuration={100}
    >
      <Timeline
        birthDate={birthDate}
        birthLocation={birthLocation}
        deathDate={deathDate}
        deathLocation={deathLocation}
      />
      <div
        className="text"
        dangerouslySetInnerHTML={{ __html: sanitize(text) }}
      />
    </Spoiler>
  </Paper>
)

export default Description
