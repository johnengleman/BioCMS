import React from 'react'
import Navigation from '../Navigation/Navigation'
import Footer from '../Footer/Footer'
import { Saint } from '../../saints/summary/interfaces'
import * as S from './styles'

type Props = {
  children: React.ReactNode
  saints?: Saint[]
}

const Page = ({ children, saints }: Props) => (
  <S.Page>
    <Navigation saints={saints} />
    <S.Body>{children}</S.Body>
    <Footer />
  </S.Page>
)

export default Page
