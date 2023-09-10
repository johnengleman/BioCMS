import Link from 'next/link'
import * as S from './styles'
import Search from '../Search/Search'
import SMButtons from '../../global/SMButtons/SMButtons'

const Header = ({ saints }) => {
  return (
    <S.Header>
      <div className="row row-1">
        <div className="content">
          <div className="col left">
            <S.Navigation>
              <Link href="/saints">Saints</Link>
              <Link href="/books">Books</Link>
              <Link href="/teachings">Teachings</Link>
            </S.Navigation>
          </div>
          <div className="col center"></div>
          <div className="col right">
            <Search saints={saints} />
            <SMButtons />
          </div>
        </div>
      </div>
    </S.Header>
  )
}

export default Header
