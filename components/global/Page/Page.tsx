import { AppShell, Navbar, Header } from '@mantine/core'
import Navigation from '../Navigation/Navigation'
import * as S from './styles'
import Footer from '../Footer/Footer'

type Props = {
  children: React.ReactNode
}

const Page = ({ children }: Props) => (
  <S.Page>
    <Navigation />
    <S.Body>{children}</S.Body>
  </S.Page>
)

export default Page
