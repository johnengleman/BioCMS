import styled from 'styled-components'
import { device } from '../../../styles/devices'

export const Page = styled.div`
  min-height: 100vh;
`

export const Body = styled.main`
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
  gap: 1rem;
  width: 80%;
  max-width: 1440px;
  margin-top: 25px;

  @media ${device.laptop} {
    margin-top: 50px;
  }
`
