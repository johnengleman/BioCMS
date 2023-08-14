import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCross } from '@fortawesome/free-solid-svg-icons'
import * as S from './styles'

const NameTag = ({ name, birth, death, tags }) => {
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
          {birth}-{death}
        </p>
        {tags.map((tag, i) => (
          <div
            key={i}
            className="tag"
          >
            {tag.replace(/-/g, ' ')}
          </div>
        ))}
      </div>
    </S.NameTag>
  )
}

export default NameTag
