import styled from 'styled-components'
import { device } from '../../styles/devices'

export const Books = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  justify-content: center;

  @media ${device.mobileL} {
    flex-direction: row;
    flex-wrap: wrap;
  }
`
