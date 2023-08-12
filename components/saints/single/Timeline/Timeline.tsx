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
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }

  return (
    <S.Timeline>
      <div className="dates">
        <div className="birth">
          {
            new Date(birthDate).toLocaleDateString(
              'en-US',
              options,
            ) as string
          }
        </div>
        <div className="death">
          {new Date(deathDate).toLocaleDateString(
            'en-US',
            options,
          )}
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
