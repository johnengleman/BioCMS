import { Text, Paper, Spoiler } from '@mantine/core'
import { sanitize } from 'isomorphic-dompurify'
import * as S from './styles'

type Props = {
  text: string
}

const Description = ({ text }: Props) => (
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
      <div
        className="text"
        dangerouslySetInnerHTML={{ __html: sanitize(text) }}
      />
    </Spoiler>
  </Paper>
)

export default Description
