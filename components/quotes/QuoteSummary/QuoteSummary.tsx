import * as S from './style'

export default function QuoteSummary(props) {
  const { text, topics, author, source } = props

  return (
    <S.QuoteSummary>
      <p>{text}</p>
    </S.QuoteSummary>
  )
}
