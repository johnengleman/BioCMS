import * as S from './styles'
import Link from 'next/link'
import ChurchToggle from '../ChurchToggle/ChurchToggle'

const Footer = () => (
  <S.Footer>
    <div className="content">
      <div className="row left">
        <Link href="/teachings">About</Link>
        <Link href="/teachings">Contact</Link>
      </div>
      <div className="row center"></div>
      <div className="row right">
        <ChurchToggle />
      </div>
    </div>
  </S.Footer>
)

export default Footer
