import * as S from './style'

export default function QuoteSummary(props) {
  const { text, topics, author, source } = props

  return (
    <S.QuoteSummary>
      {topics && <div className="topic">{topics}</div>}
      <p className="text">{text}</p>
      <p className="source">{author.name}</p>
    </S.QuoteSummary>
  )
}
