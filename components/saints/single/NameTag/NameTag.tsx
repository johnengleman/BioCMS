import * as S from './styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCross } from '@fortawesome/pro-duotone-svg-icons'

const NameTag = ({ name, birth, death, tags }) => {
  return (
    <S.NameTag>
      <h1 className="name">{name}</h1>
      <div className="info">
        <FontAwesomeIcon icon={faCross} />
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
