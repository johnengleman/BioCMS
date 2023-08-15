import Link from 'next/link'
import * as S from './styles'
import Search from '../Search/Search'

const Navigation = ({ saints }) => {
  return (
    <S.Container>
      <S.Navigation>
        <ul>
          <S.Button>
            <Link href="/saints">Saints</Link>
          </S.Button>

          {/* <S.Button>
            <Link href="/books">Books</Link>
          </S.Button> */}

          <S.Button>
            <Link href="/quotes">Quotes</Link>
          </S.Button>
        </ul>
        <Search saints={saints} />
      </S.Navigation>
    </S.Container>
  )
}

export default Navigation
