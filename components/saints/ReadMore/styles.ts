import styled from 'styled-components'
import { device } from '../../../styles/devices'
import { colors } from '../../../styles/colors'

export const ReadMore = styled.button`
  border: none;
  font-size: 0.7rem;
  padding: 5px 30px;
  color: ${colors.violet};
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  background-color: ${colors.mint};
  border-radius: 15px;
  font-weight: 600;
  box-shadow: 2px 3px 3px rgba(0, 0, 0, 0.2);
  border: 1px solid #fff;
`
