import * as S from './styles'

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
        <div className="birth">{birthDate}</div>
        <div className="death">{deathDate}</div>
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
