import * as S from './styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCross } from '@fortawesome/pro-duotone-svg-icons'

const NameTag = ({ name, tags, birthYear, deathYear }) => {
  return (
    <S.NameTag>
      <h1 className="name">Who was {name}?</h1>
      <div className="info">
        <FontAwesomeIcon icon={faCross} />
        <span className="date">
          {birthYear}-{deathYear}
        </span>
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
