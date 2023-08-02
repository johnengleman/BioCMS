import Image from 'next/image'
import * as S from './styles.js'
import Name from '../../global/Name/Name'

export default function Summary(props) {
  const { name, photo, summary, children } = props

  return (
    <S.Summary>
      <div className="image">
        <Image
          alt="profile"
          src={`https://saints-cms.onrender.com/assets/${photo}`}
          fill={true}
        />
      </div>
      <Name name={name} />
      <div className="bioContainer">
        <div className="summary">{summary}</div>
        {children}
      </div>
    </S.Summary>
  )
}
