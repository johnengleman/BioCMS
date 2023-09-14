import Link from 'next/link'
import * as S from './styles'
import { useRouter } from 'next/router'
import Search from '../Search/Search'
import SMButtons from '../SMButtons/SMButtons'

const Header = ({ saints }) => {
  const router = useRouter()
  const isSaintsPage =
    router.pathname.startsWith('/saints/')
  return (
    <S.Header transparent={isSaintsPage}>
      <div className="row row-1">
        <div className="content">
          <div className="col left">
            <S.Navigation transparent={isSaintsPage}>
              <Link href="/saints">Saints</Link>
              {/* <Link href="/books">Books</Link>
              <Link href="/teachings">Teachings</Link> */}
            </S.Navigation>
          </div>
          <div className="col center"></div>
          <div className="col right">
            <Search saints={saints} />
            <SMButtons transparent={isSaintsPage} />
          </div>
        </div>
      </div>
    </S.Header>
  )
}

export default Header
