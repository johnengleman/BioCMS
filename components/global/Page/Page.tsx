import Navigation from '../Navigation/Navigation'
import * as S from './styles'
import { Saint } from '../../saints/summary/interfaces'

type Props = {
  children: React.ReactNode
  saints?: Saint[]
}

const Page = ({ children, saints }: Props) => (
  <S.Page>
    <Navigation saints={saints} />
    <S.Body>{children}</S.Body>
  </S.Page>
)

export default Page
