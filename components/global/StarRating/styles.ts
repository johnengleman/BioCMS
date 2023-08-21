import styled from 'styled-components'
import { device } from '../../../styles/devices'

export const Rating = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  @media ${device.tablet} {
    justify-content: flex-start;
  }

  p {
    color: #333;
    font-size: 0.9rem;
    margin-top: 3px;
    color: #888;
  }
`
