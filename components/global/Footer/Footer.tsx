import * as S from './styles'
import Link from 'next/link'

const Footer = () => (
  <S.Footer>
    <div className="links">
      <div className="col">
        <div className="slogan">the online iconostasis</div>
        <div className="title">Orthodox Saints wiki</div>
      </div>
      <div className="row">
        <Link href="/saints">Saints</Link>
        <Link href="/books">Books</Link>
        <Link href="/quotes">Quotes</Link>
      </div>
    </div>
  </S.Footer>
)

export default Footer
