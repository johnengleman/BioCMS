import Link from 'next/link'
import * as S from './styles'
import Search from '../Search/Search'
import ChurchToggle from '../ChurchToggle/ChurchToggle'

const Navigation = ({ saints }) => {
  return (
    <S.Container>
      <S.Row>
        <Search saints={saints} />
      </S.Row>

      <S.Navigation>
        <ul className="pages">
          <S.Button>
            <Link href="/saints">Saints</Link>
          </S.Button>
          <S.Button>
            <Link href="/books">Books</Link>
          </S.Button>
          <S.Button>
            <Link href="/sayings">Sayings</Link>
          </S.Button>
          <S.Button>
            <Link href="/prayers">Prayers</Link>
          </S.Button>
        </ul>
        <ChurchToggle />
      </S.Navigation>
    </S.Container>
  )
}

export default Navigation
