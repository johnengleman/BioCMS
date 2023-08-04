import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCross } from '@fortawesome/free-solid-svg-icons'
import * as S from './styles'

const NameTag = ({ name, birth, death }) => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
  }

  return (
    <S.NameTag>
      <h1 className="name">{name}</h1>
      <div className="info">
        <FontAwesomeIcon
          icon={faCross}
          fontSize="12px"
          style={{ color: '#222222' }}
        />
        <p>
          {
            new Date(birth).toLocaleDateString(
              'en-US',
              options,
            ) as string
          }
          -
          {
            new Date(death).toLocaleDateString(
              'en-US',
              options,
            ) as string
          }
        </p>
      </div>
    </S.NameTag>
  )
}

export default NameTag
