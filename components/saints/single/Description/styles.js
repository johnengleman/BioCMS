import styled from 'styled-components'
import { device } from '../../../../styles/devices'

export const Bio = styled.div`
  color: #0e0e0e;
  padding: 20px;
  margin-bottom: 25px;
  border-radius: 10px;
  background: #fff;
  box-shadow: 7px -7px 14px #00d1d1, -7px 7px 14px #fff;
  border: 1px solid #dee2e6;

  @media ${device.laptop} {
    padding: 40px;
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

  .text {
    p {
      font-size: 14px;
      line-height: 1.6;
      color: #202122;
      font-family: sans-serif;
      margin-bottom: 1rem;
    }
  }
`
