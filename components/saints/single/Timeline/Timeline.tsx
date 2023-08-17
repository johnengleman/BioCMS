import * as S from './styles'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCakeCandles,
  faTombstone,
} from '@fortawesome/pro-duotone-svg-icons'

type Props = {
  birthDate: number | string
  birthLocation: string
  deathDate: number | string
  deathLocation: string
}

const Timeline = ({
  birthDate = '?',
  birthLocation = '?',
  deathDate = '?',
  deathLocation = '?',
}: Props) => {
  return (
    <S.Timeline>
      <div className="dates">
        <div className="birth">
          {birthDate}
          <FontAwesomeIcon
            icon={faCakeCandles}
            size="lg"
          />
        </div>
        <div className="death">
          {deathDate}
          <FontAwesomeIcon
            icon={faTombstone}
            size="lg"
          />
        </div>
      </div>
      <div className="bar"></div>
      <div className="locations">
        <div className="location-birth">
          {birthLocation}
        </div>
        <div className="location-death">
          {deathLocation}
        </div>
      </div>
    </S.Timeline>
  )
}

export default Timeline
