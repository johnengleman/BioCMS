import Link from 'next/link'
import * as S from './styles'
import Summary from '../../global/Summary/Summary'

export default function BookSummary(props) {
  const {
    link,
    title,
    book_cover,
    pages,
    category,
    author,
  } = props

  return (
    <Link href={link || ''}>
      <S.BookSummary>
        <Summary
          name={title}
          photo={book_cover?.id}
        >
          <p>Pages: {pages}</p>
          <p>Author: {author}</p>
        </Summary>
      </S.BookSummary>
    </Link>
  )
}
