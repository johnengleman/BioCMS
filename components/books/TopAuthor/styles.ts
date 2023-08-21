import styled from 'styled-components'
import { colors, variables } from '../../../styles/colors'
import { device } from '../../../styles/devices'

export const TopAuthor = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  margin-right: 20px;

  @media ${device.laptop} {
    gap: 20px;
  }

  img {
    border-radius: 50%;
    overflow: hidden;
  }

  .name {
    font-size: 0.9rem;
    color: ${variables.textColor};
    font-weight: 500;
  }
`
