import styled from 'styled-components'
import { device } from '../../../styles/devices'

export const Header = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  color: #5b5b5b;
  font-size: 0.6rem;
  line-height: 1;

  @media ${device.tablet} {
    justify-content: flex-start;
  }
`
