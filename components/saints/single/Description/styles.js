import styled from 'styled-components'
import { device } from '../../../../styles/devices'

export const Bio = styled.div`
  width: 100%;
  color: #0e0e0e;
  box-shadow: 0 10px 30px 0 rgb(0, 0, 0, 0.3);
  padding: 20px;
  margin-bottom: 25px;
  border-radius: 10px;

  @media ${device.laptop} {
    padding: 40px;
    border-radius: 20px;
  }

  .summary {
    font-weight: 500;
    font-size: 14px;
    font-style: italic;
    line-height: 1.4;
    color: #000;
    margin-bottom: 20px;
    color: #525252;
    padding-bottom: 20px;
    border-bottom: 1px solid lightblue;
  }

  .p {
    font-size: 18px;
  }
`
